angular.module('app').directive('navDirective', ['cartService', nav]);

function nav(cartService) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directiveViews/nav.html',
        link: function($scope, element, attrs) {
            function cartQty() {
                $('#cart-qty').css('display', 'block');
                var array = cartService.getCart();
                $scope.qty = 0;
                if(array.length > 0) {
                    array.forEach(function(element) {
                        $scope.qty += element.qty;
                    });
                } else {
                    $('#cart-qty').css('display', 'none');
                }
            }
            var url = 'http://localhost:8080';
            function linkActive() {
                if(location.href == `${url}/`) {
                    $('#home').addClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').removeClass('active');
                } else if(location.href == `${url}/cart`) {
                    $('#home').removeClass('active');
                    $('#cart').addClass('active');
                    $('#shopping').removeClass('active');
                } else if(location.href == `${url}/shopping`) {
                    $('#home').removeClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').addClass('active');
                } else {
                    $('#home').removeClass('active');
                    $('#cart').removeClass('active');
                    $('#shopping').removeClass('active');
                }
            }
            cartQty();
            linkActive();
            $scope.$on('$locationChangeSuccess', function () {
                linkActive();
                cartQty();
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