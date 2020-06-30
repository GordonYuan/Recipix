from app import api
from util.models import *
from flask_restplus import Resource, fields
from flask import request
import sqlite3
import json

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
        #generate hard coded recipes 
        return {
            "recipes": [
                {
                    "recipe_id": 0,
                    "recipeCreator": "hotmario258",
                    "recipeName": "eggs and Cheese ham",
                    "image": "base64String",
                    "tag": {
                        "meal_type": "entree"
                    },
                    "ingredients": [
                        {
                            "name": "cheese",
                            "amount": "500",
                            "units": "grams"
                        },
                        {
                            "name": "eggs",
                            "amount": "2",
                            "units": "whole"
                        },
                        {
                            "name": "ham",
                            "amount": "200",
                            "units": "grams"
                        },
                    ],
                    "servings": 1,
                    "method": [
                        {
                            "step_number": 1,
                            "instruction": "Crack the eggs and place into a bowl"
                        },
                        {
                            "step_number": 2,
                            "instruction": "Cut the ham into strips and place into egg mixture"
                        },
                        {
                            "step_number": 3,
                            "instruction": "Put the cheese into egg and ham mixture"
                        },
                        {
                            "step_number": 4,
                            "instruction": "Fry it "
                        },
                    ],
                    "description": "Eggs and cheese ham is a deluxe meal served for kings"
                },
                {
                    "recipe_id": 1,
                    "recipeCreator": "bigDave",
                    "recipeName": "Ice cream",
                    "image": "base64String",
                    "tag": {
                        "meal_type": "Dessert"
                    },
                    "ingredients": [
                        {
                            "name": "Ice Cream",
                            "amount": "500",
                            "units": "grams"
                        }
                    ],
                    "servings": 2,
                    "method": [
                        {
                            "step_number": 1,
                            "instruction": "Scoop ice cream from container and place into a bowl"
                        }
                    ],
                    "description": "i Scream u Scream "
                },
                
            ]
        }

@recipe.route('/search', strict_slashes=False)
class Search(Resource):
    @recipe.response(200, 'Success', category_ingredient_model)
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

        latest_recipes = ''
        return {
            "recipes": [
                {
                    "recipe_id": 0,
                    "recipeCreator": "hotmario258",
                    "recipeName": "eggs and Cheese ham",
                    "image": "base64String",
                    "tag": {
                        "meal_type": "entree"
                    },
                    "ingredients": [
                        {
                            "name": "cheese",
                            "amount": "500",
                            "units": "grams"
                        },
                        {
                            "name": "eggs",
                            "amount": "2",
                            "units": "whole"
                        },
                        {
                            "name": "ham",
                            "amount": "200",
                            "units": "grams"
                        },
                    ],
                    "servings": 1,
                    "method": [
                        {
                            "step_number": 1,
                            "instruction": "Crack the eggs and place into a bowl"
                        },
                        {
                            "step_number": 2,
                            "instruction": "Cut the ham into strips and place into egg mixture"
                        },
                        {
                            "step_number": 3,
                            "instruction": "Put the cheese into egg and ham mixture"
                        },
                        {
                            "step_number": 4,
                            "instruction": "Fry it "
                        },
                    ],
                    "description": "Eggs and cheese ham is a deluxe meal served for kings"
                },
                {
                    "recipe_id": 1,
                    "recipeCreator": "bigDave",
                    "recipeName": "Ice cream",
                    "image": "base64String",
                    "tag": {
                        "meal_type": "Dessert"
                    },
                    "ingredients": [
                        {
                            "name": "Ice Cream",
                            "amount": "500",
                            "units": "grams"
                        }
                    ],
                    "servings": 2,
                    "method": [
                        {
                            "step_number": 1,
                            "instruction": "Scoop ice cream from container and place into a bowl"
                        }
                    ],
                    "description": "i Scream u Scream "
                },
                
            ]
        }

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

@recipe.route('/add', strict_slashes=False)
class Add(Resource):
    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, recipe_complete_model)
    @recipe.doc(description='''
        Adds recipe into the API
    ''')
    def post(self):
        ### TODO add the request into backend
        return {
            'message' : 'success'
        }

    @recipe.response(200, 'Success')
    @recipe.response(400, 'Malformed Request')
    @recipe.response(403, 'Invalid Authentication Token')
    @recipe.expect(auth_model, recipe_complete_model)
    @recipe.doc(description='''
        Updates the recipe given with the information given
    ''')
    def put(self):
        ### TODO add the request into backend
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
        return json.dumps(d)

