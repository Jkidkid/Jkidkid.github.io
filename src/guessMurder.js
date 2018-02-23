let suspect = document.getElementsByClassName('suspect'),
    weapon = document.getElementsByClassName('weapon'),
    turnInBtn = document.getElementById('done'),
    choices = {
      misstänkt: '',
      vapen: ''
    };

turnInBtn.addEventListener('click', function(event){
  console.log(choices);
})

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

function clearEv(target){
  for(let i = 0, x = target.length; i < x; i++){
    target[i].classList.remove('guessActive');
  }
}

function recieveGuess(suspect, weapon){

}
