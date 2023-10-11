var tam;
var board;
var name = "none";
var size;
var timer;
var seconds;
var moves;

timer = window.setInterval(
    function(){
        seconds++;
        document.getElementsByClassName("time")[0].innerHTML = seconds;
    }, 1000
);

function begin(){
    var randomIndex;
    var value;
    var divElement;

    name = prompt("What's your name?")
    tam = prompt("What is the size of one side of the board")
    document.getElementsByClassName("name")[0].innerHTML = name;

    //Creates an array with all the numbers for the game
    const values = Array.from({ length: (tam*tam) }, (_, i) => i + 1);

    board = document.getElementsByClassName("board")[0]; //Gets the board div
    board.style.width = ((tam*102) + 50).toString() + "px"; // Change the width of the board

    //Deletes all the divs from the board for a new game
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    //Creating board
    for(var i = 0 ; i < tam ; i++){
        for(var j = 0 ; j < tam ; j++){
            var newDiv = document.createElement("div");
            
            newDiv.id = i.toString()+j.toString();

            newDiv.setAttribute("onclick", "moveBox('" + i.toString() + "','" + j.toString() + "')"); //Add the attribute onclick with the function to the div

            document.getElementsByClassName("board")[0].appendChild(newDiv);
        }
    }

    //Creating array
    board = new Array(tam);
    for(var i = 0 ; i < tam ; i++){
        board[i] = new Array(tam);
    }

    //If you are going to test tha game comment the Initializing board section

    /*
    //Test original

    testOriginal();
    */

    /*
    //Test snai

    testSnail()
    */

    //Initializing board
    for(var i = 0 ; i < tam ; i++){
        for(var j = 0 ; j < tam ; j++){
            randomIndex = Math.floor(Math.random() * values.length);
            value = values.splice(randomIndex, 1)[0];
            board[i][j] = value;
            document.getElementById(i.toString()+j.toString()).innerHTML = value

            if(value == (tam*tam)){
                divElement = document.getElementById(i.toString()+j.toString());
                divElement.style.backgroundColor = "white";
            }
        }
    }

    //Creating snail array
    snailArray = new Array(tam);
    for(var i = 0 ; i < tam ; i++){
        snailArray[i] = new Array(tam);
    }

    //Initializing snail array
    var value = 1;

    var rowBegin = 0,
    rowEnd = tam - 1,
    columnBegin = 0,
    columnEnd = tam - 1;

    while(value <= tam * tam){
        for(var i = columnBegin ; i <= columnEnd ; i++){
            snailArray[rowBegin][i] = value;
            value++;
        }
        rowBegin++;

        for(var i = rowBegin ; i <= rowEnd ; i++){
            snailArray[i][columnEnd] = value;
            value++;
        }
        columnEnd--;

        for(var i = columnEnd ; i >= columnBegin ; i--){
            snailArray[rowEnd][i] = value;
            value++;
        }
        rowEnd--;

        for(var i = rowEnd ; i >= rowBegin ; i--){
            snailArray[i][columnBegin] = value;
            value++;
        }
        columnBegin++;
    }

    seconds = 0;
    moves = 0;
    document.getElementsByClassName("moves")[0].innerHTML = moves
    
}

function moveBox(posI, posJ){
    var divElement;
    var divNextElement;
    var i = parseInt(posI);
    var j = parseInt(posJ);
    
    //Top
    if(j - 1 >= 0)
        if(board[i][j-1] == (tam*tam)){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById(i.toString()+(j-1).toString())
            board[i][j-1] = board[i][j]; 
            board[i][j] = (tam*tam);
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById(i.toString()+(j-1).toString()).innerHTML = board[i][j-1];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }
    
    //Bottom
    if(j + 1 < tam)
        if(board[i][j+1] == (tam*tam)){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById(i.toString()+(j+1).toString())
            board[i][j+1] = board[i][j]; 
            board[i][j] = (tam*tam);
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById(i.toString()+(j+1).toString()).innerHTML = board[i][j+1];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }

    //Left
    if(i - 1 >= 0)
        if(board[i-1][j] == (tam*tam)){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById((i-1).toString()+j.toString())
            board[i-1][j] = board[i][j]; 
            board[i][j] = (tam*tam);
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById((i-1).toString()+j.toString()).innerHTML = board[i-1][j];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }

    //Right
    if(i + 1 < tam)
        if(board[i+1][j] == (tam*tam)){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById((i+1).toString()+j.toString())
            board[i+1][j] = board[i][j]; 
            board[i][j] = (tam*tam);
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById((i+1).toString()+j.toString()).innerHTML = board[i+1][j];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }

    if(won() == true){
        alert("You won! Time: " + seconds + " Moves: " + moves);

        begin();
    }
}

function won(){
    var result

    result = original()

    if(result == true)
        return true

    result = snail()

    if(result == true)
        return true

    return false;
}

function snail(){
    for(var i = 0 ; i < tam ; i++){
        for(var j = 0 ; j < tam ; j++){
            if(board[i][j] != snailArray[i][j])
                return false;
        }
    }
    
    return true;
}

function original(){
    var r = 0;
    for(var i = 0 ; i < tam ; i++){
        for(var j = 0 ; j < tam ; j++){
            r++;
            if(board[i][j] != r)
                return false;
        }
    }

    return true;
}

function testOriginal(){
    var div;
    var r = 0;
    for(var i = 0 ; i < tam ; i++)
        for(var j = 0 ; j < tam ; j++){
            r++;
            board[i][j] = r;
            document.getElementById(i.toString()+j.toString()).innerHTML = r
        }

    board[tam-1][tam-1] = (tam*tam) - 1;
    document.getElementById((tam-1).toString()+(tam-1).toString()).innerHTML = (tam*tam) - 1;
    board[tam-1][tam-2] = tam * tam;
    document.getElementById((tam-1).toString() + (tam-2).toString()).innerHTML = 16;
    div = document.getElementById((tam-1).toString() + (tam-2).toString());
    div.style.backgroundColor = "white";
}

function testSnail(){

}