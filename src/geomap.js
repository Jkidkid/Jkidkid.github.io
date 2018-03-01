let clues = document.getElementById('modal'),
    cluearr = document.getElementById('nextprevious'),
    tip = document.getElementById('modalt'),
    turnin = document.getElementById('modalm'),
    button = document.getElementById('modal-close-btn'),
    totalguesses = document.getElementById('totalguesses'),
    header = document.getElementById('clue-header'), // modal header text
	  img = document.getElementById('cluePic'), // clue picture
	  info = document.getElementById('clueInfo'), // clue info
    suspect = document.getElementsByClassName('suspect'), // get selected suspect
    weapon = document.getElementsByClassName('weapon'), // get selected weapon
    turnInBtn = document.getElementById('done'), // answer button, fetch for right answers on db
    teamWin = document.getElementById('team-win'),
    teamLose = document.getElementById('team-lose'),
    loader = document.getElementById("loader"),
    googleMarkers = [], // Stores all google map markers
    cluesAvailable = [], // Stores all available clues when a team-member have clicked a clue
    choices = { misstänkt: '', vapen: '' }, // save selected answers from player
    myLatLong, distanceBetween, watchId, yourMarker, map, player, clueid,
    teamid, clueInterval, guessCount, teamPoints, playerPoints, gameActive, timerEndsAt, timerTime,
    // Crimeplace and startpoint for the team
    clueMarkers = [
    	{
        id: '0',
        clue_lat: 59.313627, clue_lng: 18.110746,
        icon: '../media/img/mordplats_pin.png',
        header: 'Mordplats',
        imgSrc: '../media/img/brottsplats.jpg',
        info: 'Ett mord har skett i Nacka',
        clickable: false, open: false
      }
    ];

//var api_url = "https://cluehunter.herokuapp.com";
var api_url = "http://localhost:3000";

// Fetch player user-id when game starts
  window.onload = function(){
    const params = (new URL(location)).searchParams;
    const val = params.get('userID');
    getPlayer(val);
    
    setTimeout(function() {
      loader.style.display = "none";
    }, 5000);
}

// When player close crimeplace we start interval and call availableClues
//function to fetch available clues every ten seconds
  function startInterval(){
    clueInterval = setInterval(() => {
      availableClues();
      getCounter();
      console.log(gameActive);
      if(guessCount === 0 && gameActive === 1){
        gameOver('lose');
      } else if(guessCount > 0 && gameActive === 1){
        gameOver('win');
      }
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
        teamid = player[0].team_id;
        playerPoints = player[0].user_points;
        console.log(player);
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}

// Get the timer end time
function getTimerTime() {
  teamid = player[0].team_id;
	fetch(`${api_url}/api/timerTime/${teamid}`).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
        if(data[0].timer_ends_at == ""){
          var d = new Date();
          let hours = d.getHours();
          let minutes = d.getMinutes() + 15;
          let seconds = d.getSeconds();

          timerTime = "Sep 5, 2018 "+hours+":"+minutes+":"+seconds;
          updateDbTimer();
          timer();
        }else if(data[0].timer_ends_at != "" && data[0].timer_ends_at != "Sep 5, 2018 00:00:00"){
          timerTime = data[0].timer_ends_at;
          timer();
        }else if(data[0].timer_ends_at == "Sep 5, 2018 00:00:00"){
          document.getElementById("prog-bar").innerHTML = "0:0";
        }
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}

function timer(){

    let countDownDate =  new Date(timerTime).getTime();
    let now_ = new Date().getTime();

    var x = setInterval(function() {

      var now = new Date().getTime();

      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("prog-bar").innerHTML = minutes + ":" + seconds;

      if (minutes == 0 && seconds == 0) {
        clearInterval(x);
        timerTime = "Sep 5, 2018 00:00:00";
        updateDbTimer();
        gameOver('lose');
        // Times up. Remove all markers
        for(let i=0; i<10; i++){
          removeMarker(i);
        }
      }
    }, 1000);
}

// Add new clues to team_clue table
function updateDbTimer() {
  teamid = player[0].team_id;
  let time = timerTime;
	fetch(`${api_url}/api/updateDbTimer/${teamid}/${time}`, {
    method: 'PUT'
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

function getAnswers(answers) {
	fetch(`${api_url}/api/answers`).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
        let  murder = data[0].murder,
             weapon = data[0].weapon;
          if(answers.misstänkt === murder && answers.vapen === weapon){
            console.log('Congratulations');
            teamPoints += 100;
            turnInBtn.innerHTML = 'Grattis ni vann';
            updatePlayerPoints();
            gameOver('win');
          } else {
            guessCount--;
            turnInBtn.style.backgroundColor = 'red';
            setTimeout(()=> {
              turnInBtn.style.backgroundColor = 'green';
            }, 3000);
            updateGuessCount(guessCount);
            if(guessCount == 0){
              console.log('Game Over!');
              gameOver('lose');
            }
          }
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}



function getCounter() {
	fetch(`${api_url}/api/guessCounter/${teamid}`).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
        console.log(data);
        guessCount = data[0].group_guesses;
        teamPoints = data[0].group_points;
        gameActive = data[0].gameover;
        totalguesses.innerHTML = `Antal gissningar: ${guessCount}`;
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}

// Add new clues to team_clue table
function updateGuessCount(counter) {
  fetch(`${api_url}/api/updateCounter/${teamid}/${counter}`, {
    method: 'PUT'
  }).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {

		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}


function updateGroupPoints() {
  fetch(`${api_url}/api/awardPoints/${teamid}/${teamPoints}`, {
    method: 'PUT'
  }).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
				console.log('group_guesses got updated');
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}


function updatePlayerPoints() {
  fetch(`${api_url}/api/awardPlayerPoints/${teamid}`, {
    method: 'PUT'
  }).then(function(res) {
		if (res.ok) {
			res.json().then(function(data) {
				console.log('group_guesses got updated');
		  });
	} else {
			console.log("Looks like the response wasn't perfect, got status", res.status);
		}
  }, function(e) {
	   console.log("Fetch failed!", e);
	});
}


function gameOver(result){
  if(result == 'win'){
    showWinGreeting();
  } else if(result == 'lose'){
    showLoseGreeting();
  }
    updateGroupPoints();
    stopInterval();

}

// Start the game
function startMap () {
    var myPos = navigator.geolocation.getCurrentPosition(initMap);
}

// initMap draws the game map
function initMap(myPos) {
	var options = {
			enableHighAccuracy: true,
			zoom: 20,
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
          cluearr.style.display = "none";
          clueid = clueMarkers[marker.title].id;
          if(clueid != 0){
            newTeamClue(clueid);
          }else if(clueid == 0){

          }
        }
      });

      	button.addEventListener('click', function() {
          if(!clueMarkers[0].open){
            getClues();
            startInterval();
            getTimerTime();
            addClickListeners();
            getCounter();
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
    tip.style.display = 'none';
    turnin.style.display = 'none';
    if(cluesAvailable.length > 0) {
      cluearr.style.display = 'flex';
      clues.style.display = "flex";
    }
  
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

  // open up the tip modal to achieve some useful tips
  function tips(id){
    if(id.style.display === 'flex'){
      id.style.display = 'none';
    } else {
      clues.style.display = 'none';
      tip.style.display = 'none';
      turnin.style.display = 'none';
      id.style.display = "flex";
    }
  }

  // add clickListener for each suspect and weapon in turnin modal
  // className guessActive makes the clicked item highlighted in green
  function addClickListeners(){
    for(let i = 0, x = suspect.length; i < x; i++){
      suspect[i].addEventListener('click', function(event){
        clearEv(suspect);
        choice = event.target;
        choice.classList.add('guessActive');
        choices.misstänkt = choice.id;
      });
    }

    for(let i = 0, x = weapon.length; i < x; i++){
      weapon[i].addEventListener('click', function(event){
        clearEv(weapon);
        choice = event.target;
        choice.classList.add('guessActive');
        choices.vapen = choice.id;
      });
    }

    turnInBtn.addEventListener('click', function(event){
      getAnswers(choices);
    });
  }

  // reset the guessActive className to highlight a new clicked item
  function clearEv(target){
    for(let i = 0, x = target.length; i < x; i++){
      target[i].classList.remove('guessActive');
    }
  }

function showWinGreeting(){
  teamWin.style.display = 'flex';
  setTimeout(()=>{
    window.location = "http://localhost/citrus/Jkidkid.github.io/php/userpage.php?page=groupScore";
  }, 5000);
}

function showLoseGreeting(){
  teamLose.style.display = 'flex';
  setTimeout(()=>{
    window.location = "http://localhost/citrus/Jkidkid.github.io/php/userpage.php?page=profile";
  }, 5000);
}
