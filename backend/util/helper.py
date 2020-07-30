from flask_restplus import Resource, fields, abort
from flask import request
import sqlite3


def authenticate(req):
    # get the token
    token = req.headers.get('Authorization')
    print(req.headers.get('Authorization'))
    # print(req.headers)
    # print(token)
    if not token:
        abort(403, 'Invalid Authentication Token')

    r = request.json
    conn = sqlite3.connect('database/recipix.db')

    c = conn.cursor()
    # find user
    c.execute('SELECT username from users where hash = ?', (token,))
    res = c.fetchone()
    print(res)
    if not res:
        abort(403, 'Invalid Authentication Token')
    user, = res

    return user

def format_recipe(recipe_t):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    ret = {"recipes": []}
    for i, t in enumerate(recipe_t):
        c.execute(
            'SELECT tag from Recipe_Tag where recipe_id = {}'.format(t[0]))
        tag_t = c.fetchall()
        c.execute(
            'SELECT ingredient_name, quantity from Recipe_Has where recipe_id = {}'.format(t[0]))
        ingredient_t = c.fetchall()
        c.execute(
            'SELECT step, instruction from Methods where recipe_id = {}'.format(t[0]))
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

# get n top recipes from ingredients and tags lists
def get_top_recipes(ingredients, tags, n):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()

    # form the sql string dynamically based on
    sql_str = ('SELECT id, username, name, servings, description, thumbnail, '
                'count(*) from recipe_has h join recipes r on id = recipe_id where ')
    for i in ingredients:
        sql_str += 'ingredient_name = "{}" or '.format(i)
    sql_str = sql_str[:-3]
    sql_str += 'group by recipe_id order by count(*) desc'

    c.execute(sql_str)
    recipe_t = c.fetchall()

    # get top 20 recipes that match tags
    top_n = []

    sql_tag = '('
    for i in tags:
        sql_tag += 'tag = "{}" or '.format(i)
    sql_tag = sql_tag[:-4]
    sql_tag += ')'
    print("Sql_tag = " + sql_tag)

    # print(tags)

    for i in recipe_t:
        if len(top_n) == n:
            break
        if not tags:
            top_n.append(i)
            continue
        sql_str2 = 'SELECT * from recipe_tag where recipe_id = {} and '.format(i[0])
        sql_str2 += sql_tag
        # print(sql_str2)
        c.execute(sql_str2)
        if (c.fetchall()):
            top_n.append(i)

    c.close()
    conn.close()

    return top_n

# get ingredients and tags into a two lists from the json request r
def get_list(r, key, key2):
    res_list = []
    for x in r[key]:
        if x[key2] == '':
            continue
        res_list.append(x[key2])
    return res_list

def update_requests(ingredients):
    # Once added in, needs to remove any requests that have been fulfilled. 
    # checking if ingredients used in recipe meets any of the requests
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()

    sql = 'select r.request_id from request_has r where ' 
    for i in ingredients:
        sql += 'ingredient_name = "{}" or '.format(i['name'])
    sql = sql[:-3]
    sql += 'group by r.request_id \
            having (count(*) = \
            (select count(*) \
            from request_has r1 \
            where r1.request_id = r.request_id) \
            and count(*) = ?)'

    vals = (len(ingredients),)
    c.execute(sql, vals)
    res = c.fetchone()  

    # if there exists a request, remove it, as the new recipe has been added, fulfilling the request
    if res:
        request_id, = res

        sql = 'delete from requests where id = ?'
        vals = (request_id,)
        c.execute(sql, vals)

        sql = 'delete from request_has where request_id = ?'
        vals = (request_id,)
        c.execute(sql, vals)

        conn.commit()

def delete_from_table(table, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    sql = 'DELETE FROM {} where recipe_id = ?'.format(table)
    c.execute(sql, (recipe_id,))
    conn.commit()
    c.close()
    conn.close()

def add_into_methods(methods, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    vals = []
    for m in methods:
        vals.append((recipe_id, m['step_number'], m['instruction']))

    sql = 'INSERT INTO methods(recipe_id, step, instruction) VALUES (?, ?, ?)'
    c.executemany(sql, vals)
    conn.commit()
    c.close()
    conn.close()

def add_into_recipe_has(ingredients, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    vals = []
    for i in ingredients:
        vals.append((recipe_id, i['name'], i['quantity']))
    
    sql = 'INSERT INTO recipe_has(recipe_id, ingredient_name, quantity) VALUES (?, ?, ?)'
    c.executemany(sql, vals)
    conn.commit()
    c.close()
    conn.close()

def add_into_recipe_tag(tags, recipe_id):
    conn = sqlite3.connect('database/recipix.db')
    c = conn.cursor()
    vals = []
    for t in tags:
        vals.append((recipe_id, t['tag']))
    sql = 'INSERT INTO recipe_tag(recipe_id, tag) VALUES (?, ?)'
    c.executemany(sql, vals)
    conn.commit()
    c.close()
    conn.close()

def check_owner(cursor, user, recipe_id):
    cursor.execute('SELECT username from Recipes where id = ?', (recipe_id,))
    res = cursor.fetchone()

    # if it doesnt return anything, then recipe doesnt exist, cannot delete it.
    if not res:
        abort(406, 'Recipe does not exist')

    owner_user, = res

    if owner_user != user:
        abort(401, 'Invalid User')