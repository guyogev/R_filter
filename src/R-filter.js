/*globals angular, R*/
'use strict';
angular.module('app', []).factory('R_filter', [
  function () {
    var service = {};

    service.filter = function (properties_and_values, target) {
      return R.filter(R.whereEq(properties_and_values), target);
    };

    service.groupBy = function (key, target) {
      var groupByKey = R.groupBy(function (t) {
        return t[key].toString();
      });
      return groupByKey(target);
    };

    service.filterAndGroup = function (properties_and_values, key, target) {
      var f = R.curry(service.filter)(properties_and_values);
      var g = R.curry(service.groupBy)(key);
      return R.compose(g, f)(target);
    };

    return service;
  }
]);