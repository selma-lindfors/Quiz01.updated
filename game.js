// dom references

const loader = document.getElementById("loader");
const game = document.getElementById("game");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const episodeNameText = document.getElementById("episodeName");
const contentNameText = document.getElementById("contentName");
const urlNameText = document.getElementById("episodeurl");
const id = window.location.search.split("=")[1];
const segmentBox = document.getElementById("segment-index");
const segmentButtons = document.getElementById("segment-buttons");

// state
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
// state
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 50;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  loader.classList.add("hidden");
  if (id === "0") {
    game.classList.remove("hidden");
    availableQuestions = [...questions];
    getNewQuestion();
  } else {
    segmentBox.classList.remove("hidden");
    segmentSelector();
  }
};

const segmentSelector = () => {
  const segmentList = [
    ...new Set(questions.map(question => question.contentSegment))
  ];
  segmentList.forEach(segment =>
    createButtonInsideListItem(segmentButtons, segment)
  );
};

const createButtonInsideListItem = (list, text) => {
  const li = document.createElement("li");
  list.appendChild(li);
  const button = document.createElement("button");
  li.appendChild(button);
  button.innerText = text;
  button.classList.add("segment-btn");
  button.addEventListener("click", startSegmentGame);
};

const startSegmentGame = e => {
  availableQuestions = questions.filter(
    question => question.contentSegment === e.target.innerText
  );
  getNewQuestion();
  game.classList.remove("hidden");
  segmentBox.classList.add("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS - 1) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html?contentId=" + id);
  }

  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  episodeNameText.innerText = currentQuestion.contentSegment;
  contentNameText.innerText = currentQuestion.content;
  question.innerText = currentQuestion.question;
  urlNameText.href = currentQuestion.url;
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptinganswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    console.log(classToApply);
    console.log(selectedAnswer);

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

const incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

d3.csv(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfBk-rwrIauBPn7iuoLXBxP2sSYOXRYCbJ2GflzSK6wxGVGDr_fAqORJ0JWPdajFLxnGegmrlI26HB/pub?output=csv"
).then(data => {
  questions = data.filter(question => {
    if (id === "0") return true;
    else return question.contentId === id;
  });
  startGame();
});
