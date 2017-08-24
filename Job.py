from Database import query


class Job:
    def __init__(self, props):
        self.job_id = props['job_id']
        self.name = props['job_name']
        self.points = props['job_points']
        self.tags = list(filter(lambda f: f != "", (map(str.strip, props['tags'].split(",")))))
        self.description = props['description']
        self.text_before_tasks = props['text_before_tasks']

    def serialize(self):
        return {"job_id": self.job_id, "name": self.name, "points": self.points, "tags": self.tags, "description": self.description,
                "text_before_tasks": self.text_before_tasks}

    @staticmethod
    def get_by_id(job_id):
        props = query("SELECT * FROM jobs WHERE job_id = ?", [job_id], one=True)
        return props

    @staticmethod
    def get_all_jobs():
        all_props = query("SELECT * FROM jobs")
        return [Job(prop) for prop in all_props]



class Task:
    def __init__(self, task_id):
        props = query("SELECT * FROM tasks WHERE task_id = ?", [task_id], one=True)
        self.name = props['name']
        self.description = props['description']
        self.default_code = props['default_code']
        self.hints = props['hints']
        self.after_complete = props['after_complete']

    def serialize(self):
        return {"name": self.name, "description": self.description, "default_code": self.default_code,
                "hints": self.hints}

    def run(self, code):
        pass
