angular.module('ChatbotCtrl', []).controller('ChatbotController', function($scope,$location) {

	$scope.tagline = 'This is the Chat bot Screen';
	/*
	    function below will take our app to another URL/route ie go('/chatBot') takes us
	    to chat bot page
    */
	$scope.go = function ( path ) {
  		$location.path( path );
	};

});