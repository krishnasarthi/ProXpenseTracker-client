(function () {
    'use strict';

    var module = angular.module('xpenseTracker');

    module.component('editExpense', {
        templateUrl: './app/components/expense/edit-expense-component.html',
        bindings: {
            uibModalInstance: '<',
            params: '@'
        },
        controller: editExpenseController
    });



    function editExpenseController(categoryService, subcategoryService, paymenttypeService, expenseService) {
        var vm = this;
        console.log(vm);
        vm.closeModal = function () {
            vm.uibModalInstance.close();
        };

        vm.$onInit = function () {
            expenseService.getPaymentById(vm.params).then(
                function (response) {
                    vm.payment = response.data.data;
                    vm.paymentDate = new Date(vm.payment.paymentDate);
                    vm.amount = vm.payment.amount;
                    vm.description = vm.payment.description
                    loadData();
                },
                function (err) {
                    console.log(err);
                }
            );
        };

        vm.getSubCategory = function () {
            subcategoryService.getSubCategoryByCategory(vm.category).then(function (response) {
                vm.subcategories = response.data.data;
                _.find(vm.subcategories, function (s) {
                    if (s._id == vm.payment.subCategory.subcategoryId) {
                        vm.subcategory = s;
                        return true;
                    }
                });

            }, function (err) {
                console.log(err);
            });
        };

        vm.save = function () {
            var payment_to_update = {
                _id: vm.params,
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

            expenseService.updatePayment(vm.params,payment_to_update).then(
                function(response){
                    console.log(response);
                    vm.uibModalInstance.close();
                },
                function(err){
                    console.log(err);
                });
        };

        function loadData() {

            categoryService.getCategory().then(function (response) {
                vm.categories = response.data.data;
                _.find(vm.categories, function (c) {
                    if (c._id == vm.payment.category.categoryId) {
                        vm.category = c;
                        return true;
                    }
                });

                vm.getSubCategory();
            }, function (err) {
                console.log(err);
            });
            paymenttypeService.getPaymentType().then(function (response) {
                vm.payments = response.data.data;
                _.find(vm.payments, function (p) {
                    if (p._id == vm.payment.paymentType.paymentId) {
                        vm.paymentType = p;
                        return true;
                    }
                });

            }, function (err) {
                console.log(err);
            });
        }
    }

    // $inject property annotation
    editExpenseController.$inject = ['categoryService', 'subcategoryService', 'paymenttypeService', 'expenseService'];
} ());