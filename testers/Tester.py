class Tester:
    def __init__(self, function):
        self.function = function

    def run(self):
        tests = self.get_tests()
        return self.run_test_list(tests.keys(), tests.values())

    def run_test(self, parameters, expected_result):
        res = self.function(*parameters) == expected_result
        if not res:
            return "For parameters {} input wasn't as expected".format(parameters)
        else:
            return None

    def run_test_list(self, parameters_list, expected_results):
        reses = [self.run_test(parameter, expected_result) for parameter, expected_result in (parameters_list, expected_results)]
        return [res for res in reses if res is not None]