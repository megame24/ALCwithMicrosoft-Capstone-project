angular.module('app').controller('ProductController', ['$rootScope', 'cartService', 'initService', 'dataService', 'locationService', 'cartService', ProductController]);

function ProductController($rootScope, cartService, initService, dataService, locationService, cartService) {
    var product = this;
    var value;
    product.product;
    product.qty = 1;
    product.name = locationService.search();
    product.ratingArray = [];
    product.notRatingArray = [];
    product.back = function() {
        locationService.back();
    }

    //updates qty of item in cart on indication
    product.updateQty = function(qty) {
        value.qty = qty;
        cartService.updateQty(qty, value);
        cartService.cartQty($rootScope); //re-call 'cartQty' of cart service to refresh cart content indicator(top right corner);
    }

    //adds item to cart on clicking 'add to cart' botten on product page
    product.addToCart = function() {
        cartService.addToCart(value);
        cartService.cartQty($rootScope); //re-call 'cartQty' of cart service to refresh cart content indicator(top right corner);
    }

    //initializes product controller with the needed data through init service and data service
    initService.getData(function(result){
        dataService.product.getProduct(result, product, function() {
            product.product.price = (product.product.price * 350).toFixed(0); //converts $ to naira

            //controlls rate stars on the product page
            var notRating = 5 - product.product.rating;
            for(var i = 0; i < product.product.rating; i++) {
                product.ratingArray.push(i);
            }
            if(notRating > 0) {
                for(var j = 0; j < notRating; j++) {
                    product.notRatingArray.push(j);
                }
            }
        });
        value = {
            image: product.product['imagelink'],
            name: product.product['name'],
            unitPrice: product.product['price'],
            qty: product.qty
        }
    });
}