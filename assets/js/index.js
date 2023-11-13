var questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Text Markup Language",
        choice2: "Hyperlinks and Text Markup Language",
        choice3: "Home Tool Markup Language",
        choice4: "Hyper Text Makeup Language",
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        choice1: "Computer Style Sheets",
        choice2: "Creative Style Sheets",
        choice3: "Colorful Style Sheets",
        choice4: "Cascading Style Sheets",
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does JS stand for?",
        choice1: "JavaStyle",
        choice2: "JavaScript",
        choice3: "Java Scripted",
        choice4: "Java Scripting",
        answer: "JavaScript"
    },
    {
        question: "What does DOM stand for?",
        choice1: "Document Object Model",
        choice2: "Document Object Method",
        choice3: "Document Object Modal",
        choice4: "Document Object Module",
        answer: "Document Object Model"
    },
    {
        question: "What does API stand for?",
        choice1: "Application Programming Interface",
        choice2: "Application Programming Integration",
        choice3: "Application Programming Interchange",
        choice4: "Application Programming Internet",
        answer: "Application Programming Interface"
    }
];

var score = 0;
var questionIndex = 0;
var time = 30;
var startScreen = document.getElementById("start-screen");
var questionsEl = document.getElementById("question-screen");
var endScreenEl = document.getElementById("end-screen");
var timerEl = document.getElementById("timeLeft");
var startBtn = document.getElementById("startQuiz");
var submitBtn = document.getElementById("submitScore");
var viewBtn = document.getElementById("viewScores");
var rightWrong = document.getElementById("rightWrong");
var timeInterval;

startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    // hide start screen
    startScreen.setAttribute("class", "hide");
    // un-hide questions section
    questionsEl.removeAttribute("class", "hide");
    // start timer
    countdown();
    //calls getQuestion function
    getQuestion();
}
//its a countdown timer
function countdown() {
    timeInterval = setInterval(function () {
        if (time > 0) {
            timerEl.textContent = time;
            time--;
        } else {
            timerEl.textContent = "0";
            clearInterval(timeInterval);
            quizEnd();
        }
    }, 1000);
}
//function to set the text content of the question and choices and to create the coices
function getQuestion() {
    var currentQuestion = questions[questionIndex];
    var questionTitle = document.getElementById("question");
    questionTitle.textContent = currentQuestion.question;
    var choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";
    [currentQuestion.choice1, currentQuestion.choice2, currentQuestion.choice3, currentQuestion.choice4].forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice button");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });
}
//function for when the user clicks on the answer choices
function questionClick() {
    if (this.value !== questions[questionIndex].answer) {
        time -= 5;
        rightWrong.textContent = "You Were Wrong!";
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
    }
    else {
        rightWrong.textContent = "You were Correct!";
    }
    questionIndex++;
    if (questionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}
//function to end the quiz
function quizEnd() {
    clearInterval(timeInterval);
    endScreenEl.removeAttribute("class", "hide");
    var finalScoreEl = document.getElementById("score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}
//function to submit the score/add to local storage unless score is 0
submitBtn.addEventListener("click", addScore);
function addScore() {
    var initials = document.getElementById("initials").value;
    if (time === 0) {
        return;
    }
    if (initials === "") {
        alert("Please enter your initials");
    }
    var score = {
        initials: initials,
        score: time
    };
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}