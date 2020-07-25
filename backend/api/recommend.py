from app import api
from util.models import *
from util.helper import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

recommend = api.namespace('recommend', description='ingredient recommendation')

@recommend.route('/get', strict_slashes=False)
class Recommend(Resource):  
    @recommend.response(200, 'Success', ingredient_list_model)
    @recommend.response(400, 'Malformed Request')
    @recommend.expect(ingredients_tags_model)
    @recommend.doc(description='''
        takes in a list of ingredients, 
        returns a list of ingredients that do not match the ingredients passed in
        The returned list of ingredients are recommendations for narrowing down recipes that the user would like
    ''')
    def post(self):
        #TODO current returns duplicate ingredients, have to send back unique ingredients
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

        sql_str = 'SELECT distinct ingredient_name from recipe_has where '
        for i in recipe_ids:
            sql_str += 'recipe_id = "{}" or '.format(i)
        sql_str = sql_str[:-3]
        sql_str += 'limit 5'
        c.execute(sql_str)
        ingredients_t = c.fetchall()
        for ingredient in ingredients_t:
            ret_ingredients["ingredients"].append({"name": ingredient[0]})
    
        return ret_ingredients
        



        
    


    