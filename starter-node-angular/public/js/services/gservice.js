


// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 39.50;
        var selectedLong = -98.35;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // Perform an AJAX call to get all of the records in the db.
            //TODO this will be our record of restaurants
            $http.get('/users').then(function(response){

                // Convert the results into Google Map Format
                locations = convertToMapPoints(response);

                // Then initialize the map.
                initialize(latitude, longitude);
            },function(){});
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Create popup windows for each record
                var  contentString =
                    '<p><b>Username</b>: ' + user.username +
                    '<br><b>Age</b>: ' + user.age +
                    '<br><b>Gender</b>: ' + user.gender +
                    '<br><b>Favorite Language</b>: ' + user.favlang +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favlang: user.favlang
            });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
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

    // temp pre-populated restaurants for milestone 5
    // TODO remove this
    var temp_restaurants = [
      {
         latlon: new google.maps.LatLng(32.879227, -117.242502),
         message: new google.maps.InfoWindow({
            content: '<p><b>Pines</b>' +
                     '<br><b>Hours:</b> 7 AM - 9 PM' +
                     '<br><b>Type:</b> Dining Hall' +
                     '<br>***PICTURES GO HERE***' +
                     '<br>***REVIEWS GO HERE***' +
                     '<br><button type="button">Go Here!</button>' +
                     '</p>',
            maxWidth: 320
         })
      },
      {
         latlon: new google.maps.LatLng(32.8839368, -117.2333183),
         message: new google.maps.InfoWindow({
            content: '<p><b>Canyon Vista</b>' +
                     '<br><b>Hours:</b> 7 AM - 9 PM' +
                     '<br><b>Type:</b> Dining Hall' +
                     '<br>***PICTURES GO HERE***' +
                     '<br>***REVIEWS GO HERE***' +
                     '<br><button type="button">Go Here!</button>' +
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
                     '<br><button type="button">Go Here!</button>' +
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
                     '<br><button type="button">Go Here!</button>' +
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
                     '<br><button type="button">Go Here!</button>' +
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
                     '<br><button type="button">Go Here!</button>' +
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
                     '<br><button type="button">Go Here!</button>' +
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
                     '<br><button type="button">Go Here!</button>' +
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

};

// Refresh the page upon window load. Use the initial latitude and longitude
google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
});
