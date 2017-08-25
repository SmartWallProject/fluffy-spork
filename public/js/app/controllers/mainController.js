'use strict';

angular.module('mainApp')
.controller('mainController', ['loginService', '$scope', function(loginService, $scope) {
    $scope.is_logged_in = false;

    loginService.is_logged_in().then(function(res)
    {
        if ("username" in res)
        {
            $scope.is_logged_in = true;
        }
    })
    $scope.login_button = function() {
        loginService.login($scope.login).then(function(res)
        {
            if (res.status == "success")
            {
                $scope.is_logged_in = true;
            }

            // alert(JSON.stringify(res));
        });
    }

    $scope.register_button = function() {
        loginService.register($scope.login).then(function(res)
        {
            if (res.status == "success")
            {
                loginService.login($scope.login).then(function(res)
                {
                    if (res.status == "success")
                    {
                        $scope.is_logged_in = true;
                    }

                });
            }
            else
            {
                alert(res.reason);
            }

        });
    }

}])