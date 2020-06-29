from app import api
from util.models import *
from flask_restplus import Resource, fields
from flask import request

ingredients = api.namespace('ingredients', description='adding ingredients')

@ingredients.route('/add', strict_slashes=False)
class Add(Resource):
    @ingredients.response(200, 'Success')
    @ingredients.response(400, 'Malformed Request')
    @ingredients.response(403, 'Forbidden Request')
    @ingredients.expect(ingredient_model)
    @ingredients.doc(description='''
    	Add an ingredient into the database !  
    ''')
    def post(self):
        ingredient = request.json
        ### TODO 
        if not ingredients:
            abort(400, 'Malformed Request')
        return {
            'message': 'success'
        }

@ingredients.route('/all', strict_slashes=False)
class All(Resource):
    @ingredients.response(200, 'Success', ingredient_list_model)
    @ingredients.doc(description='''
    	get list of all ingredients from the database
    ''')
    def post(self):
        ### TODO 

        # ingredients = database.getIngredients()
        ingredients = [
            {
                "name": "cheese",
                "category": "dairy"
            },
            {
                "name": "ham",
                "category": "meat"
            },
            {
                "name": "egg",
                "category": "poultry"
            },
            {
                "name": "ice Cream",
                "category": "Dairy"
            }
        ]
        return ingredients