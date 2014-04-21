// connect-four
// script.js

$(document).ready(function(){

 	$('body').hide();
 	$('body').fadeIn({duration: 1000, easing: 'swing'});

 	//Get id of column clicked on, execute game play
 	$('.column').click(function(){
 		var col = parseInt($(this).attr('id'));
 		if (valid_move){
	 		game_play(col);
	 		$('#' + col).append('<div class = "' + get_color() + '"></div>');
	 		switch_player();
	 	}
 	});
});

var valid_move = 1;
var player = 0;

//2D array of chars for bookkeeping
var grid_matrix = [
	['', '', '', '', '', '', ''],
	['', '', '', '', '', '', ''],
	['', '', '', '', '', '', ''],
	['', '', '', '', '', '', ''],
	['', '', '', '', '', '', ''],
	['', '', '', '', '', '', '']];

function switch_player(){
	if (player === 0){
		player = 1;
	} else { 
		player = 0;
	}
};

function get_color(){
	if (player === 0){
		return 'red chip';
	} else { 
		return 'black chip';
	}
};

//Checks for four in a row given most recently used location
function get_winner(row, col){

	var count = 0;
	var flag = 0;
	valid_move = 1;

	//Check horizontal
	for (i = 0; i <= 6 ; i++){
		if (grid_matrix[row][i] === player){
			count++;
		} else { count = 0; }
		if (count >= 4)	{ flag = 1; break; }	
	} count = 0;

	//Check vertical
	for (i = 5; i >= 0; i--){

		if (grid_matrix[i][col] === player){
			count++;
		} else { count = 0; }

		if (count >= 4)	{ flag = 1; break; }
	} count = 0;

	//Check right-diagonal
	var temp_row;
	var temp_col;

	temp_row = row + col;
	if (temp_row > 5) {
		temp_col = temp_row - 5;
		temp_row = 5;
	} else { temp_col = 0; }
	
	while (temp_row >= 0 && temp_col <= 6){
		if (grid_matrix[temp_row][temp_col] === player){
			count++;
		} else { count = 0; }

		if (count >= 4)	{ flag = 1; }

		temp_row--;
		temp_col++;
	} count = 0;

	//Check left-diagonal
	temp_row = 0;
	temp_col = 0;

	temp_row = row - col;
	if (temp_row < 0) {
		temp_col = temp_row * -1;
		temp_row = 0;
	} else { temp_col = 0; }

	while (temp_row <= 5 && temp_col <= 6){
		if (grid_matrix[temp_row][temp_col] === player){
			count++;
		} else { count = 0; }

		if (count >= 4)	{ flag = 1; break; }

		temp_row++;
		temp_col++;
	} 

	//If game has been won --
	if (flag){
		$('#grid').addClass('end', 1500);

		var delay = setTimeout(function(){
		$('#message').removeClass('hidden');
		}, 250)

		if (player === 0)	{ $('#winner').append('1'); } 
		else 				{ $('#winner').append('2'); }
	}
};

//Verifies validity, marks grid, checks for winner
function game_play(col){

	var row;

	if (grid_matrix[0][col] === ''){
		for (var i = 5; i >= 0; i--){
			if (grid_matrix[i][col] === ''){
				grid_matrix[i][col] = player;
				row = i;
				break;
			}
		} 
	} else	{ valid_move = 0; } 
	
	get_winner(row, col);
};
