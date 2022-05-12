var context;
var shape = new Object();
var board;
var score;
var tries;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var paused = 0;

var movement_counter;
var movement_direction;

var red_ghost = new Object();
var cyan_ghost = new Object();
var green_ghost = new Object();
var pink_ghost = new Object();

var cherry = new Object();
var cherry_eaten = 0;

var interval_counter =0;
var tp_cooldown = 0;


var total_food =50;

var normal_food_color ="#A9E698";
var better_food_color ="#9717E5";
var best_food_color ="#3C63E6";

var num_of_ghosts = 4;

var max_time = 600;

var key_up = 38;
var key_down = 40;
var key_left = 37;
var key_right = 39;




var death_sound = new Audio('AudioFiles/death_sound.mp3');
death_sound.volume = 0.5;

function to_game_page() {
	var game_p = document.getElementById("game");
	var welcoming_p = document.getElementById("welcoming_page");
	if (game_p.style.display === "none") {
		game_p.style.display = "block";
		welcoming_p.style.display = "none";
		context = canvas.getContext("2d");			
		Start();		
	} else {
		game_p.style.display = "none";
		welcoming_p.style.display = "block";
		window.clearInterval(interval);
	}
  }

 

  function to_register_page() {
	var welcoming_p = document.getElementById("welcoming_page");
	var register_p = document.getElementById("register_page");
	welcoming_p.style.display = "none";
	register_p.style.display = "block";

  }

  function to_main_page_from_register() {
	var welcoming_p = document.getElementById("welcoming_page");
	var register_p = document.getElementById("register_page");
	welcoming_p.style.display = "block";
	register_p.style.display = "none";
  }

  function to_login_page() {
	var welcoming_p = document.getElementById("welcoming_page");
	var login_p = document.getElementById("login_page");
	welcoming_p.style.display = "none";
	login_p.style.display = "block";
  }

  function to_main_page_from_login() {
	var welcoming_p = document.getElementById("welcoming_page");
	var login_p = document.getElementById("login_page");
	welcoming_p.style.display = "block";
	login_p.style.display = "none";
  }


  function to_game_page_from_options() {
	var game_p = document.getElementById("game_page");
	var options_p = document.getElementById("options_page");	
	game_p.style.display = "block";
	options_p.style.display = "none";
	context = canvas.getContext("2d");			
	

	total_food = document.getElementById("num_balls").value;

	normal_food_color = document.getElementById("ball_color1").value;
	better_food_color = document.getElementById("ball_color2").value;
	best_food_color = document.getElementById("ball_color3").value;

	num_of_ghosts = document.getElementById("ghosts").value;

	max_time = document.getElementById("duration").value;


	Start();		
	
  }

  function to_options_from_game(){
	var game_p = document.getElementById("game_page");
	var options_p = document.getElementById("options_page");	
	score = 0; //restart score
	tries = 5; //restart tries
	cherry_eaten = 0;
	clearInterval(interval);
	game_p.style.display = "none";
	options_p.style.display = "block";
	
  }

  function logout_from_game(){
	var game_p = document.getElementById("game_page");
	var welcoming_p = document.getElementById("welcoming_page");
	var options_p = document.getElementById("options_page");	
	document.getElementById("nav").style.display = "none";
	if (game_p.style.display == "block"){
		score = 0;
		tries = 5;
		cherry_eaten = 0;
		clearInterval(interval);
		game_p.style.display = "none";
		welcoming_p.style.display = "block";
	}
	if(options_p.style.display == "block"){
		options_p.style.display = "none";
		welcoming_p.style.display = "block";
	}

	
  }

  function play_again(){
	window.clearInterval(interval);
	cherry_eaten = 0;
	score = 0; 
	tries = 5; 
	Start();
  }

  function randomize_settings(){
	
	key_up = 38;
	key_down = 40;
	key_left = 37;
	key_right = 39;		

	document.getElementById("key_button_up").innerText = "↑";
	document.getElementById("key_button_down").innerText = "↓";
	document.getElementById("key_button_left").innerText = "←";
	document.getElementById("key_button_right").innerText = "→";

	document.getElementById("ball_color1").value = getRandomColor()

	document.getElementById("ball_color2").value = getRandomColor()

	document.getElementById("ball_color3").value = getRandomColor()

	document.getElementById("num_balls").value = Math.floor(Math.random() * (90 - 50 + 1)) + 50;

	document.getElementById("ghosts").value = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

	document.getElementById("duration").value = Math.floor(Math.random() * (600 - 60 + 1)) + 60;
  }

  function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

  function to_options_page_from_login(){
	var options_p = document.getElementById("options_page");
	var login_p = document.getElementById("login_page");
	var nav = document.getElementById("nav");
	options_p.style.display = "block";
	nav.style.display = "block";
	login_p.style.display = "none";
  }



  $( document ).ready(function() {
	var year = new Date().getFullYear();
	for (var i=1900; i<=year; i++) $("#year").append('<option value=' + i + '>' + i + '</option>');
	for (var i=1; i<=12; i++) $("#month").append('<option value=' + i + '>' + i + '</option>');
	for (var i=1; i<=31; i++) $("#day").append('<option value=' + i + '>' + i + '</option>');

	for (var i=60; i<=600; i++) $("#duration").append('<option value=' + i + '>' + i + '</option>');
	for (var i=50; i<=90; i++) $("#num_balls").append('<option value=' + i + '>' + i + '</option>');
	for (var i=1; i<=4; i++) $("#ghosts").append('<option value=' + i + '>' + i + '</option>');
  });



// $(document).ready(function() {
// 	context = canvas.getContext("2d");	
// 	Start();
// });

tries=5;
score = 0;

function Start() {
	ball_number.innerText  = document.getElementById("num_balls").value;
	b_color1.value = document.getElementById("ball_color1").value;
	b_color2.value = document.getElementById("ball_color2").value;
	b_color3.value = document.getElementById("ball_color3").value;
	game_d.innerText = document.getElementById("duration").value;
	ghosts_num.innerText = document.getElementById("ghosts").value;

	document.getElementById("display_up").innerText = document.getElementById("key_button_up").innerText;
	document.getElementById("display_down").innerText = document.getElementById("key_button_down").innerText;
	document.getElementById("display_left").innerText = document.getElementById("key_button_left").innerText;
	document.getElementById("display_right").innerText = document.getElementById("key_button_up").innerText;



	board = new Array();
	red_ghost_board = new Array();
	cyan_ghost_board = new Array();
	green_ghost_board = new Array();
	pink_ghost_board = new Array();
	cherry_board = new Array();
	pac_color = "yellow";
	var cnt = 120;
	var food_remain = total_food;
	// var pacman_remain = 1;
	start_time = new Date();
	// waka_audio.play()		
	

	movement_counter = 0;
	movement_direction = 0;

	for (var i = 0; i < 21; i++) { 
		board[i] = new Array();
		red_ghost_board[i] = new Array();
		cyan_ghost_board[i] = new Array();
		green_ghost_board[i] = new Array();
		pink_ghost_board[i] = new Array();
		cherry_board[i] = new Array();
		for (var j = 0; j < 13; j++) {
			cherry_board[i][j] = 0;
			if (i == 1 && j == 1 ){
				red_ghost_board[i][j] = 1;
				red_ghost.x = i;
				red_ghost.y = j;
				red_ghost.x_old = -1;
				red_ghost.y_old = -1;
			}
			else{
				red_ghost_board[i][j] = 0;
			}

			if (i == 18 && j == 11 && num_of_ghosts >= 2){
				cyan_ghost_board[i][j] = 1;
				cyan_ghost.x = i;
				cyan_ghost.y = j;
				cyan_ghost.x_old = -1;
				cyan_ghost.y_old = -1;
			}
			else{
				cyan_ghost_board[i][j] = 0;
			}
			if (i == 18 && j == 1 && num_of_ghosts >= 3){
				green_ghost_board[i][j] = 1;
				green_ghost.x = i;
				green_ghost.y = j;
				green_ghost.x_old = -1;
				green_ghost.y_old = -1;
			}
			else{
				green_ghost_board[i][j] = 0;
			}
			if (i == 1 && j == 11 && num_of_ghosts >= 4){
				pink_ghost_board[i][j] = 1;
				pink_ghost.x = i;
				pink_ghost.y = j;
				pink_ghost.x_old = -1;
				pink_ghost.y_old = -1;
			}
			else{
				pink_ghost_board[i][j] = 0;
			}
			
			if (
				(j == 0) ||				
				(j == 12) ||
				(i == 0 && j != 6) ||
				(i == 19 && j != 6) ||
				(i == 1 && j == 5) ||
				(i == 1 && j == 7) ||
				(i == 2 && j == 9) ||
				(i == 2 && j == 10) ||
				(i == 3 && j == 9) ||
				(i == 4 && j == 11) ||
				(i == 5 && j == 11) ||
				(i == 14 && j == 11) ||
				(i == 3 && j == 2) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 5) ||
				(i == 3 && j == 6) ||
				(i == 3 && j == 7) ||
				(i == 4 && j == 2) ||
				(i == 4 && j == 3) ||
				(i == 4 && j == 5) ||
				(i == 4 && j == 7) ||
				(i == 5 && j == 5) ||
				(i == 5 && j == 7) ||
				(i == 5 && j == 8) ||
				(i == 5 && j == 9) ||
				(i == 6 && j == 2) ||
				(i == 6 && j == 3) ||
				(i == 6 && j == 8) ||				
				(i == 7 && j == 2) ||
				(i == 7 && j == 5) ||
				(i == 7 && j == 6) ||
				(i == 7 && j == 10) ||
				(i == 8 && j == 2) ||
				(i == 8 && j == 3) ||
				(i == 8 && j >= 6 && j <= 10 && j!=9) ||
				(i == 9 && j == 3) ||
				(i == 9 && j == 4) ||
				(i == 10 && j == 1) ||
				(i == 10 && j == 6) ||
				(i == 10 && j == 7) ||
				(i == 10 && j == 8) ||
				(i == 10 && j == 10) ||
				(i == 11 && j == 1) ||
				(i == 11 && j == 3) ||
				(i == 11 && j == 4) ||
				(i == 11 && j == 5) ||
				(i == 11 && j == 6) ||
				(i == 11 && j == 8) ||
				(i == 11 && j == 9) ||
				(i == 11 && j == 10) ||
				(i == 12 && j == 10) ||				
				(i == 13 && j == 2) ||
				(i == 13 && j >= 4 && j <= 8 && j!=6) ||
				(i == 14 && j == 2) ||
				(i == 14 && j == 3) ||
				(i == 14 && j == 4) ||
				(i == 14 && j == 8) ||
				(i == 14 && j == 9) ||
				(i == 15 && j == 3) ||
				(i == 16 && j == 1) ||
				(i == 16 && j == 3) ||
				(i == 16 && j == 4) ||
				(i == 16 && j == 5) ||
				(i == 16 && j == 7) ||
				(i == 16 && j == 8) ||
				(i == 16 && j == 9) ||
				(i == 16 && j == 10) ||
				(i == 17 && j == 1) || 
				(i == 17 && j == 10) ||
				(i == 18 && j == 5) ||
				(i == 18 && j == 7) 

			) {
				board[i][j] = 4;
			} else {
				// var randomNum = Math.random();
				// if (randomNum <= (1.0 * food_remain) / cnt) {
				// 	food_remain--;
				// 	board[i][j] = 1;
				// } 
				// else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					// randI = Math.round(19*Math.random());
					// randJ = Math.round(11*Math.random());
					// while (randI > 14 || randI < 6){
					// 	randI = Math.round(19*Math.random());
					// 	if (board[randI][randJ] == 4 || board[randI][randJ] == 1 || board[randI][randJ] == 0 || board[randI][randJ] == 3){
					// 		randI = Math.round(19*Math.random());
					// 	}
					// }
					// while (randJ > 8 || randJ < 4){
					// 	randJ = Math.round(19*Math.random());
					// 	if (board[randI][randJ] == 4 || board[randI][randJ] == 1 || board[randI][randJ] == 0 || board[randI][randJ] == 3){
					// 		randJ = Math.round(19*Math.random());
					// 	}
					// }

					// shape.i = randI;
					// shape.j = randJ;					
					// pacman_remain--;
					// board[randI][randJ] = 2;
					// let pacPos = findRandomEmptyCellForPacman(board)
					// shape.i = pacPos[0];
					// shape.j = pacPos[1];					
					// pacman_remain--;
					// board[pacPos[0]][pacPos[1]] = 2;						
				// } 
				// else {
					board[i][j] = 0;
				// }
				cnt--;
			}
		}
	}
	let pacPos = findRandomEmptyCellForPacman(board)
	shape.i = pacPos[0];
	shape.j = pacPos[1];
	board[pacPos[0]][pacPos[1]] = 2;

	let normal_food = Math.floor(food_remain * 0.6);
	while (normal_food > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		normal_food--;
	}

	let better_food = Math.floor(food_remain * 0.3);
	while (better_food > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.1;
		better_food--;
	}

	let best_food = Math.floor(food_remain * 0.1);
	while (best_food  > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.2;
		best_food--;
	}

	var emptyCellForCherry = findRandomEmptyCell(board);
	cherry_board[emptyCellForCherry[0]][emptyCellForCherry[1]] = 1;
	cherry.x = emptyCellForCherry[0];
	cherry.y = emptyCellForCherry[1];

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 180);
}

function findRandomEmptyCellForPacman(board) {
	var i = Math.floor(Math.random() * (14 - 5 + 1)) + 5;
	var j = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (14 - 5 + 1)) + 5;
		j = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
	}
	return [i, j];
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 11 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 11 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[key_up]) {
		return 1;
	}
	if (keysDown[key_down]) {
		return 2;
	}
	if (keysDown[key_left]) {
		return 3;
	}
	if (keysDown[key_right]) {
		return 4;
	}
}

					

function swich_controls(button_id) {
	return new Promise((resolve) => {
	  document.addEventListener('keydown', onKeyHandler);
	  function onKeyHandler(e) {		
		if (button_id == "key_button_up"){
			key_up = e.keyCode;			
			if (key_up == 38) document.getElementById("key_button_up").innerText = "↑"; else if(key_up == 40) document.getElementById("key_button_up").innerText = "↓"; else if(key_up == 37) document.getElementById("key_button_up").innerText = "←"; else if(key_up == 39) document.getElementById("key_button_up").innerText = "→";
			else
				document.getElementById("key_button_up").innerText = String.fromCharCode(e.keyCode);
			// document.getElementById("display_up").innerText = document.getElementById("key_button_up").innerText;
		}
		else if (button_id == "key_button_down"){
			key_down = e.keyCode;
			if (key_down == 38) document.getElementById("key_button_down").innerText = "↑"; else if(key_down == 40) document.getElementById("key_button_down").innerText = "↓"; else if(key_down == 37) document.getElementById("key_button_down").innerText = "←"; else if(key_down == 39) document.getElementById("key_button_down").innerText = "→";
			else
				document.getElementById("key_button_down").innerText = String.fromCharCode(e.keyCode);
			// document.getElementById("display_down").innerText = document.getElementById("key_button_down").innerText;
		}
		else if (button_id == "key_button_left"){
			key_left = e.keyCode;
			if (key_left == 38) document.getElementById("key_button_left").innerText = "↑"; else if(key_left == 40) document.getElementById("key_button_left").innerText = "↓"; else if(key_left == 37) document.getElementById("key_button_left").innerText = "←"; else if(key_left == 39) document.getElementById("key_button_left").innerText = "→";
			else
				document.getElementById("key_button_left").innerText = String.fromCharCode(e.keyCode);
			// document.getElementById("display_left").innerText = document.getElementById("key_button_left").innerText;
		}
		else if (button_id == "key_button_right"){
			key_right = e.keyCode;
			if (key_right == 38) document.getElementById("key_button_right").innerText = "↑"; else if(key_right == 40) document.getElementById("key_button_right").innerText = "↓"; else if(key_right == 37) document.getElementById("key_button_right").innerText = "←"; else if(key_right == 39) document.getElementById("key_button_right").innerText = "→";
			else
				document.getElementById("key_button_right").innerText = String.fromCharCode(e.keyCode);
			// document.getElementById("display_right").innerText = document.getElementById("key_button_right").innerText;
		}
		document.removeEventListener('keydown', onKeyHandler);
		resolve();		
	  }
	});
}





function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTries.value = tries;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 21; i++) { // 20
		for (var j = 0; j < 16; j++) { // 15
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;					
			if (board[i][j] == 2 ) {  
				context.beginPath();
				if (movement_counter % 2 == 0){
					if (movement_direction == 0){
						context.arc(center.x, center.y, 30, -0.3 * Math.PI, 1.3 * Math.PI); // half circle - up
					}
					else if (movement_direction == 1){
						context.arc(center.x, center.y, 30, -1.3 * Math.PI, 0.3 * Math.PI); // half circle - down
					}
					else if (movement_direction == 2){
						context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // half circle - left
					}
					else if (movement_direction == 3){						
						context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle - right						
					}		
	
				}								
				else{
					context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI); // full circle
				}
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();		
				movement_counter ++;

				context.beginPath();
				if (movement_direction == 0 || movement_direction == 1){
					context.arc(center.x + 17, center.y - 5, 5, 0, 2 * Math.PI); // circle
				}
				else{					
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				}
				context.fillStyle = "black"; //color
				context.fill();
				
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = normal_food_color; //color
				context.fill();
			} else if (board[i][j] == 1.1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = better_food_color; //color
				context.fill();
			} else if (board[i][j] == 1.2) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = best_food_color; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue"; //color				
				context.fill();
			}
			if (red_ghost_board[i][j] == 1){
				draw_ghost(context, 30, center.x, center.y, "red");
			}
			if (cyan_ghost_board[i][j] == 1){
				draw_ghost(context, 30, center.x, center.y, "cyan");
			}	
			if (green_ghost_board[i][j] == 1){
				draw_ghost(context, 30, center.x, center.y, "green");
			}
			if (pink_ghost_board[i][j] == 1){
				draw_ghost(context, 30, center.x, center.y, "pink");
			}
			if (cherry_board[i][j] == 1 && cherry_eaten == 0){
				draw_cherry(context, center.x, center.y );
			}
		}
	}
}

function draw_ghost(context, radius, x , y, color="red") {
	let waves =  5;	
	let head_size = radius * 0.8;
	let wave_size = head_size / waves;
	context.save();
	context.strokeStyle = "black";
	context.fillStyle = color;
	context.lineWidth =  radius * 0.05;
	context.beginPath();
	for (i = 0; i < waves; i++) {
		context.arc(
			(x + 2 * wave_size * (waves - i)) - head_size - wave_size,
			y + radius - wave_size,
			wave_size, 0, Math.PI
		);
	}
	context.lineTo(x + -head_size,y + radius - wave_size);
	context.arc(x,y +  head_size - radius, head_size, Math.PI, 2 * Math.PI);
	context.closePath();
	context.fill();
	context.stroke();
	context.fillStyle = "white";
	context.beginPath();
	context.arc(x+ -head_size / 2.5,y + -head_size / 2, head_size / 3, 0, 2 * Math.PI);
	context.fill();
	context.beginPath();
	context.arc(x + head_size / 3.5,y + -head_size / 2, head_size / 3, 0, 2 * Math.PI);
	context.fill();
	context.fillStyle = "black";
	context.beginPath();
	context.arc(x + -head_size / 2,y + -head_size / 2, head_size / 8, 0, 2 * Math.PI);
	context.fill();
	context.beginPath();
	context.arc(x + head_size / 4,y+ -head_size / 2, head_size / 8, 0, 2 * Math.PI);
	context.fill();
}


function draw_cherry(context, x, y){
	

	context.moveTo(x, y);
	context.bezierCurveTo(x-40, y-60, x, y, x+15, y+20);
	context.lineWidth = 1;

	context.strokeStyle = '#006600';
	context.stroke();

	context.beginPath();
	context.arc(x+15, y+20, 15, 0, 2 * Math.PI, false);
	context.fillStyle = 'red';
	context.fill();
	context.lineWidth= 1;
	context.strokeStyle= '#000000';
	context.stroke();

	context.moveTo(x, y);
	context.bezierCurveTo(x-40, y-60, x, y, x+30, y+15);
	context.lineWidth = 1;

	context.strokeStyle = '#006600';
	context.stroke();

	context.beginPath();
	context.arc(x+30, y+15, 15, 0, 2 * Math.PI, false);
	context.fillStyle = 'red';
	context.fill();
	context.lineWidth= 1;
	context.strokeStyle= '#000000';
	context.stroke();



}

function move_randomly(x, y){
	let positions = new Array();
	let len=0;
	if (x+1  < 19 && board[x+1][y] != 4){
		positions[len] = new Array();		
		positions[len][0] = x+1;
		positions[len][1] = y;		
		len++;
	}
	if (x-1 > 0 && board[x-1][y] != 4){
		positions[len] = new Array();		
		positions[len][0] = x-1;
		positions[len][1] = y;		
		len++;
	}
	if (y-1 > 0 && board[x][y-1] != 4){
		positions[len] = new Array();		
		positions[len][0] = x;
		positions[len][1] = y-1;		
		len++;
	}
	if (y+1 < 12 && board[x][y+1] != 4){
		positions[len] = new Array();		
		positions[len][0] = x;
		positions[len][1] = y+1;		
		len++;
	}
	num = Math.floor(Math.random() * (len-1 - 0 + 1)) + 0;
	return positions[num];
} 

function move_torwards_pacman(x, y, ghost){
	let position = new Array();
	let best_price = Math.abs(x - shape.i) + Math.abs(y - shape.j);
	position[0] = x;
	position[1] = y;
	let curr_price = 0;
	let counter =0;
	if (x+1  < 19 && board[x+1][y] != 4 && !(ghost.x_old == x+1 && ghost.y_old == y)){
		curr_price = get_price(shape.i, x+1, shape.j, y) + Math.abs(x+1 - shape.i) + Math.abs(y - shape.j)
		if (best_price >= curr_price || counter == 0){
			best_price = curr_price;	
			position[0] = x+1;
			position[1] = y;
			counter++;
		}			
	}
	if (x-1 > 0 && board[x-1][y] != 4 && !(ghost.x_old == x-1 && ghost.y_old == y) ){
		curr_price = get_price(shape.i, x-1, shape.j, y) + Math.abs(x-1 - shape.i) + Math.abs(y - shape.j)
		if (best_price >= curr_price || counter == 0){
			best_price = curr_price;	
			position[0] = x-1;
			position[1] = y;
			counter++;
		}			
	}
	if (y-1 > 0 && board[x][y-1] != 4 && !(ghost.x_old == x && ghost.y_old == y-1) ){
		curr_price = get_price(shape.i, x, shape.j, y-1) + Math.abs(x - shape.i) + Math.abs(y - 1 - shape.j)
		if (best_price >= curr_price || counter == 0){
			best_price = curr_price;	
			position[0] = x;
			position[1] = y-1;
			counter++;
		}				
	}
	if (y+1 < 12 && board[x][y+1] != 4 && !(ghost.x_old == x && ghost.y_old == y+1)){
		curr_price = get_price(shape.i, x, shape.j, y+1) + Math.abs(x - shape.i) + Math.abs(y + 1 - shape.j)
		if (best_price >= curr_price || counter == 0){
			best_price = curr_price;	
			position[0] = x;
			position[1] = y + 1;
			counter++;
		}			
	}	
	return position;	
}

function get_price(x_pac, x_ghost, y_pac, y_ghost){
	let a;
	let b;
	if (x_pac-x_ghost == 0)
		a= 0;
	else
		a = (y_pac - y_ghost) / (x_pac - x_ghost);
	
	b = y_pac -a*x_pac;
	let penalty  = 0;

	for (let x=x_pac; x <= x_ghost; x++){		
		if (board[x][parseInt(a*x + b + 0.5, 10)] == 4)
			penalty += 100;		
	}	
	return penalty;


}

function reset_after_death(){

	red_ghost_board[red_ghost.x][red_ghost.y] = 0;
	red_ghost_board[1][1] = 1;
	red_ghost.x = 1;
	red_ghost.y = 1;
	red_ghost.x_old = -1;
	red_ghost.y_old = -1;
	
	if (num_of_ghosts >= 2){
		cyan_ghost_board[cyan_ghost.x][cyan_ghost.y] = 0;
		cyan_ghost_board[18][11] = 1;
		cyan_ghost.x = 18;
		cyan_ghost.y = 11;
		cyan_ghost.x_old = -1;
		cyan_ghost.y_old = -1;
	}
	if (num_of_ghosts >= 3){
		green_ghost_board[green_ghost.x][green_ghost.y] = 0;
		green_ghost_board[18][1] = 1;
		green_ghost.x = 18;
		green_ghost.y = 1;
		green_ghost.x_old = -1;
		green_ghost.y_old = -1;
	}
	if (num_of_ghosts >= 4){
		pink_ghost_board[pink_ghost.x][pink_ghost.y] = 0;
		pink_ghost_board[1][11] = 1;
		pink_ghost.x = 1;
		pink_ghost.y = 11;
		pink_ghost.x_old = -1;
		pink_ghost.y_old = -1;
	}
	
	board[shape.i][shape.j] = 0
	let pacPos = findRandomEmptyCellForPacman(board)
	shape.i = pacPos[0];
	shape.j = pacPos[1];
	board[pacPos[0]][pacPos[1]] = 2;
}

function UpdatePosition() {
	if (paused == 0){
		board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j -= 1;			
			movement_direction = 0;
			Draw();
		}
	}
	if (x == 2) {
		if (shape.j < 12 && board[shape.i][shape.j + 1] != 4) { // 12
			shape.j += 1;
			movement_direction = 1;
			Draw();
		}
	}
	if (x == 3) {
		if (shape.i == 0 && shape.j == 6 && tp_cooldown > 5){
			shape.i = 19;
			movement_direction = 2;
			tp_cooldown = 0;
			Draw();
		}
		else if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i -= 1;
			movement_direction = 2;
			Draw();
		}
	}
	if (x == 4) {
		if (shape.i == 19 && shape.j == 6 && tp_cooldown > 5){
			shape.i = 0;
			movement_direction = 3;
			tp_cooldown = 0;
			Draw();
		}
		else if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) { // 19
			shape.i += 1;
			movement_direction = 3;
			Draw();
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score+= 5;
	}
	if (board[shape.i][shape.j] == 1.1) {
		score+= 15;
	}
	if (board[shape.i][shape.j] == 1.2) {
		score+= 25;
	}
	board[shape.i][shape.j] = 2;			

	let new_xy = new Array();

	if (interval_counter % 2 == 0){		

			red_ghost_board[red_ghost.x][red_ghost.y] = 0;
			if ((cyan_ghost.x == red_ghost.x && cyan_ghost.y == red_ghost.y) || (red_ghost.x == green_ghost.x && red_ghost.y == green_ghost.y) || (red_ghost.x == pink_ghost.x && red_ghost.y == pink_ghost.y))
				new_xy = move_randomly(red_ghost.x, red_ghost.y);
			else
				new_xy = move_torwards_pacman(red_ghost.x, red_ghost.y, red_ghost);
			red_ghost_board[new_xy[0]][new_xy[1]] = 1;
			red_ghost.x_old = red_ghost.x;
			red_ghost.y_old = red_ghost.y;
			red_ghost.x = new_xy[0];
			red_ghost.y = new_xy[1];
	
		
		if (num_of_ghosts >= 2){
			cyan_ghost_board[cyan_ghost.x][cyan_ghost.y] = 0;
			if ((cyan_ghost.x == red_ghost.x && cyan_ghost.y == red_ghost.y) || (cyan_ghost.x == green_ghost.x && cyan_ghost.y == green_ghost.y) || (cyan_ghost.x == pink_ghost.x && cyan_ghost.y == pink_ghost.y))
				new_xy = move_randomly(cyan_ghost.x, cyan_ghost.y);
			else
				new_xy = move_torwards_pacman(cyan_ghost.x, cyan_ghost.y, cyan_ghost);
			cyan_ghost_board[new_xy[0]][new_xy[1]] = 1;
			cyan_ghost.x_old = cyan_ghost.x;
			cyan_ghost.y_old = cyan_ghost.y;
			cyan_ghost.x = new_xy[0];
			cyan_ghost.y = new_xy[1];
		}

		if (num_of_ghosts >= 3){
			green_ghost_board[green_ghost.x][green_ghost.y] = 0;
			if ((green_ghost.x == red_ghost.x && green_ghost.y == red_ghost.y) || (cyan_ghost.x == green_ghost.x && cyan_ghost.y == green_ghost.y) || (green_ghost.x == pink_ghost.x && green_ghost.y == pink_ghost.y))
				new_xy = move_randomly(green_ghost.x, green_ghost.y);
			else
				new_xy = move_torwards_pacman(green_ghost.x, green_ghost.y, green_ghost);
			green_ghost_board[new_xy[0]][new_xy[1]] = 1;
			green_ghost.x_old = green_ghost.x;
			green_ghost.y_old = green_ghost.y;
			green_ghost.x = new_xy[0];
			green_ghost.y = new_xy[1];	
		}
		if (num_of_ghosts >= 4){
			pink_ghost_board[pink_ghost.x][pink_ghost.y] = 0;
			if ((pink_ghost.x == red_ghost.x && pink_ghost.y == red_ghost.y) || (cyan_ghost.x == pink_ghost.x && cyan_ghost.y == pink_ghost.y) || (green_ghost.x == pink_ghost.x && green_ghost.y == pink_ghost.y))
				new_xy = move_randomly(pink_ghost.x, pink_ghost.y);
			else
				new_xy = move_torwards_pacman(pink_ghost.x, pink_ghost.y, pink_ghost);
			pink_ghost_board[new_xy[0]][new_xy[1]] = 1;
			pink_ghost.x_old = pink_ghost.x;
			pink_ghost.y_old = pink_ghost.y;
			pink_ghost.x = new_xy[0];
			pink_ghost.y = new_xy[1];
		}
		
		
		
	}
	if (cherry_eaten == 0 && interval_counter % 5 == 0){
		cherry_board[cherry.x][cherry.y] = 0;
		new_xy = move_randomly(cherry.x, cherry.y);
		cherry_board[new_xy[0]][new_xy[1]] = 1;
		cherry.x = new_xy[0];
		cherry.y = new_xy[1];
	}

	var currentTime = new Date();	
	time_elapsed = (currentTime - start_time) / 1000;

	
	if (time_elapsed >= max_time){
		window.clearInterval(interval);
		score = 0; //restart score
		tries = 5; //restart tries
		cherry_eaten = 0;
		window.alert("Time's out, you lost!");
	}
	if (score >= 400) {
		window.clearInterval(interval);
		score = 0; //restart score
		tries = 5; //restart tries
		cherry_eaten = 0;
		window.alert("Congratulations! you won!");
	} else {
		Draw();
	}	
	if (shape.i == cherry.x && shape.j == cherry.y && cherry_eaten == 0){
		score += 50;
		cherry_board[cherry.x][cherry.y] = 0;
		cherry.x = -1;
		cherry.y = -1;
		cherry_eaten = 1;
	}
	if ((green_ghost.x == shape.i && green_ghost.y == shape.j) || (cyan_ghost.x == shape.i && cyan_ghost.y == shape.j) || (red_ghost.x == shape.i && red_ghost.y == shape.j) || (pink_ghost.x == shape.i && pink_ghost.y == shape.j)){		
		tries--;
		// window.alert("You lost - Remaining Tries: " + tries);
		death_sound.play();
		paused=1;
		if(tries == 0){
			window.clearInterval(interval);
			window.alert("Game Over - You lost!");			
			score = 0; //restart score
			tries = 5; //restart tries
			cherry_eaten = 0;
			// to_game_page();
			// reset_after_death();
		}
		else
		{
			score-=10;
			// Start();
			// to_game_page();
			reset_after_death();
		}
		// else
		// {
		// 	tries = 5; //restart tries
		// 	score = 0; //restart score
		// 	// to_game_page();
		// 	reset_after_death();
		// }
	}
	interval_counter++;
	tp_cooldown++;
	}
	else{
		paused++;
		if (paused == 15){
			time_elapsed -= (30*180)/1000;
			paused=0;
		}
			
	}
	
}
