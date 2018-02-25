let iname = document.getElementById('name'),
    icoolboi = document.getElementById('age'),
    imood = document.getElementById('mood'),
    list = document.getElementById('list');
let info = {
  name: "Luke",
  coolboi: 15,
  mood: "giggly"
}
let infoj;
function postthings(){
  fetch("http://localhost:3000/api/posttestsimon", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: infoj
  }).then(function(res) {
    if (res.ok) {
      res.json().then(function(data){
        console.log(data);
      });
    } else {
      console.log("Looks like the response wasn't perfect, got status", res.status);
    }
  }, function(e) {
     console.log("Fetch failed!", e);
  });
}
function getuserlist(){
  fetch("http://localhost:3000/api/users").then(function(res){
    if(res.ok){
      res.json().then(function(data){
        for(i = 0; i < data.length; i++){
          list.innerHTML += data[i].name + " " + data[i].coolboi + " " + data[i].mood + "<br>";
          console.log(data[i].name);
        }
      });
    } else {
      console.log("Looks like the response wasn't perfect, got status", res.status);
    }
  }, function(e) {
     console.log("Fetch failed!", e);
  });
}

function loadsite(){
  info.name = iname.value;
  info.coolboi = icoolboi.value;
  info.mood = imood.value;
  infoj  = JSON.stringify(info);
  postthings();
}

function displayusers(){
  getuserlist();
}
