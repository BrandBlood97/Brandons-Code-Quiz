
// Select the #goBack and #clearScores buttons
var goBackBtn = document.querySelector("#goBack");
var clearScoresBtn = document.querySelector("#clearScores");

// Add click event listener to the #goBack button
goBackBtn.addEventListener("click", function() {
  // Redirect to the index.html page
  window.location.href = "../index.html";
});

// Add click event listener to the #clearScores button
clearScoresBtn.addEventListener("click", function() {
  // Clear the scores from local storage
  localStorage.clear();
  // Reload the page to update the scores list
  location.reload();
});

// Get the scores from local storage
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Add the scores to the page as a list
var scoresList = document.querySelector("#highscores");
for (var i = 0; i < highScores.length; i++) {
  var newLi = document.createElement("li");
  newLi.textContent = highScores[i].initials + " - " + highScores[i].score;
  scoresList.appendChild(newLi);
}
