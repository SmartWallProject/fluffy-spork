import json
import os

from flask import session
from Progress import Progress
from Database import query


class User:
    def __init__(self):
        self.username = session.get("username", None)
        self.tasks_progress = None
        self.data = None
        if self.username is not None:
            self.data = query("SELECT * FROM users WHERE username = ?", [self.username], one=True)
            self.user_id = self.data['user_id']
            # self.tasks_progress = [Progress(task_progress) for task_progress in self.data['progress']]

    def logged_in(self):
        return self.username is not None

    @staticmethod
    def log_out():
        session.pop('username', None)

    @staticmethod
    def verify_login(username, password):
        return os.path.exists(os.path.join("user_data", username, "password.txt")) and open(
            os.path.join("user_data", username, "password.txt")).read() == password

    def serialize(self):
        return {"username": self.username}
