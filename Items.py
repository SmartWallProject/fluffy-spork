from Database import query
from testers import Tester
from user import User
from importlib import import_module
import os


class Job:
    def __init__(self, props):
        self.job_id = props['job_id']
        self.name = props['job_name']
        self.points = props['job_points']
        self.tags = list(filter(lambda f: f != "", (map(str.strip, props['tags'].split(",")))))
        self.description = props['description'].replace("\n", "<br>")
        self.text_before_tasks = props['text_before_tasks'].replace("\n", "<br>")

    def serialize(self):
        return {"job_id": self.job_id, "name": self.name, "points": self.points, "tags": self.tags, "description": self.description,
                "text_before_tasks": self.text_before_tasks}

    @staticmethod
    def get_by_id(job_id):
        props = query("SELECT * FROM jobs WHERE job_id = ?", [job_id], one=True)
        return Job(props)

    @staticmethod
    def get_all_jobs():
        all_props = query("SELECT * FROM jobs")
        return map(Job, all_props)

    @staticmethod
    def get_by_user_id(user_id):
        all_props = query("SELECT j.* FROM jobs as j INNER JOIN user_jobs as uj ON (j.job_id = uj.job_id) WHERE uj.user_id=?", [user_id])
        return [Job(prop) for prop in all_props]


class Task:
    def __init__(self, props):
        self.task_id = props['task_id']
        self.name = props['task_name']
        self.description = props['description'].replace("\n", "<br>")
        self.default_code = props['default_code']
        self.hints = props['hints']
        self.after_complete = props['after_complete'].replace("\n", "<br>")
        self.tester_file = props['tester_file']

    def serialize(self):
        return {"task_id": self.task_id, "name": self.name, "description": self.description, "default_code": self.default_code,
                "hints": self.hints, "examples": [ex.serialize() for ex in Example.get_examples_by_task_id(self.task_id)]}

    def run(self, code):
        print("Running " + self.tester_file)

        if self.tester_file == "test_hello_world.py":
            from testers import test_hello_world as tester
        else:
            assert False

        results = tester.run_test(code)

        if len(results) == 0:
            return self.after_complete, 200
        else:
            return "Error: <br />" + "<br />".join(results), 400


    @staticmethod
    def get_by_job_id(job_id):
        props = query("SELECT * FROM tasks WHERE job_id = ?", [job_id])
        return map(Task, props)

    @staticmethod
    def get_by_id(task_id):
        props = query("SELECT * FROM tasks WHERE task_id = ?", [task_id], one=True)
        return Task(props)


class Status:
    def __init__(self, props):
        self.status = props['status']
        self.last_code_entered = props['last_code_entered']
        self.last_result_message_shown = props['last_result_message_shown']

    def serialize(self):
        return {"status": self.status, "last_code_entered" : self.last_code_entered, "last_result_message_shown": self.last_result_message_shown}

    @staticmethod
    def get_user_status_by_task_id(task_id):
        user = User()
        props = query("SELECT * FROM user_status WHERE task_id = ? AND user_id = ?", [task_id, user.user_id], one=True)
        if props is None:
            return False

        return Status(props)


class Example:
    def __init__(self, props):
        self.request = props['request']
        self.response = props['response']

    def serialize(self):
        return {"request": self.request, "response": self.response}

    @staticmethod
    def get_examples_by_task_id(task_id):
        props = query("SELECT * FROM examples WHERE task_id = ?", [task_id])
        return map(Example, props)


class Store:
    def __init__(self, props):
        self.item_name = props['item_name']
        self.item_description = props['item_description']
        self.points_cost = props['points_cost']
        self.image_path = "public/store_images/" + props['image_path'] + ".png"

    def serialize(self):
        return {"item_name": self.item_name, "item_description": self.item_description, "points_cost": self.points_cost, "image_path": self.image_path}

    @staticmethod
    def get_all_store_items():
        props = query("SELECT * FROM store_items")
        return map(Store, props)
