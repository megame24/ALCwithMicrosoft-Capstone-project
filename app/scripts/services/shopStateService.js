angular.module('app').factory('shopStateService', [shopStateService]);

function shopStateService() {
    var service = {
        num: 0,
        subData: subData,
        subcategory: []
    }

    return service;

    function subData(shop) {
        shop.subcategoryLength = service.subcategory['items'].length;
        shop.products = service.subcategory['items'];
    }
}