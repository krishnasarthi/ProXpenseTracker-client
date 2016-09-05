(function () {
    "use strict";
    var module = angular.module("xpenseTracker");

    module.component('newCategory',{
        templateUrl: './app/components/category/new-category-component.html',
        controller: ['categoryService',newCategoryController] ,
        bindings: {
            uibModalInstance: '<'
        }
    });

    function newCategoryController(categoryService){
      var vm = this;

        vm.$onInit = function(){
            vm.categoryDesc = '';
        };

        vm.save = function(){
            if(vm.categoryDesc.length===0)
                return;

            var newCategory = {
                name: vm.categoryDesc
            };

            categoryService.saveCategory(newCategory).then(
                function(response){
                    console.log(response);
                    vm.uibModalInstance.close(response);
                },
                function(err){
                    console.log(err);
                });
        };

        vm.closeModal = function () {
            vm.uibModalInstance.close();
        }
    }
} ());