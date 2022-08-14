/*************************************************************
  Written by ????, Term 1 2021
  Program to ??????
    v1 Basic code to display a canvas
*************************************************************/
const DETAILS = "userDetails";
const ADMIN = "admin";
const USERSCORE = "xo_userScore";
const LOBBY = "xo_games";
const ALOBBY = "xo_activeGames";
var wins = "worked";
var activeUid = "";
var p1Uid = "";
var p2Uid = "";
var winner = "";
var fernando = "";
var temporary = "";




var loginStatus = ' ';
var readStatus = ' ';
var writeStatus = ' ';


var userDetails = {
  uid: '',
  email: '',
  name: '',
  photoURL: '',
  phone: '',
  gender: '',
  age: '',
  gameName: '',
  city: '',
  adress: '',
};

var p2Details = {
  wins: '',
  losses: '',
  draws: '',
  gameName: '',
};



var userLobby = {
  uid: '',
  gameName: '',
  wins: '',
  losses: '',
  draws: '',
}

var userScore = {
  uid: '',
  gameName: '',
  wins: '',
  losses: '',
  draws: '',
};


var gameDetails = {
  wins: playerArray[0].wins,
  p1losses: playerArray[0].losses,
  checking: "works",

};

var draws = "";

var admin = {
  role: 'hello',
}


function setup() {
  login();
  document.getElementById("p_adP").style.display = "none"

  document.getElementById("p_lobbyP").style.display = "none";
  document.getElementById("p_xo").style.display = "none";
  document.getElementById("p_landingP").style.display = "block";
  document.getElementById("p_regP").style.display = "none";
  console.log("admin is" + admin)
}

function reg_button() {
  document.getElementById("p_lobbyP").style.display = "none";
  document.getElementById("p_landingP").style.display = "none";
  document.getElementById("p_xo").style.display = "none";
  document.getElementById("p_regP").style.display = "block";
  document.getElementById("p_adP").style.display = "none";

  reg_nameEmail();

}
function xo_button() {
  document.getElementById("p_landingP").style.display = "none";
  document.getElementById("p_lobbyP").style.display = "none";
  document.getElementById("p_regP").style.display = "none";
  document.getElementById("p_xo").style.display = "block";
  document.getElementById("p_adP").style.display = "none";

  console.log(playerArray)
  updateHtml();

}

function xo_lobby() {
  console.log("game lobby")
  document.getElementById("p_landingP").style.display = "none";
  document.getElementById("p_xo").style.display = "none";
  document.getElementById("p_regP").style.display = "none";
  document.getElementById("p_lobbyP").style.display = "block";
  document.getElementById("p_adP").style.display = "none";

  //fb_readAll(LOBBY);
  fb_readAll(LOBBY, processLobby, lobbyArray);




}



function newGame() {
  console.log("user lobby uid" + userLobby.uid)
  fb_writeRec(LOBBY, userDetails.uid, userLobby);
  checkScores();
  xo_button();
  fb_readOnJoin(LOBBY, userDetails.uid,);
}




function login() {
  fb_initialise();
  fb_login(userDetails);
};

function readRec() {
  fb_xoReadRec(DETAILS, userDetails.uid, userDetails);// CALL YOUR READ A RECORD FUNCTION    <=================
  xo_lobby();
  //  console.log("game details " + gameDetails.p1Wins);


};

function checkScores() {
  console.log("player symbol" + xo_playerSymbol)
  fb_readScores();
  console.log(playerArray)
  /**console.log(xo_playerSymbol)
  if (playerArray[0].wins = null){
    
  }
  else {
    xo_playerSymbol = 1 - xo_playerSymbol
    console.log(xo_playerSymbol)
    readRec();
    fb_readScores();
    xo_playerSymbol = 1 - xo_playerSymbol
    xo_button();
    
  }
 **/


}



function writeRec() {
  if (userDetails.uid != '') {
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DETAILS, userDetails.uid, userDetails);
  }
  else {
    writeStatus = '';
    loginStatus = 'not logged in';
  }

  //if(userScore !=''){
  //  fb_writeRec(SCORE,userScore.uid, userScore);
  // }
}
function logOut() {
  fb_logOut();
}




function gameFinish() {
  console.log(userScore);
  fb_writeRec(SCORE, userDetails.uid, userScore);
}

function exit() {
  document.location.reload();
}

function homeBtn() {
  document.getElementById("p_landingP").style.display = "block";
  document.getElementById("p_xo").style.display = "none";
  document.getElementById("p_regP").style.display = "none";
  reg_nameEmail();
  if (xo_playerSymbol == 0) {
    activeUid = userDetails.uid
  }
}

function processLobby(_status, _dbData, _save) {
  console.log("processLobby")
  userLobby.gameName = userDetails.gameName;
  userLobby.uid = userDetails.uid;
  userLobby.wins = userScore.wins
  userLobby.losses = userScore.losses
  userLobby.draws = userScore.draws

  fb_writeRec(USERSCORE, userDetails.uid, userLobby)

  if (readStatus != "ok") {
    console.log("no record")
  }
  else {
    console.log(_dbData)
    let dbKeys = Object.keys(_dbData);
    console.log(dbKeys);
    for (i = 0; i < dbKeys.length; i++) {
      let key = dbKeys[i];
      console.log(key)
      _save.push({
        name: _dbData[key].gameName,
        wins: _dbData[key].wins,
        uid: _dbData[key].uid

      })
    }
  }

  console.log(lobbyArray);
  generateTable(table, lobbyArray);


}

function checkUid(_row, _path) {
  var i = _row.parentNode.parentNode.rowIndex - 1;
  var key = document.getElementById("lobbyTable").rows[i].cells
  console.log("row" + i);
  console.log(lobbyArray)
  console.log(lobbyArray[i])
  console.log(lobbyArray[i].uid)
  let fernando = lobbyArray[i].uid
  activeUid = fernando
  console.log("player uid" + activeUid)
  var dbRef = firebase.database().ref(_path + '/' + activeUid);
  dbRef.remove().then(function() {
    console.log("ad_dbDelRec: Remove succeeded for " + _path + '/' + activeUid)
  })
    .catch(function(error) {
      console.log("ad_dbDelRec: Remove failed for " +
        _path + '/' + activeUid + ': ' + error.message);
    });
  xo_button();
  fb_writeRec(ALOBBY, activeUid, userLobby)
  xo_playerSymbol = 1
  fb_readOnTurn(ALOBBY, activeUid + "/" + "p1turns");
  console.log("reading player 1 turn")
  for (let i = 0; i < 9; i++) {
    document.getElementById("xo_btn" + i).disabled = true;
  }



  fb_xoReadRec(USERSCORE, activeUid, p2Details);
  updateHtml();
}



function updateHtml() {
  console.log("updating the hrml")
  console.log("p2Details is" + p2Details)

  document.getElementById("p_name").innerHTML = "name:" + userDetails.gameName;
  document.getElementById("p_wins").innerHTML = "wins:" + userScore.wins;
  document.getElementById("p_losses").innerHTML = "losses:" + userScore.losses;
  document.getElementById("p_draws").innerHTML = "draws:" + userScore.draws;

  document.getElementById("p_p2Name").innerHTML = "name:" + p2Details.gameName;
  document.getElementById("p_p2Wins").innerHTML = "wins:" + p2Details.wins;
  document.getElementById("p_p2Losses").innerHTML = "losses:" + p2Details.losses;
  document.getElementById("p_p2Draws").innerHTML = "draws:" + p2Details.draws;
}
/*************************************************************
/*    END OF CODE
*************************************************************/