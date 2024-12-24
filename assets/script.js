let data = [
{text: "first task",
color: "#445566"
}
];

function saveData(){
    localStorage.setItem("data", JSON.stringify(data));
}

// TO DO: implement load data function
function loadData(){
// TO DO: read from local storage and save it as data

// TO DO: use the data in data to populate the page
}

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

// Select elements
const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.querySelector('.open-modal-btn');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');
const hearAboutUs = document.getElementById('hearAboutUs');

// Open modal 
openModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
});

// Close modal 
closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Submit button 
submitBtn.addEventListener('click', () => {
    const selectedOption = hearAboutUs.value;
    if (selectedOption) {
        alert(`Thank you for your response: ${selectedOption}`);
        modalOverlay.style.display = 'none';
        hearAboutUs.value = ''; // Reset the dropdown
    } else {
        alert('Please select an option.');
    }
});

// Close modal when clicking outside the modal
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});