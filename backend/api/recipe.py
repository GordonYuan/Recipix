from app import api
from util.models import *
from util.helper import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

recipe = api.namespace('recipe', description='Recipe information')


@recipe.route('/searchName', strict_slashes=False)
class searchName(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(recipe_name_tags_model)
    @recipe.doc(description='''
        Returns a list of all recipes that matches the tags passed in 
        and has the search term passed in
        If no tags are passed in, or no search queries are passed in, 
        returns all recipes in the database.
    ''')
    def post(self):
        # TODO
        r = request.json

        if not r:
            abort(400, 'Malformed Request')
        
        tags = get_list(r, 'tags', 'tag')

        search_term = r['search_term']

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        # 'or' in 'where' of sql finds recipes that match any of the tags specified
        # recipes only have to match at least one of the input tags if they exist
        sql_str = ('SELECT * from recipes r')
        if tags:
            sql_str += ' join recipe_tag t on r.id = t.recipe_id where '
            for i in tags:
                sql_str += 'tag = "{}" or '.format(i)
            sql_str = sql_str[:-3]

        c.execute(sql_str)
        recipe_t = c.fetchall()

        new_recipes = []
        if search_term:
            for recipe in recipe_t:
                if recipe[2].find(search_term.lower()) != -1:
                    new_recipes.append(recipe)

        c.close()
        conn.close()
        return format_recipe(new_recipes)


@recipe.route('/search', strict_slashes=False)
class Search(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(ingredients_tags_model)
    @recipe.doc(description='''
        Takes in a list of ingredients, as well as the tags
        Retrieves 21 recipes that can be constructed from the ingredients passed in
        Recipes will also match the tags that are passed in
        If no tags are passed in, then it returns all recipes that can be constructed from ingredients
    ''')
    def post(self):
        r = request.json

        if not r:
            abort(400, 'Malformed Request')

        ingredients = get_list(r, 'ingredients', 'name')
        tags = get_list(r, 'tags', 'tag')

        # 
        top_n = get_top_recipes(ingredients, tags, 21)

        return format_recipe(top_n)


@recipe.route('/user', strict_slashes=False)
class User(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model)
    @recipe.doc(description='''
        Takes in the authorization token, 
        Returns a list of recipes that the user has created.
    ''')
    def post(self):
        # fake TODO
        user = authenticate(request)

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        c.execute('SELECT * from recipes where username = ?', (user, ))
        recipe_t = c.fetchall()

        c.close()
        conn.close()
        return format_recipe(recipe_t)

@recipe.route('/add', strict_slashes=False)
class Add(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, recipe_add_model)
    @recipe.doc(description='''
        Takes in a authorization token, recipe 
        Adds the recipe to the database.
        If the list of ingredients in the recipe match any of the requests in the database,
        then the request will be considered fulfilled and removed from the database.
    ''')
    def post(self):
        user = authenticate(request)
        r = request.json

        name = r['recipe_name']
        image = r['image']
        servings = r['servings']
        description = r['description']

        # connect to db
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        # add recipe in
        sql = 'INSERT INTO recipes (username, name, servings, description, thumbnail) VALUES (?, ?, ?, ?, ?)'
        vals = (user, name, servings, description, image)
        c.execute(sql, vals)
        conn.commit()

        # get recipe_id
        sql = 'select id from recipes where username = ? and name = ? order by id desc limit 1'
        vals = (user, name)
        c.execute(sql, vals)
        recipe_id, = c.fetchone()

        # add steps in
        method = r['method']
        vals = []
        for s in method:
            vals.append((recipe_id, s['step_number'], s['instruction']))
        sql = 'INSERT INTO methods(recipe_id, step, instruction) VALUES (?, ?, ?)'
        c.executemany(sql, vals)

        # add ingredients in
        ingredients = r['ingredients']
        vals = []
        for i in ingredients:
            vals.append((recipe_id, i['name'], i['quantity']))
        
        sql = 'INSERT INTO recipe_has(recipe_id, ingredient_name, quantity) VALUES (?, ?, ?)'
        c.executemany(sql, vals)

        # add tags in
        tags = r['tags']
        vals = []
        for t in tags:
            vals.append((recipe_id, t['tag']))
        sql = 'INSERT INTO recipe_tag(recipe_id, tag) VALUES (?, ?)'
        c.executemany(sql, vals)
        conn.commit()
        c.close()
        conn.close()

        # Once added in, needs to remove any requests that have been fulfilled. 
        # checking if ingredients used in recipe meets any of the requests

        update_requests(ingredients)
        # commit to db
        
        return {
            'message': 'success'
        }


@recipe.route('/edit', strict_slashes=False)
class Edit(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(401, 'Unauthorized')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.response(406, 'Recipe does not exist')
    @recipe.expect(auth_model, recipe_complete_model)
    @recipe.doc(description='''
        Takes in the recipes information, as well as authorization token.
        If the user is valid and owns the recipe, then.
        Updates the recipe record
        Removes all methods, tags, and ingredients
        Repopulates the methods, tags and ingredients with the information that is passed in
        The recipe maintains the same id. 
        If the list of ingredients in the recipe match any of the requests in the database,
        then the request will be considered fulfilled and removed from the database.
    ''')
    def post(self):
        r = request.json
        user = authenticate(request)
        recipe_id = r['recipe_id']

        # connect to db
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        c.execute('SELECT username from Recipes where id = ?', (recipe_id,))
        res = c.fetchone()

        # if it doesnt return anything, then recipe doesnt exist, cannot edit it.
        if not res:
            abort(406, 'Recipe does not exist')

        owner_user, = res
        # checks if owner of recipe is same as person from token
        if owner_user != user:
            abort(401, 'Unauthorized')

        name = r['recipe_name']
        image = r['image']
        servings = r['servings']
        description = r['description']

        # updates the original recipes
        sql = 'UPDATE recipes SET username = ?, name = ?, servings = ?, description = ?, thumbnail = ? WHERE id = ?'
        vals = (user, name, servings, description, image, recipe_id)
        c.execute(sql, vals)

        # remove existing steps
        sql = 'DELETE FROM methods where recipe_id = ?'
        c.execute(sql, (recipe_id,))

        # add or update steps
        method = r['method']
        vals = []
        for s in method:
            vals.append((recipe_id, s['step_number'], s['instruction']))
        c.executemany(
            'INSERT INTO methods(recipe_id, step, instruction) VALUES (?, ?, ?)', vals)

        # remove existing ingredients
        sql = 'DELETE FROM recipe_has where recipe_id = ?'
        c.execute(sql, (recipe_id,))

        # add ingredients in
        ingredients = r['ingredients']
        vals = []
        for i in ingredients:
            vals.append((recipe_id, i['name'], i['quantity']))
        c.executemany(
            'INSERT INTO recipe_has(recipe_id, ingredient_name, quantity) VALUES (?, ?, ?)', vals)

        # remove existing tags
        sql = 'DELETE FROM recipe_tag where recipe_id = ?'
        c.execute(sql, (recipe_id,))

        # add tags in
        tags = r['tags']
        vals = []
        for t in tags:
            vals.append((recipe_id, t['tag']))
        sql = 'INSERT INTO recipe_tag(recipe_id, tag) VALUES (?, ?)'
        c.executemany(sql, vals)
        # commit to db
        conn.commit()
        c.close()
        conn.close()

        update_requests(ingredients)

        return {
            'message': 'success'
        }


@recipe.route('/delete', strict_slashes=False)
class Delete(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(401, 'Unauthorized')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.response(406, 'Recipe does not exist')
    @recipe.expect(auth_model, recipe_id_model)
    @recipe.doc(description='''
        Takes in the recipe_id, and authentication token
        Verifies the user using authentication token to ensure tha they own that particular recipe
        If they own it, remove the recipe from the database completely.
    ''')
    def post(self):
        # get the user associated with token
        user = authenticate(request)

        r = request.json
        recipe_id = r['recipe_id']

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        c.execute('SELECT username from Recipes where id = ?', (recipe_id,))
        res = c.fetchone()

        # if it doesnt return anything, then recipe doesnt exist, cannot delete it.
        if not res:
            abort(406, 'Recipe does not exist')

        owner_user, = res

        if owner_user != user:
            abort(401, 'Invalid User')

        # allowing cascade deletes
        c.execute('PRAGMA foreign_keys = ON;')

        # delete from recipes table
        sql = 'DELETE FROM Recipes WHERE id=?'
        val = (recipe_id,)
        c.execute(sql, val)
        conn.commit()
        c.close()
        conn.close()
        return {
            'message': 'success'
        }


@recipe.route('/tags', strict_slashes=False)
class Tags(Resource):
    @recipe.response(200, 'Success', tags_model)
    @recipe.doc(description='''
        Takes in nothing
        Returns the tags that exist in the database
    ''')
    def get(self):
        # TODO add the request into backend
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        c.execute('SELECT * from tag;')
        t = c.fetchall()

        ret = {"tags": []}
        for x in t:
            ret['tags'].append({
                'tag': x
            })

        c.close()
        conn.close()
        return ret


@recipe.route('/find', strict_slashes=False)
class Find(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(recipe_id_model)
    @recipe.doc(description='''
        Takes in a recipe_id 
        Returns the detail of the recipe associated with that recipe_id
    ''')
    def post(self):
        # TODO
        r = request.json
        if not r:
            abort(400, 'Malformed Request')

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        c.execute('SELECT * from recipes where id = ?', (r['recipe_id'], ))
        recipe_t = c.fetchall()

        c.close()
        conn.close()
        return format_recipe(recipe_t)