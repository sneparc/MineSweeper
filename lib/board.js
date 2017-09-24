'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberofRows, numberofColumns, numberofBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberofBombs;
		this._numberOfTiles = numberofRows * numberofColumns;
		this._playerBoard = Board.generatePlayerBoard(numberofRows, numberofColumns);
		this._bombBoard = Board.generateBombBoard(numberofRows, numberofColumns, numberofBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				console.log("This tile has been flipped!");
				return;
			} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberofNeighborBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberofNeighborBombs',
		value: function getNumberofNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
			var numberofRows = this._bombBoard.length;
			var numberofColumns = this._bombBoard[0].length;
			var numberofBombs = 0;
			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];
				if (neighborRowIndex >= 0 && neighborRowIndex < numberofRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberofColumns) {

					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
						numberofBombs++;
					}
				}
			});
			return numberofBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			if (this._numberOfTiles !== this._numberOfBombs) {

				return this._numberOfTiles !== this._numberOfBombs;
			}
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberofRows, numberofColumns) {
			var board = [];
			for (var numberofRowsIndex = 0; numberofRowsIndex < numberofRows; numberofRowsIndex++) {
				var row = [];

				for (var numberofColumnsIndex = 0; numberofColumnsIndex < numberofColumns; numberofColumnsIndex++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberofRows, numberofColumns, numberofBombs) {
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
		}
	}]);

	return Board;
}();