angular.module('MainCtrl', ['gservice','geolocation','chatSocket']).controller('MainController', function($scope,$compile,gservice,$location,geolocation,chatSocket,$http,$q) {
	$scope.markerArray=[];
    $scope.locations = [];
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
			//console.log(locData);
			gservice.refresh($scope.locations,locData.coords.latitude,locData.coords.longitude);
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
    $scope.addLocations = function(){
        var deferred = $q.defer();

        var pinesText =  '<p><b>Pines</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button ng-click="testPrint()">Go Here!</button>' +
                         '</p>';
        var compiled = $compile(pinesText);
        compiled($scope);

        // temp pre-populated restaurants for milestone 5
        // TODO remove this
        $scope.locations = [
          {
             latlon: new google.maps.LatLng(32.879227, -117.242502),
             message: new google.maps.InfoWindow({
                content: compiled[0],
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.8839368, -117.2333183),
             message: new google.maps.InfoWindow({
                content: '<p><b>Canyon Vista TEST</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button" ng-click="testPrint()">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.8788119, -117.2304304),
             message: new google.maps.InfoWindow({
                content: '<p><b>Foodworx</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.8747459, -117.2420341),
             message: new google.maps.InfoWindow({
                content: '<p><b>64 Degrees</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.8832115, -117.2426718),
             message: new google.maps.InfoWindow({
                content: '<p><b>Oceanview Terrace</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.886377, -117.24303),
             message: new google.maps.InfoWindow({
                content: '<p><b>Cafe Ventanas</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.882915, -117.2403442),
             message: new google.maps.InfoWindow({
                content: '<p><b>Goody\'s Place and Market</b>' +
                         '<br><b>Hours:</b> 7 AM - 10 PM' +
                         '<br><b>Type:</b> Mexican / Fast Food' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          },
          {
             latlon: new google.maps.LatLng(32.887978, -117.242072),
             message: new google.maps.InfoWindow({
                content: '<p><b>The Bistro</b>' +
                         '<br><b>Hours:</b> 12 PM - 8 PM' +
                         '<br><b>Type:</b> Fine Dining' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button class= "btn btn-mod btn-small btn-round btn-gray mb-10" type="button">Go Here!</button>' +
                         '</p>',
                maxWidth: 320
             })
          }
        ];

        deferred.resolve('locations added');
        return deferred.promise;
        //gservice.addMarkers($scope.locations,currentLocation.latitude,currentLocation.longitude);
    };
/*    
    $scope.addMarkers = function(loc,lat,long){
        gservice.addMarkers(loc,lat,long);
    };
*/
	//$scope.refresh();
    console.log("entering promise");
    $scope.addLocations().then(function(msg){
        console.log(msg);
        $scope.refresh();
    });

    //gservice.addMarkers($scope.locations,currentLocation.latitude,currentLocation.longitude);


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
