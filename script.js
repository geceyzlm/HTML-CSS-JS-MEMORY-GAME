const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var score=0;
var step=0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('turn');

  

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
  htrlt();
 
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  //step part
  step+=1
  document.getElementById("step").innerHTML="step👉"+step

  //score part
  if(isMatch==true){
  score+=1
  var scorelabel=document.getElementById("score")
  scorelabel.innerHTML="score👉"+score;

 

  }
  

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('turn');
    secondCard.classList.remove('turn');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));



let alertShown = false; // Bayrak değeri

function htrlt() {
  if(step==5){
    if(score<2){ 
      if (!alertShown) {
        alert("be careful!");
        alertShown = true; // Bayrağı true yapıyoruz, böylece tekrar çalışmaz
          }

    }
  }
  
  if(step==5){
    if(score>2){ 
      if (!alertShown) {
        alert("awesome!");
        alertShown = true; // Bayrağı true yapıyoruz, böylece tekrar çalışmaz
          }

    }
  }

  if(score==6){
    if (!alertShown) {
      alert("game over your score is ="+ (100 / step));
      alertShown = true; // Bayrağı true yapıyoruz, böylece tekrar çalışmaz
      }

   
  }
  


}