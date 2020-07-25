from app import api
from util.models import *
from flask_restplus import Resource, fields, abort
from flask import request
import secrets
import hashlib
import sqlite3

auth = api.namespace('auth', description='Login and Signup')


@auth.route('/login', strict_slashes=False)
class Login(Resource):
    @auth.response(200, 'Success', token_model)
    @auth.response(400, 'Malformed Request')
    @auth.response(403, 'Invalid Username/Password')
    @auth.expect(login_model)
    @auth.doc(description='''
    	Authenticate an account in the database
    	Returns an authentication token which should be passed into subsequent calls
    	Authentication token verifies the user
    ''')
    def post(self):
        j = request.json
        username = j['username']
        password = j['password']

        if not username or not password:
            abort(400, 'Malformed Request')

        # check if user is in database
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        user_exist_sql = 'SELECT username, salt, hash FROM users where username = "{}"'.format(username)
        c.execute(user_exist_sql)
        res = c.fetchall()
        if not res:
            abort(403, 'Invalid Username/Password')
        [(username, salt, stored_hash)] = res

        salted_password = password + salt
        gen_hash = hashlib.sha256(salted_password.encode()).hexdigest()

        if stored_hash != gen_hash:
            abort(403, 'Invalid Username/Password')

        c.close()
        conn.close()

        return {
            'token': stored_hash
        }


@auth.route('/register', strict_slashes=False)
class Register(Resource):
    @auth.response(200, 'Success', token_model)
    @auth.response(400, 'Malformed Request')
    @auth.response(409, 'Username Taken')
    @api.expect(register_model)
    @auth.doc(description='''
        Create a new user account in the database
        Returns an authentication token which should be passed into subsequent calls
    	Authentication token is used to verify the user
    ''')
    def post(self):
        j = request.json
        username = j['username']
        password = j['password']

        if not username or not password:
            abort(400, 'Malformed Request')

        # check if user is in database
        conn = sqlite3.connect('database/recipix.db')
        c = conn.cursor()
        user_exist_sql = 'SELECT username FROM users where username = "{}"'.format(username)
        c.execute(user_exist_sql)
        user_exists = c.fetchall()
        if user_exists:
            abort(409, 'Username Taken, Registered user already exists')

        salt = secrets.token_hex(4)
        salted_password = password + salt

        hash = hashlib.sha256(salted_password.encode()).hexdigest()
        sql = 'INSERT INTO users (username, salt, hash) VALUES ("{}", "{}", "{}")'.format(username, salt, hash)
        c.execute(sql)
        conn.commit()

        c.close()
        conn.close()
        
        return {
            'token': hash
        }