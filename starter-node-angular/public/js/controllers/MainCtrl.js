
				
angular.module('MainCtrl', ['gservice','geolocation','chatSocket']).controller('MainController', function($scope,gservice,$location,geolocation,chatSocket,$http, $sce) {
	$scope.$sce = $sce;

	$scope.markerArray=[];
	$scope.tagline = 'To the moon and back!';
	$scope.DestLong=-117.242502;
	$scope.DestLat=32.879227;
	currentLocation={};
	$scope.chatDisable=false;
	$scope.goToMap = function() {
		var link = "map";
    	var place = document.getElementById(link);
		place.scrollIntoView();
        window.scrollBy(0, -100);
        return false;
	};
			
	$scope.goToChat = function() {
		var link = "karan";
        var place = document.getElementById(link);
        place.scrollIntoView();
        window.scrollBy(0, -60);
    	return false;
	};
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
		navigator.geolocation.getCurrentPosition(function(locData){
			console.log(locData);
			gservice.refresh(locData.coords.latitude,locData.coords.longitude );
			currentLocation.latitude=locData.coords.latitude;
			currentLocation.longitude=locData.coords.longitude;
		},function(error){
			console.log(error);
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
		$scope.chatDisable=true;
		chatSocket.emit("hello");
		//document.getElementById("submitButton").setAttribute("disabled", true);

		//Generate unix timestamp as unique id
		var ts = Math.round((new Date()).getTime() / 1000);
		console.log("Timestamp: " + ts);

		$('#messages').append('<li class=\"animated fadeInUp\" id=\"' + ts + '\">' + $scope.message + '</li>');

		var removeTS = ts+999;
		$('#messages').append('<li class=\"animated fadeInUp\" id=\"' + removeTS + '\"> <img src="images/typing.gif" width="50px" alt="loading"> </li>');

		var msg = $scope.message;
		$scope.message = "";
 
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

                var containsFood = intentHashtable.hasOwnProperty('food');
                var containsFavorites = intentHashtable.hasOwnProperty('favorites');
                var containsDirections = intentHashtable.hasOwnProperty('directions');
                var containsAcceptance = intentHashtable.hasOwnProperty('acceptance');
                var containsRejection = intentHashtable.hasOwnProperty('rejection');
                var containsAddition = intentHashtable.hasOwnProperty('addition');


                if(containsFood && !containsFavorites && !containsDirections) {
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

	 				//Remove loading animation 


	                // Perform an AJAX call to get all of the records in the db.
	                //TODO this will be our record of restaurants
	                $http(req).then(function(response1){
	                    console.log(response1);
	                    if(response1.data.hasOwnProperty('name'))  {
	                    	document.getElementById(removeTS).remove();
	                    	message1 = "You should go to a place called ";
                            message2 = ". You can go back to the map for directions. You can also tell me another type of food that you want.";
		                    $('#messages').append('<li class=\"animated fadeInUp\" id=\"' + ts + '\">' + message1 + '<b>' + response1.data.name + '</b>' + message2 + '</li>');
		                    //document.getElementById("submitButton").disabled = false;
		                    $scope.add(response1.data.coordinates.latitude, response1.data.coordinates.longitude);
		                    
		                    var objDiv = document.getElementById("messageWindow");
							objDiv.scrollTop = objDiv.scrollHeight;
							
							gservice.routeTo($scope.DestLat,$scope.DestLong).then(function(r){
								$scope.directions=r;
                                var link = document.getElementById('openMaps');
                                var destLoc = response1.data.id;
                                link.setAttribute("href", "https://www.google.com/maps/dir/?api=1&destination=" + destLoc + "&travelmode=driving");
                                console.log("href set");
							});
	                    }

	                    else  {
	                    	document.getElementById(removeTS).remove();
	                    	message = "I'm not sure what you are trying to tell me. Let's try finding another food item you want to have.";
	                    	$('#messages').append('<li class=\"animated fadeInUp\" id=\"' + ts + '\">' + message + '</li>'); 
	                    	//document.getElementById("submitButton").disabled = false;
	                    }
	                    $scope.chatDisable=false;
	                // Then initialize the map.
	                },function(){});
	            }

	            else  {
	            	document.getElementById(removeTS).remove();
                	message = "I'm not sure what you are trying to tell me. Let's try finding another food item you want to have.";
                	$('#messages').append('<li class=\"animated fadeInUp\" id=\"' + ts + '\">' + message + '</li>'); 
                	
					var objDiv = document.getElementById("messageWindow");
					objDiv.scrollTop = objDiv.scrollHeight;
                	$scope.chatDisable=false;

                }	
                var objDiv = document.getElementById("messageWindow");
				objDiv.scrollTop = objDiv.scrollHeight;
              },function(){});

	};
	$scope.directions=[];
	$scope.routeTo=function(){
		gservice.routeTo($scope.DestLat,$scope.DestLong).then(function(r){
			$scope.directions=r;
        });
		console.log("ROUTING TO DESTINATION");
		$scope.print();
	};

    $scope.print = function(){
		console.log("Scope print");
		console.log($scope.directions);
	}

});
