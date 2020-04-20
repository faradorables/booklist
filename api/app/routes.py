from flask import render_template, flash, redirect, url_for, request, jsonify, current_app
from werkzeug.urls import url_parse
from app import app, db
from app.models import Book, BookType
import xmlrpc.client, requests, time, ast


@app.route('/users', methods=['POST', 'GET'])
def _api_users():
    if request.method == 'GET':
        apidata = request.form
        app = current_app._get_current_object()
        print(apidata)
        response = {}
        user = Book.query.all()
        if user is not None:
            response['data'] = Book()._list()
            response['status'] = '00'
        else:
            response['status'] = '50'
            response['message'] = 'FAILED'
        return jsonify(response)
    return 'OK'

@app.route('/booktype', methods=['POST', 'GET'])
def _api_booktype():
    if request.method == 'GET':
        apidata = request.form
        app = current_app._get_current_object()
        print(apidata)
        response = {}
        user = BookType.query.all()
        if user is not None:
            response['data'] = BookType()._list()
            response['status'] = '00'
        else:
            response['status'] = '50'
            response['message'] = 'FAILED'
        return jsonify(response)
    return 'OK'


@app.route('/add_book', methods=['POST', 'GET'])
def _api_add_book():
    if request.method == 'POST':
        apidata = request.form
        app = current_app._get_current_object()
        print(apidata)
        response = {}
        user = Book.query.all()
        check_title = Book.query.filter_by(title=apidata['title']).first()
        if check_title is None:
            Book()._insert(apidata['title'],apidata['author'],apidata['date'],apidata['num_page'], apidata['book_type'])
            response['status'] = '00'
            response['messages'] = 'success'
        else:
            response['status'] = '50'
            response['message'] = 'FAILED'
        return jsonify(response)
    return 'OK'

@app.route('/edit_book', methods=['POST', 'GET'])
def _api_edit_book():
    if request.method == 'POST':
        apidata = request.form
        app = current_app._get_current_object()
        print(apidata)
        response = {}
        user = Book.query.filter_by(id=apidata['id']).all()
        if user is not None:
            Book()._update(apidata['id'], apidata['title'],apidata['author'],apidata['num_page'], apidata['book_type'])
            response['status'] = '00'
            response['messages'] = 'success'
        else:
            response['status'] = '50'
            response['message'] = 'Book not found'
        return jsonify(response)
    return 'OK'

@app.route('/delete_book', methods=['POST', 'GET'])
def _api_delete_book():
    if request.method == 'POST':
        apidata = request.form
        app = current_app._get_current_object()
        print(apidata)
        response = {}
        user = Book.query.filter_by(id=apidata['id']).all()
        if user is not None:
            Book()._delete(apidata['id'])
            response['status'] = '00'
            response['messages'] = 'success'
        else:
            response['status'] = '50'
            response['message'] = 'Book not found'
        return jsonify(response)
    return 'OK'

@app.route('/bookdetail', methods=['POST', 'GET'])
def _api_bookdetail():
    if request.method == 'POST':
        apidata = request.form
        app = current_app._get_current_object()
        print(apidata)
        response = {}
        book = Book.query.filter_by(id=apidata['id']).first()
        if book is not None:
            response['bookdata'] = Book()._data(_id=(apidata['id']))
            response['status'] = '00'
        else:
            response['status'] = '50'
            response['message'] = 'Not Found'
        return jsonify(response)
    return 'OK'
