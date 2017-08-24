from flask import session
from Database import query

from Items import *

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

    def take_job(self, job_id):
        user_jobs = Job.get_by_user_id(self.user_id)
        if any([job_id == job.job_id for job in user_jobs]):
            return False
        job = Job.get_by_id(job_id)

        if job is None:
            return False

        query("INSERT INTO user_jobs (user_id, job_id) VALUES (?, ?)", [self.user_id, job_id])

    def drop_job(self, job_id):
        query("DELETE FROM user_jobs WHERE user_id = ? AND job_id = ?", [self.user_id, job_id])
