angular.module('app').factory('shopControllerService', ['cartService', shopControllerService]);

function shopControllerService(cartService) {
    var service = {
        addToCart: addToCart,
        updateProducts: updateProducts,
        inStock: inStock,
        sort: sort,
        priceHack: priceHack
    }

    return service;

    function priceHack(shop) {
        shop.products.forEach(function(element) {
            element.price = (element.price * 350).toFixed(0);
        });
    }

    function addToCart(product) {
        var value = {
            image: product['imagelink'],
            name: product['name'],
            unitPrice: product['price'],
            qty: 1
        }
        cartService.addToCart(value);
    }

    function updateProducts(shop, subcategory) {
        shop.subcategory = subcategory;
        shop.subcategoryLength = subcategory['items'].length;
        shop.products = subcategory['items'];
    }

    function inStock(shop, bool) {
        if(bool === false) {
            shop.products = shop.subcategory['items'];  
          } else {
              shop.products = shop.products.filter(function(product) {
                  return Number(product['stock']) > 0;
              });
          }
    }

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