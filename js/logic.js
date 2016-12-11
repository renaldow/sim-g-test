

	  	



var baseUrl = "http://www.renaldow.com/simg"

var currentQuestion = 0;
var readingCompQuestion = false;
var rc_index = 0;
var speedSimStarted = false;

window.onload=function(){

	document.getElementById("interval").value = 5;



};


$('#divNewNotifications	 li').on('click', function() {
    $('#dropdown_title').html($(this).find('a').html());

     directoryValue = $(this).text();
    

    });

$('#backList li').on('click', function() {
    $('#previous').html($(this).find('a').html());

    var backValue = $(this).text();

    if(backValue == "Back 1") {
    	previousQuestion(1);


    } else if (backValue == "Back 5"){
    	previousQuestion(5);

    }

    });


function setMyInterval() {

	var interval = document.getElementById("interval").value;

    myVar = setInterval(intervalNextQuestion, interval * 1000);
}

function intervalNextQuestion(){
	  	
  	if(speedSimStarted)	{ 

  		nextQuestion();

  	}
	  	
}


function nextQuestion() {


	if(!readingCompQuestion) {
		currentQuestion = currentQuestion + 1;

		if(currentQuestion == 21 ) {

			currentQuestion = 20;
		}

		changeQuestion(currentQuestion);
	} else {
		cycleReadingComp();
	}

	
}



function previousQuestion(amount) {

	currentQuestion = currentQuestion - amount;

	if(currentQuestion == 0 || currentQuestion < 0) {

		currentQuestion = 1;
	}

	readingCompQuestion = false;

	changeQuestion(currentQuestion);

}



function changeQuestion(questionNum) {

	

	var question = baseUrl + "/images/exams/" + directoryValue + "/" + questionNum + ".png";

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

	var rc_passage = baseUrl + "/images/exams/" + directoryValue + "/" + original + "_passage" + ".png";

	document.getElementById("rc_column1").style.display = "block";
	document.getElementById("rc_column1").style.width = "100%";
	document.getElementById("rc_column2").style.width = "50%";
	document.getElementById("myRCImg").src = rc_passage;

	
	var question = baseUrl + "/images/exams/" + directoryValue + "/" + original + "_" + index + ".png";

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
	setMyInterval();

}

function stopSpeedSimulation() {
	speedSimStarted = false;
}

function restartSpeedSimulation() {
	currentQuestion = 0;
	readingCompQuestion = false;
    rc_index = 0;

    setMyInterval();

    speedSimStarted = true;

	
}




function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}