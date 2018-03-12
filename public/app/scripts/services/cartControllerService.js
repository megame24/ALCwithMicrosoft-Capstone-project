/*======================================================================================================
    cart controller service, contains cart controller logic... not to be confused with cart service
========================================================================================================*/

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

    //an array of price and qty, for evaluating the subtotal
    function subtotalArray(cart) {
        return cart.cart.map(function(element) {
            return {
                name: element['name'],
                unitPrice: element['unitPrice'],
                qty: element['qty']
            }
        });
    }

    //loops through the subtotal array and evaluates the subtotal
    function subtotal(array, cart) {
        var subtotal = 0;
        for(var i = 0; i < array.length; i++) {
            subtotal += (array[i]['unitPrice'] * array[i]['qty']);
        }
        cart.subtotal = subtotal.toFixed(0);
        cart.tax = (cart.subtotal / 10).toFixed(0);
        if(cart.subtotal == 0) cart.shipping = '0';
        cart.total = (Number(cart.subtotal) + Number(cart.shipping) + Number(cart.tax)).toFixed(0);
    }

    //updates qty of items through the cart service's 'updateQty' function
    function updateQty(i, qty, product, cart, cb) {
        cartService.updateQty(qty, product);
        cart.subtotalArray[i]['qty'] = qty;
        cb();
    }

    //removes item through the cart service's 'removeFromCart' function
    function removeFromCart(product, cart, cb) {
        cartService.removeFromCart(product);
        cart.subtotalArray = cart.subtotalArray.filter(function(element) { //also removes item from subtotal array
            return element['name'] != product['name'];
        });
        cb();
        cart.cart = cartService.getCart();
    }

    //display a custom message on checkout
    function checkout(cart, cb) {
        var message = `${cart.details.name} your purchase worth N${cart.total} has been shipped to ${cart.details.address}, ${cart.details.city}. Thank you for your patronage, we hope to hear from you soon.`
        cartService.clearCart(); //clears cart on checkout
        cart.cart = cartService.getCart();
        cart.subtotalArray = [];
        cb();
        alert(message);
    }
}