from app import api
from util.models import *
from util.helper import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

recipe = api.namespace('recipe', description='Recipe information')


@recipe.route('/all', strict_slashes=False)
class All(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.expect(tags_model)
    @recipe.doc(description='''
        Retrieves 20 Recipes
    ''')
    def post(self):
        # TODO
        r = request.json
        if not r:
            abort(400, 'Malformed Request')
        tags = []
        for x in r['tags']:
            tags.append(x['tag'])

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        # 'or' in 'where' of sql finds recipes that match any of the tags specified
        sql_str = ('SELECT * from recipes')
        if tags:
            sql_str += ' r join recipe_tag t on r.id = t.recipe_id where '
            for i in tags:
                sql_str += 'tag = "{}" or '.format(i)
            sql_str = sql_str[:-3]

        c.execute('SELECT * from recipes ;')
        recipe_t = c.fetchall()

        c.close()
        conn.close()
        return format_recipe(recipe_t)


@recipe.route('/search', strict_slashes=False)
class Search(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(ingredients_tags_model)
    @recipe.doc(description='''
        Retrieves 20 recipes
        that contain the ingredients sent into the api
    ''')
    def post(self):
        # real todo
        r = request.json
        if not r:
            abort(400, 'Malformed Request')
        ingredients = get_list(r, 'ingredients', 'name')
        tags = get_list(r, 'tags', 'tag')

        top_n = get_top_recipes(ingredients, tags, 20)

        return format_recipe(top_n)


@recipe.route('/user', strict_slashes=False)
class User(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(auth_model)
    @recipe.doc(description='''
        Retrieves the recipes from specific user with authentication token 
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
        Adds recipe into the API
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
        c.executemany(
            'INSERT INTO methods(recipe_id, step, instruction) VALUES (?, ?, ?)', vals)

        # add ingredients in
        ingredients = r['ingredients']
        vals = []
        for i in ingredients:
            vals.append((recipe_id, i['name'], i['quantity']))
        c.executemany(
            'INSERT INTO recipe_has(recipe_id, ingredient_name, quantity) VALUES (?, ?, ?)', vals)

        # add tags in
        tags = r['tags']
        vals = []
        for t in tags:
            vals.append((recipe_id, t['tag']))
        sql = 'INSERT INTO recipe_tag(recipe_id, tag) VALUES (?, ?)'
        c.executemany(sql, vals)

        # TODO Once added in, needs to remove any requests that have been fulfilled. 

        
        # commit to db
        conn.commit()
        c.close()
        conn.close()
        return {
            'message': 'success'
        }


@recipe.route('/edit', strict_slashes=False)
class Edit(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, recipe_complete_model)
    @recipe.doc(description='''
        Edits the recipe given with the information given
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
            abort(406, 'Not Acceptable')

        owner_user, = res
        # checks if owner of recipe is same as person from token
        if owner_user != user:
            abort(400, 'Invalid User')

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
            'INSERT INTO recipe_has(recipe_id, ingredient_name, quantity) VALUES (?, ?, ?, ?)', vals)

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
        return {
            'message': 'success'
        }


@recipe.route('/delete', strict_slashes=False)
class Delete(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(401, 'Unauthorized')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.response(406, 'Not Acceptable')
    @recipe.expect(auth_model, recipe_id_model)
    @recipe.doc(description='''
        Deletes the recipe given with the user id
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
            abort(406, 'Not Acceptable')

        owner_user, = res

        if owner_user != user:
            abort(400, 'Invalid User')

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
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.doc(description='''
        Get Recipe tags
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
        retrieve specific recipe with id
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

@recipe.route('/recommend', strict_slashes=False)
class Recommend(Resource):  
    @recipe.response(200, 'Success', ingredient_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(ingredients_tags_model)
    @recipe.doc(description='''
        return list of ingredients recommendation based on input ingredients list
    ''')
    def post(self):
        r = request.json
        if not r:
            abort(400, 'Malformed Request')
        
        # search for list of recipes based on ingredients + tags
        # get recipe_ids from list of recipes 
        # get list of ingredients associated with the recipe_ids
        # for each recipe, see if there are ingredients to recommend
        # go through all recipes or until 5 recommded is reached
        ingredients = get_list(r, 'ingredients', 'name')
        tags = get_list(r, 'tags', 'tag')
        
        # top 50 is recipe as single tuple, many tuples in list 
        top_50_recipes = get_top_recipes(ingredients, tags, 50)
        recipe_ids = []
        for recipe in top_50_recipes:
            recipe_ids.append(recipe[0])
        
        input_ingredients = {}
        for i in range(len(ingredients)):
            input_ingredients[ingredients[i]] = 1

        ret_ingredients = {"ingredients": []}
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        # kind of scuffed
        for i in recipe_ids:
            sql_str = 'SELECT ingredient_name from recipe_has where recipe_id = {}'.format(i)
            c.execute(sql_str)
            ingredients_t = c.fetchall()
            for ingredient in ingredients_t:
                if ingredient[0] not in input_ingredients:
                    ret_ingredients["ingredients"].append({"name": ingredient[0]})
                if len(ret_ingredients["ingredients"]) >= 5:
                    break
            if len(ret_ingredients["ingredients"]) >= 5:
                break
    
        return ret_ingredients
        



        
    


    