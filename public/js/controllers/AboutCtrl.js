angular.module('AboutCtrl', []).controller('AboutController', function($scope,$location) {

	$scope.tagline = 'This is the About Screen';
	/*
	    function below will take our app to another URL/route ie go('/chatBot') takes us
	    to chat bot page
    */
	$scope.go = function ( path ) {
  		$location.path( path );
	};

});