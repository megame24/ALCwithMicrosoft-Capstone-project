/*===================================================================================
    data service, contains logic to retrieve and manipulate products' data from api
=====================================================================================*/

angular.module('app').factory('dataService', ['$http', '$q', dataService]);

function dataService($http, $q) {
    var service = {
        getData: getData,
        home: {
            homeProductData: homeProductData
        },
        product: {
            getProduct: getProduct
        }
    }

    return service;

    //doctors returned data from products' api to suit home page's needs
    function homeProductData(result, array) {

        //comment out below to make carousel display random products
        function product(num1, num2, num3) {
            return result[num1]['subcategories'][num2]['items'][num3]
        }

        //generate arbitrary data to populate the carousel
        array.push(product(0, 0, 0));
        array.push(product(0, 0, 1));
        array.push(product(3, 0, 16));
        array.push(product(3, 1, 0));

        //uncomment below to make carousel display random products

        /*function randomProduct() {
            var num1 = Math.floor(Math.random()*result.length);
            var num2 = Math.floor(Math.random()*result[num1]['subcategories'].length);
            var num3 = Math.floor(Math.random()*result[num1]['subcategories'][num2]['items'].length);
            return result[num1]['subcategories'][num2]['items'][num3];
        }
        function validProduct(product, fxn, arr) {
            if(product === undefined || arr.some(value => value['name'] === product['name'])) {
                product = fxn();
                validProduct(product, fxn, arr);
            } else {
                arr.push({
                    name: product['name'],
                    imageLink: product['imagelink']
                });
            }
        }
        for(var i = 0; i < 4; i++) {
            var product = randomProduct();
            validProduct(product, randomProduct, array);
        }*/
    }

    //doctors returned data from products' api to suit product page's needs
    function getProduct(array, product, cb) {
        array.forEach(function(element) {
            var subElements = element['subcategories'];
            subElements.forEach(function(element) {
                 var itemElements = element['items'];
                 itemElements.forEach(function(element) {
                     if(element['name'] === product.name) {
                         product.product = element;
                         return;
                     }
                 });
            });
        });
        cb();
    }

    //interacts with the products' api through http to retrieve products data
    function getData() {
        var deferred = $q.defer();
        $http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').then(function(result){
            deferred.resolve(result.data);
        });
        return deferred.promise;
    }
}