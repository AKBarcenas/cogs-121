angular.module('MainCtrl', ['gservice']).controller('MainController', function($scope,gservice,$location) {
	$scope.markerArray=[];
	$scope.tagline = 'To the moon and back!';	
	gservice.refresh(37.78,-122.431 );
	$scope.add = function(){
			gservice.createMarker(0,0,$scope.markerArray);
	};

    /*
	    function below will take our app to another URL/route ie go('/chatBot') takes us
	    to chat bot page
    */
	$scope.go = function ( path ) {
  		$location.path( path );
	};

});