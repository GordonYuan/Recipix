from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3

def authenticate(req):
    # get the token
    token = req.headers.get('Authorization')
    if not token:
        abort(403, 'Invalid Authentication Token')  

    r = request.json    
    conn = sqlite3.connect('database/recipix.db')

    c = conn.cursor()   
    # find user
    c.execute('SELECT username from users where hash = ?', (token,))
    res = c.fetchone()
    
    if not res: 
        abort(403, 'Invalid Authentication Token')  
    user, = res

    return user