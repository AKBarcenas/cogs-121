angular.module('MainCtrl', ['gservice','geolocation']).controller('MainController', function($scope,gservice,$location,geolocation) {
	$scope.markerArray=[];
	$scope.tagline = 'To the moon and back!';
	//TODO change this to the user's current location, centered on campus	
	//gservice.refresh(32.8800604, -117.2340135);
	$scope.add = function(){
			gservice.createMarker(0,0,$scope.markerArray);
	};
	geolocation.getLocation().then(function(locData){
		console.log(locData);
		gservice.refresh(locData.coords.latitude,locData.coords.longitude );
	},function(error){

	},
	{enableHighAccuracy: true});
        
	
	
    /*
	    function below will take our app to another URL/route ie go('/chatBot') takes us
	    to chat bot page
    */
	$scope.go = function ( path ) {
  		$location.path( path );
	};

});
