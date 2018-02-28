angular.module('app').controller('HomeController', ['dataService', '$scope', HomeController]);

function HomeController(dataService, $scope) {
    var home = this;
    home.products = [];
    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }

    getData(function(result){
        dataService.home.homeProductData(result, home.products);
    });

}