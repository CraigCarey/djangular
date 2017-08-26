// IIFE (Immediately Invoked Function Expression) - JavaScript function that runs as soon as it is defined
(function () {

    // strict mode throws more errors and disables dodgy code
    'use strict';

    // create an angular module & controller
    angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController', [ '$scope', '$http', ScrumboardController ]);

    function ScrumboardController($scope, $http) {

        $scope.add = function (list, title) {

            var card = {
                list: list.id,
                title: title
            };

            $http.post('/scrumboard/cards/', card)
                // first function is called when promise returns successfully
                .then(function(response){
                    list.cards.push(response.data);
                },
                // second function is only called in the case of an error
                function(){
                    alert('Could not create card');
                }
            );
        };

        $scope.logout = function () {
            $http.get('/auth_api/logout/')
                .then(function () {
                   $location.url('/login')
                });
        };

        $scope.data = [];

        // get is asynchronous, it returns immediately a promise that we can call then on
        $http.get('/scrumboard/lists/').then(function(response){
            $scope.data = response.data;
        });
    }

}());
