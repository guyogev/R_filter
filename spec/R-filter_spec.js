/*globals R, describe, it, expect, beforeEach, angular, mock, module, inject, unused, _ */
'use strict';
describe('R_filter,', function () {
  beforeEach(angular.mock.module('app'));

  var service;
  var users = [
      {name: "user_1", age_group: '25-30',  gender: 'Male',   rank: 1},
      {name: "user_2", age_group: '30-35',  gender: 'Male',   rank: 2},
      {name: "user_3", age_group: '30-35',  gender: 'Female', rank: 3},
      {name: "user_4", age_group: '30-35',  gender: 'Female', rank: 4},
      {name: "user_5", age_group: '45-55',  gender: 'Male',   rank: 1},
      {name: "user_6", age_group: '45-55',  gender: 'Male',   rank: 2},
      {name: "user_7", age_group: '60+',    gender: 'Male',   rank: 3},
      {name: "user_8", age_group: '60+',    gender: 'Female', rank: 4}
    ];
  Object.freeze(users);


  beforeEach(inject(function (R_filter) {
    service = R_filter;
  }));

  it('should exist', function () {
    expect(service).toBeDefined();
  });

  describe('filter', function () {
    it('should filter users where age_group === 30-35 && gender === Female', function () {
      var res = service.filter({age_group: '30-35',  gender: 'Female'}, users);
      expect(res.length).toBe(2);
    });
  });

  describe('groupBy', function () {
    it('should divide users by age_group', function () {
      var res = service.groupBy('age_group', users);
      expect(R.keys(res).length).toBe(4);
      expect(res['25-30'].length).toBe(1);
      expect(res['30-35'].length).toBe(3);
      expect(res['45-55'].length).toBe(2);
      expect(res['60+'].length).toBe(2);
    });
  });

  describe('usage examples', function () {
    it('grouping all males users by ranks', function () {
      var males_grouped_by_rank =  service.groupBy(
        'rank',
        service.filter(
          {gender: 'Male'},
          users
        )
      );
      expect(R.keys(males_grouped_by_rank).length).toBe(3);
      expect(males_grouped_by_rank['1'].length).toBe(2);
    });
  });
});