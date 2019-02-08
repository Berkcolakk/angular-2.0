var myApp = angular.module("myApp", []).controller("myCtrl", function ($scope, $http, $log) {
    var successCallBack = function (response) {
        $scope.resultt = response.data;
    }
    var ErrorCallBack = function (response) {
        $scope.eror = response.data;
    }
    $http({
        method: "GET",
        url: "/User/GetList"
    }).then(successCallBack, ErrorCallBack);

    $scope.GetID = "";
    $scope.UpdateUser = function (ID) {
        $http.post("/User/GetUserID", { ID: ID })
            .success(function (result) {
                $scope.GetID = result;
            })
            .error(function (result) {
                console.log(result);
            })
    }

    $scope.InsertData = function (users) {
        $http.post("/User/UpdateUser", { user: users })
            .success(function (result) {
                $scope.resultt = result;
            })
            .error(function (result) {
                console.log(result);
            })
    }

    $scope.DeleteUser = function (ID) {
        $http.post("/User/DeleteUser", { ID: ID })
            .success(function (result) {
                $scope.resultt = result;
            })
            .error(function (result) {
                console.log(result);
            })
    }
});

