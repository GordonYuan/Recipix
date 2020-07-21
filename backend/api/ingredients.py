from app import api
from util.models import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3
import json

ingredients = api.namespace('ingredients', description='adding ingredients')

@ingredients.route('/add', strict_slashes=False)
class Add(Resource):
    @ingredients.response(200, 'Success')
    @ingredients.response(400, 'Malformed Request')
    @ingredients.response(403, 'ingredient already exists')
    @ingredients.expect(ingredient_detail_model)
    @ingredients.doc(description='''
    	Add an ingredient into the database !  
    ''')
    def post(self):
        r = request.json
        ### TODO 
        if not r:
            abort(400, 'Malformed Request')
        ing_name = r['name']
        ing_category = r['category']
        
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        sql = 'SELECT name from ingredients where name = ?'
        vals = (ing_name,)
        c.execute(sql, vals)
        existing_ingredient = c.fetchone()
        print(existing_ingredient)
        if existing_ingredient:
            abort(403, 'Ingredient already exists')

        sql = 'INSERT INTO ingredients (name, category) VALUES (?, ?)'
        vals = (ing_name, ing_category)
        c.execute(sql, vals)
        conn.commit()

        c.close()
        conn.close()
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
        
        c.close()
        conn.close()

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
        
        return ret
