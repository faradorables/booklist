from app import app, db
from app.models import Book
import os
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

# app = create_app(os.getenv('FLASK_CONFIG') or 'default')
# manager = Manager(app)
# migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Book': Book, 'BookType': BookType}

# manager.add_command("shell", Shell(make_context=make_shell_context))
# manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
    manager.run()
