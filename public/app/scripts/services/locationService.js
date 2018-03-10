angular.module('app').factory('locationService', ['$window', '$location', locationService]);

function locationService($window, $location) {
    var service = {
        redirect: redirect,
        back: back,
        search: search
    }

    return service;

    function redirect(name) {
        // var name1 = `name=${name}`;
        // var searchParams = new URLSearchParams(name1);
        // window.location =  `/product?name=${name}`;
        // window.location.search = searchParams;
        $location.path('/product').search('name', name);
    }

    function back() {
        $window.history.back();
    }

    function search() {
        return $location.search()['name'];
    }
}