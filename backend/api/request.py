from app import api
from util.models import *
from util.helper import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

req = api.namespace('req', description='Requesting for Recipes to be made with ingredients')


@req.route('/request', strict_slashes=False)
class Request(Resource):
    @req.response(200, 'Success')
    @req.response(400, 'Malformed Request')
    @req.expect(auth_model, ingredient_list_model)
    @req.doc(description='''
        Adds requested ingredients into the backend
    ''')
    def post(self):
        r = request.json
        if not r:
            abort(400, 'Malformed Request')
        # user = authenticate(request)
        
        ingredients = [] 
        for i in r['ingredients']:
            ingredients.append(i['name'])

        print(ingredients)

        # connect to db
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        vals = (len(ingredients),)

        # check if request exist already in database    
        sql = 'select request_id from request_has where ' 
        for i in ingredients:
            sql += 'ingredient_name = "{}" or '.format(i)
        sql = sql[:-3]
        sql += 'group by request_id having count(*) = ?;'

        c.execute(sql, vals)

        res = c.fetchone()
        if res:
            # if it exists, increment 
            request_id, = res

            sql = 'UPDATE requests set count = count + 1 where id = ?'
            vals = (request_id,)

            c.execute(sql, vals)
            conn.commit()
        else: 
            # add request in
            sql = 'INSERT INTO requests(count) VALUES (1)'
            c.execute(sql)
            conn.commit()

            # get request_id
            sql = 'select id from Requests order by id desc limit 1'
            c.execute(sql)
            request_id, = c.fetchone()

            # insert the ingredients that the requests has into the table. 
            sql = 'INSERT INTO request_has(request_id, ingredient_name) VALUES (?, ?)'
            vals = []
            for ing in ingredients:
                vals.append((request_id, ing))

            c.executemany(sql, vals)
            conn.commit()

        return {
            'message' : 'Success'
        }

@req.route('/find', strict_slashes=False)
class Find(Resource):
    @req.response(200, 'Success', ingredient_list_model)
    @req.response(400, 'Malformed Request')
    @req.response(403, 'Invalid Authentication Token')
    @req.expect(auth_model, request_id_model)
    @req.doc(description='''
        Finds the ingredients that are requested of a specific id, and returns them. 
    ''')
    def post(self):
        r = request.json
        # get user associated with token
        user = authenticate(request)
        print(r)
        return {
            'message': 'success'
        }


@req.route('/get', strict_slashes=False)
class All(Resource):
    @req.response(200, 'Success')
    @req.response(400, 'Malformed Request')
    @req.response(403, 'Invalid Authentication Token')
    @req.expect(auth_model)
    @req.doc(description='''
        Returns all requests
    ''')
    def post(self):
        

        return {
            'message': 'success'
        }
