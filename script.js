
var table = $('table tr'); //get the rows of the table 
//Object { 0: tr, 1: tr, 2: tr, 3: tr, 4: tr, 5: tr, length: 6, prevObject: {…} }

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

//change color of the ball
function changeBallColor(rowIndex, colIndex, color) {
  console.log(color);
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
  //return table.eq(rowIndex).find("td").eq(colIndex).find("button").css('background-color',color);  
  
}

//get the current status color of the ball
function getBallColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css('background-color');  
}

//get the bottom gray box to color 
function getBottomBoxToColor(colIndex) {
  
  var findGrayBottomBall = getBallColor(5, colIndex); //just initializing the value
  for (let row = 5; row > -1; row--) {
    findGrayBottomBall = getBallColor(row, colIndex);
    if (findGrayBottomBall === "rgb(128, 128, 128)") {
      return row;
    }
    
  }
}

//check the color match
function colorMatchSelectedIndex(one, two, three, four) {
  return ( one !== "rgb(128, 128, 128)" && one !== undefined && one === one && one === two && one === three && one === four);
}


//horizentalCheck
function horizentalCheck() {

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      
      if (colorMatchSelectedIndex(getBallColor(row, col), getBallColor(row, col + 1), getBallColor(row, col + 2), getBallColor(row, col + 3))) {
            console.log("Horizental Win");
            reportWin(row, col);
         return true;        
      }else{
        continue;
      }
    }    
  }
  
}

//verticalCheck
function verticalCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 4; row++) {
      if (colorMatchSelectedIndex(getBallColor(row, col), getBallColor(row + 1, col), getBallColor(row + 2, col), getBallColor(row + 3, col))) {
        console.log("Vertical Win");
        reportWin(row, col);        
        return true
      }else{
        continue;
      }      
      
    }
    
  }
}

//diagonalCheck
function diagonalCheck() {
  
  var colnegative = 6;
  for (let col = 0; col < 4; col++) {

    for (let row = 0; row < 4; row++) {
    
      if (colorMatchSelectedIndex(getBallColor(row, col), getBallColor(row + 1, col + 1), getBallColor(row + 2, col + 2), getBallColor(row + 3, col + 3))) {
        console.log("Positive diagonal");
        reportWin(row, col);        
        return true
      }else if(colorMatchSelectedIndex(getBallColor(row, colnegative), getBallColor(row + 1, colnegative - 1), getBallColor(row + 2, colnegative - 2), getBallColor(row + 3, colnegative - 3))){
        console.log("Negative diagonal");
        reportWin(row, col);        
        return true
      }else{
        continue
      }
    }
    colnegative--;        
  }

  
}

// Game End
function gameEnd(winningPlayer) {
  //$("table").remove();
  $("h1").text("Hurray We have a winner")
  $("h2").text(winningPlayer);
  $("h3").text("I hope you will play this game next time");
  //alert("FINISHED");
  $(':input[type="button"]').prop('disabled', true);
  
}

//Reset Game
function resetMyGame() {
  var button_reset_color = "rgb(128, 128, 128)";
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      changeBallColor(row, col, button_reset_color);
      
    }
    
  }
  
  //default dashboard
  $("h1").text("Welcome to connect four Ball Game!")
  $("h2").text("Connect four balls Horizentally - Veritically - Diagonally to WIN");
  $("h3").text("Lets Start");

  //enable all balls
  $(':input[type="button"]').prop('disabled', false);
}

//--------------------------------------------------------------------------------------
//-------------------------------------------MAIN FUNCTION------------------------------
//--------------------------------------------------------------------------------------
var player1 = "";
var player2 = "";

//player colors
var player1_color = 'rgb(86, 151, 255)';
var player2_color = 'rgb(237, 45, 73)';

// Start with Player One
var currentPlayer;
var currentName;
var currentColor;

//START GAME
$('.startbutton').on('click', function () {
  player1 = prompt("Player One: Enter Your Name");
  player2 = prompt("Player Two: Enter Your Name");
  resetMyGame()

  currentPlayer = 1;
  currentName = player1;
  currentColor = player1_color;

  $('h3').text("Player: " + currentName + " Your turn")

})

//TABLE BUTTON CLICK
$('.board button').on('click', function() {

  if(player1 !== "" && player1 !== null && player2 !== null && player2 !== ""){

    var colIndex = $(this).closest('td').index();
    var bottom_avail_row = getBottomBoxToColor(colIndex);
    console.log(bottom_avail_row + " " + colIndex + " " + currentColor);
    changeBallColor(bottom_avail_row, colIndex, currentColor);
  
    if (horizentalCheck() || verticalCheck() || diagonalCheck()) {
      console.log("Win")
      gameEnd(currentName);
      return;//to exit handler
    }
  
    currentPlayer = currentPlayer * -1 ;  
  
    if (currentPlayer === 1) {
      $('h3').text("Player: " + player1 + " Your turn")
      currentName = player1;
      currentColor = player1_color;
    }else{
      $('h3').text("Player: " + player2 + " Your turn")
      currentName = player2;
      currentColor = player2_color;
    }  

  }else{
    alert("Game Cannot be executed - Players Name Missing")
  }

})


//RESET GAME
$('.resetbutton').on('click', function () {
  resetMyGame()
})
