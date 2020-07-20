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
    @recipe.doc(description='''
        Retrieves the latest 20 freshest and latest recipes
    ''')
    def get(self):
        ### TODO
        latest_recipes = ''
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        c.execute('SELECT * from recipes;')
        recipe_t = c.fetchall()
        
        ret = {"recipes" : []}
        for i, t in enumerate(recipe_t):
            c.execute('SELECT tag from Recipe_Tag where recipe_id = {}'.format(t[0]))
            tag_t = c.fetchall()
            c.execute('SELECT ingredient_name, amount, units from Recipe_Has where recipe_id = {}'.format(t[0]))
            ingredient_t = c.fetchall()
            c.execute('SELECT step, instruction from Methods where recipe_id = {}'.format(t[0]))
            method_t = c.fetchall()

            ret["recipes"].append({})
            curr = ret["recipes"][i]
            curr["recipe_id"] = t[0]
            curr["recipe_creator"] = t[1]
            curr["recipe_name"] = t[2]
            curr["servings"] = t[3]
            curr["description"] = t[4]
            curr["image"] = t[5]

            curr["tags"] = []
            curr["ingredients"] = []
            curr["method"] = []

            for i, t in enumerate(tag_t):
                curr["tags"].append({})
                curr_tag = curr["tags"][i]
                curr_tag["tag"] = t[0]    

            for i, t in enumerate(ingredient_t):
                curr["ingredients"].append({})
                curr_ingred = curr["ingredients"][i]
                curr_ingred["name"] = t[0]
                curr_ingred["amount"] = t[1]
                curr_ingred["units"] = t[2]
            
            for i, t in enumerate(method_t):
                curr["method"].append({})
                curr_method = curr["method"][i]
                curr_method["step_number"] = t[0]
                curr_method["instruction"] = t[1]
        
        c.close()
        conn.close()
        return ret

@recipe.route('/search', strict_slashes=False)
class Search(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(ingredient_list_model)
    @recipe.doc(description='''
        Retrieves the latest 20 freshest and latest recipes
        that contain the ingredients sent into the api
    ''')
    def post(self):
        ### TODO
        # ingredient = request.json
        # process ingredients into a list 
        # find top 20 recipes that match the highest number of ingredients
        #return the top 20 recipes 

        # extract ingredients into list
        e = request.json
        if len(e) == 0:
            abort(400, 'Malformed Request')
        ingredients = []
        for x in e['ingredients']:
            ingredients.append(x['name'])
        print(ingredients)
        
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        # form the sql string dynamically based on 
        sql_str = ('SELECT id, username, name, servings, description, thumbnail, '
                   'count(*) from recipe_has h join recipes r on id = recipe_id where ')
        for i in ingredients:
            sql_str += 'ingredient_name = "{}" or '.format(i)
        sql_str = sql_str[:-3]
        sql_str += 'group by recipe_id order by count(*) desc'

        c.execute(sql_str)
        recipe_t = c.fetchall()

        # the below code is repeated in get all recipes
        # basically, anytime we need to return recipes, we use this block of code
        # can generalise into function
        ret = {"recipes" : []}
        for i, t in enumerate(recipe_t):
            c.execute('SELECT tag from Recipe_Tag where recipe_id = {}'.format(t[0]))
            tag_t = c.fetchall()
            c.execute('SELECT ingredient_name, amount, units from Recipe_Has where recipe_id = {}'.format(t[0]))
            ingredient_t = c.fetchall()
            c.execute('SELECT step, instruction from Methods where recipe_id = {}'.format(t[0]))
            method_t = c.fetchall()

            ret["recipes"].append({})
            curr = ret["recipes"][i]
            curr["recipe_id"] = t[0]
            curr["recipe_creator"] = t[1]
            curr["recipe_name"] = t[2]
            curr["servings"] = t[3]
            curr["description"] = t[4]
            curr["image"] = t[5]

            curr["tags"] = []
            curr["ingredients"] = []
            curr["method"] = []

            for i, t in enumerate(tag_t):
                curr["tags"].append({})
                curr_tag = curr["tags"][i]
                curr_tag["tag"] = t[0]      

            for i, t in enumerate(ingredient_t):
                curr["ingredients"].append({})
                curr_ingred = curr["ingredients"][i]
                curr_ingred["name"] = t[0]
                curr_ingred["amount"] = t[1]
                curr_ingred["units"] = t[2]
            
            for i, t in enumerate(method_t):
                curr["method"].append({})
                curr_method = curr["method"][i]
                curr_method["step_number"] = t[0]
                curr_method["instruction"] = t[1]
        
        c.close()
        conn.close()

        return ret

@recipe.route('/user', strict_slashes=False)
class User(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(auth_model)
    @recipe.doc(description='''
        Retrieves the latest 20 freshest and latest recipes
        from specific user with authentication token 
    ''')
    def get(self):
        ### TODO
        latest_recipes = ''
        return {
            'recipes': latest_recipes
        }

@recipe.route('/request', strict_slashes=False)
class Request(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, ingredient_list_model)
    @recipe.doc(description='''
        Requests for recipe to be made with the ingredients sent
        into the backend
    ''')
    def post(self):
        ### TODO add the request into backend
        return {
            'message' : 'success'
        }

@recipe.route('/recipe', strict_slashes=False)
class Recipe(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, recipe_add_model)
    @recipe.doc(description='''
        Adds recipe into the API
    ''')
    def post(self):
        ### TODO add the request into backend
        # token = request.headers.get('Authorization')

        # if not token:
        #     abort(403, 'Invalid Authentication Token')

        # r = request.json

        # conn = sqlite3.connect('database/recipix.db')
        # c = conn.cursor()

        # # find user
        # c.execute('SELECT username from users where hash = "{}"'.format(token))
        # res = c.fetchone()
        # if not res: 
        #     abort(403, 'Invalid Authentication Token')

        # user, = res
        r = request.json
        user = authenticate(request)
        name = r['recipe_name']
        image = r['image']
        servings = r['servings']
        description = r['description']

        #connect to db
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        #add recipe in 
        sql = 'INSERT INTO recipes (username, name, servings, description, thumbnail) VALUES ("{}", "{}", "{}", "{}", "{}")'.format(user, name, servings, description, image)
        c.execute(sql)
        conn.commit()

        # get recipe_id 
        c.execute('select id from recipes where username = "{}" and name = "{}" order by id desc limit 1'.format(user, name))
        recipe_id, = c.fetchone()

        # add steps in
        method = r['method']
        vals = []
        for s in method:
            vals.append((recipe_id, s['step_number'], s['instruction']))
        c.executemany('INSERT INTO methods(recipe_id, step, instruction) VALUES (?, ?, ?)', vals)  

        # add ingredients in 
        ingredients = r['ingredients']
        vals = []
        for i in ingredients:
            vals.append((recipe_id, i['name'], i['amount'], i['units']))
        c.executemany('INSERT INTO recipe_has(recipe_id, ingredient_name, amount, units) VALUES (?, ?, ?, ?)', vals)

        # add tags in 
        tags = r['tags']
        vals = []
        for t in tags:
            vals.append((recipe_id, t['tag']))
        sql = 'INSERT INTO recipe_tag(recipe_id, tag) VALUES (?, ?)'
        c.executemany(sql, vals)

        # commit to db
        conn.commit()
        
        return {
            'message' : 'success'
        }

    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, recipe_complete_model)
    @recipe.doc(description='''
        Edits the recipe given with the information given
    ''')
    def put(self):
        ### TODO add the request into backend
        

        return {
            'message' : 'success'
        }

    @recipe.response(200, 'Success')
    @recipe.response(401, 'Unauthrorized')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.response(406, 'Not Acceptable')
    @recipe.expect(auth_model, recipe_id_model)
    @recipe.doc(description='''
        Deletes the recipe given with the user id
    ''')
    def delete(self):
        ### TODO add the request into backend

        user = authenticate(request)
        print(user)
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
        print(owner_user)
        if owner_user != user:
            abort(400, 'Invalid User')


        # allowing cascade deletes
        c.execute('PRAGMA foreign_keys = ON;')
        # delete from recipes table
        sql = 'DELETE FROM Recipes WHERE id=?'

        c.execute(sql, (recipe_id,))
        conn.commit()
        return {
            'message' : 'success'
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
        ### TODO add the request into backend
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        c.execute('SELECT * from tag;')
        t = c.fetchall()
        d = {"tags": []}
        for x in t:
            d['tags'].append({
                'tag' : x
            })
        return d


