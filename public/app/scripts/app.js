angular.module('app', ['ngRoute', 'angularCSS']);
angular.module('app').config(['$routeProvider', '$locationProvider', routeConfig]);

function routeConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController',
            controllerAs: 'home',
            css: 'app/styles/css/home.css'
        })
        .when('/shop', {
            templateUrl: 'app/views/shop.html',
            controller: 'ShopController',
            controllerAs: 'shop',
            css: 'app/styles/css/shop.css'
        })
        .when('/cart', {
            templateUrl: 'app/views/cart.html',
            controller: 'CartController',
            controllerAs: 'cart',
            css: 'app/styles/css/cart.css'
        })
        .when('/about', {
            templateUrl: 'app/views/about.html',
            controller: 'AboutController',
            controllerAs: 'about',
            css: 'app/styles/css/about.css'
        })
        .when('/contact', {
            templateUrl: 'app/views/contact.html',
            controller: 'ContactController',
            controllerAs: 'contact',
            css: 'app/styles/css/contact.css'
        })
        .otherwise({redirectTo: '/'});
}