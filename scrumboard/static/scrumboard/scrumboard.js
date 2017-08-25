// IIFE (Immediately Invoked Function Expression) - JavaScript function that runs as soon as it is defined
(function () {

    // strict mode throws more errors and disables dodgy code
    'use strict';

    // create an angular module & controller
    angular.module('scrumboard.demo', [])
        .controller('ScrumboardController', ['$scope', ScrumboardController]);

    function ScrumboardController($scope) {

        $scope.add = function (list, title) {
            var card = {
                title: title
            };

            list.cards.push(card);
        };

        $scope.data = [
            {
                name: 'Django demo',
                cards: [
                    {
                        title: 'Create Models'
                    },
                    {
                        title: 'Create View'
                    },
                    {
                        title: 'Migrate Database'
                    }
                ]
            },
            {
                name: 'Angular demo',
                cards: [
                    {
                        title: 'Write HTML'
                    },
                    {
                        title: 'Write JavaScript'
                    }
                ]
            }
        ]
    }

}());