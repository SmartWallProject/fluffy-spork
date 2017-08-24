class Pages:
    def generate(self, name, parameters):
        if name == "login_page":
            return self.login_page(parameters['error'])

    def login_page(self, msg):
        return "Error: {}. <br />Please login :)".format(msg)
