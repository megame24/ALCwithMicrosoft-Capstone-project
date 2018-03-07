angular.module('app').directive('navDirective', ['cartService', nav]);

function nav(cartService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/nav.html',
        link: function($scope, element, attrs) {
            
            var url = 'http://localhost:8080';
            function linkActive() {
                if(location.href == `${url}/`) {
                    $('.home').addClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').removeClass('active');
                    $('.container').removeClass('shop-container');
                } else if(location.href == `${url}/cart`) {
                    $('.home').removeClass('active');
                    $('#cart').addClass('active');
                    $('#shopping').removeClass('active');
                    $('.container').removeClass('shop-container');
                } else if(location.href == `${url}/shopping`) {
                    $('.home').removeClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').addClass('active');
                    $('.container').addClass('shop-container');
                } else {
                    $('.home').removeClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').removeClass('active');
                    $('.container').removeClass('shop-container');
                }
            }
            cartService.cartQty($scope);
            linkActive();
            $scope.$on('$locationChangeSuccess', function () {
                linkActive();
                cartService.cartQty($scope);
                $('.mobile-menu').addClass('nav-hide');
            });
            function hideNav() {
                $('.bars').click(function(){
                    $('.mobile-menu').toggleClass('nav-hide');
                });
            }
            hideNav();
        }
    };
}