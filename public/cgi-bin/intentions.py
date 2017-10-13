#!/usr/bin/python
import cgi, cgitb, os, MySQLdb, json

cgitb.enable() #for debugging

print "content-type: application-json\n";

def get(db):
    cur = db.cursor()
    cur.execute("SELECT * FROM intentions")

    print json.dump(cur.fetchall())

def post(db):
    print json.dump({'result': 'ok'});

def delete(db):
    print json.dump({'result': 'ok'});

def with_db(f):
    db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                         user="youmo3_edmachub",         # your username
                         passwd="eve4NxcUaE]N",  # your password
                         db="youmo3_edmachub")        # name of the data base
    try:
        f(db);
    finally:
        db.close()

methods = {'GET': lambda db: get(db),
           'POST': lambda db: post(db),
           'DELETE': lambda(db): delete(db) }

with_db(methods[os.environ["REQUEST_METHOD"]]);

