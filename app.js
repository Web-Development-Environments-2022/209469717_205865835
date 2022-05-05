var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var movement_counter;
var movement_direction;

var red_ghost = new Object();
var cyan_ghost = new Object();
var green_ghost = new Object();

var interval_counter =0;

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


// $(document).ready(function() {
// 	context = canvas.getContext("2d");	
// 	Start();
// });

function Start() {
	board = new Array();
	red_ghost_board = new Array();
	cyan_ghost_board = new Array();
	green_ghost_board = new Array()
	score = 0;
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
		red_ghost_board[i] = new Array()
		cyan_ghost_board[i] = new Array()
		green_ghost_board[i] = new Array()
		for (var j = 0; j < 13; j++) { 

			if (i == 1 && j == 1){
				red_ghost_board[i][j] = 1;
				red_ghost.x = i;
				red_ghost.y = j;
			}
			else{
				red_ghost_board[i][j] = 0;
			}

			if (i == 18 && j == 11){
				cyan_ghost_board[i][j] = 1;
				cyan_ghost.x = i;
				cyan_ghost.y = j;
			}
			else{
				cyan_ghost_board[i][j] = 0;
			}
			if (i == 18 && j == 1){
				green_ghost_board[i][j] = 1;
				green_ghost.x = i;
				green_ghost.y = j;
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
	var i = Math.floor(Math.random() * 21 + 1);
	var j = Math.floor(Math.random() * 13 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 21 + 1);
		j = Math.floor(Math.random() * 13 + 1);
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
				draw_ghost(context, 30, center.x, center.y, "red")
			}
			if (cyan_ghost_board[i][j] == 1){
				draw_ghost(context, 30, center.x, center.y, "cyan")
			}	
			if (green_ghost_board[i][j] == 1){
				draw_ghost(context, 30, center.x, center.y, "green")
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
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i -= 1;
			movement_direction = 2;
			Draw();
		}
	}
	if (x == 4) {
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) { // 19
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

	cyan_ghost_board[cyan_ghost.x][cyan_ghost.y] = 0;
	new_xy = move_randomly(cyan_ghost.x, cyan_ghost.y);
	cyan_ghost_board[new_xy[0]][new_xy[1]] = 1;
	cyan_ghost.x = new_xy[0];
	cyan_ghost.y = new_xy[1];	

	red_ghost_board[red_ghost.x][red_ghost.y] = 0;
	new_xy = move_randomly(red_ghost.x, red_ghost.y);
	red_ghost_board[new_xy[0]][new_xy[1]] = 1;
	red_ghost.x = new_xy[0];
	red_ghost.y = new_xy[1];

	green_ghost_board[green_ghost.x][green_ghost.y] = 0;
	new_xy = move_randomly(green_ghost.x, green_ghost.y);
	green_ghost_board[new_xy[0]][new_xy[1]] = 1;
	green_ghost.x = new_xy[0];
	green_ghost.y = new_xy[1];


	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if ((green_ghost.i == shape.i && green_ghost.j == shape.j) || (cyan_ghost.i == shape.i && cyan_ghost.j == shape.j) || (red_ghost.i == shape.i && red_ghost.j == shape.j)){
		window.clearInterval(interval);
		window.alert("mongol kid Die IRL");
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "cyan";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
	interval_counter++;
}

