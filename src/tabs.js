let profile = document.getElementById('profile'),
    start = document.getElementById('start'),
<<<<<<< HEAD
    groupScore = document.getElementById('groupScore');




function showdiv(id) {
    profile.style.display = "none";
    start.style.display = "none";
    groupScore.style.display = "none";
    document.getElementById(id).style.display = 'flex';
=======
    groupScore = document.getElementById('groupScore'),
    group = document.getElementById('group'),
    Sgroup = document.getElementById('score-group'),
    Splayer = document.getElementById('score-player'),
    containerC = document.getElementById('content-container'),
    createGroup = document.getElementById('create-group');

function showdiv(id) {
  profile.style.display = "none";
  start.style.display = "none";
  groupScore.style.display = "none";
  group.style.display = "none";
  document.getElementById(id).style.display = 'flex';
}
function showdivv(id){
  createGroup.style.display = "none";
  containerC.style.display = "none";
  Sgroup.style.display = "none";
  Splayer.style.display = "none";
  document.getElementById(id).style.display = 'flex';

>>>>>>> usernav
}
