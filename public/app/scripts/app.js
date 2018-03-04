angular.module('app', ['ngRoute']);
angular.module('app').config(['$routeProvider', '$locationProvider', routeConfig]);

function routeConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .when('/shopping', {
            templateUrl: 'app/views/shop.html',
            controller: 'ShopController',
            controllerAs: 'shop'
        })
        .when('/cart', {
            templateUrl: 'app/views/cart.html',
            controller: 'CartController',
            controllerAs: 'cart'
        })
        .when('/about', {
            templateUrl: 'app/views/about.html',
            controller: 'AboutController',
            controllerAs: 'about'
        })
        .when('/contact', {
            templateUrl: 'app/views/contact.html',
            controller: 'ContactController',
            controllerAs: 'contact'
        })
        .when('/product', {
            templateUrl: 'app/views/product.html',
            controller: 'ProductController',
            controllerAs: 'product'
        })
        .otherwise({redirectTo: '/'});
}