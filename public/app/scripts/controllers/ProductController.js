angular.module('app').controller('ProductController', ['$location', '$window', 'dataService', ProductController]);

function ProductController($location, $window, dataService) {
    var product = this;
    product.product;
    product.name = $location.search()['name'];
    product.back = function() {
        $window.history.back()
    }

    function getProduct(array) {
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
    }

    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }

    getData(function(result){
        getProduct(result);
    });
}