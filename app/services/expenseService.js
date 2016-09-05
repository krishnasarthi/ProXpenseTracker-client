(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  var apiUrl = 'http://localhost:3000';
  module.service('expenseService', [
    '$http',
    function ($http) {
      function createQueryString(options) {
        var queryString = '';
        //create filter
        if (Object.keys(options.filter).length && options.filter.constructor === Object) {
          var filters = '';
          for (var key in options.filter) {
            console.log(key);
            filters += key + '=' + options.filter[key] + ';';
          }
          queryString += 'filter=' + filters + '&';
        }
        if (options.sortBy && options.sortBy.length > 0) {
          if (!options.orderBy)
            queryString += 'sort=-' + options.sortBy;
          else
            queryString += 'sort=' + options.sortBy;
        }
        queryString += '&offset=' + options.currentPage + '&limit=' + options.limit;
        return queryString;
      }
      this.getPaymentById = function (id) {
        return $http.get(apiUrl + '/payment/' + id);
      };
      this.getPayment = function () {
        return $http.get(apiUrl + '/payment');
      };
      this.getPartialPayment = function (options) {
        var model = options;
        var queryString = createQueryString(options);
        console.log(queryString);
        return $http.get(apiUrl + '/payment?' + queryString);  /*
            if(model.filter){
                model.filter.sort = model.sortBy;
                model.filter.offset = model.currentPage;
                model.filter.orderBy = model.orderBy;
                model.filter.limit = model.limit;

                return $http.post(apiUrl + '/payment/search',model.filter);
            }else{

            }*/
      };
      this.deletePayment = function (id) {
        return $http.delete(apiUrl + '/payment/' + id);
      };
      this.savePayment = function (payment) {
        return $http.post(apiUrl + '/payment', payment);
      };
      this.updatePayment = function (id, payment) {
        return $http.put(apiUrl + '/payment/' + id, payment);
      };
      this.searchPayment = function (filter) {
        return $http.post(apiUrl + '/payment/search', filter);
      };
    }
  ]);
}());