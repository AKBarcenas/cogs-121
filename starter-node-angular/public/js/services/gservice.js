


// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        var bigMap;
        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 39.50;
        var selectedLong = -98.35;
        var initLoc;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionsService = new google.maps.DirectionsService();
        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){
            bigMap=null;
            // Array of locations obtained from API calls
            locations = [];

            // Selected Location (initialize to center of America)
            selectedLat = 39.50;
            selectedLong = -98.35;
            initLoc=null;
            directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true
            });
            directionsService = new google.maps.DirectionsService();
            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;
            initialize(latitude, longitude);
            // Perform an AJAX call to get all of the records in the db.

            //TODO this will be our record of restaurants
            $http.get('/users').then(function(response){

                // Convert the results into Google Map Format
                //locations = convertToMapPoints(response);

                // Then initialize the map.
                initialize(latitude, longitude);
            },function(){});
        };


    // Initializes the map
    var initialize = function(latitude, longitude) {
    	
        // Uses the selected lat, long as starting point
        var myLatLng = {lat: selectedLat, lng: selectedLong};

        // If map has not been created already...
        if (!map){

            // Create a new map and place in the index.html page
            var map = new google.maps.Map(document.getElementById('map'), {
                //TODO change based on restaurant locality to user
                zoom: 15,
                center: myLatLng
            });
        }
        directionsDisplay.setMap(map);
        
        var pinesText =  '<p><b>Pines</b>' +
                         '<br><b>Hours:</b> 7 AM - 9 PM' +
                         '<br><b>Type:</b> Dining Hall' +
                         '<br>***PICTURES GO HERE***' +
                         '<br>***REVIEWS GO HERE***' +
                         '<br><button ng-app="MainCtrl" ng-controller="MainController" ng-click="testPrint()">Go Here!</button>' +
                         '</p>';
        var compiled = $compile(pinesText)($scope);

        // temp pre-populated restaurants for milestone 5
        // TODO remove this
        var temp_restaurants = [
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
        
        // Loop through each location in the array and place a marker
        // TODO REMOVE THIS
        temp_restaurants.forEach(function(n, i){
            var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: "Big Map",
                icon: "http://maps.google.com/mapfiles/ms/icons/restaurant.png",
            });

            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e){

                // When clicked, open the selected marker's message
                currentSelectedMarker = n;
                n.message.open(map, marker);
            });
        });

        // Loop through each location in the array and place a marker
        locations.forEach(function(n, i){
            var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: "Big Map",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            });

            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e){
                console.log(e);
                // When clicked, open the selected marker's message
                currentSelectedMarker = n;
                n.message.open(map, marker);
            });
        });

        // Set initial location as a bouncing red marker
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: initialLocation,
            //animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/arrow.png'
        });
        lastMarker = marker;
        bigMap=map;
        initLoc=initialLocation;

    };
    googleMapService.createMarker= function(latitude, longitude,MarkerArray){
        var myLatLng = {lat: selectedLat, lng: selectedLong};
        if (!bigMap){
            console.log("NO MAP FOUND");
            // Create a new map and place in the index.html page
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: myLatLng
            });
        }
        var msg="testing"
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var newContent={
             message: new google.maps.InfoWindow({
                content: msg,
                maxWidth: 320
            })
        }; 
        var marker = new google.maps.Marker({
            position: initialLocation,
            map: bigMap,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            newContent.message.open(map, marker);
        });
        MarkerArray.push(marker);
    };
    
    googleMapService.routeTo= function(lat,long){
        var dest = new google.maps.LatLng(lat,long);
        var request = {
            origin: initLoc,
            destination: dest,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log(status);
            }
        });
    };
    // Refresh the page upon window load. Use the initial latitude and longitude
    google.maps.event.addDomListener(window, 'load',
        googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
});
