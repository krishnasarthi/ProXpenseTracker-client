(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  var apiUrl = 'http://localhost:3000';
  module.service('categoryService', [
    '$http',
    function ($http) {
      this.getCategory = function () {
        return $http.get(apiUrl + '/category');
      };
      this.deleteCategory = function (id) {
        return $http.delete(apiUrl + '/category/' + id);
      };
      this.saveCategory = function (category) {
        return $http.post(apiUrl + '/category', category);
      };
      this.updateCategory = function (id, category) {
        return $http.put(apiUrl + '/category/' + id, category);
      };
      this.getCategoryById = function (id) {
        return $http.get(apiUrl + '/category/' + id);
      };
    }
  ]);
}());