angular.module('app').factory('shopControllerService', ['cartService', shopControllerService]);

function shopControllerService(cartService) {
    var subCatNaira = ['Baby care'];
    var service = {
        addToCart: addToCart,
        updateProducts: updateProducts,
        inStock: inStock,
        sort: sort
    }

    return service;

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
        if(!(subCatNaira.includes(shop.products[0].subcategory))) {
            shop.products.forEach(function(element) {
                element.price = element.price * 350;
            });
            subCatNaira.push(shop.products[0].subcategory);
        }
        if(shop.checkStatus) {
            shop.inStock();
        }
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