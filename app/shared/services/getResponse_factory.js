'use strict';

/*
 * Factory: appResponse  - Get data from JSON
 */

var appResponse = angular.module('appResponse', []);

appResponse.factory('appResponse', ['$http',function ($http) {
	function load(path){
		return $http.get('data/'+path+'.json');
	}
	return {
		getData: function(name){
			return load(name);
		}
	};
}
]);
