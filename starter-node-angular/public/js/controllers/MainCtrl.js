angular.module('MainCtrl', ['gservice','geolocation','chatSocket']).controller('MainController', function($scope,$compile,gservice,$location,geolocation,chatSocket,$http) {
	$scope.markerArray=[];
	$scope.tagline = 'To the moon and back!';
	$scope.DestLong=-117.242502;
	$scope.DestLat=32.879227;
	currentLocation={};
	//TODO change this to the user's current location, centered on
	//gservice.refresh(32.8800604, -117.2340135);32.8696° N, 117.2154° W
	$scope.add = function(lat,long){
			gservice.createMarker(lat,long,$scope.markerArray);
			$scope.setDest(lat,long);
	};
	$scope.setDest = function(lat,long){
		$scope.DestLong=long;
		$scope.DestLat=lat;
	};
	$scope.refresh = function(){
		geolocation.getLocation().then(function(locData){
			console.log(locData);
			gservice.refresh(locData.coords.latitude,locData.coords.longitude );
			currentLocation.latitude=locData.coords.latitude;
			currentLocation.longitude=locData.coords.longitude;
		},function(error){

		},
		{enableHighAccuracy: true});
		$scope.markerArray=[];
		$scope.DestLong=-117.242502;
		$scope.DestLat=32.879227;
		currentLocation={};
    };
	$scope.refresh();


	$scope.message="";
	$scope.send = function() {
		var userMessage = $scope.message;
		console.log("Sent: " + $scope.message);
		chatSocket.emit("hello");


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

                 var latitude = currentLocation.latitude;
                 var longitude = currentLocation.longitude;
 
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
                     $scope.add(response1.data.coordinates.latitude, response1.data.coordinates.longitude);
                 // Then initialize the map.
                 },function(){});
              },function(){});

	};

	$scope.routeTo=function(){
		gservice.routeTo($scope.DestLat,$scope.DestLong);
		console.log("ROUTING TO DESTINATION");
	};

        $scope.testPrint=function(){
           console.log("CONTROLLER IS CONNECTED");
        };

});
