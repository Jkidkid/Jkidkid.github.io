

var clues = document.getElementById('modal'),
		button = document.getElementById('modal-close-btn'),
		progbar = document.getElementById('prog-bar'),
		counter = 0,
		myLatLong,
		distanceBetween,
		watchId;

var clueinfo = [
	{ id: '0', header: 'Mordplats', imgSrc: 'karlsson.png', info: 'Ett mord har skett i Nacka'},
	{ id: '1', header: 'Ledtråd 1', imgSrc: 'snow.jpg', info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat'},
	{ id: '2', header: 'Ledtråd 2', imgSrc: 'roof.jpg', info: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
	{ id: '3', header: 'Ledtråd 3', imgSrc: 'toa.jpg', info: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation dolore eu fugiat nulla pariatur. Excepteur sint occaecat adipisicing elit,  ullamco laboris nisi ut aliquip ex ea commodo consequat. '}
];

var clueMarkers = [
	{ id: '0', title: 'Mordplats', coords: { lat: 59.313627, lng: 18.110746 }, icon: 'pins/blue_MarkerB.png', clickable: false, open: true },
	{ id: '1', title: 'Ledtråd 1', coords: { lat: 59.314560, lng: 18.112852 }, icon: 'pins/red_MarkerC.png', clickable: false, open: true },
	{ id: '2', title: 'Ledtråd 2', coords: { lat: 59.314910, lng: 18.115277 }, icon: 'pins/green_MarkerD.png', clickable: false, open: true },
	{ id: '3', title: 'Ledtråd 3', coords: { lat: 59.313387, lng: 18.116409 }, icon: 'pins/orange_MarkerE.png', clickable: false, open: true }
];

// Start the game
function initMap() {
	var options = {
			enableHighAccuracy: true,
			zoom: 16,
			center: {lat: 59.334591, lng: 18.063240}
		}

	var map = new google.maps.Map(document.getElementById('map'), options);
	let yourMarker = new google.maps.Marker(
		{
			title: 'You',
			content: 'Player'
		});
		// if player comes in we just add crimeplace/Startposition
		if (navigator.geolocation) {
					watchId =	navigator.geolocation.watchPosition(showPosition);
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
				position: props.coords,
				map: map,
				icon: props.icon,
        title: props.id // title is a string "0", "1" etc just for binding the marker to right clue from clue-array
      });

			google.maps.event.addListener(marker, 'click', function() {
				modalClickable = clueMarkers[marker.title].clickable;
				open = clueMarkers[marker.title].open;
				// prevent user to click if the distance is between player and marker is more then 20 meters
				if(modalClickable){
					writeClue(clueinfo[marker.title]);
				  clues.style.display = "flex";
					// check if someone in the team has opened the clue before and update the progressbar
					if(open){
						counter++;
						handleProgbar(clueMarkers[marker.title]);
						clueMarkers[marker.title].open = false;
					}
        }
      });
			button.addEventListener('click', function() {
				clues.style.display = "none";
			});
  }
	// add all markers to the map
	for(let marker of clueMarkers){
		addMarker(marker);
	}
  // Checking distance between player and cluemarkers, if distance less or equal to 20 meters
	// and the clue is not opened before we make the clues clickable
	function checkDistanceToClues(player){
		for(let i of clueMarkers){
			let clueLatLng = new google.maps.LatLng(i.coords);
					distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(player, clueLatLng);

			if(distanceBetween <= 100 && !i.clickable){
				i.clickable = true;
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

	function handleProgbar(clue){
		progbar.innerHTML = counter + " ledtrådar av 10";
		// update the progressbar and let all team-members to access the clue
		sock.emit('progressbar', clue);
	}
}
