var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var scoreText = document.getElementById("score");
var timeH = document.querySelector("h3");
var submitButton = document.getElementById("submitIn");
var highScoresArr = JSON.parse(localStorage.getItem("highScores")) || [];
var initialsInput = document.getElementById("initialsInput");
var userScore = [];
var timeSecond = 90;
var score = 0;

timeH.innerHTML = `${timeSecond}`;

var countDown;

function timer() {
  timeSecond--;
  timeH.innerHTML = `${timeSecond}`;
  if (timeSecond <= 0 || timeSecond < 1) {
    clearInterval(countDown);
  }
}

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startClock);

function startClock() {
  countDown = setInterval(timer, 1000);
  startGame();
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    console.log("a");
    nextButton.classList.remove("hide");
  } else {
    console.log("b");
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(countDown);
  console.log(timeSecond);
  document.getElementById("quizArea").style.display = "none";
  document.getElementById("endGame").style.display = "block";
  document.getElementById("finalScore").innerText = timeSecond;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
    timeSecond -= 1;
  }
}

submitButton.addEventListener("click", () => {
  let initials = initialsInput.value;
  let score01 = {
    user: initials,
    score: timeSecond,
  };
  highScoresArr.push(score01);

  localStorage.setItem("highScores", JSON.stringify(highScoresArr));
  window.location.assign("/");
});

function displayscores() {
  if (highScoresArr !== null) {
    var scoreList = document.createElement("ol");
    scoreList.className = "scoreListClass";
    for (var i = 0; i < highScoresArr.length; i++) {
      var initials = highScoresArr[i].inits;
      var scores = highScoresArr[i].userScore;
      var scoreEntry = document.createElement("li");
      scoreEntry.innerHTML = initials + " - " + scores;
      scoreList.appendChild(scoreEntry);
    }
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

let questions = [
  {
    question: "JavaScript is ______ language.",
    answers: [
      { text: "Scripting", correct: true },
      { text: "Programming", correct: false },
      { text: "Both a and b", correct: false },
      { text: "Application", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
      { text: "<javascript>", correct: false },
    ],
  },
  {
    question: "HTML stands for",
    answers: [
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText and links Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "None of these", correct: false },
    ],
  },
  {
    question:
      "Which of the following tag is used for inserting the largest heading in HTML?",
    answers: [
      { text: "<h3>", correct: false },
      { text: "<h5>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<h6>", correct: false },
    ],
  },
  {
    question:
      "Which of the following tag is used to insert a line-break in HTML?",
    answers: [
      { text: "<a>", correct: false },
      { text: "<br>", correct: true },
      { text: "<pre>", correct: false },
      { text: "<b>", correct: false },
    ],
  },
];
