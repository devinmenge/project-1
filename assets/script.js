// to do: add consts, functions, listener, etc.

// function getInputValue(button) { 
//     // Get the input element by its name attribute
//     // var inputField = document.getElementsByName('person_0.fname')[0];
//     var tdElement = button.closest('td');
    
//     // Find the input field inside this <td>
//     var inputField = tdElement.querySelector('input[name="task"]');

//     var inputValue = inputField.value;  // Get the value entered in the input field
    
//     // Get the <td> element that contains the input field and buttons
//     var tdElement = inputField.closest('td');
    
//     // Set the text inside the <td> to the input value
//     tdElement.innerHTML = inputValue;  // Insert the input value inside the <td>
//     if (inputValue) {
//       // Clear the <td> content
//       tdElement.innerHTML = ''; 

//       // Set the task text inside the <td>
//       tdElement.innerHTML = inputValue; 

//       // Create the minus button
//       var minusButton = document.createElement('button');
//       minusButton.textContent = '➖';  // The minus button text
//       minusButton.classList.add('button');  // Add class for styling
// // Create the color picker button
// var button = document.createElement('button');
// button.classList.add('color-picker');

// // Create the label element for color picker
// var label = document.createElement('label');
// label.setAttribute('for', 'colorPicker');
// label.textContent = '🎨';

// // Create the input element (color picker)
// var input = document.createElement('input');
// input.type = 'color';
// input.value = '#1dbbce';
// input.id = 'colorPicker';

// // Append the label and input to the color picker button
// button.appendChild(label);
// button.appendChild(input);

// // Append the color picker button to the <td> (not to body)
// tdElement.appendChild(button);


// // Append the button to the body (or another container of your choice)
// document.body.appendChild(button);
//       // Set up the click event for the minus button
//       minusButton.onclick = function() {
//           // Reset to the original state: show the input field and the plus button
//           tdElement.innerHTML = '';  // Clear the content of the <td>

//           // Re-insert the input field
//           tdElement.appendChild(inputField);

//           // Re-create and append the plus button again
//           var plusButton = document.createElement('button');
//           plusButton.textContent = '➕';
//           plusButton.classList.add('button');
//           plusButton.onclick = function() {
//               getInputValue(plusButton);  // Re-trigger the getInputValue function
//           };
//           tdElement.appendChild(plusButton);
//       };

//       // Append the minus button after the task text
//       tdElement.appendChild(minusButton);
//   }
// }
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

      // Set up the click event for the minus button
      minusButton.onclick = function() {
          // Reset to the original state: show the input field and the plus button
          tdElement.innerHTML = '';  // Clear the content of the <td>

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

