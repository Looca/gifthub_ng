'use strict';

// Shop by controller

var shopByModule = angular.module('shopBy', []);

shopByModule.controller('shopByCtrl', ['$scope', function($scope)  {
	var self = this,
	defaultSection = "shop-by-price",
	windowSection = "",
	currentSection = defaultSection,
	selectedOption = {};


	function updateSection(item){
		if(item.static){
			// If a item is static url redirect to it
			location.href = window.location.protocol + "//"+ window.location.host + "/" + item.url;
		} else{
			// Otherwise refresh view
			var itemId = item.id;

			self.currentSection = itemId;

			// Update select box for mobile view
			self.selectedOption = {id: itemId};

			// Re-build URL
			var oldUrl = window.location.href,
			index = -1;

			if(oldUrl.lastIndexOf('/') - 1 !== oldUrl.lastIndexOf('#')) {
				index = oldUrl.lastIndexOf('/');
			}

			var baseUrl = index > 0 ? oldUrl.substring(0, index): oldUrl;
			location.href = baseUrl + "/" + self.currentSection;
		}

	}

	// If parent category changes update this data
	$scope.$parent.$watch('category.data', function(value){
		windowSection = $scope.main.uri.section;

		self.data = $scope.$parent.category.data;
		// If section present in url then set defaultSection to this
		if(windowSection !== ""){
			self.currentSection = windowSection;
			// Update select box for mobile view
			self.selectedOption = {id: windowSection};
		} else {
			// Set section to default category
			self.currentSection = defaultSection;
			// Update select box for mobile view
			self.selectedOption = {id: defaultSection};
		}

	});

	return self = {
		defaultSection : defaultSection,
		currentSection : currentSection,
		updateSection  : updateSection,
		selectedOption : selectedOption
	}

}]);
