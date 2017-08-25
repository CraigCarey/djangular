// IIFE (Immediately Invoked Function Expression) - JavaScript function that runs as soon as it is defined
(function () {

    // strict mode throws more errors and disables dodgy code
    'use strict';

    // create an angular module & controller
    angular.module('scrumboard.demo', [])
        .controller('ScrumboardController', [ '$scope', '$http', ScrumboardController ]);

    function ScrumboardController($scope, $http) {

        $scope.add = function (list, title) {
            var card = {
                title: title
            };

            list.cards.push(card);
        };

        $scope.data = [];

        // get is asynchronous, it returns immediately a promise that we can call then on
        $http.get('/scrumboard/lists').then(function(response){
            $scope.data = response.data;
        });
    }

}());