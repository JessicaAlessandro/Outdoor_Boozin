// console.log('hi!');

// $(document).ready();

function init() {
  console.log('init works.');
  $('.btn').click(getTemperature);
  $('#barsButton'). click(getBars);
}

function clearText() {
  $("input").val('');
  $("input").attr('placeholder', '');
}

// =================
// GRABBER VARIABLES
// =================

	var $submit = $('#submit');
	// console.log($zipCodeInput);
	var $errorMessage = $('.error-field');
	// console.log($errorMessage);
	var $barsButton = $('#bars');
	console.log($barsButton)

	$submit.click(function(){
			console.log('button works!');
			$zipCode = $('#zipcode-field').val();
			console.log($zipCode);

			if ($zipCode.length !== 5) {
				$errorMessage.removeClass("hidden").text("Please enter a valid zip code.");
			} else {
				console.log("valid zipcode");
				getTemperature($zipCode);
			}; //end of else statement
	}); //end of click event

var getTemperature = function(data) {
	
	console.log('getTemperature');
	console.log(data);

	// var placeData = {
	// 	"itinerary" : data
	// };

	$.ajax({
		url: "http://api.wunderground.com/api/7bb261b08380e2e2/geolookup/conditions/forecast/q/UnitedStates" + data + ".json"
	}).done(function(result) {
		console.log(result);
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


// var getTemperature = function(){
// 	$.ajax({
//   url : "https://api.wunderground.com/api/7bb261b08380e2e2/geolookup/conditions/forecast/q/UnitedStates"+$zip+".json",
//   method: 'GET',
//   dataType : "jsonp",
//   success : function(data);
//   }).done(console.log(data));
// }

