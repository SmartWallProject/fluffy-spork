from enum import Enum
from flask import Flask, session, redirect, url_for, request, send_from_directory
import json

from Job import Job
from user import User
from Pages import Pages
from functools import wraps

app = Flask(__name__, static_url_path='/public')
app.secret_key = 'A0Zz91j/3yX l~Xbq!jmN]LWX/,?RT'
template = Pages()


class Errors(Enum):
    WRONG_USERNAME_PASSWORD = 1


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = User()
        if not user.logged_in():
            return redirect(url_for("login"))

        return f(*args, **kwargs)

    return decorated


@app.route('/')
def index():
    return open("public/main.html").read()


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST' and "username" in request.form and "password" in request.form:
        username = request.form['username']
        password = request.form['password']

        if not User.verify_login(username, password):
            error = Errors.WRONG_USERNAME_PASSWORD
        else:
            session['username'] = username
            return redirect("/")

    return template.generate("login_page", {"error": error})


@app.route('/dashboard')
@requires_auth
def dashboard():
    user = User()
    template.generate("dashboard", {"user": user})


@app.route("/user/info")
@requires_auth
def user_info():
    user = User()
    return json.dumps(user.serialize())


@app.route("/jobs/", defaults={"job_id": ""})
@app.route("/jobs/<job_id>")
def get_jobs(job_id):
    if job_id is "":
        return json.dumps([job.serialize() for job in Job.get_all_jobs()])

    return json.dumps(Job.get_by_id(job_id).serialize())

@app.route("/getAllJobTasks/<job_id>")
@requires_auth
def get_all_job_tasks():
    pass

@app.route('/logout')
def logout():
    User.log_out()
    return redirect(url_for('/'))
