'use strict';

/*
* Main App file
* used for configuration
*/

var app = angular.module('JWapp', ['ngRoute','appResponse', 'categories', 'shopBy']);

app.controller('AppController', ['$scope', 'appResponse', function ($scope, appResponse) {
  //main controller. For the moment it only loads the other modules,
  //but it could be used for other purposes as the application grows
  var self = this;
  self.giftHub = {};
  self.uri = {};
  self.giftHubTemplate = "app/giftHubTemplate.html";

  // Retive attributes from url
  self.uri = window.location.hash.substring(1).split('/');
  self.uri.category = self.uri[1] || '';
  self.uri.section = self.uri[2] || '';

  // Retrive data from JSON file
  appResponse.getData('gifthub').then(function(response) {
    self.giftHub = response.data;
  }, function(error) {
    console.log('Problem retriving data. Error ' + error.status);
  });

}]);
