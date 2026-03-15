from random import choice as rc
from faker import Faker
from app import app
from models import db, User, Task, Assignment
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
fake = Faker()

with app.app_context():
    # Clear existing data
    db.session.query(Assignment).delete()
    db.session.query(Task).delete()
    db.session.query(User).delete()
    db.session.commit()

    # Create users
    users = []
    for i in range(5):
        user = User(
            username=fake.unique.user_name(),
            email=fake.unique.email(),
            password=bcrypt.generate_password_hash("password").decode('utf-8')
        )
        users.append(user)
        db.session.add(user)
    db.session.commit()

    # Create tasks
    tasks = []
    priorities = ["Low", "Medium", "High"]
    for i in range(10):
        task = Task(
            title=fake.sentence(nb_words=4)[:50],
            description=fake.paragraph(nb_sentences=2)[:200],
            priority=rc(priorities),
            completed=fake.boolean(),
            user_id=rc(users).id
        )
        tasks.append(task)
        db.session.add(task)
    db.session.commit()

    # Create assignments
    for i in range(15):
        assignment = Assignment(
            user_id=rc(users).id,
            task_id=rc(tasks).id,
            completed=fake.boolean(),
            notes=fake.sentence()[:100] if fake.boolean() else ""
        )
        db.session.add(assignment)
    db.session.commit()

    print("Seed data created!")
    print(f"Users: {len(users)}")
    print(f"Tasks: {len(tasks)}")
    print(f"Assignments: 15")