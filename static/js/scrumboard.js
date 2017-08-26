(function () {

    // strict mode throws more errors and disables dodgy code
    'use strict';

    // create an angular module & controller
    angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController',
            ['$scope', '$http', 'Login', ScrumboardController]);

    function ScrumboardController($scope, $http, Login) {
        $scope.add = function (list, title) {
            var card = {
                list: list.id,
                title: title
            };

            $http.post('/scrumboard/cards/', card)
                // first function is called when promise returns successfully
                .then(function (response) {
                        list.cards.push(response.data);
                    },
                    // second function is only called in the case of an error
                    function () {
                        alert('Could not create card');
                    }
                );

        };

        Login.redirectIfNotLoggedIn();
        $scope.data = [];
        $scope.logout = Login.logout;
        $scope.sortBy = 'story_points';
        $scope.reverse = true;
        $scope.showFilters = false;

        // get is asynchronous, it returns immediately a promise that we can call then on
        $http.get('/scrumboard/lists/').then(
            function (response) {
                $scope.data = response.data;
            }
        );
    }

}());