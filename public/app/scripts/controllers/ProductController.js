angular.module('app').controller('ProductController', ['$location', '$window', 'dataService', 'cartService', ProductController]);

function ProductController($location, $window, dataService, cartService) {
    var product = this;
    var value;
    product.product;
    product.qty = 1;
    product.name = $location.search()['name'];
    product.back = function() {
        $window.history.back()
    }

    product.updateQty = function(qty) {
        value.qty = qty;
        cartService.updateQty(qty, value);
    }

    product.addToCart = function() {
        cartService.addToCart(value);
    }

    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }

    getData(function(result){
        dataService.product.getProduct(result, product);
        value = {
            image: product.product['imagelink'],
            name: product.product['name'],
            unitPrice: product.product['price'],
            qty: product.qty
        }
    });
}