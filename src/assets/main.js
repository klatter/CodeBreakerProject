let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess').value;
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }
    if(!validateInput(input)) {
        return false;
    } else {
        attempt.value = (parseInt(attempt.value, 10) + 1)+'';
    }

    if(getResults(input)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
    return true;
}

//implement new functions here
function setHiddenFields() {
    let randomNumber = Math.floor(Math.random()*10000);
    answer.value = pad(randomNumber,4);
    attempt.value = 0;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function setMessage(message) {
    let messageNode = document.getElementById('message');
    messageNode.innerHTML = message;
}

function validateInput(input) {
    if (input.length == 4) {
        return true;
    } else {
        let messageNode = document.getElementById('message');
        messageNode.innerHTML = "Guesses must be exactly 4 characters long.";
        return false;
    }
}

function getResults(input) {
    let correct = 0;
    let results = document.getElementById('results');

    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(i = 0; i < input.length; i++)
    {
        if(input.charAt(i) == answer.value.charAt(i))
        {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';

    results.innerHTML += html;

    return correct == 4;
}

function showAnswer(correct) {
    let code = document.getElementById('code');
    if (correct===true) {
        code.className += " success";
        code.innerHTML = answer.value;
    } else {
        code.className += " failure";
        code.innerHTML = answer.value;
    }
}

function showReplay() {
    let guessingDiv = document.getElementById('guessing-div');
    let replayDiv = document.getElementById('replay-div');
    guessingDiv.style = "display:none";
    replayDiv.style = "display:block";
}