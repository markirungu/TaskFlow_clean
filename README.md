TaskFlow

Task management application for teams to create tasks, assign them to multiple users, and track progress.

## Tech Stack
- **Backend**: Flask, SQLAlchemy, Flask-Bcrypt
- **Frontend**: React, React Router, Formik, Yup
- **Database**: SQLite

## Setup

### Backend
```bash
# Clone the repository to your desired location, then
cd server
pipenv install
pipenv shell
export FLASK_APP=app.py
flask db init
flask db migrate -m "initial migration"
flask db upgrade
python seed.py
python app.py
```

### Frontend
```bash
# Open a new terminal then navigate to the location where you stored the project folder
cd client
npm install
npm start
```
The app should start up on your local host.
