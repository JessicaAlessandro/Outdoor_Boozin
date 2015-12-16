// console.log('hi!');

$(document).ready();

function init() {
  // console.log('init works.');
  $('.btn').click(getTemperature);
}

function clearText() {
  $("input").val('');
  $("input").attr('placeholder', '');
}

// =================
// GRABBER VARIABLES
// =================
	var $mapDiv = $('#map');
	console.log($mapDiv)
	var $submit = $('#submit');
	// console.log($submit);
	var $errorMessage = $('.error-field');
	// console.log($errorMessage);

	$submit.click(function(){
			// console.log('button works!');
			$zipCode = $('#zipcode-field').val();
			// console.log($zipCode);

			if ($zipCode.length !== 5) {
				$errorMessage.removeClass("hidden").text("Please enter a valid zip code.");
			} else {
				// console.log("valid zipcode");
				getTemperature($zipCode);
			}; //end of else statement
	}); //end of click event

var getTemperature = function(zipcode) {
	
	console.log('getTemperature');
	console.log(zipcode);

	// var placeData = {
	// 	"itinerary" : data
	// };

	$.ajax({
		url: "http://api.wunderground.com/api/7bb261b08380e2e2/geolookup/conditions/forecast/q/UnitedStates" + zipcode + ".json"
	}).done(function(result) {
		// console.log(result);

		checkTemp(result);

		// call function that uses result

	}).fail(function(err) {
		console.log('Error!!!!!', err);
	}); 

}; // end getTemperature


var currentTemperature = function(){
    if (data.current_observation.feelslike_string) {
      $("#result-container").removeClass("hidden");
      $("#good-weather").text(data.current_observation.feelslike_string);
    } else {
      $("#weather").text("Incorrect Zip.");
    }
}

var checkTemp = function(result){
	// console.log('ZIP: ', result.location.zip);

	// console.log('DATA: ', result);
	var feelslike = result.current_observation.feelslike_f;
	// console.log('FEELS LIKE: ', feelslike);
	// console.log('TYPE: ', typeof feelslike);
	var num = parseInt(feelslike);
	console.log(num);

	mapData = {
		latitude : result.location.lat,
		longitude : result.location.lon,
		zip : result.location.zip
	};

	// console.log(mapData);
	// console.log(typeof mapData.latitude);


	if (num => 60) {
		$mapDiv.removeClass("hidden");
		initMap(mapData);
	} else {
		console.log("boing");
	}

};

var map;
var infowindow;

function initMap(mapData) {
	console.log(mapData)



	var latitude = parseFloat(mapData.latitude);
	// console.log('Latitude: ', latitude);
	// console.log('Latitude TypeOf: ', typeof latitude);


	var longitude = parseFloat(mapData.longitude);

	console.log('Longitude: ', longitude);
	// console.log('Longitude TypeOf: ', typeof longitude);
	var zip = parseInt(mapData.zip);
	// console.log('Zip: ',zip);
	// console.log('Zip TypeOf: ',typeof zip);

	var centralLocation = {latitude, longitude};
	// console.log('Central Location ', centralLocation);
	// console.log('CentralLocation Latitude TypeOf: ', typeof centralLocation.latitude);
	// console.log('CentralLocation Longitude TypeOf: ',typeof centralLocation.latitude);	


  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 10
  });

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location:  {lat: latitude, lng: longitude},
    radius: 1000,
    types: []
  }, callback)
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
} 



// function initAutoComplete(zip) {

// 	console.log('initAutoComplete: ', zip);

//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 25.777859, lng: -80.296156},
//     zoom: 13,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });

//   console.log(map);

//   // // Create the search box and link it to the UI element.
//   // // var input = document.getElementById('pac-input');
//   var searchBox = new google.maps.places.SearchBox(zip + ' outdoor bar');
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(zip + ' outdoor bar');

//   // console.log('searchBox: ', searchBox);

//   // // Bias the SearchBox results towards current map's viewport.
//   map.addListener('bounds_changed', function() {
//     searchBox.setBounds(map.getBounds());
//   });

//   var markers = [];
//   // [START region_getplaces]
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();

//     if (places.length == 0) {
//       return;
//     }

//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];

//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));

//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//   }); // searchBox listener
// }