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
               $scope.destList = $scope.list;

               $scope.update = function () {
                    return $http.put(
                        url,
                        $scope.card
                    );
                };

                function removeCardFromList(card, list) {
                    var cards = list.cards;
                    cards.splice(
                        cards.indexOf(card),
                        1
                    );
                }

                $scope.delete = function () {
                    $http.delete(url).then(
                        function(){
                            removeCardFromList($scope.card, $scope.list);
                        }
                    );
                };

                // only send update 500ms after changes stop. Could be higher?
                $scope.modelOptions = {
                    // debounce: 500
                    updateOn: 'blur'
                };


                $scope.move = function () {
                    if ($scope.destList === undefined) {
                        return;
                    }
                    $scope.card.list = $scope.destList.id;
                    $scope.update().then(function () {
                        {
                            removeCardFromList($scope.card, $scope.list);
                            $scope.destList.cards.push($scope.card);
                        }
                    });
                }
            }]
        };
    }
})();
