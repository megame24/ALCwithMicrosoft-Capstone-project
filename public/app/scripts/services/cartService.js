angular.module('app').factory('cartService', ['$window', cartService]);

function cartService($window) {
    var service = {
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
        updateQty: updateQty,
        getCart: getCart,
        cartQty: cartQty
    }

    return service;

    function cartQty(scope) {
        $('#cart-qty').css('display', 'block');
        var array = service.getCart();
        var qty = 0;
        scope.qty = 0;
        if(array.length > 0) {
            array.forEach(function(element) {
                qty += element.qty;
                if(qty > 9) {
                    scope.qty = '9+';
                } else {
                    scope.qty = qty;
                }
            });
        } else {
            $('#cart-qty').css('display', 'none');
        }
    }

    function updateQty(qty, value) {
        var array = service.getCart();
        if($window.localStorage['cart'] != undefined && array.some(element => element['name'] === value['name'])) {
            array.forEach(function(element) {
                if(element['name'] === value['name']) {
                    element['qty'] = qty;
                    return;
                }
            });
            array = JSON.stringify(array);
            $window.localStorage['cart'] = array;
        }
    }

    function removeFromCart(value) {
        var array = service.getCart();
        array = array.filter(function(element) {
            return element['name'] != value['name'];
        });
        array = JSON.stringify(array);
        $window.localStorage['cart'] = array;
    }

    function clearCart() {
        $window.localStorage.removeItem('cart');
    }

    function getCart() {
        if($window.localStorage['cart']) {
            return JSON.parse($window.localStorage['cart']);
        } else {
            return [];
        }
    }

    function addToCart(value) {
        var array = service.getCart();
        if($window.localStorage['cart'] != undefined && !(array.some(element => element['name'] === value['name']))) {
            array.push(value);
            array = JSON.stringify(array);
            $window.localStorage['cart'] = array;
        } else if(array.some(element => element['name'] === value['name'])) {
            return;
        } else {
            array.push(value);
            array = JSON.stringify(array);
            $window.localStorage['cart'] = array;
        }
    }
}