let lobbyArray = [

];


function generateTable(table, data) {
  console.log("generating table")
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
        var button = document.createElement('input');
    button.setAttribute('type', 'button');
    // add button's "onclick" event.         
    button.addEventListener("click", function() 
                            {checkUid(this, LOBBY);});
    let cell = row.insertCell();
    cell.appendChild(button);
  }
}


let table = document.querySelector("table");
let data = Object.keys(lobbyArray[0]);
// generateTableHead(table, data);
