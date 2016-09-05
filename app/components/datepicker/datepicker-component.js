(function () {
  'use strict';
  var module = angular.module('xpenseTracker');
  function datepickerController() {
    var vm = this;
    vm.$onInit = function () {
      vm.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
      };
      vm.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks: false
      };
      vm.format = 'MM/dd/yyyy';
      vm.popup = { opened: false };
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      vm.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];
    };
    vm.open = function () {
      vm.popup.opened = true;
    };
    vm.setDate = function (year, month, day) {
      vm.paymentDate = new Date(year, month, day);
    };
    function getDayClass(data) {
      var date = data.date, mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
        for (var i = 0; i < vm.events.length; i++) {
          var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);
          if (dayToCheck === currentDay) {
            return vm.events[i].status;
          }
        }
      }
      return '';
    }
  }
  module.component('datePicker', {
    templateUrl: './app/components/datepicker/datepicker-component.html',
    bindings: { paymentDate: '=date' },
    controller: datepickerController
  });
}());