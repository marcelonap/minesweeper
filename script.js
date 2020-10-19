//I am using a Dell G7 laptop with windows 10, intel core i7 8th gen and using google chrome

//Declaring the global variables necessary to run the game such as access to the table(grid)
// a boolean for whether the game is still going and a variable to access and display the status of the game
//on the web page

var table = document.getElementById('game_table');
var game = true;
var display = document.getElementById("status");

//displaying last modified info.
document.getElementById("last_modified").innerHTML = document.lastModified;

//This function creates the board with the size specified by user input and calls the mines function with the amount
//specified by the user. It also takes care of calling the click() function whenever a cell is clicked.
function makeTable(){
	table.innerHTML="";
	game = true;
	
	var size = document.getElementById("grid_size").value;
	var num_mines = document.getElementById('num_mines').value;

	for(var i = 0; i < size; i++){	
		var row = table.insertRow(i);
		for(var j = 0; j < size; j++){
			var cell = row.insertCell(j);
			cell.innerHTML = "?";
			cell.setAttribute("class", "unknown");
			cell.onclick = function(){ click(this);};
			
		}
	}
	randomMines(num_mines);
	remainingSquares();
}


//This function places tomatoes randomly across the board by setting their id
//to "mined" .
function randomMines(){
	var size = document.getElementById("grid_size").value;
	var num_mines = document.getElementById('num_mines').value;


	for(var i = 0; i < num_mines; i++){
	var row = Math.floor(Math.random() * size);
    var col = Math.floor(Math.random() * size);
	var cell = table.rows[row].cells[col];
	//This if satement makes sure tomatoes are not placed in the same cell.
    if(cell.getAttribute("id")=="mined"){
    	i--;
    }
     cell.setAttribute("id","mined");
  }

}


//This function controls the flow of the game by changing the class of the cells depending on their id
//and recursively checking the cells around it with the same procedure.
function click(cell){

	var size = document.getElementById("grid_size").value;

if(game){

	//this if statement ends the game if the cell clicked had a tomato
	if(cell.getAttribute("id") == "mined" && cell.getAttribute("class") == "unknown"){
		revealMines();
		display.innerHTML = "You have lost. Press 'Set Board' to try again.";
		return;

		}else if(cell.getAttribute("class") == "unknown"){
			cell.className = "known";
			var minesAround = 0;
			var rowCell = cell.parentNode.rowIndex;
			var colCell = cell.cellIndex;


		//this loop checks the squares around the one clicked and records the number of tomatoes
		//around it
		for (var i=Math.max(rowCell-1,0); i<=Math.min(rowCell+1,size-1); i++) {
	      for(var j=Math.max(colCell-1,0); j<=Math.min(colCell+1,size-1); j++) {
	        if (table.rows[i].cells[j].getAttribute("id")=="mined") {
	        	minesAround++;
	        }
	      }
	    }

		cell.innerHTML=minesAround;
		
		//this if statement and for loop checks the squares around the one clicked and recursuvely
		//repeats the process when there is no mines around them
		if(minesAround == 0){
			cell.innerHTML = "";
			for (var i=Math.max(rowCell-1,0); i<=Math.min(rowCell+1,size-1); i++) {
	      for(var j=Math.max(colCell-1,0); j<=Math.min(colCell+1,size-1); j++){
	      	if(table.rows[i].cells[j].innerHTML == "?"){
	      	click(table.rows[i].cells[j]);
	      	}
	      }
		}	
	  }
	}
	//these functions update the status of the game.
	remainingSquares();
	gameOver();
 }
}


//This function reveals the remaining hidden tomatoes once the user loses or wins the game.
function revealMines(cell){
	var size = document.getElementById("grid_size").value;
	
	for(var i = 0; i < size; i++){	
		for(var j = 0; j < size; j++){
		var cell = table.rows[i].cells[j];
		if(cell.getAttribute("id")=="mined"){
			cell.className= "knownMine";
			cell.innerHTML="";
		}else{
			click(cell);
		}
	  }
	}
}

//This fucntion keeps track of the remaining squares and updates the status
function remainingSquares(){
	var size = document.getElementById("grid_size").value;
	var num_mines = document.getElementById('num_mines').value;
	var remaining_squares = size * size;

	for(var i = 0; i < size; i++){	
		for(var j = 0; j < size; j++){
			var cell= table.rows[i].cells[j];
			if(cell.getAttribute("class")=="known"){
				remaining_squares--;
			}
		}
	}
	
	display.innerHTML = "You have " + remaining_squares + " squares left.";

	if(remaining_squares == num_mines ){
		game = false;
	}
}


//this function keeps track of whether the game is over or not.
function gameOver(){
	if(!game){
		display.innerHTML = "You have won! Press 'Set Board' to play again.";
		revealMines();
		return;
	}
}

