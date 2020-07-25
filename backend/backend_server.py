#!/usr/bin/env python3

#
# DO NOT CHANGE THIS FILE
#

import os, sys, sqlite3

def main(host='127.0.0.1', port=None):
    try:
        run(host, port)
    except ImportError as e:
        print('ERROR:', e, file=sys.stderr)
        if sys.version_info < (3,6):
            print('python needs to be 3.6')
        else:
            print('A module required is missing.', file=sys.stderr)
        sys.exit(1)

def run(host, port):
    from app import app
    import api.auth
    import api.recipe
    import api.ingredients
    import api.request
    import api.recommend
    app.run(debug=True, host=host, port=port)

# def create_db():
#     database_dir = os.path.join('database')
#     database_file = os.path.join(database_dir, 'recipix.db')
#     if not os.path.exists(database_dir):
#         print('[DATABASE] Creating new database directory.', database_dir)
#         os.mkdir(database_dir)
#     conn = sqlite3.connect(database_file)
#     c = conn.cursor()
#     build_sql = open('database/build.sql')
#     sql_build = build_sql.read()
#     c.executescript(sql_build)

#     conn.commit()
#     c.close()
#     conn.close()



def usage():
    print('Usage: {} [-g]'.format(sys.argv[0]))
    # print('Specify -g flag to rebuild database when starting server')

if __name__ == "__main__":
    if len(sys.argv) == 1:
        main()
    # elif len(sys.argv) == 2 and sys.argv[1] == '-g':
    #     create_db()
    #     main()
    else:
        usage()