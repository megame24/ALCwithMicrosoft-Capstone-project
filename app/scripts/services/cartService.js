/*===========================================================================================
    cart service, contains cart's logic... Not to be confused with cart controller service.
=============================================================================================*/

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

    //responsible for the top right corner cart content indicator(red)
    function cartQty(scope) {
        $('#cart-qty').css('display', 'block');
        var array = service.getCart();
        var qty = 0;
        scope.qty = 0;
        if(array.length > 0) { //if there is an item in cart, loop through cart and get number of items 
            array.forEach(function(element) {
                qty += element.qty;
                if(qty > 9) {
                    scope.qty = '9+';
                } else {
                    scope.qty = qty;
                }
            });
        } else { //else, set display value of cart content indicator to none
            $('#cart-qty').css('display', 'none');
        }
    }

    function checkAvailability(arr, val) {
        return arr.some(function(arrVal) {
          return val['name'] === arrVal['name'];
        });
      }

    //updates the cart on every relevant action
    function updateQty(qty, value) {
        var array = service.getCart();
        if($window.localStorage['cart'] != undefined && checkAvailability(array, value)) { //update only if the cart is not empty and item is not already in the cart
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

    //removes an item from cart
    function removeFromCart(value) {
        var array = service.getCart();
        array = array.filter(function(element) {
            return element['name'] != value['name'];
        });
        array = JSON.stringify(array);
        $window.localStorage['cart'] = array;
    }

    //deletes cart as well as the items in it
    function clearCart() {
        $window.localStorage.removeItem('cart');
    }

    //retrieves cart, which is stored in the localStorage
    function getCart() {
        if($window.localStorage['cart']) {
            return JSON.parse($window.localStorage['cart']);
        } else {
            return [];
        }
    }

    //adds an item to the cart
    function addToCart(value) {
        var array = service.getCart();
        if($window.localStorage['cart'] != undefined && !(checkAvailability(array, value))) { //if cart is not empty and item is not already in the cart, add it to the cart
            array.push(value);
            array = JSON.stringify(array);
            $window.localStorage['cart'] = array;
        } else if(checkAvailability(array, value)) { //else if the item is already in cart, return and terminate the function
            return;
        } else { //else if the item is new, add it to cart
            array.push(value);
            array = JSON.stringify(array);
            $window.localStorage['cart'] = array;
        }
    }
}