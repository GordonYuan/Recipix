from app import api
from util.models import *
from flask_restplus import Resource, fields
from flask import request
import sqlite3
import json

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
            if y not in ing:
                ing[y] = []
            ing[y].append(x)
        print(ing)
        
        for key in ing:
            cat = {
                "category": key, 
                "ingredients": []
            }
            for ingredient in ing[key]:
                ingred = {
                    "name": ingredient
                }
                cat['ingredients'].append(ingred)
            ret['categories'].append(cat)
        
        return json.dumps(ret)