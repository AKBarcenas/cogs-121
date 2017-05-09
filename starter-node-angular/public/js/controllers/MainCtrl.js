angular.module('MainCtrl', ['gservice','geolocation','chatSocket']).controller('MainController', function($scope,gservice,$location,geolocation,chatSocket,$http) {
	$scope.markerArray=[];
	$scope.tagline = 'To the moon and back!';
	$scope.DestLong=-117.242502;
	$scope.DestLat=32.879227;
	//TODO change this to the user's current location, centered on
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


	$scope.message="";
	$scope.send = function() {
		var userMessage = $scope.message;
		console.log("Sent: " + $scope.message);
		chatSocket.emit("fuck");


		$('#messages').append('<li class=\"animated fadeInUp\">' + $scope.message + '</li>');

		var msg = $scope.message;
 
             var ai = {
                 url: '/bot',
                  params: {
                   'message': msg,
                  },
                  dataType: 'json',
                  method: 'GET'
              }

		$http(ai).then(function(response){
                 console.log(response);
                 intentHashtable = response.data.entities;
                 messageContent = intentHashtable["food"][0]["value"];
                 console.log(messageContent + "YEET");

                 var latitude = 32.8328;
                 var longitude = -117.2713;
 
                 var req = {
                     url: '/yelp',
                     params: {
                         'food' : messageContent,
                         'longitude': longitude,
                         'latitude' : latitude
                     },
                     dataType: 'json',
                     method: 'GET'
                 }
 
 				console.log("here");
                 // Perform an AJAX call to get all of the records in the db.
                 //TODO this will be our record of restaurants
                 $http(req).then(function(response1){
                     console.log(response1);
                     messageContent = "You should try " + response1.data.name;
                     $('#messages').append('<li class=\"animated fadeInUp\">' + messageContent + '</li>');

                 // Then initialize the map.
                 },function(){});
              },function(){});

	};

	$scope.routeTo=function(){
		gservice.routeTo($scope.DestLat,$scope.DestLong);
		console.log("ROUTING TO DESTINATION");
	}







});
