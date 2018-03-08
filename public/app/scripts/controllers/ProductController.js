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

    product.updateQty = function(qty) {
        value.qty = qty;
        cartService.updateQty(qty, value);
    }

    product.addToCart = function() {
        cartService.addToCart(value);
        cartService.cartQty($rootScope);
    }

    initService.getData(function(result){
        dataService.product.getProduct(result, product, function() {
            product.product.price = (product.product.price * 350).toFixed(0);
            // var productString = product.product.price.toString();
            // if(productString.length > 3) {
            //     var num = productString.length - 3;
            //     productString = productString.slice(0, num) + ',' + productString.slice(num, productString.length);
            //     product.product.price = productString;
            // } else if(productString.length > 6) {
            //     var num = productString.length - 3;
            //     var num1 = productString.length - 6;
            //     productString = productString.slice(0, num) + ',' + productString.slice(num, num1) + ',' + productString.slice(num1, productString.length);
            //     product.product.price = productString;
            // }
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