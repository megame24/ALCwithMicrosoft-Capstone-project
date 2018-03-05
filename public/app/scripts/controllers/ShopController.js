angular.module('app').controller('ShopController', ['$rootScope', 'cartService', 'initService', 'locationService', 'shopControllerService', ShopController]);

function ShopController($rootScope, cartService, initService, locationService, shopControllerService) {
    var shop = this;
    shop.subcategory;
    shop.subcategoryLength;
    shop.data = [];
    shop.products = [];

    shop.addToCart = function(product) {
        shopControllerService.addToCart(product);
        cartService.cartQty($rootScope);
    }

    shop.updateProducts = function(subcategory) {
        shopControllerService.updateProducts(shop, subcategory);
    }

    shop.inStock = function(bool) {
        shopControllerService.inStock(shop, bool);
    }

    shop.sort = function(myValue) {
        shopControllerService.sort(shop, myValue); 
    }

    shop.redirect = function(name) {
        locationService.redirect(name);
    }

    initService.getData(function(result){
        shop.data = result;
        shop.subcategory = result[0]['subcategories'][0];
        shop.subcategoryLength = result[0]['subcategories'][0]['items'].length;
        shop.products = result[0]['subcategories'][0]['items'];
        shop.products.forEach(function(element) {
            element.price = element.price * 350;
        });
    });

}