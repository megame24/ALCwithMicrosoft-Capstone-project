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
        .otherwise({redirect: '/'});
}