// Array with markers
let clueMarkers = [
	{ title: 'crime scene', coords: { lat: 59.313627, lng: 18.110746 }, icon: 'pins/blue_MarkerB.png', clickable: true },
	{ title: 'clue1', coords: { lat: 59.314560, lng: 18.112852 }, icon: 'pins/red_MarkerC.png' },
	{ title: 'clue2', coords: { lat: 59.314910, lng: 18.115277 }, icon: 'pins/green_MarkerD.png' },
	{ title: 'clue3', coords: { lat: 59.313387, lng: 18.116409 }, icon: 'pins/orange_MarkerE.png' }
];

let clues = document.getElementById('modal'),
    button = document.getElementById('b'),
		watchId;

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
					content: '<h2>YOU</<h2>'
				});

    for(var i = 0, x = clueMarkers.length; i < x; i++) {
			addMarker(clueMarkers[i]);
		}
		if (navigator.geolocation) {
					watchId =	navigator.geolocation.watchPosition(showPosition);
				}

	function showPosition(position){
			myLatLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				yourMarker.setPosition(myLatLong);
				map.setCenter(myLatLong);
				yourMarker.setMap(map);
	}

	function addMarker (props) {
			var marker = new google.maps.Marker({
				position: props.coords,
				map: map,
				icon: props.icon
			});
			if(props.clickable){
				google.maps.event.addListener(marker, 'click', function() {
								clues.style.display = "flex";
						});
				button.addEventListener('click', function() {
										clues.style.display = "none";
									});
		}
	}
}

// count the distance between player and clueMarkers
// distanceToNest = google.maps.geometry.spherical.computeDistanceBetween(myLatLong, nestLatLng);
