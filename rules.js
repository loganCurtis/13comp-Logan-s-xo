//*********************************************************************************
// Written by ????? Term 2 2021
//*********************************************************************************
{
  "rules" : {
    //-----------------------------------------------------------------------------
    // userDetails path
    "userDetails": {
      // allow admin to readAll on path
      ".read": "root.child('admin').child(auth.uid).child('role').val() == 'admin'",
        ".write": "root.child('admin').child(auth.uid).child('role').val() == 'admin'",
          // allow the user and admin to read and write user's records
          "$uid": {
        ".read": "$uid === auth.uid || root.child('admin').child(auth.uid).child('role').val() == 'admin'",
          ".write": "$uid === auth.uid || root.child('admin').child(auth.uid).child('role').val() == 'admin'",
            "name": {
          ".validate": "newData.isString()"
        },
        "age": {
          ".validate": "newData.isNumber() && newData.val() >= 16 && newData.val() <= 100"
        }
      }
    },
    //-----------------------------------------------------------------------------
    // bbScores path 
    "userScores": {
      // allow admin to readAll on path
      ".read": "root.child('admin').child(auth.uid).child('role').val() == 'admin'",
        ".write": "root.child('admin').child(auth.uid).child('role').val() == 'admin'",
          "$uid": {
        // allow the user and admin to read and write user's records
        ".read": "$uid === auth.uid || root.child('admin').child(auth.uid).child('role').val() == 'admin'",
          ".write": "$uid === auth.uid || root.child('admin').child(auth.uid).child('role').val() == 'admin'"
      }
    },
    //-----------------------------------------------------------------------------
    // admin path
    "admin": {
      "$uid": {
        // allow the user and admin to read and write user's records
        ".read": "$uid === auth.uid || root.child('admin').child(auth.uid).child('role').val() == 'admin'",
          ".write": "$uid === auth.uid || root.child('admin').child(auth.uid).child('role').val() == 'admin'"
      }
    }
  }
}

//*********************************************************************************
//  END OF RULES
//*********************************************************************************