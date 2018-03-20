/*======================================================================================================
    cart controller service, contains cart controller logic... not to be confused with cart service
========================================================================================================*/

angular.module('app').factory('cartControllerService', ['cartService', '$rootScope', cartControllerService]);

function cartControllerService(cartService, $rootScope) {
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

    //loops through the subtotal array and evaluates the subtotal, tax and total
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

    function cb(cart) {
        service.subtotal(cart.subtotalArray, cart); //re-evaluate subtotal dynamically
        cartService.cartQty($rootScope); //re-call 'cartQty' of cart service to refresh cart content indicator(top right corner);
    }

    //updates qty of items through the cart service's 'updateQty' function
    function updateQty(i, qty, product, cart) {
        cartService.updateQty(qty, product);
        cart.subtotalArray[i]['qty'] = qty;
        cb(cart);
    }

    //removes item through the cart service's 'removeFromCart' function
    function removeFromCart(product, cart) {
        cartService.removeFromCart(product);
        cart.subtotalArray = cart.subtotalArray.filter(function(element) { //also removes item from subtotal array
            return element['name'] != product['name'];
        });
        cb(cart);
        cart.cart = cartService.getCart(); //refresh cart
    }

    //display a custom message on checkout
    function checkout(cart) {
        var message = cart.details.name + ' your purchase worth $' + cart.total + ' has been shipped to ' + cart.details.address + ', ' + cart.details.city + '. Thank you for your patronage, we hope to hear from you soon.';
        cartService.clearCart(); //clears cart on checkout
        cart.cart = cartService.getCart();
        cart.subtotalArray = [];
        cb(cart);
        alert(message);
    }
}