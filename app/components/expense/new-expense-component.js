(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  function modalController(categoryService, subcategoryService, paymenttypeService, expenseService) {
    var vm = this;
    var defaultOption = [{
        _id: -1,
        name: 'No category found'
      }];
    vm.closeModal = function () {
      vm.uibModalInstance.close();
    };
    vm.$onInit = function () {
      vm.paymentDate = new Date();
      categoryService.getCategory().then(function (response) {
        vm.categories = response.data.data;
        vm.category = response.data.data[0];
        vm.getSubCategory();
      }, function (err) {
        console.log(err);
      });
      paymenttypeService.getPaymentType().then(function (response) {
        vm.payments = response.data.data;
        vm.paymentType = response.data.data[0];
      }, function (err) {
        console.log(err);
      });
    };
    vm.getSubCategory = function () {
      subcategoryService.getSubCategoryByCategory(vm.category).then(function (response) {
        vm.subcategories = response.data.data;
        vm.subcategory = response.data.data[0];
      }, function (err) {
        console.log(err);
      });
    };
    vm.save = function () {
      var newPayment = {
        amount: vm.amount,
        paymentDate: vm.paymentDate,
        description: vm.description,
        category: {
          categoryId: vm.category._id,
          name: vm.category.name
        },
        subCategory: {
          subcategoryId: vm.subcategory._id,
          name: vm.subcategory.name
        },
        paymentType: {
          paymentId: vm.paymentType._id,
          name: vm.paymentType.name
        }
      };
      expenseService.savePayment(newPayment).then(function (response) {
        vm.uibModalInstance.close(response);
      }, function (err) {
        console.log(err);
      });
    };
  }
  module.component('newExpense', {
    templateUrl: './app/components/expense/new-expense-component.html',
    bindings: { uibModalInstance: '<' },
    controller: [
      'categoryService',
      'subcategoryService',
      'paymenttypeService',
      'expenseService',
      modalController
    ]
  });
}());