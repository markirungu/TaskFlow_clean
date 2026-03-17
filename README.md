TaskFlow

Task management application for teams to create tasks, assign them to multiple users, and track progress.

## Tech Stack
- **Backend**: Flask, SQLAlchemy, Flask-Bcrypt
- **Frontend**: React, React Router, Formik, Yup
- **Database**: SQLite

## Setup

### Backend
```bash
# Clone the repository at your desired location, then run the commands below one by one in your terminal
cd server
pipenv install
pipenv shell
export FLASK_APP=app.py
flask db migrate -m "initial migration"
flask db upgrade
python seed.py
python app.py
```

### Frontend
```bash
# Open a new terminal and navigate to the project. Run the commands below one by one.
cd client
npm install
npm start
```
The app should start up on your local host.

## Live link: https://taskflow-clean.onrender.com

# Explnations.
The repository only has one persons commits, this is because of too many merge conflicts in our 

previous project repository. This is the clean version, thus the name TaskFlow_clean. We decided 

since the code already worked and we all had discussed and planned work in between us that it was

best to just start a new one that wont be a problem. 

This information had all been relayed to Mr. Julius.
