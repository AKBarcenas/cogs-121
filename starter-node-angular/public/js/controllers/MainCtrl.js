angular.module('MainCtrl', ['gservice']).controller('MainController', function($scope,gservice) {

	$scope.tagline = 'To the moon and back!';	
	gservice.refresh(0, 0);

});