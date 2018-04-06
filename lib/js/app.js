var app = angular.module("myApp", []);

//directivele paginii
app.directive('navbar', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/navbar.html'
    }
});

app.directive('intro', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/intro.html'
    }
});

app.directive('orase', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/orase.html'
    }
});

app.directive('modal', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/modal.html'
    }
});

app.directive('map', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/map.html'
    }
});

app.directive('food', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/food.html'
    }
});

app.directive('history', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/history.html'
    }
});

app.directive('traditii', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/traditii.html'
    }
});

app.directive('footsy', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/footer.html'
    }
});


app.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.controller('section', function ($scope, $http, $window) {
    $scope.selected = 0;
    $scope.open = function (index) {
        $scope.selected = index;
        $window.openModal();
    }
    $http.get("/lib/package.json")
        .then(function (response) {
            $scope.data = response.data;
        });
});

app.controller('classCtrl', function ($scope) {
    $scope.isActive = false;
    $scope.activeButton = function () {
        $scope.isActive = !$scope.isActive;
    }
});
