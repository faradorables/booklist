import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:root@localhost:3306/book_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
