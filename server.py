from enum import Enum
from flask import Flask, session, redirect, url_for, request, send_from_directory
import json

from Items import *
from user import User
from functools import wraps

app = Flask(__name__, static_url_path='/public/')
app.secret_key = 'A0Zz91j/3yX l~Xbq!jmN]LWX/,?RT'


class Errors(Enum):
    WRONG_USERNAME_PASSWORD = 1


@app.route('/public/<path:path>')
def send_js(path):
    return send_from_directory('public', path)


def jsonf(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        return json.dumps(f(*args, **kwargs), indent=4)

    return decorated


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = User()
        if not user.logged_in():
            return redirect("/")

        return f(*args, **kwargs)

    return decorated


@app.route('/')
def index():
    return open("public/main.html").read()


@app.route('/api/login', methods=['POST', "GET"])
@jsonf
def login():
    session['username'] = "plesh"

    if request.method == 'POST' and "username" in request.form and "password" in request.form:
        username = request.form['username']
        password = request.form['password']

        if not User.verify_login(username, password):
            return {"status": "error", "reason": "wrong_username_password"}
        else:
            session['username'] = username
            return {"status": "success"}


@app.route('/api/register', methods=['POST'])
@jsonf
def register():
    if request.method == 'POST' and "username" in request.form and "password" in request.form:
        username = request.form['username']
        password = request.form['password']

        if not User.username_exists(username):
            return {"status": "error", "reason": "Username already exists"}
        else:
            User.add_user(username, password)
            session['username'] = username
            return {"status": "success"}



@app.route("/api/user/info")
@requires_auth
@jsonf
def user_info():
    user = User()
    return user.serialize()


@app.route("/api/job/", defaults={"job_id": ""})
@app.route("/api/job/<job_id>")
@jsonf
def get_jobs(job_id):
    if job_id is "":
        # all jobs
        return [job.serialize() for job in Job.get_all_jobs()]
    elif job_id == "self":
        user = User()
        return [job.serialize() for job in Job.get_by_user_id(user.user_id)]
    else:
        return Job.get_by_id(job_id).serialize()


@app.route("/api/job/<job_id>/tasks")
@jsonf
def get_tasks_by_job_id(job_id):
    return [task.serialize() for task in Task.get_by_job_id(job_id)]


@app.route("/api/tasks/<task_id>/<action>")
@requires_auth
@jsonf
def task_handler(task_id, action):
    if action == "status":
        return [status.serialize() for status in Status.get_user_status_by_task_id(task_id)]
    elif action == "examples":
        return [example.serialize() for example in Example.get_examples_by_task_id(task_id)]
    elif action == "send":
        return Task.get_by_id(task_id).run(request.form["code"])


@app.route("/api/store/list")
@jsonf
def store_list():
    return [item.serialize() for item in Store.get_all_store_items()]



@app.route('/logout')
def logout():
    User.log_out()
    return redirect("/")
