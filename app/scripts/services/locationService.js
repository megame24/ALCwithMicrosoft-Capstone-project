/*==================================================================
    location service, contains logic for navigations
====================================================================*/

angular.module('app').factory('locationService', ['$window', '$location', locationService]);

function locationService($window, $location) {
    var service = {
        redirect: redirect,
        back: back,
        search: search
    }

    return service;

    //redirects to path '/product' with search params provided
    function redirect(name) {
        $location.path('/product').search('name', name);
    }

    //navigates to the previous page in history
    function back() {
        $window.history.back();
    }

    //retrieves the value in the key/value pair of the search params
    function search() {
        return $location.search()['name'];
    }
}