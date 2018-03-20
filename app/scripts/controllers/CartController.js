angular.module('app').controller('CartController', ['$rootScope', 'cartService', 'cartControllerService', CartController]);

function CartController($rootScope, cartService, cartControllerService) {
    var cart = this;
    cart.subtotal;
    cart.shipping = '10.00'; //shipping cost
    cart.tax;
    cart.total;
    cart.cart = cartService.getCart(); //get cart(array of items/products)
    cart.subtotalArray = cartControllerService.subtotalArray(cart); //get subtotal array
    cartControllerService.subtotal(cart.subtotalArray, cart); //calculate subtotal

    //on increasing or decreasing the qty input field, updates the qty of item in the cart
    cart.updateQty = function(i, qty, product) {
        cartControllerService.updateQty(i, qty, product, cart);
    }

    //on clicking the 'x' on the cart page, remove the item from the cart
    cart.removeFromCart = function(product) {
        cartControllerService.removeFromCart(product, cart);
    }

    //on clicking 'checkout', call 'checkout' function of the 'cartControllerService'
    cart.checkout = function() {
        cartControllerService.checkout(cart);
    }
}