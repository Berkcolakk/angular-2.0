var myApp = angular.module("myApp", []).controller("myCtrl", function ($scope, $http, $log) {
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.users = {};
            $scope.users.Name = $scope.Name;
            $scope.users.LastName = $scope.LastName;
            $scope.users.UserName = $scope.UserName;
            $scope.users.Email = $scope.Email;
            $http({
                method: "post",
                url: "/User/Add",
                datatype: "json",
                data: JSON.stringify($scope.users)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Name = "";
                $scope.LastName = "";
                $scope.UserName = "";
                $scope.Email = "";
            })
        } else {
            $scope.users = {};
            $scope.users.Name = $scope.Name;
            $scope.users.LastName = $scope.LastName;
            $scope.users.UserName = $scope.UserName;
            $scope.users.Email = $scope.Email;
            $scope.users.ID = document.getElementById("ID").value;
            $http({
                method: "post",
                url: "/User/Update",
                datatype: "json",
                data: JSON.stringify($scope.users)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Name = "";
                $scope.LastName = "";
                $scope.UserName = "";
                $scope.Email = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
});