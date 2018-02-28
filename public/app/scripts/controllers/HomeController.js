angular.module('app').controller('HomeController', ['dataService', '$scope', '$location', HomeController]);

function HomeController(dataService, $scope, $location) {
    var home = this;
    home.products = [];

    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }

    $scope.redirect = function(name) {
        $location.path('/product').search('name', name)
    }

    getData(function(result){
        dataService.home.homeProductData(result, home.products);
    });

}