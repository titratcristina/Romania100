//directivele paginii
app.directive('navbar', function () {
    return {
        restrict: 'E', // crearea unui element-tag
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

app.directive('starRating', function () {
    return {
        restrict: 'A', // crearea unui atribu introdus în tag
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' + // caracterul steluţă
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({ //memorarea în array numarul de steluţe selectate
                        filled: i < scope.ratingValue
                    });
                }
            };
            //
            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
