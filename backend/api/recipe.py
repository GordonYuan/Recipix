from app import api
from util.models import *
from flask_restplus import Resource, fields
from flask import request

recipe = api.namespace('recipe', description='Recipe information')

@recipe.route('/search', strict_slashes=False)
class Search(Resource):
    @recipe.response(200, 'Success', token_model)
    @recipe.response(400, 'Missing Username/Password')
    @recipe.response(403, 'Invalid Username/Password')
    
    @recipe.expect(login_model)
    @recipe.doc(description='''
    	Given a list of ingredients, returns 20 most recent recipes 
    ''')
    def post(self):
        return {
            'token': 1
        }

@recipe.route('/all', strict_slashes=False)
class all(Resource):
    @recipe.response(200, 'Success', token_model)
    @recipe.response(400, 'Missing Username/Password')
    @recipe.response(403, 'Invalid Username/Password')
    
    @recipe.expect(login_model)
    @recipe.doc(description='''
        Retrieves the latest 20 recipes 
    ''')
    def get(self):
        query = ''

        latest_recipes = 

        return {
            'recipes': latest_recipes
        }
