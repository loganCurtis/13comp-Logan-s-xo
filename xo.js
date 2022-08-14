/**************************************************/
// Written by Logan C 2022
//
/**************************************************/
var xo_playerSymbol = 0
var xo_turns = 0
var xo_gameOver = false
var p2turn = ''



var moveArray = ["", "", "", "", "", "", "", "", "",]


var playerArray = [{ symbol: "X", name: "p1", wins: "", draws: "", losses: "", turnField: "" },
{ symbol: "O", name: "p2", wins: "", draws: "", losses: "", turnField: "" }]

/**************************************************/
// xo_winCheck()
// Called by ???
// Check if a player has won the game
/**************************************************/
function xo_winCheck() {
  console.log("checking win check")
  for (let i = 0; i < 2; i++) {
    console.log("the number is " + i)
    /** row one win  **/
    if (playerArray[i].symbol == moveArray[0] &
      playerArray[i].symbol == moveArray[1] &
      playerArray[i].symbol == moveArray[2]) {
      console.log(playerArray[i].name + " won in row one")
      xo_gameOver = true
    }
    /** row two win  **/
    else if (playerArray[i].symbol == moveArray[3] &
      playerArray[i].symbol == moveArray[4] &
      playerArray[i].symbol == moveArray[5]) {
      console.log(playerArray[i].name + " won in row two")
      xo_gameOver = true
    }
    /** row three win  **/
    else if (playerArray[i].symbol == moveArray[6] &
      playerArray[i].symbol == moveArray[7] &
      playerArray[i].symbol == moveArray[8]) {
      console.log(playerArray[i].name + " won in row three")
      xo_gameOver = true
    }
    /** colomn one win  **/
    else if (playerArray[i].symbol == moveArray[0] &
      playerArray[i].symbol == moveArray[3] &
      playerArray[i].symbol == moveArray[6]) {
      console.log(playerArray[i].name + " won in column one")
      xo_gameOver = true
    }
    /** colomn two win  **/

    else if (playerArray[i].symbol == moveArray[1] &
      playerArray[i].symbol == moveArray[4] &
      playerArray[i].symbol == moveArray[7]) {
      console.log(playerArray[i].name + " won in column two ")
      xo_gameOver = true
    }
    /** colomn three win  **/
    else if (playerArray[i].symbol == moveArray[2] &
      playerArray[i].symbol == moveArray[5] &
      playerArray[i].symbol == moveArray[8]) {
      console.log(playerArray[i].name + " won in colomn three")
      xo_gameOver = true
    }
    /** right diag win **/
    else if (playerArray[i].symbol == moveArray[0] &
      playerArray[i].symbol == moveArray[4] &
      playerArray[i].symbol == moveArray[8]) {
      console.log(playerArray[i].name + " won in right diag")
      xo_gameOver = true
    }
    /** right diag win **/

    else if (playerArray[i].symbol == moveArray[2] &
      playerArray[i].symbol == moveArray[4] &
      playerArray[i].symbol == moveArray[6]) {
      console.log(playerArray[i].name + " won in left diag ")
      xo_gameOver = true
    }
    if (xo_gameOver == true) {
      console.log("restart")
      winner = i
      xo_playerWin(winner) //calls win function passing the winner 
      break; //breaks the for loop to send the right winner
    }
  }
  //checks if the game is a draw
  if (xo_turns == 9 & xo_gameOver == false) {
    console.log("draw")
    xo_gameOver = true
    userScore.draws++
    p2Details.draws++
    if (xo_playerSymbol == 0) {
      fb_writeRec(USERSCORE, activeUid, userScore)
      // writes scores to firebase if player is p1
    }
    else {
      fb_writeRec(USERSCORE, userDetails.uid, userScore);
      // writes scores to firebase if player is p2

    }

  }
}

/**************************************************/
// xo_buttonClick(_clicked_id, _clickNum)
// Called by html xoBtn
// checks user btn cliked, displays users symbol on screen, calls winCheck(),callsupdateHtml()
// Input:  html button id & number
/**************************************************/
function xo_buttonClick(_clicked_id, _clickNum) {
  console.log("xo_buttonClick: xo_playerSymbol = " + xo_playerSymbol)
  document.getElementById(_clicked_id).textContent = playerArray[xo_playerSymbol].symbol

  /** insert symbol into moveArray **/
  moveArray[_clickNum] = playerArray[xo_playerSymbol].symbol
  console.log(_clicked_id)
  console.log("clicked")
  console.log(moveArray)
  // turns plus one
  xo_turns++

  console.log("turns" + xo_turns)
  //disable button
  for (let i = 0; i < 9; i++) {
    document.getElementById("xo_btn" + i).disabled = true;
  }

  document.getElementById(_clicked_id).style.backgroundColor = "yellow";
  console.log(_clickNum)
  var turnsObj = {
  }

  if (xo_playerSymbol == 0) {
    turnsObj.p1turns = _clicked_id
  }
  else {
    turnsObj.p2turns = _clicked_id
  }
  xo_winCheck()
  fb_updateRec(ALOBBY, activeUid, turnsObj)

}

/**************************************************/
// readP2Turn(data, secondData)
// Called by fb_readOnTurn(_path, _key)
// checks p2 cliked btn, displays on user screen
// Input:  html button id & number
/**************************************************/
function readP2Turn(data, secondData) {
  console.log("other player clicked" + data)
  if (data == "restart") {
    console.log("restarting")
    xo_restart();
  }
  else if (data == "") {
    console.log("ignore this record")
  }
  else {   
    document.getElementById(data).textContent = playerArray[1 - xo_playerSymbol].symbol
    moveArray[secondData] = playerArray[1 - xo_playerSymbol].symbol
    console.log(moveArray)
    for (let i = 0; i < 9; i++) {
      if (document.getElementById("xo_btn" + i).textContent == "") {
        document.getElementById("xo_btn" + i).disabled = false
      }
    }
    xo_turns++
    console.log(xo_turns)
    xo_winCheck();
  }
}
/**************************************************/
// xo_playerWin(winner)
// Called by xo_winCheck()
// updates users scores and updates html
// Input:  html button id & number
/**************************************************/
function xo_playerWin(winner) {
  console.log("winner is " + winner)
  for (let i = 0; i < 9; i++) {
    document.getElementById("xo_btn" + i).disabled = true;
  }
  if (winner == xo_playerSymbol) {
    userScore.wins++
    p2Details.losses++
  }
  else {
    userScore.losses++
    p2Details.wins++
  }

  if (xo_playerSymbol == 0) {
    fb_writeRec(USERSCORE, activeUid, userScore)
  }
  else {
    fb_writeRec(USERSCORE, userDetails.uid, userScore);
  }

  console.log("player one wins " + playerArray[0].wins)
  console.log("player two wins " + playerArray[1].wins)
  updateHtml();
}
/**************************************************/
// xo_writeRestart()
// Called by xo_
// updates users scores and updates html
// Input:  html button id & number
/**************************************************/
function xo_writeRestart() {
  var turnsObj = {
  }
  if (xo_playerSymbol == 0) {
    turnsObj.p1turns = "restart"
  }
  else {
    turnsObj.p2turns = "restart"
  }
  fb_updateRec(ALOBBY, activeUid, turnsObj)
  xo_restart();

  
}
function xo_restart() {
  for (let i = 0; i < 9; i++) {
    document.getElementById("xo_btn" + i).textContent = "";
    document.getElementById("xo_btn" + i).disabled = false
    xo_turns = 0
  }
  if (xo_playerSymbol == 1) {
    for (let i = 0; i < 9; i++) {
      document.getElementById("xo_btn" + i).disabled = true
    }
  }
  var turnsObj = {
  }

  if (xo_playerSymbol == 0) {
    turnsObj.p1turns = ""
  }
  else {
    turnsObj.p2turns = ""
  }

  
  fb_updateRec(ALOBBY, activeUid, turnsObj)

  moveArray = ["", "", "", "", "", "", "", "", "",]
  xo_gameOver = false
  //  xo_btn0.disabled = false
}

function xo_checkTurn() {
  console.log("checking turn")

  var turnsObj = {
  }
  if (xo_playerSymbol == 1) {
    fb_readOnTurn(ALOBBY, activeUid + "/" + "p1turns");
    console.log("reading player 1 turn")
  }
  else {
    fb_readOnTurn(ALOBBY, activeUid + "/" + "p2turns");
    console.log("reading player 2 turn")
  }




}