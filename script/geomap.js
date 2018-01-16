// Array with markers
let clueMarkers = [
	{ title: 'crime scene', coords: { lat: 59.313627, lng: 18.110746 }, icon: 'pins/blue_MarkerB.png' },
	{ title: 'clue1', coords: { lat: 59.314560, lng: 18.112852 }, icon: 'pins/red_MarkerC.png' },
	{ title: 'clue2', coords: { lat: 59.314910, lng: 18.115277 }, icon: 'pins/green_MarkerD.png' },
	{ title: 'clue3', coords: { lat: 59.313387, lng: 18.116409 }, icon: 'pins/orange_MarkerE.png' }
];

let map, infoWindow, watchId;

function initMap() {
  map = new google.maps.Map(document.getElementById('game_map'), {
    center: {lat: 59.313480, lng: 18.110645},
    zoom: 16
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}




initMap();

for(let i = 0; i < 5; i++ ){
	var dm[i] = i;

}



/*


//Create the variables that will be used within the map configuration options.
//The latitude and longitude of the center of the map.
//The degree to which the map is zoomed in. This can range from 0 (least zoomed) to 21 and above (most zoomed).
var festivalMapZoom = 16;
//The max and min zoom levels that are allowed.
var festivalMapZoomMax = 21;
var festivalMapZoomMin = 6;

//These options configure the setup of the map.
var festivalMapOptions = {
		  center: {lat: 0, lng: 0},
          zoom: festivalMapZoom,
		  //The type of map. In addition to ROADMAP, the other 'premade' map styles are SATELLITE, TERRAIN and HYBRID.
          mapTypeId: google.maps.MapTypeId.ROADMAP,
		  maxZoom:festivalMapZoomMax,
		  minZoom:festivalMapZoomMin,
		  //Turn off the map controls as we will be adding our own later.
		  panControl: false,
		  mapTypeControl: false,
};

//Create the variable for the main map itself.
var festivalMap;

//When the page loads, the line below calls the function below called 'loadFestivalMap' to load up the map.
google.maps.event.addDomListener(window, 'load', loadFestivalMap);



//THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS --------------------------------------------------------------------------------
function loadFestivalMap() {

//The empty map variable ('festivalMap') was created above. The line below creates the map, assigning it to this variable. The line below also loads the map into the div with the id 'festival-map' (see code within the 'body' tags below), and applies the 'festivalMapOptions' (above) to configure this map.
festivalMap = new google.maps.Map(document.getElementById("festival-map"), festivalMapOptions);
if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
          	var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
				festivalMap.setCenter(pos);
				console.log(pos);
			});
		}


//Calls the function below to load up all the map markers.
loadMapMarkers();

}



//Function that loads the map markers.
function loadMapMarkers (){

//GLASTONBURY -----------------


//Setting the position of the Glastonbury map marker.
var markerPositionGlastonbury = new google.maps.LatLng(59.313627, 18.110746);


//Creating the Glastonbury map marker.
markerGlastonbury = new google.maps.Marker({
      //uses the position set above.
	  position: markerPositionGlastonbury,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'första ledtråd',
      icon: 'pins/blue_MarkerB.png'
});

var markerKatrineholm = new google.maps.LatLng(59.314560, 18.112852);


//Creating the Glastonbury map marker.
markerKatrineholm = new google.maps.Marker({
      //uses the position set above.
	  position: markerKatrineholm,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'andra ledtråd',
      icon: 'pins/red_MarkerC.png',

});


// marker onclick

let clueContainer = document.getElementById("clue");
let button = document.getElementById("b");
google.maps.event.addListener(markerKatrineholm, 'click', function(){
	clueContainer.style.display = "block";
});

clueContainer.addEventListener('click', function() {
	clueContainer.style.display = "none";
});


var markerEskilstuna = new google.maps.LatLng(59.314910, 18.115277);


//Creating the Glastonbury map marker.
markerEskilstuna = new google.maps.Marker({
      //uses the position set above.
	  position: markerEskilstuna,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'tredje ledtråden',
      icon: 'pins/green_MarkerD.png'
});

var markerUppsala = new google.maps.LatLng(59.313387, 18.116409);


//Creating the Glastonbury map marker.
markerUppsala = new google.maps.Marker({
      //uses the position set above.
	  position: markerUppsala,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'Uppsala wonderful',
      icon: 'pins/orange_MarkerE.png'
			59.313387, 18.116409
});
}



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(callback) {
            showPosition(callback)
        }, function(error) {
            console.log(error)
        });
    }
}
function showPosition(position) {
    markerPositionSELF = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    markerSELF = new google.maps.Marker({
        position: markerPositionSELF,
        map: festivalMap,
        title: 'Here',
        icon: 'pins/pink_MarkerA.png'
});
}
getLocation();
*/
