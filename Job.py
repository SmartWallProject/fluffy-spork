import json
import os


class Job:
    def __init__(self, job_name):
        pass

    def get_name(self):
        pass

    def get_summary(self):
        pass

    def get_tasks(self):
        pass


class Task:
    def __init__(self, job, folder_name):
        self.job = job
        self.folder_name = folder_name
        props = json.load(os.path.join("jobs", job.get_folder_name(), folder_name, "props.json"))
        self.name = props.get("name", "No Name")
        self.before_code = props.get("before_code", "No Before Code")
        self.default_code = props.get("default_code", "No Default Code")
        self.after_code = props.get("after_code", "No After Code")
        self.after_complete = props.get("after_complete", "No After Complete")

    def get_name(self):
        return self.name

    def get_before_code(self):
        return self.before_code

    def get_default_code(self):
        return self.default_code

    def run(self, code):
        pass

    def get_after_code(self):
        return self.after_code

    def after_complete(self):
        return self.after_complete
