(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  function expenseController(expenseService, $uibModal) {
    var vm = this;
    vm.$onInit = function () {
      vm.isCollapsed = false;
      vm.currentPage = 1;
      vm.sortBy = 'paymentDate';
      vm.orderBy = false;
      vm.limit = 10;
      vm.filter = {};
      getPayments();
    };
    vm.newPayment = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        template: '<new-expense uib-modal-instance="$ctrl.uibModalInstance"></new-expense>',
        size: 'lg',
        controller: function ($uibModalInstance) {
          this.uibModalInstance = $uibModalInstance;
        },
        controllerAs: '$ctrl'
      });
      modalInstance.result.then(function (response) {
        if (response && response.status === 200) {
          getPayments();
        }
      }, function (error) {
        console.log(error);
      });
    };
    vm.editPayment = function (payment) {
      console.log(payment);
      vm.selectedPayment = payment;
      var modalInstance = $uibModal.open({
        animation: true,
        template: '<edit-expense uib-modal-instance="$ctrl.uibModalInstance" params="' + payment._id + '"></edit-expense>',
        size: 'lg',
        controller: function ($uibModalInstance) {
          this.uibModalInstance = $uibModalInstance;
        },
        controllerAs: '$ctrl'
      });
      modalInstance.result.then(function (response) {
        console.log(response);
        if (response && response.status === 200) {
          //getPayments();
        }
      }, function (error) {
        console.log(error);
      });
    };
    vm.pageChanged = function () {
      expenseService.getPartialPayment(vm).then(function (response) {
        vm.transactions = response.data.success.data;
        vm.totalItems = response.data.success.recordCount;
      }, function (error) {
        console.log(error);
      });
    };
    vm.sort = function (key) {
      vm.sortBy = key;
      vm.orderBy = !vm.orderBy;
      vm.currentPage = 1;
      getPayments();
    };
    vm.collapse = function () {
      vm.isCollapsed = !vm.isCollapsed;
    };
    vm.delete = function (payment) {
      expenseService.deletePayment(payment._id).then(function (response) {
        console.log(response);
        getPayments();
      }, function (err) {
        console.log(err);
      });
    };
    vm.resetFilter = function () {
      vm.filter = {};
      getPayments();
    };
    vm.applyFilter = function (param) {
      vm.filter = param;
      getPayments();
    };
    function getPayments() {
      expenseService.getPartialPayment(vm).then(function (response) {
        vm.transactions = response.data.success.data;
        vm.totalItems = response.data.success.recordCount;
      }, function (error) {
        console.log(error);
      });
    }
  }
  module.component('expense', {
    templateUrl: '/app/components/expense/expense-component.html',
    controller: [
      'expenseService',
      '$uibModal',
      expenseController
    ]
  });
} ());