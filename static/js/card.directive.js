(function () {
    'use strict';

    angular.module('scrumboard.demo')
        .directive('scrumboardCard', CardDirective);

    function CardDirective() {
        return {
            templateUrl: 'static/html/card.html', // where our template is being hosted
            restrict: 'E', // E for Element, meaning we can use this as an HTML element
            controller: ['$scope', '$http', function ($scope, $http) {

                var url = '/scrumboard/cards/' + $scope.card.id + '/';

                $scope.update = function () {
                    $http.put(
                        url,
                        $scope.card
                    );
                };

                $scope.delete = function () {
                    $http.delete(url).then (
                        function () {
                            var cards = $scope.list.cards;
                            cards.splice(
                                cards.indexOf($scope.card),
                                1
                            );
                        }
                    );
                };

                // only send update 500ms after changes stop. Could be higher?
                $scope.modelOptions = {
                    // debounce: 500
                    updateOn: 'blur'
                };
            }]
        };
    }
})();
