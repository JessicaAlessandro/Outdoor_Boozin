// console.log('hi!');

$(document).ready(
	function(){
		$mapDiv.hide();
		$coldContainer.hide();
	}
);

// =================
// GRABBER VARIABLES
// =================
var $mapDiv = $('#map');
// console.log($mapDiv)
var $submit = $('#submit');
// console.log($submit);
var $errorMessage = $('.error-field');
// console.log($errorMessage);
var $coldContainer = $('#error-container');
// console.log($coldContainer)
var map;
var infowindow;

// function clearText() {
//   $("#zipcode-field").val('');
//   $("input").attr('placeholder', '');
// };

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

// making an ajax request to the wundergrond api using zipcode
var getTemperature = function(zipcode) {	
	console.log('running getTemperature()');
	// console.log(zipcode);
	$.ajax({
		url: "http://api.wunderground.com/api/7bb261b08380e2e2/geolookup/conditions/forecast/q/UnitedStates" + zipcode + ".json"
	}).done(function(result) {
		// console.log(result);
		console.log('Got temperature results, running checkTemp()');
		checkTemp(result);
		// call function that uses result
	}).fail(function(err) {
		console.log('Error!!!!!', err);
	}); 
}; // end getTemperature function

var currentTemperature = function(){
  if (data.current_observation.feelslike_string) {
      $("#result-container").removeClass("hidden");
      $("#good-weather").text(data.current_observation.feelslike_string);
  } else {
      $("#weather").text("Incorrect Zip.");
    }
}

var checkTemp = function(result){
	console.log('checkTemp() running');
	// console.log('ZIP: ', result.location.zip);
	// console.log('DATA: ', result);
	var feelslike = result.current_observation.feelslike_f;
	// console.log('FEELS LIKE: ', feelslike);
	// console.log('TYPE: ', typeof feelslike);
	var num = parseInt(feelslike);
	console.log('feelsike variable: ', num);

	mapData = {
		latitude : result.location.lat,
		longitude : result.location.lon,
		zip : result.location.zip
	};
	// console.log(mapData);
	// console.log(typeof mapData.latitude);

	// if (num >= 0) {
	// 	console.log('greater than or equal to: 0');
	// } else {
	// 	console.log('less than: 0');
	// }

	if (num >= 60) {
		// debugger;
		console.log(feelslike + ' is greater than or equal to: 60');
		$coldContainer.hide();
		$mapDiv.show();
		console.log('attempting to run initMap() . . . . ');
		initMap(mapData);
	} else {
		console.log(feelslike + ' is less than: 60');
		$mapDiv.hide();
		$coldContainer.show();
		// console.log("boing");
	}
}; // end of checkTemp function

function initMap(mapData) {
	console.log('running initMap!');

	var latitude = parseFloat(mapData.latitude);
	// console.log('Latitude: ', latitude);
	// console.log('Latitude TypeOf: ', typeof latitude);


	var longitude = parseFloat(mapData.longitude);

	// console.log('Longitude: ', longitude);
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
    zoom: 13
  });

  console.log('map object defined');

  infowindow = new google.maps.InfoWindow();

  console.log('infowindow defined');

  var request = {
    location: {lat: latitude, lng: longitude},
    radius: '500',
    query: 'outdoor seating' && 'bar' || 'restaurant'
  };

 	var service = new google.maps.places.PlacesService(map);
 	console.log('placesService defined. Attempting to run service . . . ');
  service.textSearch(request, callback);

} //end of initMap function

function callback(results, status) {
	console.log('service callback running!')
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log('running createMarker loop')
    }
  }
} //end of callback function

function createMarker(place) {
	console.log('running createMarker function()');
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  // console.log(place);
  var infowindowContent = ("<strong>" + place.name + "</strong>" + "<br>" + place.formatted_address)


  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(infowindowContent);
    infowindow.open(map, this);
  });
} //end of createMarker function
