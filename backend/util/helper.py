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

def format_recipe(recipe_t):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    ret = {"recipes" : []}
    for i, t in enumerate(recipe_t):
        c.execute('SELECT tag from Recipe_Tag where recipe_id = {}'.format(t[0]))
        tag_t = c.fetchall()
        c.execute('SELECT ingredient_name, quantity from Recipe_Has where recipe_id = {}'.format(t[0]))
        ingredient_t = c.fetchall()
        c.execute('SELECT step, instruction from Methods where recipe_id = {}'.format(t[0]))
        method_t = c.fetchall()

        ret["recipes"].append({})
        curr = ret["recipes"][i]
        curr["recipe_id"] = t[0]
        curr["recipe_creator"] = t[1]
        curr["recipe_name"] = t[2]
        curr["servings"] = t[3]
        curr["description"] = t[4]
        curr["image"] = t[5]

        curr["tags"] = []
        curr["ingredients"] = []
        curr["method"] = []

        for i, t in enumerate(tag_t):
            curr["tags"].append({})
            curr_tag = curr["tags"][i]
            curr_tag["tag"] = t[0]    

        for i, t in enumerate(ingredient_t):
            curr["ingredients"].append({})
            curr_ingred = curr["ingredients"][i]
            curr_ingred["name"] = t[0]
            curr_ingred["quantity"] = t[1]
        
        for i, t in enumerate(method_t):
            curr["method"].append({})
            curr_method = curr["method"][i]
            curr_method["step_number"] = t[0]
            curr_method["instruction"] = t[1]
    c.close()
    conn.close()
    return ret