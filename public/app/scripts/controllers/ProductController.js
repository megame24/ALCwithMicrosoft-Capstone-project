angular.module('app').controller('ProductController', ['$location', ProductController]);

function ProductController($location) {
    var product = this;
    $location.search({'name': 'yo ho ho ho', 'number': 1});
}