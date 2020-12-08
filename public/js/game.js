/* game.js
 * Author: Bob Moore
 * 
 * 20 Rounds
 * User must repeat pattern and reach final round to win
 * Speed increases by 1/10th of a second every 5 rounds.
 * 
 * CURRENT BUG: After first game it only accepts blue as the correct answer
 * WORK AROUND: Hid start button on game start and added reset button to reload page
 * */

var listenersActive;
var gameOver;

async function startGame(){
	const lastRound = 20;
	const colors = ["red","blue","green","yellow"];
	const GREEN = document.getElementById('green');
	const RED = document.getElementById('red');
	const YELLOW = document.getElementById('yellow');
	const BLUE = document.getElementById('blue');
	const roundCounter = document.getElementById('roundCounter');
	const startBtn = document.getElementById('start');
	
	var simonArray = [];
	var score = 0;
	var speed = 500; //Drop 100 every 5 rounds
	var iterator = 0;
	listenersActive = false;
	gameOver = false;
	
	//Button Listeners
	GREEN.addEventListener('click', () => {buttonHandler(GREEN, simonArray, iterator)}, false);
	RED.addEventListener('click', () => {buttonHandler(RED, simonArray, iterator)}, false);
	YELLOW.addEventListener('click', () => {buttonHandler(YELLOW, simonArray, iterator)}, false);
	BLUE.addEventListener('click', () => {buttonHandler(BLUE, simonArray, iterator)}, false);
	
	//Hide start button
	startBtn.style.display = "none";
	
	//Begin game loop
	for(var round = 0; round <= lastRound; round++){
		if (round == lastRound){
			sendScore(score);
			alert("Game Won!");
		}
		else if (gameOver == true){
			if (sendScore(score)){
				alert("New High Score!" + "\n" + "Score: " + score + "\n" + "Sequence: " + simonArray);
			}
			else {
				alert("You Lose" + "\n" + "Score: " + score + "\n" + "Sequence: " + simonArray);
			}
			break;
			}
		else{
			simonArray[round] = colors[Math.floor(Math.random()*4)];
			score = round;
			roundCounter.innerHTML=round+1;
						
			if ((round%5 == 0) && (round!=0)){
				speed = speed - 100;
			}
		
			for(var flash = 0; flash <= round; flash++){
				if(simonArray[flash] == "green"){
					await FlashButton(GREEN, speed);
				}
				else if (simonArray[flash] == "red"){
					await FlashButton(RED, speed);
				}
				else if (simonArray[flash] == "yellow"){
					await FlashButton(YELLOW, speed);
				}
				else if (simonArray[flash] == "blue"){
					await FlashButton(BLUE, speed);
				}
				
				if (flash == round){
					for (var i = 0; i <= flash; i++){
						listenersActive = true;
						iterator = i;
						while (listenersActive == true){
							await new Promise(resolve => setTimeout(resolve, 100));
						}
						if (gameOver == true){
							break;
						}						
					}
				}
			}
		}
	}
}

//Compares the button pressed to the current color in the 
//simonArray sequence if listenersActive is true. Turns Listeners
//off on exit
//@param1	Button Object - which color tile was pressed
//@param2	Array - The simonArray sequence to be compared to
//@param3	Int - Which step of the sequence to test
function buttonHandler(button, simonArray, iterator){
		if (listenersActive == true){
			if (button.id != simonArray[iterator]){ 
				gameOver = true;
			}
		}
		listenersActive = false;
}

//Temporarily changes color of button for specified length of time
//@param1 Button Object - which color tile to flash 
//@param2 Int - Duration of button flash
async function FlashButton(button, speed){
		
	button.style.backgroundColor='#eee'; //White
	await new Promise(resolve => setTimeout(resolve, speed));
			
	button.style.backgroundColor=button.id; //Original color
	await new Promise(resolve => setTimeout(resolve, speed));
}

//Needs work
//Send Score Request to server
//@param Int - score that user just recieved
//@return Boolean - True if score is new highscore 
function sendScore(score){
	const URL = 'http://localhost:8080/user/newScore';
	$.post(URL,{score: score}, function (score, status){
		console.log(score + ' and status is ' + status);
	});
	return false; //Temporarily always returns false
}
