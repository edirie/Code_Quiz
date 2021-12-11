var cardText = document.querySelector("#card-text");
var cardTitle = document.querySelector("#card-title");
var BTNStart = document.querySelector("#BTNStart");
var timer = document.querySelector("#startTime");
var listItem = document.querySelector("#listItem");

const questions = [
  {
    question:
      "Which one of these music artists is from the city of Toronto.",
    answers: ["Jay Z", "Kanye West", "Drake", "Kendrick Lamar"],
    correctAnswer: "Drake",
  },
  {
    question: "According to a popular song, what is Snoop Dogg's favourite drink",
    answers: [
      "Pepsi",
      "Kokanee",
      "Vodka",
      "Gin & Juice",
    ],
    correctAnswer: "Gin & Juice",
  },
  {
    question:
      "What notorious rap group was Eazy E the leader of?",
    answers: ["Wu Tang Clan", "N.W.A.", "G-Unit", "Swollen Members"],
    correctAnswer: "N.W.A.",
  },
  {
    question:
      "Whose debut album is 'Illmatic'?",
    answers: ["Ol' Dirty Bastard", "EPMD", "Nas", "Afu-Ra"],
    correctAnswer: "Nas",
  },
];

// Declared variable
var score = 0; 
var questionIndex = 0; 
var secondsLeft = 60; 
var holdInterval = 0; 
var penalty = 10; 
var result = "";
var userScore = [];

// Add timer//

timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
});

// validate answer
function validateAnswer(answer) {
  var result = document.querySelector("#result");
  if (answer === questions[questionIndex].correctAnswer) {
    result.innerText = "correct";
    setTimeout(function () {
      result.innerText = "";
    }, 1000);
  } else {
    secondsLeft -= penalty;
    result.innerText = "Wrong";
    setTimeout(function () {
      result.innerText = "";
    }, 1000);
  }
  questionIndex++;

  if (questions.length > questionIndex && secondsLeft >= 0) {
    nextQuetion(questionIndex);
  } else {
    clearInterval(holdInterval);
    currentTime.textContent = "Time: " + secondsLeft;
    allDone();
  }
}
// submit
function allDone() {
  cardTitle.innerHTML = `<p>All Done </p>`;
  cardText.innerHTML = `<p>YOU're final score is ${secondsLeft}<p/>
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Enter Intial" id="intial" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary" type="button" id="createSubmit" onClick="FinalPage()">Submit</button>
    </div>`;
}

// add score and finalPage
function FinalPage() {
  var intialValue = document.querySelector("#intial");
  var timeRemaining = secondsLeft;
  var initials = intialValue.value;

  var finalScore = {
    initials: initials,
    score: timeRemaining,
  };
  var allScores = localStorage.getItem("allScores");
  if (allScores === null) {
    allScores = [];
  } else {
    allScores = JSON.parse(allScores);
  }
  allScores.push(finalScore);
  var newScore = JSON.stringify(allScores);
  localStorage.setItem("allScores", newScore);

  cardTitle.innerHTML = `<h3 id="Highscore">Highscores</h3>`;

  for (i = 0; i < allScores.length; i++) {
    listItem.innerHTML += `<ul class="list-group">
        <li id="resultHistory" class="list-group-item list-group-item-primary">${allScores[i].initials}-${allScores[i].score} </li>
        </ul>`;
  }
  cardText.innerHTML = `
    <button type="button" class="btn btn-primary" onClick="startPage()">Go back</button>
    <button type="button" class="btn btn-secondary" onClick="clearHistory()">Clear History</button>`;
}
// clear localStorage
function clearHistory() {
  localStorage.clear();
  location.reload();
  cardText.innerHTML = `
    <button type="button" class="btn btn-primary" onClick="startPage()">Go back</button>
    <button type="button" class="btn btn-secondary" onClick="clearHistory()">Clear History</button>`;
}

function startPage() {
  window.location.replace("./index.html");
}

function startExam() {
  nextQuetion(questionIndex);
}
// Renders questions and choices to page:
function nextQuetion(index) {
  startTime.style.display = "none";
  cardTitle.innerHTML = `<p id="questions">${questions[index].question}</p>`;
  console.log(`${questions[index].question}`);
  cardText.innerHTML = `
    <div class="form-check">
    <input class="form-check-input" type="radio" name="answer" onClick="validateAnswer(value)" id="exampleRadios1" value="${questions[index].answers[0]}">
    <label class="form-check-label" for="exampleRadios1">
        ${questions[index].answers[0]}
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="answer" id="exampleRadios2" onClick="validateAnswer(value)" value="${questions[index].answers[1]}">
    <label class="form-check-label" for="exampleRadios2">
        ${questions[index].answers[1]}
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="answer" id="exampleRadios3"  onClick="validateAnswer(value)" value="${questions[index].answers[2]}">
    <label class="form-check-label" for="exampleRadios3">
        ${questions[index].answers[2]}
    </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="answer" id="exampleRadios3"  onClick="validateAnswer(value)" value="${questions[index].answers[3]}">
    <label class="form-check-label" for="exampleRadios3">
        ${questions[index].answers[3]}
    </label>
    </div>
`;
}
