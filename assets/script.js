// to do: add consts, functions, listener, etc.

function getInputValue(button) {
    // Get the input element by its name attribute
    // var inputField = document.getElementsByName('person_0.fname')[0];
    var tdElement = button.closest('td');
    
    // Find the input field inside this <td>
    var inputField = tdElement.querySelector('input[name="task"]');

    var inputValue = inputField.value;  // Get the value entered in the input field
    
    // Get the <td> element that contains the input field and buttons
    var tdElement = inputField.closest('td');
    
    // Set the text inside the <td> to the input value
    tdElement.innerHTML = inputValue;  // Insert the input value inside the <td>
  }