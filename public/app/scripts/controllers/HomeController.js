angular.module('app').controller('HomeController', ['initService', 'dataService', '$scope', 'locationService', HomeController]);

function HomeController(initService, dataService, $scope, locationService) {
    var home = this;
    home.products = [];

    $scope.redirect = function(name) {
        locationService.redirect(name);
    }

    initService.getData(function(result){
        dataService.home.homeProductData(result, home.products);
    });

}