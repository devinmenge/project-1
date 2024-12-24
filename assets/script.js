let data = [{
    text: "first task",
    color: "#445566"
}];

const table = document.querySelector("table");

function saveData(){
    localStorage.setItem("data", JSON.stringify(data));
}

// TO DO: implement load data function
function loadData(){
// TO DO: read from local storage and save it as data

// TO DO: use the data in data to populate the page
}

function addRow(startHour) {
    const row = document.createElement("tr");

    const leftCell = document.createElement("td");
    leftCell.innerHTML = `${startHour}:00 - ${startHour+1%24}:00`
    row.appendChild(leftCell)




    const rightCell = document.createElement("td");

    // Create task input
    var taskInput = document.createElement('input');
    taskInput.setAttribute("name", "task")
    rightCell.appendChild(taskInput);


    // Create the minus button
    var minusButton = document.createElement('button');
    minusButton.textContent = '➖';  // The minus button text
    minusButton.classList.add('button');  // Add class for styling
    minusButton.onclick = function() {
        row.setAttribute('class', 'input-state')

        // Change the background color to white when minus button is clicked
        rightCell.style.backgroundColor = 'white';
    };

    // Create the plus button
    var plusButton = document.createElement('button');
    plusButton.textContent = '➕';
    plusButton.classList.add('button');
    plusButton.onclick = function() {

    };

    // Create the color picker button
    var colorPicker = document.createElement('button');
    colorPicker.classList.add('color-picker');

    // Create the label element for color picker
    var label = document.createElement('label');
    label.setAttribute('for', 'colorPicker');
    label.textContent = '🎨';

    // Create the input element (color picker)
    var input = document.createElement('input');
    input.type = 'color';
    input.value = '#1dbbce';

    // Add event listener to the color picker input
    input.addEventListener('input', function() {
        rightCell.style.backgroundColor = input.value;
    });

    colorPicker.appendChild(label);
    colorPicker.appendChild(input);
    rightCell.appendChild(colorPicker);
    rightCell.appendChild(plusButton);
    rightCell.appendChild(minusButton);
    row.appendChild(rightCell)
    table.appendChild(row);
}

function createTable(){
    for (let i = 0; i < 24; i++) {
        addRow(i);
    }
}

createTable();
