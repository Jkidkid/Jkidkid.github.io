let profile = document.getElementById('profile'),
    start = document.getElementById('start'),
    groupScore = document.getElementById('groupScore'),
    Sgroup = document.getElementById('score-group'),
    Splayer = document.getElementById('score-player');



function showdiv(id) {
    profile.style.display = "none";
    start.style.display = "none";
    groupScore.style.display = "none";
    // group.style.display = "none";
    document.getElementById(id).style.display = 'flex';
}

function showdivv(id){
  Sgroup.style.display = "none";
  Splayer.style.display = "none";
  document.getElementById(id).style.display = 'flex';
}
