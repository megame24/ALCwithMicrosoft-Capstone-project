angular.module('app').controller('ShopController', ['$rootScope', 'cartService', 'initService', 'locationService', 'shopControllerService', ShopController]);

function ShopController($rootScope, cartService, initService, locationService, shopControllerService) {
    var shop = this;
    shop.subcategory;
    shop.subcategoryLength;
    shop.data = [];
    shop.products = [];

    //on clicking 'add to cart' bottun on shopping page, add product to cart through 'addToCart' function of the shop controller service
    shop.addToCart = function(product) {
        shopControllerService.addToCart(product);
        cartService.cartQty($rootScope); //re-call 'cartQty' of cart service to refresh cart content indicator(top right corner);
    }

    //re-populates products grid on clicking a subcategory on the shopping page
    shop.updateProducts = function(subcategory) {
        shopControllerService.updateProducts(shop, subcategory);
        
        if(shop.checkStatus) { //if 'in stock' checkbox is checked, filter out products not in stock
            shop.inStock();
        }
    }

    //filters out products that are not in stock
    shop.inStock = function(bool) {
        shopControllerService.inStock(shop, bool);
    }

    //sorts the products according the price, rating or alphabetical order
    shop.sort = function(myValue) {
        shopControllerService.sort(shop, myValue); 
    }

    //on clicking an image or a product's name on the shopping page, redirct to that products page
    shop.redirect = function(name) {
        locationService.redirect(name);
    }

    //initializes shop controller with the needed data through init service and data service
    initService.getData(function(result){
        shop.data = result;
        shop.subcategory = result[3]['subcategories'][0];
        shop.subcategoryLength = result[3]['subcategories'][0]['items'].length;
        shop.products = result[3]['subcategories'][0]['items'];
        shopControllerService.priceHack(shop); //converts $ to Naira
    });

}