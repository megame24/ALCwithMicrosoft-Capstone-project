angular.module('app').controller('HomeController', ['dataService', HomeController]);

function HomeController(dataService) {
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
        dataService.homeProductData(result, home.products);
    });

}