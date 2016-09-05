(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  var apiUrl = 'http://localhost:3000';
  module.service('paymenttypeService', [
    '$http',
    function ($http) {
      this.getPaymentType = function () {
        return $http.get(apiUrl + '/paymenttype');
      };
      this.deletePaymentType = function (id) {
        return $http.delete(apiUrl + '/paymenttype/' + id);
      };
      this.savePaymentType = function (paymenttype) {
        return $http.post(apiUrl + '/paymenttype', paymenttype);
      };
      this.updatePaymentType = function (id, paymentType) {
        return $http.put(apiUrl + '/paymenttype/' + id, paymentType);
      };
    }
  ]);
}());