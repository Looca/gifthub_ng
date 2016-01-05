'use strict';

// Category controller

var categoriesModule = angular.module('categories', []);

categoriesModule.controller('categoriesCtrl', ['$scope', 'appResponse', function($scope, appResponse)  {
	var self = this,
			defaultCategory = "ladies", // Set default category
			defaultSection = "", // Set default section
			currentCategory = "",
			currentSection = "",
			locationCategory = "",
			locationSection = "";

	function init(){
		// Wait for scope update on parent controller
		$scope.$watch('giftHub', function(){
			// Get data from parent controller
			self.response = $scope.$parent.main.giftHub;
			// Check location of the browser window
			locationCategory = $scope.main.uri.category;
			locationSection = $scope.main.uri.section;
			// If empty set it to defaultCategory

			if(locationCategory !== '') {
				currentCategory = locationCategory;
			} else {
				currentCategory = defaultCategory;
			}

			if(locationSection !== '') {
				currentSection = locationSection;
			}
			// Re-build URL
			location.href = window.location.pathname + "#/" + currentCategory + "/" + currentSection;

			loadContent(currentCategory);
		});
	}
	function loadContent(category){
		// Update default category to current category

		currentCategory = category;
		// Append URL with category name
		if(locationSection === "") {
			location.href = window.location.pathname + "#/" + currentCategory;
		}
		// Display data
		self.data = self.response[category];
	}

	function updateContent(category){
		// Update default category to current category
		currentCategory = category;
		// On category change reset section
		locationSection = "";
		// Display data
		self.loadContent(category);
	}

	// On page load Initialize
	init();

	return self = {
				currentCategory: currentCategory,
				loadContent: loadContent,
				updateContent: updateContent
	}
}]);
