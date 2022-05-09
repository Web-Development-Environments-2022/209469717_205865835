
var context;
var shape = new Object();
var board;
var score;
var tries;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var movement_counter;
var movement_direction;

var red_ghost = new Object();
var cyan_ghost = new Object();
var green_ghost = new Object();

var cherry = new Object();
var cherry_eaten = 0;

var interval_counter =0;
var tp_cooldown = 0;


var waka_audio = document.getElementById("waka");        


function to_game_page() {
	var game_p = document.getElementById("game_page");
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
	if (game_p.style.display === "none") {
		game_p.style.display = "block";
		options_p.style.display = "none";
		context = canvas.getContext("2d");			
		Start();		
	} else {
		game_p.style.display = "none";
		options_p.style.display = "block";
		window.clearInterval(interval);
	}
  }


  function to_options_page_from_login(){
	var options_p = document.getElementById("options_page");
	var login_p = document.getElementById("login_page");
	options_p.style.display = "block";
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
	board = new Array();
	red_ghost_board = new Array();
	cyan_ghost_board = new Array();
	green_ghost_board = new Array();
	cherry_board = new Array();
	pac_color = "yellow";
	var cnt = 120;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	// waka_audio.play()		
	

	movement_counter = 0;
	movement_direction = 0;

	for (var i = 0; i < 21; i++) { 
		board[i] = new Array();
		red_ghost_board[i] = new Array();
		cyan_ghost_board[i] = new Array();
		green_ghost_board[i] = new Array();
		cherry_board[i] = new Array();
		for (var j = 0; j < 13; j++) {
			cherry_board[i][j] = 0;
			if (i == 1 && j == 1){
				red_ghost_board[i][j] = 1;
				red_ghost.x = i;
				red_ghost.y = j;
				red_ghost.x_old = -1;
				red_ghost.y_old = -1;
			}
			else{
				red_ghost_board[i][j] = 0;
			}

			if (i == 18 && j == 11){
				cyan_ghost_board[i][j] = 1;
				cyan_ghost.x = i;
				cyan_ghost.y = j;
				cyan_ghost.x_old = -1;
				cyan_ghost.y_old = -1;
			}
			else{
				cyan_ghost_board[i][j] = 0;
			}
			if (i == 18 && j == 1){
				green_ghost_board[i][j] = 1;
				green_ghost.x = i;
				green_ghost.y = j;
				green_ghost.x_old = -1;
				green_ghost.y_old = -1;
			}
			else{
				green_ghost_board[i][j] = 0;
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
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					// 	let randI = i;
					// 	let randJ = j;
					// 	// while ((randI <= Math.abs(i/3)+3 || j <= Math.abs(j/3)+3) && board[i][j] != 4){
					// 		while ((randI < Math.round(i/3) || randJ < Math.round(i/3) ) && board[randI][randJ] != 4){
					// 		randI = Math.round(Math.random(randI)*randI);
					// 		randJ = Math.round(Math.random(randJ));
					// 	}
					shape.i = i;
					shape.j = j;					
					pacman_remain--;
					board[i][j] = 2;						
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	// lblTries.value = tries;
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
				context.fillStyle = "white"; //color
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
	// context.fillStyle = "purple";
    // context.beginPath();
    // context.arc(x, y, 15, 0, 2 * Math.PI);
    // context.fill();

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

function UpdatePosition() {
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
			movement_direction = 3;
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
		score++;
	}
	board[shape.i][shape.j] = 2;			

	let new_xy = new Array();

	if (interval_counter % 2 == 0){		
		cyan_ghost_board[cyan_ghost.x][cyan_ghost.y] = 0;
		if ((cyan_ghost.x == red_ghost.x && cyan_ghost.y == red_ghost.y) || (cyan_ghost.x == green_ghost.x && cyan_ghost.y == green_ghost.y))
			new_xy = move_randomly(cyan_ghost.x, cyan_ghost.y);
		else
			new_xy = move_torwards_pacman(cyan_ghost.x, cyan_ghost.y, cyan_ghost);
		cyan_ghost_board[new_xy[0]][new_xy[1]] = 1;
		cyan_ghost.x_old = cyan_ghost.x;
		cyan_ghost.y_old = cyan_ghost.y;
		cyan_ghost.x = new_xy[0];
		cyan_ghost.y = new_xy[1];	
			
		red_ghost_board[red_ghost.x][red_ghost.y] = 0;
		if ((cyan_ghost.x == red_ghost.x && cyan_ghost.y == red_ghost.y) || (red_ghost.x == green_ghost.x && red_ghost.y == green_ghost.y))
			new_xy = move_randomly(red_ghost.x, red_ghost.y);
		else
			new_xy = move_torwards_pacman(red_ghost.x, red_ghost.y, red_ghost);
		red_ghost_board[new_xy[0]][new_xy[1]] = 1;
		red_ghost.x_old = red_ghost.x;
		red_ghost.y_old = red_ghost.y;
		red_ghost.x = new_xy[0];
		red_ghost.y = new_xy[1];
		
		green_ghost_board[green_ghost.x][green_ghost.y] = 0;
		if ((green_ghost.x == red_ghost.x && green_ghost.y == red_ghost.y) || (cyan_ghost.x == green_ghost.x && cyan_ghost.y == green_ghost.y))
			new_xy = move_randomly(green_ghost.x, green_ghost.y);
		else
			new_xy = move_torwards_pacman(green_ghost.x, green_ghost.y, green_ghost);
		green_ghost_board[new_xy[0]][new_xy[1]] = 1;
		green_ghost.x_old = green_ghost.x;
		green_ghost.y_old = green_ghost.y;
		green_ghost.x = new_xy[0];
		green_ghost.y = new_xy[1];			
		
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

	
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "cyan";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}	
	if (shape.i == cherry.x && shape.j == cherry.y && cherry_eaten == 0){
		score += 20;
		cherry_board[cherry.x][cherry.y] = 0;
		cherry.x = -1;
		cherry.y = -1;
		cherry_eaten = 1;
	}
	if ((green_ghost.x == shape.i && green_ghost.y == shape.j) || (cyan_ghost.x == shape.i && cyan_ghost.y == shape.j) || (red_ghost.x == shape.i && red_ghost.y == shape.j)){
		window.clearInterval(interval);
		tries--;
		window.alert("You lost - Remaining Tries: " + tries);
		if(tries == 0){
			window.clearInterval(interval);
			window.alert("Game Over");
			window.alert("Press OK to return to main menu");
			score = 0; //restart score
			tries = 5; //restart tries
			to_game_page();
		}
		else if (window.confirm('Press OK to retry, or CANCEL to return to main menu'))
		{
			score-=10;
			Start();
		}
		else
		{
			tries = 5; //restart tries
			score = 0; //restart score
			to_game_page();
		}
	}
	interval_counter++;
	tp_cooldown++;
}

