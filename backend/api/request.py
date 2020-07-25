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
        Request takes in a list of ingredient_names. 
        Once passed into this endpoint, a 'request' will be added into the database. 
        This request will contain all of the ingredients passed into it 
        The endpoitn is for users to request recipes to be made with this particular set of ingredients.
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
        sql = 'select r.request_id from request_has r where ' 
        for i in ingredients:
            sql += 'ingredient_name = "{}" or '.format(i)
        sql = sql[:-3]
        sql += 'group by r.request_id having (count(*) = (select count(*) from request_has r1 where r1.request_id = r.request_id) and count(*) = ?)'

        print(sql)
        c.execute(sql, vals)

        res = c.fetchone()  
        print(res)
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
            sql = 'SELECT id from Requests order by id desc limit 1'
            c.execute(sql)
            request_id, = c.fetchone()

            # insert the ingredients that the requests has into the table. 
            sql = 'INSERT INTO request_has(request_id, ingredient_name) VALUES (?, ?)'
            vals = []
            for ing in ingredients:
                vals.append((request_id, ing))

            c.executemany(sql, vals)
            conn.commit()

        c.close()
        conn.close()

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
        find takes in a request_id which corresponds to a particular request.
        This endpoint will return the corresponding ingredients list back.
        This is used for finding out what ingredients are in a particular request.
    ''')
    def post(self):
        r = request.json
        if not (r):
            abort(400, 'Malformed Request')
        # get user associated with token
        # user = authenticate(request)

        request_id = r['request_id']

        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        sql = 'SELECT * FROM request_has WHERE request_id = ?'
        vals = (request_id,)

        c.execute(sql,vals)
        res = c.fetchall()

        c.close()
        conn.close()

        ret = {'ingredients': []}
        for i in res:
            _, ingredient = i
            print(i)
            ret['ingredients'].append({
                'name': ingredient
            })

        return ret


@req.route('/all', strict_slashes=False)
class All(Resource):
    @req.response(200, 'Success', request_list_model)
    @req.response(400, 'Malformed Request')
    @req.response(403, 'Invalid Authentication Token')
    @req.doc(description='''
        All returns the unfulfilled requests that are currently in the database
        It will return the id of the request, the amount of times its been requested, as well as the ingredients in each request
    ''')
    def get(self):
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()

        sql = 'SELECT * FROM requests'
        c.execute(sql)
        res = c.fetchall()

        ret = {'requests': []}
        for i in res:
            request_id, times_requested = i
            sql = 'SELECT ingredient_name FROM request_has where request_id = ?'
            vals = (request_id,)
            c.execute(sql, vals)
            ingred_res = c.fetchall()
            
            ingredients = []
            for j in ingred_res:
                ingredient, = j
                print()
                ingredients.append({
                    'name' : ingredient
                })

            request = {
                'request_id' : request_id,
                'times_requested' : times_requested,
                'ingredients' : ingredients
            }
            
            ret['requests'].append(request)

        c.close()
        conn.close()

        return ret
