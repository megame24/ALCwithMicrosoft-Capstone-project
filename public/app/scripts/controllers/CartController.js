angular.module('app').controller('CartController', ['cartService', CartController]);

function CartController(cartService) {
    var cart = this;
    cart.subtotal;
    cart.shipping = '10.00';
    cart.tax;
    cart.total;
    cart.cart = cartService.getCart();
    cart.subtotalArray = cart.cart.map(function(element) {
        return {
            name: element['name'],
            unitPrice: element['unitPrice'],
            qty: element['qty']
        }
    });
    subtotal(cart.subtotalArray);
    function subtotal(array) {
        var subtotal = 0;
        for(var i = 0; i < array.length; i++) {
            subtotal += (array[i]['unitPrice'] * array[i]['qty']);
        }
        cart.subtotal = subtotal.toFixed(2);
        cart.tax = (cart.subtotal / 10).toFixed(2);
        if(cart.subtotal == 0) cart.shipping = '0.00';
        cart.total = (Number(cart.subtotal) + Number(cart.shipping) + Number(cart.tax)).toFixed(2);
    }
    cart.updateQty = function(i, qty, product) {
        cartService.updateQty(qty, product);
        cart.subtotalArray[i]['qty'] = qty;
        subtotal(cart.subtotalArray);
    }
    cart.removeFromCart = function(product) {
        cartService.removeFromCart(product);
        cart.subtotalArray = cart.subtotalArray.filter(function(element) {
            return element['name'] != product['name'];
        });
        subtotal(cart.subtotalArray);
        cart.cart = cartService.getCart();
    }

    cart.checkout = function(sign) {
        var message = `${cart.details.name} your purchase worth N${cart.total} has been shipped to ${cart.details.address}, ${cart.details.city}. Thank you for your patronage, we hope to hear from you soon.`
        alert(message);
    }
}