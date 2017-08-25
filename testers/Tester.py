class Tester:
    def __init__(self, function):
        self.function = function

    def run(self):
        tests = self.get_tests()
        return self.run_test_list(tests.keys(), tests.values())

    def run_test(self, parameters, expected_result):
        func_res = self.function(*parameters)
        res = func_res == expected_result
        if not res:
            return "For parameters {} input wasn't as expected (expected '{}' but got '{}')".format(parameters, expected_result, func_res)
        else:
            return None

    def run_test_list(self, parameters_list, expected_results):
        reses = [self.run_test(parameter, expected_result) for parameter, expected_result in zip(parameters_list, expected_results)]
        return [res for res in reses if res is not None]

    @staticmethod
    def run_code(code):
        with open("tmp_file.py", "w") as h:
            h.write(code)

        import tmp_file
        return tmp_file