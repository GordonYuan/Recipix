import sqlite3,json

conn = sqlite3.connect('recipix.db')
c = conn.cursor()
c.execute('SELECT count(*) from recipes;')
t = c.fetch()
        
print(t)









# data_set = {"key1": [1, 2, 3], "key2": [4, 5, 6]}
# js = json.dumps(data_set)
# print(data_set)
# print(js)

# ret = {"recipes" : []}
# ret["recipes"].append({})
# curr = ret["recipes"][0]
# curr[1] = 2





# print(ret)
# print(json.dumps(ret))

# list1 = [(1,2), (3,4), (5,6)]
# list2 = [(7,8), (9,10), (11,12)]

# for i, t in enumerate(list1):
#     print("outer i = {}, {}".format(i, t))
#     c = t[1]
#     for i, t in enumerate(list2):
#         print("inner i = {}, {}".format(i, t))
#         print(c)