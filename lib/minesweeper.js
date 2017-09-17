'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberofRows, numberofColumns) {
	var board = [];
	for (var numberofRowsIndex = 0; numberofRowsIndex < numberofRows; numberofRowsIndex++) {
		var row = [];

		for (var numberofColumnsIndex = 0; numberofColumnsIndex < numberofColumns; numberofColumnsIndex++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
};

var generateBombBoard = function generateBombBoard(numberofRows, numberofColumns, numberofBombs) {
	var board = [];
	for (var numberofRowsIndex = 0; numberofRowsIndex < numberofRows; numberofRowsIndex++) {
		var row = [];

		for (var numberofColumnsIndex = 0; numberofColumnsIndex < numberofColumns; numberofColumnsIndex++) {
			row.push(null);
		}
		board.push(row);
	}
	var numberofBombsPlaced = 0;
	while (numberofBombsPlaced < numberofBombs) {
		var randomRowIndex = Math.floor(Math.random() * numberofRows);
		var randomColumnIndex = Math.floor(Math.random() * numberofColumns);
		if (board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberofBombsPlaced++;
		}
	}
	return board;
};

var getNumberofNeighborBombs = function getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex) {
	var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	var numberofRows = bombBoard.length;
	var numberofColumns = bombBoard[0].length;
	var numberofBombs = 0;
	neighborOffsets.forEach(function (offset) {
		var neighborRowIndex = rowIndex + offset[0];
		var neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex < numberofRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberofColumns) {

			if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
				numberofBombs++;
			}
		}
	});
	return numberofBombs;
};
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log("This tile has been flipped!");
		return;
	} else if (bombBoard[rowIndex][columnIndex] == 'B') {
		playerBoard[rowIndex][columnIndex] == 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

var printBoard = function printBoard(board) {
	console.log(board.map(function (row) {
		return row.join(' | ');
	}).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 1, 0);

console.log('Updated Player Board:');
printBoard(playerBoard);