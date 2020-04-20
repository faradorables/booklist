from datetime import datetime
from app import db

class BookType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    books = db.relationship('Book', backref='role', lazy='dynamic')

    def __repr__(self):
        return '<BookType {}>'.format(self.name)

    def _list(self):
        response = []
        type = BookType.query.all()
        for t in type:
            response.append({
                'id': t.id,
                'name': t.name,
            })
        return response


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128))
    author = db.Column(db.String(64))
    date = db.Column(db.Date())
    num_page = db.Column(db.Integer)
    book_type = db.Column(db.Integer, db.ForeignKey('book_type.id'))

    def __repr__(self):
        return '<Book {}>'.format(self.author)

    def _list(self):
        response = []
        booklist = Book.query.all()
        for b in booklist:
            book_type_name = BookType.query.filter_by(id=b.book_type).first()
            response.append({
                'id': b.id,
                'title': b.title,
                'author': b.author,
                'date': b.date,
                'num_page': b.num_page,
                'book_type': book_type_name.name,
            })
        return response

    def _insert(self, _title, _author, _date,_num_page, _book_type):
        _book = Book()
        _book.title=_title
        _book.author=_author
        _book.date=_date
        _book.num_page=_num_page
        _book.book_type=_book_type
        db.session.add(_book)
        db.session.commit()
        response = Book()._data(_book.id)
        return response

    def _update(self, _id, _title, _author, _num_page, _book_type):
        _book = Book.query.filter_by(id=_id).first()
        _book.title=_title
        _book.author=_author
        _book.num_page=_num_page
        _book.book_type=_book_type
        db.session.add(_book)
        db.session.commit()
        response = Book()._data(_book.id)
        return response

    def _delete(self, _id):
        _book = Book.query.filter_by(id=_id).first()
        db.session.delete(_book)
        db.session.commit()
        response = []
        return response

    def _data(self, _id): #untuk membaca data user kebutuhan transaksi
        response = {}
        book = Book.query.filter_by(id=_id).first()
        response['id'] = _id
        response['title'] = book.title
        response['author'] = book.author
        response['date'] = book.date
        response['num_page'] = book.num_page
        response['book_type'] = book.book_type
        # response['referral'] = user.referral
        return response
