const questions = [
{q: "Eat Indomie everyday", a: "Eat Jollof Rice everyday", roast: ["Indomie addict detected! 🌶️", "Jollof is king! 👑"]},
{q: "NEPA take light for 1 month", a: "No data for 1 month", roast: ["How you go watch TikTok?", "At least you fit charge phone"]},
{q: "Marry someone wey no get money", a: "Marry someone wey no get sense", roast: ["Love no dey pay bills!", "Better broke than foolish"]},
{q: "Drive Tokunbo Benz", a: "Drive brand new Kia", roast: ["Tokunbo prestige!", "New car no get wahala"]},
{q: "Win 10 Million but no fit travel", a: "Travel abroad but be broke", roast: ["Money na water!", "Pictures or e no happen"]},
{q: "Your crush like you back", a: "Win 50k cash now", roast: ["Love wins!", "Cash is king!"]},
{q: "Eat Suya every night", a: "Eat Rice every night", roast: ["Pepper dem!", "Carbs gang"]},
{q: "Be famous on TikTok", a: "Be rich but nobody know you", roast: ["Clout chaser!", "Silent millionaire"]},
{q: "Boss dey shout you everyday", a: "No salary for 3 months", roast: ["Shouting dey pay?", "How you go chop?"]},
{q: "Go village for Christmas", a: "Stay Lagos alone for Christmas", roast: ["Jollof and family!", "Lagos is boring"]}
];

let currentQ = 0;
let score = 0;
let lives = 3;
let timeLeft = 10;
let timer;

const optA = document.getElementById('optA');
const optB = document.getElementById('optB');
const qNum = document.getElementById('qNum');
const questionText = document.getElementById('question');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const timerEl = document.getElementById('timer');
const roast = document.getElementById('roast');
const result = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

function startTimer() {
  timeLeft = 10;
  timerEl.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if(timeLeft <= 0) {
      clearInterval(timer);
      lives--;
      livesEl.innerText = lives;
      result.innerText = "⏰ Time Up! You lost 1 life";
      disableOptions();
      if(lives <= 0) {
        endGame();
      } else {
        nextBtn.style.display = "block";
      }
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timer);
  
  if(currentQ >= questions.length || lives <= 0) {
    endGame();
    return;
  }
  
  qNum.innerText = `Question ${currentQ + 1}`;
  questionText.innerText = questions[currentQ].q + " OR " + questions[currentQ].a;
  optA.innerText = "A: " + questions[currentQ].q;
  optB.innerText = "B: " + questions[currentQ].a;
  optA.disabled = false;
  optB.disabled = false;
  roast.innerText = "";
  result.innerText = "";
  nextBtn.style.display = "none";
  
  startTimer();
}

function disableOptions() {
  optA.disabled = true;
  optB.disabled = true;
}

optA.onclick = () => chooseAnswer('A');
optB.onclick = () => chooseAnswer('B');

function chooseAnswer(choice) {
  clearInterval(timer);
  disableOptions();
  
  score += 10;
  scoreEl.innerText = score;
  
  let chosenText = choice === 'A' ? questions[currentQ].q : questions[currentQ].a;
  roast.innerText = questions[currentQ].roast[Math.floor(Math.random() * 2)];
  result.innerText = "You chose: " + chosenText;
  
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQ++;
  loadQuestion();
}

function endGame() {
  clearInterval(timer);
  let title = score >= 80 ? "YOU BE NAIJA BOSS! 👑" : score >= 50 ? "You Try! 😎" : "Go and practice 😂";
  questionText.innerText = "GAME OVER!";
  result.innerHTML = `Final Score: ${score}<br><b>${title}</b><br>Screenshot and share!`;
  roast.innerText = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
}

restartBtn.onclick = () => {
  currentQ = 0;
  score = 0;
  lives = 3;
  scoreEl.innerText = "0";
  livesEl.innerText = "3";
  restartBtn.style.display = "none";
  loadQuestion();
}

// START THE GAME
loadQuestion();
