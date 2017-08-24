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
        return len(query("SELECT * FROM users WHERE username= ? AND password= ?", [username, password])) == 1

    @staticmethod
    def username_exists(username):
        return len(query("SELECT * FROM users WHERE username= ?", [username])) > 0

    @staticmethod
    def add_user(username, password):
        query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password])

    def serialize(self):
        return {"username": self.username}
