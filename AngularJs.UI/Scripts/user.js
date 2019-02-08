$(document).ready(function () {
    $("#txtSearch").focus();
});
(function (angular) {

    var app = angular.module("app", []);
    app.controller("Controller", ["$scope", "$http", function Controller($scope, $http) {
        $scope.isShow = false;
        $scope.Show = function () {
            if ($scope.isShow) {
                $("#btnAdded").show();
                $("#btnSave").val('Kaydet');
                $scope.NewSite = "";

                $scope.isShow = false;
                $("#btnAdd").val("Yeni Kayıt Ekle ")
            }
            else {
                $scope.isShow = true;
                $("#btnAdd").val("İptal ");
            }
            $scope.$apply();
            $("#txtSite").focus();
        }
        $scope.AddData = function () {
            $scope.Sites.push({ Name: $scope.NewSite });
            $scope.NewSite = "";
            $("#txtSite").focus();
        }
        $scope.SaveData = function () {
            if ($("#btnSave").val() == "Kaydet") {
                var data = [];
                angular.forEach($scope.Sites, function (site) {
                    if (site.ID == null) {
                        data.push(site);
                    }
                });
                console.log("New Sites data=" + JSON.stringify(data));

                $http.post("/Dashboard/SaveSites", data).success(function (siteList) {
                    $scope.Sites = siteList;
                }).error(function (ex) {
                    console.log(ex);
                });
            }
            else {
                var data = { Name: $scope.NewSite, ID: $scope.NewID };
                $http.post("/Dashboard/UpdateSite", data).success(function (siteList) {
                    $scope.Sites = siteList;
                    $scope.isShow = false;
                    $("#btnAdd").val("Yeni Kayıt Ekle ")
                }).error(function (ex) {
                    console.log(ex);
                });
            }
        }
        $scope.selectAll = function () {
            if ($scope.isSelectAll) {
                angular.forEach($scope.Sites, function (site) {
                    site.IsDeleted = true;
                });
            }
            else {
                angular.forEach($scope.Sites, function (site) {
                    site.IsDeleted = false;
                });
            }
        }
        $scope.DelSites = function () {
            var deletedSites = [];
            var list = [];
            angular.forEach($scope.Sites, function (site) {
                if (site.IsDeleted) {
                    if (site.ID != null) {
                        deletedSites.push(site.ID);
                    }
                }
                else {
                    list.push(site);
                }
            });
            if (deletedSites.length > 0) {
                $http.post("/Dashboard/DelSites", deletedSites).success(function () {
                    console.log("Kayıtlar Başarı ile silindi!")
                }).error(function (ex) {
                    console.log(ex);
                });
            }
            $scope.Sites = [];
            angular.forEach(list, function (item) {
                $scope.Sites.push(item);
            });
        }

        $scope.Update = function (siteID, siteName) {
            $scope.isShow = true;
            $("#btnAdd").val("İptal ");
            $scope.isShow = true;
            $("#btnAdded").hide();
            $("#btnSave").val('Güncelle');
            $scope.NewSite = siteName;
            $scope.NewID = siteID;
        }

        $http.get("http://localhost:54729/api/User/GetAllUsers").success(function (data) {
            console.log("GetSites data=" + JSON.stringify(data));
            $scope.Sites = data;
        }).error(function (ex) {
            console.log(ex);
        });
    }]);
    app.directive("editElement", function () {
        return {
            restrict: "E",
            transclude: true,
            url: '/Dashboard',
            templateUrl: "/Dashboard/NewRecord"
        };
    });
})(angular);