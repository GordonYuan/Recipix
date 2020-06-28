from app import api
from util.models import *
from flask_restplus import Resource, fields
from flask import request

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
        return {
            'recipes': latest_recipes
        }

@recipe.route('/search', strict_slashes=False)
class Search(Resource):
    @recipe.response(200, 'Success', recipe_list_model)
    @recipe.response(400, 'Malformed Request')
    @recipe.expect(ingredient_list_model)
    @recipe.doc(description='''
        Retrieves the latest 20 freshest and latest recipes
        that contain the ingredients sent into the api
    ''')
    def get(self):
        ### TODO
        latest_recipes = ''
        return {
            'recipes': latest_recipes
        }

@recipe.route('/User', strict_slashes=False)
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
    def get(self):
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