/* game.js
 * Author: Bob Moore
 * 
 * 20 Rounds
 * User must repeat pattern and reach final round to win
 * Speed increases by 1/10th of a second every 5 rounds.
 * User gets 5 seconds between each input before losing
 * 
 * CURRENT BUG: After first game it only accepts blue as the correct answer
 * WORK AROUND: Hid start button on game start and added reset button to reload page
 * */

var listenersActive;
var gameOver;

async function gameLoop(){
	const lastRound = 20;
	const colors = ["red","blue","green","yellow"];
	const GREEN = document.getElementById('green');
	const RED = document.getElementById('red');
	const YELLOW = document.getElementById('yellow');
	const BLUE = document.getElementById('blue');
	const roundCounter = document.getElementById('roundCounter');
	const endBtn = document.getElementById('end');
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

	startBtn.style.display = "none";
	
	for(var round = 0; round <= lastRound; round++){
		if (round == lastRound){
			alert("Game Won!");
			sendScore(score);
		}
		else if (gameOver == true){
			sendScore(score);
			//alert if new highscore
			alert("You Lose" + "\n" + "Score: " + score + "\n" + "Sequence: " + simonArray);
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
				if (simonArray[flash] == "green"){
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

//Compares the button pressed to the current color in the simonArray sequence 
function buttonHandler(button, simonArray, iterator){
		if (listenersActive == true){
			if (button.id != simonArray[iterator]){ 
				gameOver = true;
			}
		}
		listenersActive = false;
}

//Temporarily changes color of button for specified length of time
async function FlashButton(button, speed){
	button.style.backgroundColor='#eee'; //White
	await new Promise(resolve => setTimeout(resolve, speed));
	button.style.backgroundColor=button.id; //Original color
	await new Promise(resolve => setTimeout(resolve, speed));
}

//Send Score Request function
//Needs work
function sendScore(score){
	const Url = 'http://localhost:8080/user/new-score';
	$.post(Url,score, function (score, status){
		console.log('${score} and status is ${status}');
	});
}
