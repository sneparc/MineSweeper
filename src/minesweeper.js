const generatePlayerBoard = (numberofRows, numberofColumns) => {
	let board = [];
	for(let numberofRowsIndex = 0; numberofRowsIndex < numberofRows; numberofRowsIndex++){
		let row = [];
		
	for(let numberofColumnsIndex = 0; numberofColumnsIndex < numberofColumns; numberofColumnsIndex++){
		row.push(' ');
		}
		board.push(row);
	}
	return (board);
}

const generateBombBoard = (numberofRows, numberofColumns, numberofBombs) => {
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
return (board);
	}

const getNumberofNeighborBombs= (bombBoard, rowIndex, columnIndex) =>{
	const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
	const numberofRows = bombBoard.length;
	const numberofColumns = bombBoard[0].length;
	let numberofBombs = 0;
	neighborOffsets.forEach( offset =>{
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		if(neighborRowIndex >= 0 && neighborRowIndex < numberofRows && neighborColumnIndex>=0 && neighborColumnIndex < numberofColumns){

			if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
				numberofBombs++;
			}

		}

	});
	return numberofBombs;
}
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) =>{
	if(playerBoard[rowIndex][columnIndex] !== ' '){
		console.log("This tile has been flipped!");
		return;
	}else if(bombBoard[rowIndex][columnIndex]== 'B'){
		playerBoard[rowIndex][columnIndex] == 'B';
	}else{
		playerBoard[rowIndex][columnIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex);

	}
}


const printBoard = (board) => {
		console.log(board.map(row => row.join(' | ')).join('\n'));
	}
	
	let playerBoard = generatePlayerBoard(3,4);
	let bombBoard = generateBombBoard(3,4,5);
	console.log('Player Board: ');
	printBoard(playerBoard);
	console.log('Bomb Board: ');
	printBoard(bombBoard);
flipTile(playerBoard,bombBoard, 1, 0);

console.log('Updated Player Board:');
printBoard(playerBoard);

	


	

	
	




