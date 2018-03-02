angular.module('app').factory('initService', ['dataService', initService]);

function initService(dataService) {
    var service = {
        getData: getData
    }

    return service;

    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }
}