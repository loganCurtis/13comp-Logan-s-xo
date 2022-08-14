/**************************************************************/
// reg_manager.js


//
// Test registration page
// Written by Mr Bob 2020
// v01 Initial code
// v02 Include reg_getFormItemValue function in reg_manager.js 
// v03 Add reg_prep function
// v04 Add conversion from string to number for numeric feilds
// v05 Cut down version
/**************************************************************/

/*************************************************************          //<=======
  TO IMPLIMENT THE REGISTRATION FEATURE:                                //<=======
  
 
    4. Taylor your ???????.js to fit your program code by looking       //<=======
         at lines ending with  //<=======                               //<=======
    5. Create an images folder in your project.                         //<=======
    6. Download this project to your computer, extract all the          //<=======
         files from the zipped folder.                                  //<=======
    7. Upload all the images to you projects images folder.             //<=======
*************************************************************/          //<=======

// Save name & email into the form
// ENSURE THE OBJECT NAME IS CORRECT; its currently details           //<======= 
function reg_nameEmail() {
  document.getElementById("p_regName").innerHTML = userDetails.name        //<=======    
  document.getElementById("p_regEmail").innerHTML = userDetails.email
}       //<=======   

/**************************************************************/
// reg_regDetailsEntered()
// Input event; called when user clicks ?????????? button              //<========
// Write user's details to DB
// Input:   
// Return:
/**************************************************************/
function reg_regDetailsEntered() {
  console.log('reg_regDetailsEntered');
  // Save player1's details from the form into your details object
  //  ENSURE THE OBJECT NAME THE PROGRAM SAVES TO IS CORRECT; 
  //    its currently details                                           //<======= 
  userDetails.gameName = reg_getFormItemValue("f_reg", 0);    
 //<=======
  userDetails.phone = Number(reg_getFormItemValue("f_reg", 1));      //<=======
  userDetails.gender = reg_getFormItemValue("f_reg", 2);
  userDetails.age = Number(reg_getFormItemValue("f_reg", 3));
  userDetails.city = reg_getFormItemValue("f_reg", 4);
  userDetails.adress = reg_getFormItemValue("f_reg", 5);
  userDetails.suburb = reg_getFormItemValue("f_reg", 6);
  userDetails.postCode = reg_getFormItemValue("f_reg", 7);
  console.table(userDetails);

  writeRec(DETAILS,userDetails.uid,userDetails);
  
  
  
    // call your function to write to details record firebase             //<======
    
  
}

/**************************************************************/
// reg_getFormItemValue(_elementId, _item)
// Called by reg_regDetailsEntered
// Returns the value of the form's item
// Input:  element id & form item number
// Return: form item's value
/**************************************************************/
function reg_getFormItemValue(_elementId, _item) {
  //console.log('reg_getFormItemValue: _elementId=' + _elementId +
  //	  ',  _item= ' + _item);

  return document.getElementById(_elementId).elements.item(_item).value;
}

/**************************************************************/
// reg_validInputs()
// Called by reg_validInputs
// 
// Input:  
// Return: 
/**************************************************************/
function reg_validInputs(){
  console.log("validating")
  var letters = /^[A-Z a-z]+$/;
  if(document.getElementById('f_reg').checkValidity()){
    if(reg_getFormItemValue("f_reg", 0).match(letters)){
      if(reg_getFormItemValue("f_reg", 4).match(letters)){
        if(reg_getFormItemValue("f_reg", 6).match(letters)){
          reg_regDetailsEntered();
          homeBtn();
          
        } else{
          console.log("invalid suburb")
        }
      } else{
        console.log("invalid city")
      }
    } else{
      console.log("invalid name")
    }
  }
}
/**************************************************************/
//    END OF PROG
/**************************************************************/