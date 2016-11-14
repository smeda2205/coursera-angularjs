(function() {
  'use strict';

  var app = angular.module('myFirstApp', []);
  app.controller('MyFirstController', [ '$scope', function($scope){
      $scope.name = "Srini";
      $scope.totalValue = 0;

      $scope.displayNumeric = function() {
        var totalNameValue = calculateNumericForString($scope.name);

        $scope.totalValue = totalNameValue;
      };

      function calculateNumericForString(string) {
        var totalStringValue = 0;
        for(var i=0; i<string.length; i++){
          totalStringValue += string.charCodeAt(i);
        }

        return totalStringValue;
      }
  }]);

//The AngularJs service that's responsible for Dependency Injection is called $injector

  app.controller('DIController', function($scope, $filter){
      $scope.name = "Srini";

      //The filter service $filter is a service that lets us create filtering functions that are used for formatting the data that eventually gets displayed to the user.

      $scope.upper = function(){
        var upCase = $filter('uppercase');
        $scope.name = upCase($scope.name);
      };
  });

  // Protectig DI from minification
  // Minification is the process of reducing the size of JS by removing extra characters.
  // DI in Angular need to be minification proof

  // 1 way:
  // app.controller('ProtectedDIController', ['$scope', '$filter', function($scope, $filter){
  //     $scope.name = "Srini";
  //
  //     //The filter service $filter is a service that lets us create filtering functions that are used for formatting the data that eventually gets displayed to the user.
  //
  //     $scope.upper = function(){
  //       var upCase = $filter('uppercase');
  //       $scope.name = upCase($scope.name);
  //     };
  // });

  // 2nd way

  // app.controller('ProtectedDIController', ['$scope', '$filter', ProtectedDIController]);
  //
  // function ProtectedDIController($scope, $filter){
  //     $scope.name = "Srini";
  //
  //     //The filter service $filter is a service that lets us create filtering functions that are used for formatting the data that eventually gets displayed to the user.
  //
  //     $scope.upper = function(){
  //       var upCase = $filter('uppercase');
  //       $scope.name = upCase($scope.name);
  //     };
  // };

  // 3rd way

  app.controller('ProtectedDIController', ProtectedDIController);

  ProtectedDIController.inject = ['$scope', '$filter'];
  function ProtectedDIController($scope, $filter){
      $scope.name = "Srini";

      //The filter service $filter is a service that lets us create filtering functions that are used for formatting the data that eventually gets displayed to the user.

      $scope.upper = function(){
        var upCase = $filter('uppercase');
        $scope.name = upCase($scope.name);
      };
  };

  // Till here protecting DI from minification

})();
