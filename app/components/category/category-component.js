(function () {
    "use strict";
    var module = angular.module("xpenseTracker");

    function controller(categoryService,$uibModal) {
        var vm = this;
        vm.categories = [];

        function getCategory() {
            categoryService.getCategory().then(
                function (response) {
                    vm.categories = response.data.data;
                } ,
                function (error) {
                    console.log(error);
                }
            );
        }

        vm.editMode = function(id){
            if(vm.editableRow === id){
                vm.editableRow = '';
            }else{
                vm.editableRow = id;
            }
        };

        vm.isInEditMode = function(id){
            return vm.editableRow === id;
        }

        vm.$onInit = function () {
            vm.editableRow = '';
            getCategory();
        };

        vm.deleteCategory = function(category){
            categoryService.deleteCategory(category._id).then(
                function(response){
                    console.log(response);
                    getCategory();
                },
                function(err){
                    console.log(err);
                });
        };

        vm.updateCategory = function(category){
            categoryService.updateCategory(category._id,category).then(
                function(response){
                    vm.editMode(category._id);
                    getCategory();
                },
                function(err){
                    console.log(err);
                });
        };

        vm.newCategory = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                template: '<new-category uib-modal-instance="$ctrl.uibModalInstance"></new-category>',
                size: 'md',
                controller: function ($uibModalInstance) {
                    this.uibModalInstance = $uibModalInstance;
                },
                controllerAs: '$ctrl'
            });

            modalInstance.result.then(function (response) {
                if(response && response.status === 200){
                    getCategory();
                }
            }, function (error) {
                console.log(error);
            });
        };

        vm.selectPage = function (value) {
            console.log(value + '............');
        }
    }
    module.component("categoryComponent", {
        templateUrl: "/app/components/category/category-component.html",
        controller: ['categoryService', '$uibModal',controller]
    });
} ());