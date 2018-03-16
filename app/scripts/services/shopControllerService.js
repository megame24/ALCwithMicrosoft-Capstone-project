/*==================================================================
    shop controller service, contains shop controller logic
====================================================================*/

angular.module('app').factory('shopControllerService', ['cartService', shopControllerService]);

function shopControllerService(cartService) {
    var service = {
        addToCart: addToCart,
        updateProducts: updateProducts,
        inStock: inStock,
        sort: sort
    }

    return service;


    //takes an object of product details and adds it to cart through cartService
    function addToCart(product) {
        var value = {
            image: product['imagelink'],
            name: product['name'],
            unitPrice: product['price'],
            qty: 1
        }
        cartService.addToCart(value);
    }

    //called when a subcategory is click on the shopping page. It repopulates the products grid
    function updateProducts(shop, subcategory) {
        shop.subcategory = subcategory;
        shop.subcategoryLength = subcategory['items'].length;
        shop.products = subcategory['items'];
    }

    //filters an array of items in a subcategory by its "in stock" value
    function inStock(shop, bool) {
        if(bool === false) {
            shop.products = shop.subcategory['items'];  
          } else {
              shop.products = shop.products.filter(function(product) {
                  return Number(product['stock']) > 0;
              });
          }
    }

    //sorts products by the given criterias
    function sort(shop, myValue) {
        sorts = {
            'none': '',
            'alphabetical': 'name',
            'price': 'price',
            'rating': 'rating'
        }
        shop.filter = sorts[myValue];
    }
}