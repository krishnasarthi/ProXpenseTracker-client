(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  module.component('pagination', {
    templateUrl: 'components/pagination/pagination.component.html',
    bindings: {
      pageSize: '<',
      totalItems: '<',
      selectPage: '&'
    },
    controller: paginationCotroller
  });
  function paginationCotroller() {
    var vm = this;
    vm.$onInit = function () {
      vm.pages = Math.ceil(vm.totalItems / vm.pageSize);
    };
  }
}());