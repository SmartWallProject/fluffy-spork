import json
import os

from flask import session


class User:
    def __init__(self):
        self.username = session.get("username", None)
        if self.username is not None:
            self.data = json.load(os.path.join("user_data", self.username, "data.json"))

    def logged_in(self):
        return self.username is not None

    @staticmethod
    def log_out(self):
        session.pop('username', None)

    @staticmethod
    def verify_login(username, password):
        return os.path.exists(os.path.join("user_data", username, "password.txt")) and open(
            os.path.join("user_data", username, "password.txt")).read() == password
