angular.module('app').controller('CartController', ['$rootScope', 'cartService', 'cartControllerService', CartController]);

function CartController($rootScope, cartService, cartControllerService) {
    var cart = this;
    cart.subtotal;
    cart.shipping = '1000.00';
    cart.tax;
    cart.total;
    cart.cart = cartService.getCart();
    cart.subtotalArray = cartControllerService.subtotalArray(cart);
    cartControllerService.subtotal(cart.subtotalArray, cart);
    cart.updateQty = function(i, qty, product) {
        cartControllerService.updateQty(i, qty, product, cart, function() {
            cartControllerService.subtotal(cart.subtotalArray, cart);
        });
        cartService.cartQty($rootScope);
    }
    cart.removeFromCart = function(product) {
        cartControllerService.removeFromCart(product, cart, function() {
            cartControllerService.subtotal(cart.subtotalArray, cart);
        });
        cartService.cartQty($rootScope);
    }

    cart.checkout = function() {
        cartControllerService.checkout(cart, function() {
            cartControllerService.subtotal(cart.subtotalArray, cart);
        });
        cartService.cartQty($rootScope);
    }
}