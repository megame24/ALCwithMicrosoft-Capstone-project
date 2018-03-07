angular.module('app').directive('topDirective', [topDirective]);

function topDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/top.html',
        link: function($scope, element, attrs) {
            
            $("#scrollToTop").click(function() {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });
        }
    };
}