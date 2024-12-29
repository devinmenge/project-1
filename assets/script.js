document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is running!"); // Debugging line
    loadData();  // Load data from localStorage
    createTable(); // Create table with empty rows
});

let data = [
    { text: "first task", color: "#445566" }
];

const table = document.querySelector("table");

function saveData() {
    localStorage.setItem("data", JSON.stringify(data));
}

// Load data from localStorage and populate the table
function loadData() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        data = JSON.parse(storedData); // Parse the data from localStorage and save it in the data array
    }

    // Populate the page with stored tasks
    data.forEach((task, index) => {
        addRow(index, task.text, task.color); // Add rows with saved data
    });
}

// Function to add a row for each hour
function addRow(startHour, taskText = "") {
    const row = document.createElement("tr");

    const leftCell = document.createElement("td");
    leftCell.innerHTML = `${startHour}:00 - ${startHour + 1 % 24}:00`;
    row.appendChild(leftCell);

    const rightCell = document.createElement("td");

    // Create task input
    const taskInput = document.createElement("input");
    taskInput.setAttribute("name", "task");
    taskInput.setAttribute("placeholder", "Enter task..."); // Optionally add a placeholder
    taskInput.value = taskText; // Set the input value if there is existing task text
    rightCell.appendChild(taskInput);

    // Create the plus button
    const plusButton = document.createElement('button');
    plusButton.textContent = '➕';  // The plus button text
    plusButton.classList.add('button');  // Add class for styling

    // Create the minus button
    const minusButton = document.createElement('button');
    minusButton.textContent = '➖';  // The minus button text
    minusButton.classList.add('button');  // Add class for styling
    minusButton.style.display = "none";  // Initially hide the minus button

    // Create the color picker button
    const colorPicker = document.createElement('button');
    colorPicker.classList.add('color-picker');
    colorPicker.style.display = "none";  // Initially hide the color picker

    // Create the label element for the color picker
    const label = document.createElement('label');
    label.setAttribute('for', 'colorPicker');
    label.textContent = '🎨';

    // Create the input element (color picker)
    const input = document.createElement('input');
    input.type = 'color';
    input.value = '#1dbbce'; // Default color

    // Add event listener to the color picker input
    input.addEventListener('input', function () {
        rightCell.style.backgroundColor = input.value;
    });

    // Append the color picker and the buttons to the rightCell
    colorPicker.appendChild(label);
    colorPicker.appendChild(input);
    rightCell.appendChild(colorPicker);
    rightCell.appendChild(plusButton);
    rightCell.appendChild(minusButton);

    // Add the task input and buttons to the row
    row.appendChild(rightCell);
    table.appendChild(row);

    // When plus button is clicked, hide input and show the task text, plus the other buttons
    plusButton.onclick = function () {
        const inputValue = taskInput.value;

        if (inputValue) {
            // Hide the input field and show the task text
            taskInput.style.display = 'none';
            plusButton.style.display = 'none';
            rightCell.appendChild(document.createTextNode(inputValue));
            minusButton.style.display = "inline"; // Show the minus button
            colorPicker.style.display = "inline"; // Show the color picker

            // Save the task text and color to the data array
            data.push({ text: inputValue, color: rightCell.style.backgroundColor || "#ffffff" });
            saveData(); // Save the updated data to localStorage
        }

    };

    // When minus button is clicked, restore the input and plus button
    minusButton.onclick = function () {
        // Clear the task text and show the input and plus button again
        rightCell.innerHTML = '';
        taskInput.style.display = 'inline';
        rightCell.appendChild(taskInput); // Add the input field back to the cell
        plusButton.style.display = 'inline';
        rightCell.appendChild(plusButton); // Show the plus button again

        // Hide the minus button and color picker
        minusButton.style.display = "none";
        colorPicker.style.display = "none";
    };
}

function createTable() {
    for (let i = 0; i < 24; i++) {
        addRow(i); // Add a row for each hour of the day
    }
}


    /* 
    function getInputValue(button) {
      // Get the <td> element that contains the input field and button
      var tdElement = button.closest('td');
      var inputField = tdElement.querySelector('input[name="task"]');
    
      var inputValue = inputField.value;  // Get the value entered in the input field
      
      if (inputValue) {
          // Clear the <td> content
          tdElement.innerHTML = ''; 
    
          // Set the task text inside the <td>
          tdElement.innerHTML = inputValue;
    
          // Create the minus button
          var minusButton = document.createElement('button');
          minusButton.textContent = '➖';  // The minus button text
          minusButton.classList.add('button');  // Add class for styling
    
          // Create the color picker button
          var button = document.createElement('button');
          button.classList.add('color-picker');
    
          // Create the label element for color picker
          var label = document.createElement('label');
          label.setAttribute('for', 'colorPicker');
          label.textContent = '🎨';
    
          // Create the input element (color picker)
          var input = document.createElement('input');
          input.type = 'color';
          input.value = '#1dbbce';
          input.id = 'colorPicker';
    
          // Append the label and input to the color picker button
          button.appendChild(label);
          button.appendChild(input);
    
          // Append the color picker button to the <td> (not to body)
          tdElement.appendChild(button);
    
               // Add event listener to the color picker input
               input.addEventListener('input', function() {
                
                // Change the background color of the closest <td> to the selected color
                tdElement.style.backgroundColor = input.value;
            });
    
          // Set up the click event for the minus button
          minusButton.onclick = function() {
              // Reset to the original state: show the input field and the plus button
              tdElement.innerHTML = '';  // Clear the content of the <td>
    
              // Change the background color to white when minus button is clicked
              tdElement.style.backgroundColor = 'white';
    
              // Re-insert the input field
              tdElement.appendChild(inputField);
    
              // Re-create and append the plus button again
              var plusButton = document.createElement('button');
              plusButton.textContent = '➕';
              plusButton.classList.add('button');
              plusButton.onclick = function() {
                  getInputValue(plusButton);  // Re-trigger the getInputValue function
              };
              tdElement.appendChild(plusButton);
          };
    
          // Append the minus button after the task text and the color picker
          tdElement.appendChild(minusButton);
      }
    }
    
     */