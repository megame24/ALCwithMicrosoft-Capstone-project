/*=============================================================================
    Init service, contains logic to retrieve products' data from data service
===============================================================================*/

angular.module('app').factory('initService', ['dataService', initService]);

function initService(dataService) {
    var service = {
        getData: getData,
    }

    return service;

    //gets products' data from data service and triggers a call back
    function getData(cb) {
        dataService.getData().then(function(result){
            cb(result);
        }, function(err) {
            console.log(err);
        });
    }
}