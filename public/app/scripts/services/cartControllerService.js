angular.module('app').factory('cartControllerService', ['cartService', cartControllerService]);

function cartControllerService(cartService) {
    var service = {
        subtotalArray: subtotalArray,
        subtotal: subtotal,
        updateQty: updateQty,
        removeFromCart: removeFromCart,
        checkout: checkout
    }

    return service;

    function subtotalArray(cart) {
        return cart.cart.map(function(element) {
            return {
                name: element['name'],
                unitPrice: element['unitPrice'],
                qty: element['qty']
            }
        });
    }

    function subtotal(array, cart) {
        var subtotal = 0;
        for(var i = 0; i < array.length; i++) {
            subtotal += (array[i]['unitPrice'] * array[i]['qty']);
        }
        cart.subtotal = subtotal.toFixed(2);
        cart.tax = (cart.subtotal / 10).toFixed(2);
        if(cart.subtotal == 0) cart.shipping = '0.00';
        cart.total = (Number(cart.subtotal) + Number(cart.shipping) + Number(cart.tax)).toFixed(2);
    }

    function updateQty(i, qty, product, cart, cb) {
        cartService.updateQty(qty, product);
        cart.subtotalArray[i]['qty'] = qty;
        cb();
    }

    function removeFromCart(product, cart, cb) {
        cartService.removeFromCart(product);
        cart.subtotalArray = cart.subtotalArray.filter(function(element) {
            return element['name'] != product['name'];
        });
        cb();
        cart.cart = cartService.getCart();
    }

    function checkout(cart, cb) {
        var message = `${cart.details.name} your purchase worth N${cart.total} has been shipped to ${cart.details.address}, ${cart.details.city}. Thank you for your patronage, we hope to hear from you soon.`
        cartService.clearCart();
        cart.cart = cartService.getCart();
        cart.subtotalArray = [];
        cb();
        alert(message);
    }
}