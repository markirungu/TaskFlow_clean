# app.py
from config import create_app, db, bcrypt

app = create_app()

# Models must be imported AFTER app is created so they register correctly
from models import User, Task, Assignment
from routes import register_routes

register_routes(app)

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)