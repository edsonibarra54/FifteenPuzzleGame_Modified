var tam = 4;
var board;

const values = Array.from({ length: 16 }, (_, i) => i + 1);

var name;
var timer;
var seconds = 0;
var moves = 0;

function begin(){
    var randomIndex;
    var value;
    var divElement;

    name = prompt("Whats your name?")
    document.getElementsByClassName("name")[0].innerHTML = name;

    //Creating board
    board = new Array(tam);
    for(var i = 0 ; i < tam ; i++){
        board[i] = new Array(tam);
    }

    //Initializing board
    for(var i = 0 ; i < tam ; i++){
        for(var j = 0 ; j < tam ; j++){
            randomIndex = Math.floor(Math.random() * values.length);
            value = values.splice(randomIndex, 1)[0];
            board[i][j] = value;
            document.getElementById(i.toString()+j.toString()).innerHTML = value

            if(value == 16){
                divElement = document.getElementById(i.toString()+j.toString());
                divElement.style.backgroundColor = "white";
            }
        }
    }

    printBoard();

    timer = window.setInterval(
        function(){
            seconds++;
            document.getElementsByClassName("time")[0].innerHTML = seconds
        }, 1000
    );
}

function printBoard(){
    for(var i = 0 ; i < tam ; i++){
        console.log(board[i])
    }
}

function moveBox(posI, posJ){
    var divElement;
    var divNextElement;
    var i = parseInt(posI);
    var j = parseInt(posJ);
    
    //Top
    if(j - 1 >= 0)
        if(board[i][j-1] == 16){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById(i.toString()+(j-1).toString())
            board[i][j-1] = board[i][j]; 
            board[i][j] = 16;
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById(i.toString()+(j-1).toString()).innerHTML = board[i][j-1];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }
    
    //Bottom
    if(j + 1 < tam)
        if(board[i][j+1] == 16){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById(i.toString()+(j+1).toString())
            board[i][j+1] = board[i][j]; 
            board[i][j] = 16;
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById(i.toString()+(j+1).toString()).innerHTML = board[i][j+1];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }

    //Left
    if(i - 1 >= 0)
        if(board[i-1][j] == 16){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById((i-1).toString()+j.toString())
            board[i-1][j] = board[i][j]; 
            board[i][j] = 16;
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById((i-1).toString()+j.toString()).innerHTML = board[i-1][j];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }

    //Right
    if(i + 1 < tam)
        if(board[i+1][j] == 16){
            divElement = document.getElementById(posI+posJ);
            divNextElement = document.getElementById((i+1).toString()+j.toString())
            board[i+1][j] = board[i][j]; 
            board[i][j] = 16;
            document.getElementById(posI+posJ).innerHTML = board[i][j];
            document.getElementById((i+1).toString()+j.toString()).innerHTML = board[i+1][j];
            divNextElement.style.backgroundColor = "#353435";
            divElement.style.backgroundColor = "white";

            moves++;
            document.getElementsByClassName("moves")[0].innerHTML = moves;
        }

    if(won() == true){
        alert("You won! Time: " + seconds + " Moves: " + moves);
    }
}

function won(){
    var r = 0;
    for(var i = 0 ; i < tam ; i++)
        for(var j = 0 ; j < tam ; j++){
            r++;
            if(board[i][j] != r)
                return false;
        }

    return true;
}

function prueba(){
    var div;
    var r = 0;
    for(var i = 0 ; i < tam ; i++)
        for(var j = 0 ; j < tam ; j++){
            r++;
            board[i][j] = r;
            document.getElementById(i.toString()+j.toString()).innerHTML = r
        }

    board[3][3] = 15;
    document.getElementById("33").innerHTML = 15
    board[3][2] = 16;
    document.getElementById("32").innerHTML = 16
    div = document.getElementById("32");
    div.style.backgroundColor = "white";
}