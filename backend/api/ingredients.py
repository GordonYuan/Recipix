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
    @ingredients.response(200, 'Success', categories_model)
    @ingredients.doc(description='''
    	get list of all ingredients from the database
    ''')
    def get(self):
        ### TODO 
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        c.execute('SELECT * from ingredients;')
        t = c.fetchall()
        ret = {"categories": []}
        ing = {}
        for x,y in t:
            print(x + y)
            ing[y].append(x)
        # return json.dumps(d)
        # ingredients = database.getIngredients()
        ingredients = [
            {
                "category": "dairy",
                "ingredients": [
                    {
                        "name" : "mozzarella cheese"
                    }, 
                    {
                        "name" : "milk"
                    }, 
                    {
                        "name" : "cheddar cheese"
                    }
                ]
            },
            {
                "category": "vegetables",
                "ingredients": [
                    {
                        "name" : "spinach"
                    }, 
                    {
                        "name" : "cabbage"
                    }, 
                    {
                        "name" : "broccoli"
                    }
                ]
                
            }   
        ]
        return ingredients