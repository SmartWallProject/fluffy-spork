from enum import Enum

from flask import Flask, session, redirect, url_for, request

from user import User

app = Flask(__name__)
user = User()


class Errors(Enum):
    WRONG_USERNAME_PASSWORD = 1


def login_handler():
    return redirect(url_for("login"))


@app.route('/')
def index():
    if not user.logged_in():
        return login_handler()


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

    return Pages.generate("login_page", {"error": error})


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))


# set the secret key.  keep this really secret:
app.secret_key = 'A0Zz91j/3yX l~Xbq!jmN]LWX/,?RT'
