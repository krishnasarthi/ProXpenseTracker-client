(function () {
    "use strict";
    var module = angular.module("xpenseTracker");

    function reportController(expenseService){
      var vm = this;

        vm.$onInit = function(){
            vm.isCollapsed = false;
        };
      vm.generateReports = function(params){
        console.log(params);
      };
    }

    module.component("reports", {
        templateUrl: "/app/components/report/report-component.html",
        controller: ['expenseService',reportController]
    });
} ());