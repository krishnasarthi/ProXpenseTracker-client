(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  function filterController(categoryService, subcategoryService, paymenttypeService) {
    var vm = this;
    var defaultCategory = {
      _id: -1,
      name: 'Category'
    };
    var defaultSubCategory = [{
        _id: -1,
        name: 'Sub Category'
      }];
    var defaultPaymentType = {
      _id: -1,
      name: 'Payment Type'
    };
    vm.$onInit = function () {
      vm.startDate = new Date();
      vm.endDate = new Date();
      vm.styleCode = 0;
      console.log(vm.alignStyle);
      switch (vm.alignStyle) {
      case 'vertical':
        vm.styleCode = 0;
        break;
      case 'horizontal':
        vm.styleCode = 1;
        break;
      default:
        vm.styleCode = 0;
        break;
      }
      categoryService.getCategory().then(function (response) {
        var categoryList = response.data.data;
        categoryList.unshift(defaultCategory);
        console.log(categoryList);
        vm.categories = categoryList;
        vm.category = categoryList[0];
        vm.getSubCategory();
      }, function (err) {
        console.log(err);
      });
      paymenttypeService.getPaymentType().then(function (response) {
        var paymentTypeList = response.data.data;
        paymentTypeList.unshift(defaultPaymentType);
        vm.payments = paymentTypeList;
        vm.paymentType = paymentTypeList[0];
      }, function (err) {
        console.log(err);
      });
    };
    vm.getSubCategory = function () {
      subcategoryService.getSubCategoryByCategory(vm.category).then(function (response) {
        if (response && response.data && response.data.data.length == 0) {
          vm.subcategories = defaultSubCategory;
          vm.subcategory = defaultSubCategory[0];
        } else {
          vm.subcategories = response.data.data;
          vm.subcategory = response.data.data[0];
        }
      }, function (err) {
        console.log(err);
      });
    };
    vm.applyFilter = function () {
      var filter = setFilter();
      vm.onApply({ funcParam: filter });
    };
    vm.createReport = function () {
      var filter = setFilter();
      vm.getReport({ funcParam: filter });
    };
    vm.resetFilter = function () {
      vm.onCancel();
    };
    function setFilter() {
      var filter = {
        categoryId: vm.category._id,
        subcategoryId: vm.subcategory._id,
        paymentTypeId: vm.paymentType._id,
        startDate: vm.startDate,
        endDate: vm.endDate
      };
      vm.filter = filter;
      return filter;
    }
  }
  module.component('filter', {
    templateUrl: './app/components/filter/filter-component.html',
    bindings: {
      onApply: '&?',
      onCancel: '&',
      getReport: '&?',
      alignStyle: '@'
    },
    controller: [
      'categoryService',
      'subcategoryService',
      'paymenttypeService',
      filterController
    ]
  });
}());