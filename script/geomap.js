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
        var pos2 = position.coords;           
            var dm = getDistanceFromLatLonInKm(pos2.latitude, pos2.longitude, 59.313627, 18.110746);
            var dm2 = getDistanceFromLatLonInKm(pos2.latitude, pos2.longitude, 59.314560, 18.112852);
            var dm3 = getDistanceFromLatLonInKm(pos2.latitude, pos2.longitude, 59.314910, 18.115277);
            var dm4 = getDistanceFromLatLonInKm(pos2.latitude, pos2.longitude, 59.313387, 18.116409);

            var min = [dm, dm2, dm3, dm4];

            Array.min = function( array ){
                return Math.min.apply( Math, array );
            };
            var minimum = Array.min(min);
            var i = min.indexOf(Math.min(...min));


            console.log(min);
            console.log(i);
            console.log(minimum);

  
            let clueContainer = document.getElementById("clue");


            if(pos2.accuracy >= minimum && i === 0) {
              console.log("hello");
              console.log();
              google.maps.event.addListener(markerGlastonbury, 'click', function(){
                clueContainer.style.display = "block";
              });
            } else if(pos2.accuracy >= minimum && i === 1) {
              google.maps.event.addListener(markerKatrineholm, 'click', function(){
                clueContainer.style.display = "block";
              });
            } else if(pos2.accuracy >= minimum && i === 2) {
              google.maps.event.addListener(markerEskilstuna, 'click', function(){
                clueContainer.style.display = "block";
              });
            } else if(pos2.accuracy >= minimum && i === 3) {
              google.maps.event.addListener(markerUppsala, 'click', function(){
                clueContainer.style.display = "block";
              });
            }
			});
		}


//Calls the function below to load up all the map markers.
loadMapMarkers();

}
var markerPositionGlastonbury = new google.maps.LatLng(59.313627, 18.110746);
var markerKatrineholm = new google.maps.LatLng(59.314560, 18.112852);
var markerEskilstuna = new google.maps.LatLng(59.314910, 18.115277);
var markerUppsala = new google.maps.LatLng(59.313387, 18.116409);


//Function that loads the map markers.
function loadMapMarkers (){

//GLASTONBURY -----------------


//Setting the position of the Glastonbury map marker.



//Creating the Glastonbury map marker.
markerGlastonbury = new google.maps.Marker({
      //uses the position set above.
	  position: markerPositionGlastonbury,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'första ledtråd',
      icon: 'pins/blue_MarkerB.png'
});




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



//Creating the Glastonbury map marker.
markerEskilstuna = new google.maps.Marker({
      //uses the position set above.
	  position: markerEskilstuna,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'tredje ledtråden',
      icon: 'pins/green_MarkerD.png'
});




//Creating the Glastonbury map marker.
markerUppsala = new google.maps.Marker({
      //uses the position set above.
	  position: markerUppsala,
	  //adds the marker to the map.
      map: festivalMap,
      title: 'Uppsala wonderful',
      icon: 'pins/orange_MarkerE.png'
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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371000; // Radius of the earth in m
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}