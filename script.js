const questions = [
  {
    question: "Would you rather eat Indomie everyday or Jollof Rice everyday?",
    optionA: "Eat Indomie everyday",
    optionB: "Eat Jollof Rice everyday"
  },
  {
    question: "Would you rather have NEPA take light for 1 month or have no data for 1 month?",
    optionA: "NEPA take light for 1 month",
    optionB: "No data for 1 month"
  },
  {
    question: "Would you rather marry someone with no money or someone with no sense?",
    optionA: "Marry someone with no money",
    optionB: "Marry someone with no sense"
  },
  {
    question: "Would you rather drive Tokunbo Benz or a brand new Kia?",
    optionA: "Drive Tokunbo Benz",
    optionB: "Drive brand new Kia"
  },
  {
    question: "Would you rather win ₦10 Million but never travel or travel abroad but be broke?",
    optionA: "Win ₦10 Million",
    optionB: "Travel abroad but be broke"
  },
  {
    question: "Would you rather eat Suya every night or Rice every night?",
    optionA: "Eat Suya every night",
    optionB: "Eat Rice every night"
  },
  {
    question: "Would you rather be famous on TikTok or rich and unknown?",
    optionA: "Be famous on TikTok",
    optionB: "Be rich but nobody knows you"
  },
  {
    question: "Would you rather have your boss shout at you daily or receive no salary for 3 months?",
    optionA: "Boss shouts every day",
    optionB: "No salary for 3 months"
  }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;
let time = 10;
let timer;

const question = document.getElementById("question");
const qNum = document.getElementById("qNum");
const optA = document.getElementById("optA");
const optB = document.getElementById("optB");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const result = document.getElementById("result");
const roast = document.getElementById("roast");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {

    clearInterval(timer);

    if(currentQuestion >= questions.length){
        endGame();
        return;
    }

    qNum.innerText = "Question " + (currentQuestion + 1);

    question.innerText = questions[currentQuestion].question;

    optA.innerText = questions[currentQuestion].optionA;
    optB.innerText = questions[currentQuestion].optionB;

    optA.disabled = false;
    optB.disabled = false;

    result.innerText = "";
    roast.innerText = "";

    nextBtn.style.display = "none";

    startTimer();
}

function startTimer(){

    time = 10;

    timerEl.innerText = time;

    timer = setInterval(function(){

        time--;

        timerEl.innerText = time;

        if(time <= 0){

            clearInterval(timer);

            lives--;

            livesEl.innerText = lives;

            optA.disabled = true;
            optB.disabled = true;

            result.innerText = "⏰ Time Up!";

            if(lives <= 0){
                endGame();
            }else{
                nextBtn.style.display = "inline-block";
            }

        }

    },1000);

}

function chooseAnswer(choice){

    clearInterval(timer);

    score += 10;

    scoreEl.innerText = score;

    result.innerText = "You chose: " + choice;

    roast.innerText = "😂 Nice choice!";

    optA.disabled = true;
    optB.disabled = true;

    nextBtn.style.display = "inline-block";

}

optA.onclick = function(){
    chooseAnswer(optA.innerText);
}

optB.onclick = function(){
    chooseAnswer(optB.innerText);
}

nextBtn.onclick = function(){

    currentQuestion++;

    loadQuestion();

}

restartBtn.onclick = function(){

    currentQuestion = 0;
    score = 0;
    lives = 3;

    scoreEl.innerText = score;
    livesEl.innerText = lives;

    restartBtn.style.display = "none";

    loadQuestion();

}

function endGame(){

    clearInterval(timer);

    question.innerText = "🎉 Game Over";

    result.innerHTML = "Final Score: " + score;

    optA.style.display = "none";
    optB.style.display = "none";
    nextBtn.style.display = "none";

    restartBtn.style.display = "inline-block";

}

loadQuestion();
