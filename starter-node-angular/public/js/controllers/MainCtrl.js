angular.module('MainCtrl', ['gservice']).controller('MainController', function($scope,gservice,$location) {

	$scope.tagline = 'To the moon and back!';	
	gservice.refresh(37.78,-122.431 );
	
    /*
	    function below will take our app to another URL/route ie go('/chatBot') takes us
	    to chat bot page
    */
	$scope.go = function ( path ) {
  		$location.path( path );
	};

});