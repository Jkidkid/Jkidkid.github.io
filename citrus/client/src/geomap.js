let clueMarkers = [
	{
    id: '0',
    clue_lat: 59.313627, clue_lng: 18.110746,
    icon: 'pins/blue_MarkerB.png',
    header: 'Mordplats',
    imgSrc: 'karlsson.png',
    info: 'Ett mord har skett i Nacka',
    clickable: false, open: false
  }
];



var clues = document.getElementById('modal'),
    button = document.getElementById('modal-close-btn'),
    myLatLong,
    distanceBetween,
    watchId,
    yourMarker,
    map;



function getClues () {
  fetch("http://localhost:3000/api/clues").then(function(res) {
    // res instanceof Response == true.
    if (res.ok) {
    //  console.dir(res.json);
      res.json().then(function(data) {
        data.forEach((coords) => {
          clueMarkers.push(coords);
          addMarker(coords);
          //clueMarkers.push
        });
      });
    } else {
      console.log("Looks like the response wasn't perfect, got status", res.status);
    }
  }, function(e) {
    console.log("Fetch failed!", e);
  });
}


/*
function marker (props){
  //coords = {lat: props.clue_lat, lng: props.clue_lng};
  //  console.log(coords);
  var marker = new google.maps.Marker({
      position: {lat: props.clue_lat, lng: props.clue_lng},
      map: map,
      //icon: props.icon,
      //title: props.id // title is a string "0", "1" etc just for binding the marker to right clue from clue-array
    });
}
*/
// Start the game
function startMap () {
    var myPos = navigator.geolocation.getCurrentPosition(initMap);

}
function initMap(myPos) {
	var options = {
			enableHighAccuracy: true,
			zoom: 16,
			center: new google.maps.LatLng(myPos.coords.latitude, myPos.coords.longitude)
		}

  map = new google.maps.Map(document.getElementById('map'), options);

  yourMarker = new google.maps.Marker(
		{
			title: 'You',
			content: 'Player',
      map: map,
      position: options.center
		});



			addMarker(clueMarkers[0]);

		// if player comes in we just add crimeplace/Startposition
		if (navigator.geolocation) {
					watchId =	navigator.geolocation.watchPosition(showPosition);
				}
}

	function showPosition(position){
			myLatLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			yourMarker.setPosition(myLatLong);
			checkDistanceToClues(myLatLong);
			map.setCenter(myLatLong);
			yourMarker.setMap(map);
	}

  function addMarker (props) {
		  var marker = new google.maps.Marker({
        position: {lat: props.clue_lat, lng: props.clue_lng},
				map: map,
				icon: props.icon,
        title: props.id // title is a string "0", "1" etc just for binding the marker to right clue from clue-array
      });


			google.maps.event.addListener(marker, 'click', function() {
				modalClickable = clueMarkers[marker.title].clickable;
				open = clueMarkers[marker.title].open;
				// prevent user to click if the distance between player and marker is more then 20 meters
				if(modalClickable){
					writeClue(clueMarkers[marker.title]);
				  clues.style.display = "flex";

        }
      });
  			button.addEventListener('click', function() {
        if(!clueMarkers[0].open){
            getClues();
            clueMarkers[0].open = true;
          }
				clues.style.display = "none";

			});
}


  // Checking distance between player and cluemarkers, if distance less or equal to 20 meters
	// and the clue is not opened before we make the clues clickable
	function checkDistanceToClues(player){
		for(let clue of clueMarkers){
			let clueLatLng = new google.maps.LatLng({lat: clue.clue_lat, lng: clue.clue_lng});
					distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(player, clueLatLng);

			if(distanceBetween <= 1000 && !clue.clickable){
				clue.clickable = true;
				console.log(`You have ${Math.floor(distanceBetween)} meters to a new clue `);
			}
		}
	}
	//write out the clues to the modal
	const writeClue = (props) => {
	  const header = document.getElementById('clue-header');
	  const img = document.getElementById('cluePic');
	  const info = document.getElementById('clueInfo');
	    header.innerHTML = props.header;
	    img.src = props.imgSrc;
	    info.innerHTML = props.info;
};
