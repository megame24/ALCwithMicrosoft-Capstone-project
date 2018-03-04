angular.module('app').controller('ProductController', ['initService', 'dataService', 'locationService', 'cartService', ProductController]);

function ProductController(initService, dataService, locationService, cartService) {
    var product = this;
    var value;
    product.product;
    product.qty = 1;
    product.name = locationService.search();
    product.back = function() {
        locationService.back();
    }

    product.updateQty = function(qty) {
        value.qty = qty;
        cartService.updateQty(qty, value);
    }

    product.addToCart = function() {
        cartService.addToCart(value);
    }

    initService.getData(function(result){
        dataService.product.getProduct(result, product, function() {
            product.product.price = product.product.price * 350;
        });
        value = {
            image: product.product['imagelink'],
            name: product.product['name'],
            unitPrice: product.product['price'],
            qty: product.qty
        }
    });
}