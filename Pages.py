from Job import Job
from Progress import Progress

class Pages:
    def generate(self, name, parameters):
        if self.hasattr(name):
            return self.getattr(name)(parameters)

    def login_page(self, parameters):
        error_msg = parameters.get("error_msg", "No error...")
        return "Error: {}. <br />Please login :)".format(error_msg)

    def dashboard(self, parameters):
        user = parameters['user']
        challenges_progress = user.challenges_progress

        output = "User tasks: <br />"
        for progress in challenges_progress:
            challenge = progress.get_challenge()
            output += "Challenge '{}', with {} tasks done (add more task)<br />".format(challenge.name,
                                                                                        len(progress.tasks_done))
            for task in challenge.tasks():
                task_progress = progress.task_info(task)
                output += "Part '{}', task: {}".format(task.name, task_progress.status)

                # rest_of_the_tasks = [task for task in Tasks.get_all() if all([progress.get_task() != task for progress in challenges_progress])]
