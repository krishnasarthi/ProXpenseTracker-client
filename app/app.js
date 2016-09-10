(function () {
  'use strict';
  var module = angular.module('xpenseTracker', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
  ]);
  module.config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/category', { template: '<category-component></category-component>' }).when('/transactions', { template: '<expense></expense>' }).when('/reports', { template: '<reports></reports>' }).otherwise({ redirectTo: '/transactions' });
    }
  ]);
  module.component('appAbout', { template: '<h1>This is an About page.............</h1>' });

  module.run(function($rootScope){
    $rootScope.$on('$routeChangeStart',function(event,next,current){
      console.log('route changing........................');
    });
  });
}());