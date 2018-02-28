angular.module('app').controller('ShopController', ['dataService', '$location', '$window', ShopController]);

function ShopController(dataService, $location, $window) {
    var shop = this;
    shop.subcategory;
    shop.subcategoryLength;
    shop.data = [];
    shop.products = [];
    shop.updateProducts = function(subcategory) {
        shop.subcategory = subcategory;
        shop.subcategoryLength = subcategory['items'].length;
        shop.products = subcategory['items'];
        if(shop.checkStatus) {
            shop.inStock();
        }
    }

    shop.inStock = function(bool) {
        if(bool === false) {
          shop.products = shop.subcategory['items'];  
        } else {
            shop.products = shop.products.filter(function(product) {
                return Number(product['stock']) > 0;
            });
        }
    }

    shop.sort = function(myValue) {
        sorts = {
            'none': '',
            'alphabetical': 'name',
            'price': 'price',
            'rating': 'rating'
        }
        shop.filter = sorts[myValue]; 
    }

    shop.redirect = function(name) {
        $location.path('/product').search('name', name)
    }

    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }

    getData(function(result){
        shop.data = result;
        shop.subcategory = result[0]['subcategories'][0];
        shop.subcategoryLength = result[0]['subcategories'][0]['items'].length;
        shop.products = result[0]['subcategories'][0]['items'];
    });

}