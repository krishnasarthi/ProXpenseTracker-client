(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  var apiUrl = 'http://localhost:3000';
  module.service('subcategoryService', [
    '$http',
    function ($http) {
      this.getSubCategory = function () {
        return $http.get(apiUrl + '/subcategory');
      };
      this.getSubCategoryByCategory = function (category) {
        if (category) {
          return $http.get(apiUrl + '/subcategory/null/' + category._id + '/' + category.name);
        }
        return null;
      };
      this.deleteSubCategory = function (id) {
        return $http.delete(apiUrl + '/subcategory/' + id);
      };
      this.saveSubCategory = function (subcategory) {
        return $http.post(apiUrl + '/subcategory', subcategory);
      };
      this.updateSubCategory = function (subcategory) {
        var _id = subcategory.id;
        return $http.put(apiUrl + '/subcategory/' + _id, subcategory);
      };
    }
  ]);
}());