export class Board {
	constructor(numberofRows, numberofColumns, numberofBombs){
	this._numberOfBombs = numberofBombs;
	this._numberOfTiles = numberofRows * numberofColumns;
	this._playerBoard= Board.generatePlayerBoard(numberofRows,numberofColumns);
	this._bombBoard = Board.generateBombBoard(numberofRows, numberofColumns, numberofBombs);
	}

	get playerBoard() {
		return this._playerBoard;
	}

	flipTile(rowIndex, columnIndex){
	if(this._playerBoard[rowIndex][columnIndex] !== ' '){
		console.log("This tile has been flipped!");
		return;
	}else if(this._bombBoard[rowIndex][columnIndex]=== 'B'){
		this._playerBoard[rowIndex][columnIndex] = 'B';
	}else{
		this._playerBoard[rowIndex][columnIndex] = this.getNumberofNeighborBombs(rowIndex, columnIndex);

	}
	this._numberOfTiles--;
}

getNumberofNeighborBombs(rowIndex, columnIndex){
	const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
	const numberofRows = this._bombBoard.length;
	const numberofColumns = this._bombBoard[0].length;
	let numberofBombs = 0;
	neighborOffsets.forEach(offset =>{
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		if(neighborRowIndex >= 0 && neighborRowIndex < numberofRows && neighborColumnIndex>=0 && neighborColumnIndex < numberofColumns){

			if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
				numberofBombs++;

			}

		}

	});
	return numberofBombs;
}

hasSafeTiles(){
	if(this._numberOfTiles !== this._numberOfBombs){

		return this._numberOfTiles !== this._numberOfBombs;
		}
}

print(){
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	}


static generatePlayerBoard(numberofRows, numberofColumns){
	let board = [];
	for(let numberofRowsIndex = 0; numberofRowsIndex < numberofRows; numberofRowsIndex++){
		let row = [];
		
	for(let numberofColumnsIndex = 0; numberofColumnsIndex < numberofColumns; numberofColumnsIndex++){
		row.push(' ');
		}
		board.push(row);
	}
	return board;
}

static generateBombBoard(numberofRows, numberofColumns, numberofBombs){
	let board = [];
	for(let numberofRowsIndex = 0; numberofRowsIndex < numberofRows; numberofRowsIndex++){
		let row = [];
		
	for(let numberofColumnsIndex = 0; numberofColumnsIndex < numberofColumns; numberofColumnsIndex++){
		row.push(null);
		}
		board.push(row);
	}
	var numberofBombsPlaced = 0;
	while(numberofBombsPlaced<numberofBombs){
		let randomRowIndex = Math.floor(Math.random() *numberofRows);
		let randomColumnIndex = Math.floor(Math.random() *numberofColumns);
		if(board[randomRowIndex][randomColumnIndex] !== 'B'){
			board[randomRowIndex][randomColumnIndex] ='B';
		numberofBombsPlaced++;
		}

	}
return board;
	}


}

