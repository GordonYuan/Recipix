from app import api
from util.models import *
from flask_restplus import Resource, fields
from flask import request

auth = api.namespace('auth', description='Login and Signup')

@auth.route('/login', strict_slashes=False)
class Login(Resource):
    @auth.response(200, 'Success', token_model)
    @auth.response(400, 'Missing Username/Password')
    @auth.response(403, 'Invalid Username/Password')
    @auth.expect(login_model)
    @auth.doc(description='''
    	Authenticate an account in the database
    	Returns an authentication token which should be passed into subsequent calls
    	Authentication token verifies the user
    ''')
    def post(self):
        return {
            'token': 1
        }

@auth.route('/signup', strict_slashes=False)
class Signup(Resource):
    @auth.response(200, 'Success',token_model)
    @auth.response(400, 'Malformed Request')
    @auth.response(409, 'Username Taken')
    @api.expect(signup_model)
    @auth.doc(description='''
        Create a new user accoutn in the database
        Returns an authentication token which should be passed into subsequent calls
    	Authentication token verifies the user
    ''')
    def post(self):
        return {
            'token': 1
        }
