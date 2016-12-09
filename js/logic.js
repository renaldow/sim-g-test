

	  	



var baseUrl = "http://www.renaldow.com/simg"

var currentQuestion = 0;
var readingCompQuestion = false;
var rc_index = 0;
var speedSimStarted = false;

window.setInterval(function(){
	  	
	  	if(speedSimStarted)	{ 

	  		nextQuestion();

	  	}
	  	else {
	  		//Do Nothing
	  	}
	  		
	}, 10000);


function nextQuestion() {


	if(!readingCompQuestion) {
		currentQuestion = currentQuestion + 1;

		if(currentQuestion == 14 ) {

			currentQuestion = 13;
		}

		changeQuestion(currentQuestion);
	} else {
		cycleReadingComp();
	}

	
}



function previousQuestion() {

	currentQuestion = currentQuestion - 1;

	if(currentQuestion == 0 || currentQuestion == -1) {

		currentQuestion = 1;
	}

	changeQuestion(currentQuestion);

}



function changeQuestion(questionNum) {

	var question = baseUrl + "/images/exams/exam1_verbal1/" + questionNum + ".png";

	var exist = UrlExists(question)

	if(exist) {
		//alert("True:  " + question);

		document.getElementById("question-num").innerHTML = questionNum;

		

		document.getElementById("myImg").src = question;
		document.getElementById("rc_column1").style.display = "none";
		document.getElementById("rc_column2").style.width = "100%";
	}
	else {

		//alert("False:  "+ question);

		readingCompQuestion = true;
		rc_index = questionNum;

		cycleReadingComp();
		
	}

	
	
}

function cycleReadingComp() {

		readingCompQuestion = readingCompLayout(currentQuestion, rc_index);

		if(readingCompQuestion) {

			rc_index++;	

			
		}
		else {
			currentQuestion = rc_index - 1;
			nextQuestion();
			
		}
		
}

function readingCompLayout(original, index) {

	var rc_passage = baseUrl + "/images/exams/exam1_verbal1/" + original + "_passage" + ".png";

	document.getElementById("rc_column1").style.display = "block";
	document.getElementById("rc_column1").style.width = "100%";
	document.getElementById("rc_column2").style.width = "50%";
	document.getElementById("myRCImg").src = rc_passage;

	
	var question = baseUrl + "/images/exams/exam1_verbal1/" + original + "_" + index + ".png";

	var exist = UrlExists(question)

	if(exist) {
		//alert("True:  " + question);

		document.getElementById("question-num").innerHTML = index;
		document.getElementById("myImg").src = question;
		return true;

	} else {

		return false;

	}
}

function startSpeedSimulation() {

	speedSimStarted = true;

}

function stopSpeedSimulation() {
	speedSimStarted = false;
}

function restartSpeedSimulation() {
	currentQuestion = 0;
	readingCompQuestion = false;
    rc_index = 0;
    speedSimStarted = true;
	
}




function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}