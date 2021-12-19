var highScoresArr = JSON.parse(localStorage.getItem("highScores"));
var highScoresArea = document.querySelector("#highScoreList");



function displayScores() {
    if (highScoresArr !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "finalScore";
        for (var i = 0; i < highScoresArr.length; i++) {
            var initials = highScoresArr[i].user;
            var score = highScoresArr[i].score
            var scoreEntry = document.createElement("li");
            scoreEntry.innerHTML = initials + " - " + score;
            scoreList.appendChild(scoreEntry);
        }
        highScoresArea.appendChild(scoreList);
    }
};

displayScores();

