from app import api
from util.models import *
from util.helper import *
from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

request = api.namespace('request', description='Requesting for Recipes to be made with ingredients')


@request.route('/request', strict_slashes=False)
class Request(Resource):
    @request.response(200, 'Success')
    @request.response(400, 'Malformed Request')
    @request.expect(auth_model, ingredient_list_model)
    @request.doc(description='''
        Adds requested ingredients into the backend

    ''')
    def post(self):
        user = authenticate(request)
        r = request.json
        ingredients = [] 
        for x in r['ingredients']:
            ingredients.append(x['name'])
            print(x)

        return {
            'message' : 'Success'
        }

@request.route('/find', strict_slashes=False)
class Find(Resource):
    @request.response(200, 'Success')
    @request.response(400, 'Malformed Request')
    @request.response(403, 'Invalid Authentication Token')
    @request.expect(auth_model, request_id_model)
    @request.doc(description='''
        Finds the ingredients that are requested of a specific id, and returns them. 
    ''')
    def post(self):
        r = request.json
        # get user associated with token
        user = authenticate(request)

        return {
            'message': 'success'
        }


@request.route('/get', strict_slashes=False)
class All(Resource):
    @request.response(200, 'Success')
    @request.response(400, 'Malformed Request')
    @request.response(403, 'Invalid Authentication Token')
    @request.expect(auth_model)
    @request.doc(description='''
        Returns all requests
    ''')
    def post(self):
        

        return {
            'message': 'success'
        }