(function () {
    'use strict';

    angular.module('scrumboard.demo')
        .directive('scrumboardCard', CardDirective);

    function CardDirective() {
        return {
            // where our template is being hosted
            templateUrl: 'static/scrumboard/card.html',
            // E for Element, meaning we can use this as an HTML element
            restrict: 'E'
        };
    }
})();