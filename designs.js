// Select color input
const colorPicker = document.getElementById('colorPicker');
let color = colorPicker.value;
colorPicker.addEventListener('input', function(){
  color = colorPicker.value;
})

function colorCell(cellNumber){
  let mouseDown = false;
  // add listener to each cell
  let cell = document.getElementById(cellNumber);
  // set background color if cell is clicked.
  cell.addEventListener('mousedown', function(){
    cell.style.backgroundColor = color;
  })
  document.addEventListener('mousedown', function(){
    mouseDown = true;
  })
  document.addEventListener('mouseup',function(){
    mouseDown = false;
  })
  cell.addEventListener('mouseover', function(){
    if(mouseDown) {
      cell.style.backgroundColor = color;
    }
  })
}

function warning(elements, warn){
  let message = "Enter value between 10 and 100: ";
  for (i = 0; i< elements.length; i++) { message += elements[i].name +" "};
  warn.innerHTML = message;
  // console.log(elements)

  elements.forEach(function(i) {
    console.log(i);
    i.style.borderColor = 'red'
  });
  elements = []
}

function validateForm(){
  const warn = document.getElementById('formMessages')
  warn.style.color ="red"
  warn.style.fontStyle = "bold"
  warn.style.fontSize = "small"
  warn.style.fontVariant = "small-caps"
  const elements = []
  if (rows < 10 || rows > 100){
    elements.push(gridHeight)
  }
  if (columns < 10 || columns > 100){
    elements.push(gridWidth)
  }
  if (elements.length) {
    // warn.innerHTML = message;
    // warn.hidden = false;
    warning(elements, warn)
  }
  else {
    warn.hidden = true;
    makeGrid(rows,columns)
  }

  // if ((rows < 10 || rows > 100) && (columns < 10 || columns > 100)) {
  //   // gridHeight.style.borderColor = 'red';
  //   // gridWidth.style.borderColor = 'red';
  //   elements.push(gridHeight,gridWidth)
  //   warn.hidden = false;
  //   warn.innerHTML = message;
  // } else if ((rows < 10 || rows > 100) && (columns >= 10 && columns <= 100)) {
  //   elements.push(gridHeight)
  //   // gridHeight.style.borderColor = 'red';
  //   warn.hidden = false;
  //   warn.innerHTML = message;
  // } else if ((rows >= 10 && rows <= 100) && (columns < 10 || columns > 100)) {
  //   elements.push(gridWidth)
  //     // gridWidth.style.borderColor = 'red';
  //     warn.hidden = false;
  //     warn.innerHTML = message;
  // } else {
  // warn.hidden = true;
  // makeGrid(rows, columns)
  // }
  // warning(elements)
}

// Select size input

const gridButton = document.getElementById('submit');
const gridHeight = document.querySelector('#inputHeight');
const gridWidth = document.querySelector('#inputWidth');
const table = document.getElementById('pixelCanvas');

gridButton.addEventListener('click',function(e) {
  // stop page reloading
  e.preventDefault();
  // set default border colors - no validation yet
  gridHeight.style.borderColor = '';
  gridWidth.style.borderColor = '';

  // store rows and columns used for gridMaker
  rows = gridHeight.value
  columns = gridWidth.value

  // validate form data falls within 10 to 100 rows and columns
  // if so, pass to making Grid
  validateForm()
})

function clearTable(){
  let tBody = document.querySelector("tbody");
  let tr = tBody.lastElementChild;
  while (tr) {
    tBody.removeChild(tr);
    tr = tBody.lastElementChild;
  }
  makeGrid(rows,columns);
}

// When size is submitted by the user, call makeGrid()
// TBD - Clear table if new values are input
function makeGrid(rows, columns) {
  if (document.querySelector("tr")) {
    clearTable();
  }
  else{
    let cellNumber = '0';
    for (r = 0; r < rows; r++) {
      let row = table.insertRow(r);
      for (c = 0; c < columns; c++){
        let cell = row.insertCell(c);
        cell.setAttribute('id',cellNumber);
        colorCell(cellNumber);
        cellNumber++
      }
    }
  }
}
