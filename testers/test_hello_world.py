from testers.Tester import Tester


class HelloWorldTester(Tester):
    def __init__(self, func):
        super().__init__(func)

    def get_tests(self):
        return {tuple(): "Hello World!"}


def run_test(code):
    code = Tester.run_code(code)
    return HelloWorldTester(code.my_function).run()