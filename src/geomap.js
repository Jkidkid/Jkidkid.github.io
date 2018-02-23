var clues = document.getElementById('modal'),
    button = document.getElementById('modal-close-btn'),
    header = document.getElementById('clue-header'), // modal header text
	  img = document.getElementById('cluePic'), // clue picture
	  info = document.getElementById('clueInfo'), // clue info
    myLatLong, distanceBetween, watchId, yourMarker, map, player, clueid,
    teamid, clueInterval;

var api_url = "https://cluehunter.herokuapp.com";

// Stores all available clues when a team-member have clicked a clue
let cluesAvailable = [];

// Stores all google map markers
let googleMarkers = [];

// Crimeplace and startpoint for the team
let clueMarkers = [
	{
    id: '0',
    clue_lat: 59.313627, clue_lng: 18.110746,
    icon: '../media/img/pins/blue_MarkerB.png',
    header: 'Mordplats',
    imgSrc: '../media/img/karlsson.png',
    info: 'Ett mord har skett i Nacka',
    clickable: false, open: false
  }
];

// Fetch player user-id when game starts
  window.onload = function(){
    let params = (new URL(location)).searchParams;
    let val = params.get('userID');
    getPlayer(val);
}

// When player close crimeplace we start interval and call availableClues
//function to fetch available clues every ten seconds
  function startInterval(){
    clueInterval = setInterval(() => {
      availableClues();
  }, 10000);
}

// When the game is over we stop the fetch interval
function stopInterval(){
  clearInterval(clueInterval);
}

// Remove google markers from maps
function removeMarker(id){
  if(googleMarkers[id].map != null){
    googleMarkers[id].setMap(null);
  }
}

// Get player info and save it in "player" variable when the game starts
function getPlayer(user) {
	fetch(`${api_url}/api/users/${user}`).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
        player = data;
        console.log(player);
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}

// Fetch all the clues from db and print them into the game map
function getClues () {
  fetch(api_url + "/api/clues").then(function(res) {
    if (res.ok) {
      res.json().then(function(data) {
        data.forEach((coords) => {
          clueMarkers.push(coords);
          addMarker(coords);
        });
      });
  } else {
      console.log("Looks like the response wasn't perfect, got status", res.status);
    }
  }, function(e) {
       console.log("Fetch failed!", e);
  });
}

// Fetch function to get all available team clues every ten seconds
function availableClues() {
  teamid = player[0].team_id;
  fetch(`${api_url}/api/availableClues/${teamid}`).then(function(res) {
    if (res.ok) {
      res.json().then(function(data) {
        cluesAvailable = [];
        data.forEach((coords) => {
          cluesAvailable.push(coords.clue_id);
          removeMarker(coords.clue_id);
        });
        console.log(cluesAvailable);
      });
  } else {
      console.log("Looks like the response wasn't perfect, got status", res.status);
    }
  }, function(e) {
       console.log("Fetch failed!", e);
  });
}

// Add new clues to team_clue table
function newTeamClue(clue_id) {
  teamid = player[0].team_id;
	fetch(`${api_url}/api/newTeamClue/${teamid}/${clue_id}`, {
    method: 'POST'
  }).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
				console.log(data);
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}

// Start the game
function startMap () {
    var myPos = navigator.geolocation.getCurrentPosition(initMap);
}

// initMap draws the game map
function initMap(myPos) {
	var options = {
			enableHighAccuracy: true,
			zoom: 16,
			center: new google.maps.LatLng(myPos.coords.latitude, myPos.coords.longitude)
		}
	map = new google.maps.Map(document.getElementById('map'), options);
	yourMarker = new google.maps.Marker(
		{
			title: 'player',
			content: 'player',
      map: map,
      position: options.center
		});
		// Print out the crimeplace on the maps
		addMarker(clueMarkers[0]);

		// Start tracking the players location
		if (navigator.geolocation) {
					watchId =	navigator.geolocation.watchPosition(showPosition);
				}
}
	// Shows your position and calling checkDistanceToClues function when a player moves
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
        title: props.id // title is a string "0", "1" etc just for binding the marker to right clue from clueMarkers array
      });

			google.maps.event.addListener(marker, 'click', function() {
				modalClickable = clueMarkers[marker.title].clickable;
				open = clueMarkers[marker.title].open;

        // prevent user to click if the distance between player and marker is more then 20 meters
				if(modalClickable){
					writeClue(clueMarkers[marker.title]);
          clues.style.display = "flex";
          clueid = clueMarkers[marker.title].id;
          if(clueid != 0){
            newTeamClue(clueid);
          }
        }
      });

      	button.addEventListener('click', function() {
          if(!clueMarkers[0].open){
            getClues();
            startInterval();
            clueMarkers[0].open = true;
          }
					clues.style.display = "none";
			});
    googleMarkers.push(marker);
  }

	// Checking distance between player and cluemarkers, if distance less or equal to 20 meters
	// and the clue is not opened before we make the clues clickable
	function checkDistanceToClues(player){
		//loop through clueMarkers and check if player is near a clue
		for(let clue of clueMarkers){
			let clueLatLng = new google.maps.LatLng({lat: clue.clue_lat, lng: clue.clue_lng});
					distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(player, clueLatLng);

			if(distanceBetween <= 100000 && !clue.clickable){
				clue.clickable = true;
				console.log(`You have ${Math.floor(distanceBetween)} meters to a new clue `);
			}
		}
	}
	//write out the clues to the modal
	function writeClue(props){
	  header.innerHTML = props.header;
	  img.src = props.imgSrc;
	  info.innerHTML = props.info;
  };

  // tracking the amount of available clues
  let clueCount = 0;

  // print out the available clues in the modal
  function nextClue(arrow){
    clueLength = (cluesAvailable.length - 1);
    clues.style.display = "flex";

    if(arrow == 'left'){
      if(clueCount == 0){
        clueCount = clueLength;
    } else{
        clueCount--;
      }
  } else if(arrow == 'right'){
      if(clueCount == clueLength){
        clueCount = 0;
    } else {
        clueCount++;
       }
    }
    clueNumber = cluesAvailable[clueCount];
    numb = parseInt(clueNumber);
    header.innerHTML = clueMarkers[numb].header;
    img.src = clueMarkers[numb].imgSrc;
    info.innerHTML = clueMarkers[numb].info;
  }
