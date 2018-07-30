var app = angular.module("myApp", []);
var socket = io();

// actualizare în timp real prin intermediul socket-ului la adaugarea comentariului
socket.on('update', function (msg) {
    angular.element(document.getElementById('main')).scope().get();
    console.log('Notificare socket primita');
    //$('#clickme').click();
});

// filler pentru a putea folosi linkuri din afara siteului considerate untrusted
app.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// request pentru adăugare de comentariu printr-o cere post 
function postReview(orasid, rating) {
    console.log('Se trimite cerere post...');
    $.post('/addReview', {
        "id": orasid,
        "content": document.getElementById('getcontent').value,
        "userName": document.getElementById('getUserName').value,
        "rating": rating
    }, function (response) {
        console.log('Succes!');
        console.log(response)
    });
    document.getElementById('getcontent').value = ''; // curăță caseta de comentarii
    document.getElementById('getUserName').value = ''; // curăță caseta cu numele
}

// adaugare like în funcţie de id-ul oraşului printr-o cerere post
function like(orasid) {
    console.log("like added");
    $.post('/like', {
        "id": orasid
    }, function (response) {
        console.log(response)
    });
}

// eliminare like în funcţie de id-ul oraşului printr-o cerere post
function dislike(orasid) {
    console.log("dislike");
    $.post('/dislike', {
        "id": orasid
    }, function (response) {
        console.log(response)
    });
}

// controllerul principal
app.controller('section', function ($scope, $http, $window) {
    $scope.selected = 0;
    $scope.isActive = []; // arrayul în care se salvează "starea" butonului de like 

    // memorează variabilele pentru afișarea recenziilor corespunzătoare în modal, apoi îl deschide
    $scope.open = function (index) {
        $scope.selected = index;
        $window.openModal();
    }

    // postarea review-ului în funcţie de oraşul ales şi ratingul dat
    $scope.postreview = function () {
        console.log('Buton apasat');
        $window.postReview($scope.data.orase[$scope.selected]._id, $scope.ratings[0].current);
    }

    // încarcă datele de pe API în scope
    $scope.data = {};
    $scope.get = function (first) {
        console.log('Actualizare API...');
        $http.get("/orase")
            .then(function (response) {
                $scope.data.orase = response.data;
                if (first) { // funcţia care verifică dacă există un set de likes în cookie pentru a-l pune înapoi
                    if ($window.getCookie('numecookie') != '') {
                        for (var i = 0; i < $window.getCookie('numecookie').split(',').length - 1; i++) {
                            if ($window.getCookie('numecookie').split(',')[i] == 'true')
                                $scope.isActive.push(true);
                            else $scope.isActive.push(false);
                        } // iar dacă nu există likes lista va fi toată inţializată cu false 
                    } else $scope.isActive = new Array($scope.data.orase.length).fill(false);
                }
                console.log('Introdus in angular scope - orase');
            });
        $http.get("/mancare")
            .then(function (response) {
                $scope.data.mancare = response.data;
                console.log('Introdus in angular scope - mancare');
            });
        $http.get("/traditii")
            .then(function (response) {
                $scope.data.traditii = response.data;
                console.log('Introdus in angular scope - traditii');
            });
    }
    // încărcă o dată la început
    $scope.get(true);

    // RATING
    $scope.rating = 0;
    $scope.ratings = [{ // definire valori pentru rating
        current: 3,
        max: 5
    }];

    $scope.getSelectedRating = function (rating) { // stocarea în scope a ratingului ales
        console.log(rating);
    }

    // funcţiile care stabilesc minumul si maximul pe care le poate alege utilizatorul
    $scope.setMinrate = function () {
        $scope.ratings = [{
            current: 1,
            max: 5
    }];
    }

    $scope.setMaxrate = function () {
        $scope.ratings = [{
            current: 5,
            max: 5
        }];
    }

    // se stochează numărul de steluţe selectat într-un array pentru a repeta caracterul 
    $scope.getNumber = function (num) {
        num = parseInt(num);
        return new Array(num);
    }

    // schimbarea clasei butonului de like în funcţie de variavila
    $scope.activeButton = function (index) {
        if ($scope.isActive[index]) { // dacă clasa este activă atunci va fi eliminată-schimbată
            $scope.isActive[index] = false;
            console.log($scope.isActive);
        } else {
            $scope.isActive[index] = true;
            console.log($scope.isActive)
        }
        valString = $scope.isActive.toString();
        $window.setCookie('numecookie', valString, 9999);
        if ($scope.isActive[index]) {
            $window.like($scope.data.orase[index]._id);
        } else {
            $window.dislike($scope.data.orase[index]._id);
        }
    }
});
