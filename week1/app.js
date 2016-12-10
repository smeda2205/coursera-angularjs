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


  // Expressions and Interpolations

  // Expression: {{exp}}
  // Something that evaluates to some value
  //
  //  - Processed by Angular and roughly similar to the result of eval(some_js)
  //  - Executed in the context of scope & has access to the properties on $scope
  //  - Does not throw errors if it results in a TypeError or ReferenceError
  //  - Control flow functions (e.g., 'if' statements, etc.) are not allowed.
  //  - Accept a filter or a filter chain to format the output

  // Interpolation
  // The process of evaluating a string literal containing one or more placeholders, which are replaced with values.
  //  - In Angular, this string:
  //         Message is {{ message }}
  //    (provided message = "hello") is interpolated into this string:
  //         Message is hello
  //  - Still connected to the original message property
  //     - If $scope.message changes, so will the interpolation result


})();
