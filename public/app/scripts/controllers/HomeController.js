angular.module('app').controller('HomeController', ['initService', 'dataService', '$scope', 'locationService', HomeController]);

function HomeController(initService, dataService, $scope, locationService) {
    var home = this;
    home.products = [];

    //on clicking a product's image, redirect to that product's page
    $scope.redirect = function(name) {
        locationService.redirect(name);
    }

    //initializes home controller with the needed data through init service and data service
    initService.getData(function(result){
        dataService.home.homeProductData(result, home.products);
    });

}