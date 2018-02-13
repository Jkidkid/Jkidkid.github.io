let profile = document.getElementById('profile'),
    start = document.getElementById('start'),
    groupScore = document.getElementById('groupScore');




function showdiv(id) {
    profile.style.display = "none";
    start.style.display = "none";
    groupScore.style.display = "none";
    document.getElementById(id).style.display = 'flex';
}
