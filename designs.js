// Select color input
const colorPicker = document.getElementById('colorPicker');
let color = colorPicker.value;
colorPicker.addEventListener('input', function(){
  color = colorPicker.value;
})

// Add listener events to each cell for clicks
// detect mouse down event to allow drag after click
function colorCell(cellNumber){
  let mouseDown = false;
  // add listener to each cell
  let cell = document.getElementById(cellNumber);
  // set background color if cell is clicked
  cell.addEventListener('mousedown', function(){
    cell.style.backgroundColor = color;
  })
  // determine if mouse is being held down or released
  document.addEventListener('mousedown', function(){
    mouseDown = true;
  })
  document.addEventListener('mouseup',function(){
    mouseDown = false;
  })
  // if mouse is down and moved over other cells, color thouse too
  cell.addEventListener('mouseover', function(){
    if(mouseDown) {
      cell.style.backgroundColor = color;
    }
  })
}

// display warning message if input is below 10, above 100, or decimal
// collor texts and elements in red to highlight what needs to be fixed
function warning(elements, warn){
  // Default error messages
  let message = "Enter whole number between 10 and 100: ";
  // Add parameters which are not acceptable to message
  for (i = 0; i< elements.length; i++) { message += elements[i].name +" "};
  // display message in <p> below gridSize
  warn.innerHTML = message;
  // set border to red in element(s) where number is bad
  elements.forEach(function(i) {
    i.style.borderColor = 'red'
  });
  // reset elements to empty for subsequent evaluations
  elements = []
}

// Check to make sure values submitted are reasonable and integer
// prepare warning message for display and pass to warning function if needed
// hide warnings if all values are acceptable.
function validateForm(){
  const warn = document.getElementById('formMessages')
  warn.style.color ="red"
  warn.style.fontStyle = "bold"
  warn.style.fontSize = "small"
  warn.style.fontVariant = "small-caps"
  // add elements with offending values
  const elements = []
  // analyze grid height and width for integer and reasonable value
  if (rows % 1 !=0 || rows < 10 || rows > 100){
    elements.push(gridHeight)
  }
  if (columns % 1 != 0 || columns < 10 || columns > 100){
    elements.push(gridWidth)
  }
  // if elements list contains any items warning function
  if (elements.length) {
    warning(elements, warn)
  }
  //otherwise hide any warning messages and build the grid
  else {
    warn.hidden = true;
    makeGrid(rows,columns)
  }
}

// assigne variables to main elements used in form submission and in creation
// of Grid
const gridButton = document.getElementById('submit');
const gridHeight = document.querySelector('#inputHeight');
const gridWidth = document.querySelector('#inputWidth');
const table = document.getElementById('pixelCanvas');

// handle and prepare input from form
gridButton.addEventListener('click',function(e) {
  // stop page reloading on submit click
  e.preventDefault();
  // set default border colors - no validation yet
  gridHeight.style.borderColor = '';
  gridWidth.style.borderColor = '';
  // store rows and columns used for gridMaker
  rows = gridHeight.value
  columns = gridWidth.value
  // validate form data falls is integer and within 10 to 100 rows and columns
  validateForm()
})

// if new grid is submitted, clear existing grid and submit new values
function clearTable(){
  // select table body
  let tBody = document.querySelector("tbody");
  // select last table row element in tbody
  let tr = tBody.lastElementChild;
  // if table rows exist, remove them
  while (tr) {
    tBody.removeChild(tr);
    tr = tBody.lastElementChild;
  }
  // submit new rows and columns values to make new grid
  makeGrid(rows,columns);
}

// When size is submitted by the user, call makeGrid()
// Reasonable values have been accepted for use in building a grid.
// for each integer value in grid heigh and a table rows
// for each interger value in grid width add a table td
function makeGrid(rows, columns) {
  // if a table already exists - clear it out first.
  if (document.querySelector("tr")) {
    clearTable();
  }
  // no table exists, let build one
  else{
    // variable for use with establishing unique ID for each cell
    let cellNumber = '0';
    // insert a row as table row made up of width value cells
    for (r = 0; r < rows; r++) {
      let row = table.insertRow(r);
      // insert a cell as table data for each blocks of width value
      for (c = 0; c < columns; c++){
        let cell = row.insertCell(c);
        // assign a unique ID to each table cell
        cell.setAttribute('id',cellNumber);
        // assign listener events prepared to color cell
        colorCell(cellNumber);
        // iterate cell numbers used for ID
        cellNumber++
      }
    }
  }
}
