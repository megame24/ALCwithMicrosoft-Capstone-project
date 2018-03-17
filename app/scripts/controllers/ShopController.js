angular.module('app').controller('ShopController', ['$rootScope', 'cartService', 'initService', 'locationService', 'shopControllerService', 'shopStateService', ShopController]);

function ShopController($rootScope, cartService, initService, locationService, shopControllerService, shopStateService) {
    var shop = this;
    shop.data;
    //has to do with maintaining the state of the shopping page
    if(shopStateService.num === 0) {
        shop.subcategory;
        shop.subcategoryLength;
        shop.products;
    } else {
        shop.subcategory = shopStateService.subcategory;
        shop.subcategoryLength = shopStateService.subcategory['items'].length;
        shop.products = shopStateService.subcategory['items'];
    }

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
        //maintain current state using stateService
        shopStateService.subcategory = subcategory;
        shopStateService.subData(shop);
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

    initService.getData(function(result){
        shop.data = result;
    });

    //call this function only once to initialize the shopping page
    if(shopStateService.num === 0) {
        //initializes shop controller with the needed data through init service and data service
        initService.getData(function(result){
            shop.data = result;
            shopStateService.subcategory = result[3]['subcategories'][0];
            shop.subcategory = shopStateService.subcategory;
            shopStateService.subData(shop);
            // shop.subcategoryLength = result[3]['subcategories'][0]['items'].length;
            // shop.products = result[3]['subcategories'][0]['items'];
        });
        shopStateService.num++;
    }

}


