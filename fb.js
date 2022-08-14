/**************************************************************/
// fb_io.js
// Written by ???   2021
/**************************************************************/

/**************************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {
  console.log('fb_initialise: ');

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBoXWOs7jfggpcPXS6OA8_L-m5kK1svfG0",
    authDomain: "comp-2022-logan-curtis.firebaseapp.com",
    databaseURL: "https://comp-2022-logan-curtis-default-rtdb.firebaseio.com",
    projectId: "comp-2022-logan-curtis",
    storageBucket: "comp-2022-logan-curtis.appspot.com",
    messagingSenderId: "985640267270",
    appId: "1:985640267270:web:9235b200b06654d67e5d87",
    measurementId: "G-88KNQCTKE7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //console.log(firebase);//	

  database = firebase.database();

};


/**************************************************************/
// fb_login(_dataRec)
// Login to Firebase
// Input:  to store user info in
// Return: n/a
/**************************************************************/
function fb_login(_dataRec) {
  console.log('fb_login: dataRec= ' + _dataRec);
  firebase.auth().onAuthStateChanged(newLogin);

  function newLogin(user) {
    if (user) {
      // user is signed in
      _dataRec.uid = user.uid;
      _dataRec.email = user.email;
      _dataRec.name = user.displayName;
      _dataRec.photoURL = user.photoURL;
      _dataRec.phone = user.phone;
      _dataRec.gender = user.gender;
      _dataRec.age = user.age;
      _dataRec.gameName = user.gameName;
      _dataRec.city = user.city;
      _dataRec.adress = user.adress;
      _dataRec.suburb = user.suburb;


      loginStatus = 'logged in';
      console.log("user =" + user.phone)
      console.log("game Details" + gameDetails)

      fb_readAdmin(ADMIN, userDetails.uid, admin);
      checkScores();

    }
    else {
      // user NOT logged in, so redirect to Google login
      _dataRec = {};
      loginStatus = 'logged out';
      console.log('fb_login: status = ' + loginStatus);


      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
    console.log(loginStatus)
  }
  //checkScores();
}

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logOut() {
  console.log('fb_logOut: ');
  firebase.auth().signOut();
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
  console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score);

  writeStatus = "waiting"
  firebase.database().ref(_path + '/' + _key).set(_data,
    function(error) {
      if (error) {
        writeStatus = "failure";
        console.log(error);
      }
      else {
        writeStatus = "ok";
      }

    });
  console.log("fb_writeRec: exit")
}


/**************************************************************/
// fb_updateRec(_path, _key, _data)
// update a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_updateRec(_path, _key, _data) {
  console.log('fb_updateRec: path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score);

  writeStatus = "waiting"
  firebase.database().ref(_path + '/' + _key).update(_data,
    function(error) {
      if (error) {
        writeStatus = "failure";
        console.log(error);
      }
      else {
        writeStatus = "ok";
      }

    });
  console.log("fb_updateRec: exit")
}

/**************************************************************/
// fb_readAll(_path, _data,_save)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_adReadAll(_path, _processData, _save) {
  console.log('fb_readAll: path= ' + _path);


  readStatus = "waiting";
  database.ref(_path).once('value', gotData, errData);



  function gotData(snapshot) {
    let _dbData = snapshot.val();
    if (_dbData == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "OK";


      _processData("OK", snapshot)
      console.log("read succesful")
    }
  }

  function errData(error) {
    console.log(error)
    console.log('FAIL')

  }
}


function fb_readAll(_path, _processData, _save) {
  console.log('fb_readAll: path= ' + _path);


  readStatus = "waiting";
  database.ref(_path).once('value', gotData, errData);



  function gotData(snapshot) {
    let _dbData = snapshot.val();
    if (_dbData == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "ok";


      _processData("OK", _dbData, _save)
      console.log("read succesful")
    }
  }

  function errData(error) {
    console.log(error)
    console.log('FAIL')

  }
}

/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:  
/**************************************************************/
function fb_xoReadRec(_path, _key, _data) {
  console.log("data "+ _data)
  console.log('fb_readRec: path= ' + _path + '  key= ' + _key);

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr)

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
      if(_key == userDetails.uid){
        console.log("register")
      reg_button();
      }
    }
    else {
      readStatus = "ok";
      let dbData = snapshot.val();
      _data.uid = dbData.uid;
      _data.name = dbData.name;
      _data.email = dbData.email;
      _data.photURL = dbData.photoURL;
      _data.score = dbData.score;
      _data.phone = dbData.phone;
      _data.gender = dbData.gender;
      _data.age = dbData.age;
      _data.gameName = dbData.gameName;
      _data.city = dbData.city;
      _data.adress = dbData.adress;
      _data.suburb = dbData.suburb;
      _data.wins = dbData.wins;
      _data.losses = dbData.losses;
      _data.draws = dbData.draws;
      _data.gameName = dbData.gameName;
      updateHtml();
    }

    console.log("phone = " + userDetails.phone)
    console.log("player 2 Details" + p2Details)
  }

  function readErr(error) {
    readStatus = "fail";
    console.log(error);
  }

}

function fb_readP2Uid(_path,_key,){
    console.log('fb_readRec: path= ' + _path + '  key= ' + _key);

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr)

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
      reg_button();
    }
    else {
      readStatus = "ok";
      let dbData = snapshot.val();
      _data.uid = dbData.uid;
      _data.name = dbData.name;
      _data.email = dbData.email;
      _data.photURL = dbData.photoURL;
      _data.score = dbData.score;
      _data.phone = dbData.phone;
      _data.gender = dbData.gender;
      _data.age = dbData.age;
      _data.gameName = dbData.gameName;
      _data.city = dbData.city;
      _data.adress = dbData.adress;
      _data.suburb = dbData.suburb;
      _data.wins = dbData.suburb;
    }

    console.log("phone = " + userDetails.phone)
    console.log("score" + playerArray.wins)
  }

  function readErr(error) {
    readStatus = "fail";
    console.log(error);
  }

}



function fb_readRecPlayer(_path, _key) {
  console.log('fb_readRec: path= ' + _path + '  key= ' + _key);
  console.log("reading player 2s uid")

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr)

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "ok";
      let dbData = snapshot.val();
      console.log(dbData)
      p2Uid = dbData.uid
      fb_xoReadRec(USERSCORE,p2Uid,p2Details);
      updateHtml();

    }
  }


  function readErr(error) {
    readStatus = "fail";
    console.log(error);
  }
}
/**************************************************************/
// fb_readAdmin(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:  
/**************************************************************/
function fb_readAdmin(_path, _key, _data) {
  console.log('fb_readAdmin: path= ' + _path + '  key= ' + _key);

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr)

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "ok";
      console.log("user is admin")
      document.getElementById("b_admin").style.display = "block";

    }

    console.log("phone = " + userDetails.phone)
  }

  function readErr(error) {
    readStatus = "not admin";
    console.log(error);
  }

}

function fb_readScores() {
  console.log("reading " + playerArray[xo_playerSymbol].name + " scores")
  firebase.database().ref(USERSCORE + '/' + userDetails.uid).once("value", function(snapshot) {
    if (snapshot.val() != null) { //checks if record is empty 
      var childData = snapshot.val();
      userScore.wins = childData.wins;
      userScore.draws = childData.draws;
      userScore.losses = childData.losses;
    //  let temporary = userDetails.name
    // temporary = userScore.name
    }
    console.log(userScore)
    
    console.log("player one wins" + playerArray[0].wins);
  })


  

}

function fb_readScores2() {
  console.log("reading " + playerArray[xo_playerSymbol].name + " scores")
  firebase.database().ref(USERSCORE + '/' + userDetails.uid).once("value", function(snapshot) {
    if (snapshot.val() != null) { //checks if record is empty 
      var childData = snapshot.val();
      playerArray[xo_playerSymbol].wins = childData.wins;
      playerArray[xo_playerSymbol].losses = childData.losses;
      playerArray[xo_playerSymbol].draws = childData.draws;




    }
    console.log(userScore)
    console.log("player one wins" + playerArray[0].wins);
  })



}
/**************************************************************/
// fb_readOnjoin(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:  
/**************************************************************/
function fb_readOnJoin(_path, _key) {
  console.log('fb_readOnjoin: path= ' + _path + '  key= ' + _key);

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).on("value", gotRecord, readErr)

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
      console.log("data deleted")
      activeUid = userDetails.uid
      console.log("active uid" + activeUid)
      xo_playerSymbol = 0
      console.log("reading player 2 turn")
      fb_readRecPlayer(ALOBBY, activeUid);
      updateHtml();
      fb_readOnTurn(ALOBBY, activeUid + "/" + "p2turns");

      

    }
    else {
      readStatus = "ok";
      let dbData = snapshot.val();
      console.log("IGNORE 1ST RECORD")
    }

    console.log("phone = " + userDetails.phone)
    console.log("score" + playerArray.wins)
  }

  function readErr(error) {
    readStatus = "fail";
    console.log(error);
  }

}


function fb_readOnTurn(_path, _key) {
  console.log('fb_readOnTurn: path= ' + _path + '  key= ' + _key);

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).on("value", gotRecord, readErr)

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
      console.log("no record")
    }
    else {
      readStatus = "ok";
      let dbData = snapshot.val();
      console.log("IGNORE 1ST RECORD")
      console.log(dbData)
      var secondData = dbData.replace("xo_btn", "")
      console.log("second data " + secondData)
      readP2Turn(dbData, secondData);
      

    }

  }

  function readErr(error) {
    readStatus = "fail";
    console.log(error);
  }

}


/**************************************************************/
//    END OF MODULE
/**************************************************************/