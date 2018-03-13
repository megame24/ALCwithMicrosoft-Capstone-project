/*==============================================================
    top directive, controls the nav section of the app
================================================================*/

angular.module('app').directive('navDirective', ['cartService', nav]);

function nav(cartService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/nav.html',
        link: function($scope, element, attrs) {
            //adds active class to the current path/link
            function linkActive() {
                if(window.location.pathname == `/`) {
                    $('.home').addClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').removeClass('active');
                    $('.container').removeClass('shop-container');
                } else if(window.location.pathname == `/cart`) {
                    $('.home').removeClass('active');
                    $('#cart').addClass('active');
                    $('#shopping').removeClass('active');
                    $('.container').addClass('shop-container');
                } else if(window.location.pathname == `/shopping`) {
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

            //calls 'cartQty' on page load to re-evaluate the cart content indicator(top right corner)
            cartService.cartQty($scope);

            //calls 'linkActive' on page load to get active link
            linkActive();

            $scope.$on('$locationChangeSuccess', function () {
                //calls 'linkActive' on location change to get active link
                linkActive();

                //calls 'cartQty' on location change to re-evaluate the cart content indicator(top right corner)
                cartService.cartQty($scope);
                $('.mobile-menu').addClass('nav-hide');
            });

            //hides mobile version of nav bar on large screens
            function hideNav() {
                $('.bars').click(function(){
                    $('.mobile-menu').toggleClass('nav-hide');
                });
            }
            hideNav();
        }
    };
}