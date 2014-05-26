// connect-four
// script.js

$(document).ready(function(){

 	$('body').hide();
 	$('body').fadeIn({duration: 1000, easing: 'swing'});

 	$('.column').mouseover(function(){
 		$(this).append('<div class = "preview ' + get_color() + '"></div>');
 	});

 	$('.column').mouseout(function(){
 		$(this).children().last().remove();
 	});

 	//Get id of column clicked on, execute game play
 	$('.column').click(function(){
 		var col = parseInt($(this).attr('id'));
 		if (grid_matrix[0][col] === ''){
 			max_disc--;
 			$(this).children().last().remove();
	 		game_play(col);
	 		$('#' + col).append('<div class = "bouncing ' + get_color() + '"></div>');
	 		switch_player();
			$(this).append('<div class = "preview ' + get_color() + '"></div>');
	 	}
 	});
});

var player = 0;
var max_disc = 42;

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
	if (player === 0)	{ return 'red chip';	}
	else 				{ return 'black chip';	}
};

//Checks for four in a row given most recently used location
function get_winner(row, col){

	var count = 0;
	var flag = 0;

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

		setTimeout(function(){
		$('#player_win').removeClass('hidden');
		}, 500);

		if (player === 0)	{ $('#winner').append('1'); } 
		else 				{ $('#winner').append('2'); }
	} 

	//If grid is full and nobody yet has won, declare tie & set flag
	else if (max_disc === 0){

		flag = 1;

		$('#grid').addClass('end', 1500);

		setTimeout(function(){
		$('#tie').removeClass('hidden');
		}, 500);
	}

	//If game is over, ask to play again
	if (flag){
		setTimeout(function(){
		$('#button').removeClass('hidden');
		}, 1000);
		$('#button').click(function(){
			location.reload();
		});
	}
};

//Marks grid, checks for winner
function game_play(col){

	var row;
	for (var i = 5; i >= 0; i--){
		if (grid_matrix[i][col] === ''){
			grid_matrix[i][col] = player;
			row = i;
			break;
		}
	} get_winner(row, col);
};
