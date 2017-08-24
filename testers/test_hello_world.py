from testers.Tester import Tester


class HelloWorldTester(Tester):
    def __init__(self):
        super().__init__(my_function)

    def get_tests(self):
        return {tuple(): "Hello World!"}


def run_test(code):
    eval(code)
    return HelloWorldTester().run()