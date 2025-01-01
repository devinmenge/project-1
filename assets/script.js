document.addEventListener('DOMContentLoaded', () => {
    loadData();
    createTable();
    setupModalListeners();

    const timeFormatToggle = document.getElementById('timeFormatToggle');
    timeFormatToggle.addEventListener('change', toggleTimeFormat);
});

// Initialize data structure
let data = {
    tasks: Array(24).fill().map(() => ({
        text: "",
        color: "#ffffff",
        hasTask: false,
    })),
    use12HourFormat: false
};

// Save Data to LocalStorage
function saveData() {
    localStorage.setItem("data", JSON.stringify(data));
}

// Load Data from LocalStorage
function loadData() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Check if the stored data has the correct structure
        if (parsedData.tasks && Array.isArray(parsedData.tasks)) {
            data = parsedData;
        } else {
            // Convert old format to new format if necessary
            data = {
                tasks: Array(24).fill().map((_, i) => ({
                    text: parsedData[i]?.text || "",
                    color: parsedData[i]?.color || "#ffffff",
                    hasTask: parsedData[i]?.hasTask || false,
                })),
                use12HourFormat: false
            };
        }
        // Update checkbox to match saved preference
        const timeFormatToggle = document.getElementById('timeFormatToggle');
        timeFormatToggle.checked = data.use12HourFormat;
    }
}

function addRow(hour) {
    const row = document.createElement("tr");
    row.className = 'row';

    // Time Cell
    const timeCell = document.createElement("td");
    timeCell.dataset.hour = hour;
    updateTimeCell(timeCell, hour, document.getElementById('timeFormatToggle').checked);
    row.appendChild(timeCell);

    // Activity Cell
    const activityCell = document.createElement("td");
    activityCell.className = 'activity';
    
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter task...";
    input.value = data.tasks[hour].text;
    input.className = 'task-input';
    input.style.textAlign = "center";

    const taskDisplay = document.createElement("span");
    taskDisplay.textContent = data.tasks[hour].text;
    taskDisplay.className = "task-display";

    if (data.tasks[hour].hasTask) {
        input.style.display = "none";
        taskDisplay.style.display = "block";
        activityCell.appendChild(taskDisplay);
    } else {
        input.style.display = "block";
        taskDisplay.style.display = "none";
        activityCell.appendChild(input);
    }
    row.appendChild(activityCell);

    // Options Cell
    const optionsCell = document.createElement("td");
    optionsCell.className = 'options';
    
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.value = data.tasks[hour].color;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "save-btn";

    if (!data.tasks[hour].hasTask) {
        optionsCell.appendChild(colorPicker);
        optionsCell.appendChild(saveButton);
    } else {
        const undoButton = document.createElement("button");
        undoButton.textContent = "Undo";
        undoButton.classList.add("undo-btn");
        optionsCell.appendChild(undoButton);

        undoButton.addEventListener("click", () => {
            resetRow(row, hour, activityCell, optionsCell, input, taskDisplay, colorPicker, saveButton);
        });
    }

    // Event Listeners
    colorPicker.addEventListener("input", () => {
        row.style.backgroundColor = colorPicker.value;
    });

    saveButton.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (!taskText) {
            alert("Task cannot be empty.");
            return;
        }

        data.tasks[hour] = { text: taskText, color: colorPicker.value, hasTask: true };
        saveData();

        input.style.display = "none";
        taskDisplay.textContent = taskText;
        taskDisplay.style.display = "block";
        activityCell.innerHTML = "";
        activityCell.appendChild(taskDisplay);

        optionsCell.innerHTML = "";
        const undoButton = document.createElement("button");
        undoButton.textContent = "Undo";
        undoButton.classList.add("undo-btn");
        optionsCell.appendChild(undoButton);

        undoButton.addEventListener("click", () => {
            resetRow(row, hour, activityCell, optionsCell, input, taskDisplay, colorPicker, saveButton);
        });

        row.style.backgroundColor = colorPicker.value;
    });

    row.appendChild(optionsCell);
    document.querySelector("tbody").appendChild(row);

    row.style.backgroundColor = data.tasks[hour].color;
}

function resetRow(row, hour, activityCell, optionsCell, input, taskDisplay, colorPicker, saveButton) {
    data.tasks[hour] = { text: "", color: "#ffffff", hasTask: false };
    saveData();

    row.style.backgroundColor = "#ffffff";

    // Reset Activity Cell
    activityCell.innerHTML = "";
    input.value = "";
    input.style.display = "block";
    input.style.textAlign = "center";
    taskDisplay.style.display = "none";
    activityCell.appendChild(input);

    // Reset Options Cell
    optionsCell.innerHTML = "";
    colorPicker.value = "#ffffff";
    optionsCell.appendChild(colorPicker);
    optionsCell.appendChild(saveButton);
}

// Update Time Cell
function updateTimeCell(cell, hour, use12HourFormat) {
    const startTime = use12HourFormat ? formatTo12Hour(hour) : `${hour}:00`;
    const endTime = use12HourFormat ? formatTo12Hour((hour + 1) % 24) : `${(hour + 1) % 24}:00`;
    cell.textContent = `${startTime} - ${endTime}`;
}

// Format Hour to 12-Hour Clock
function formatTo12Hour(hour) {
    const period = hour < 12 || hour === 24 ? "AM" : "PM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:00 ${period}`;
}

// Toggle Time Format for All Rows
function toggleTimeFormat() {
    const use12HourFormat = this.checked;
    data.use12HourFormat = use12HourFormat;
    saveData();
    
    document.querySelectorAll("tbody td:first-child").forEach(cell => {
        const hour = parseInt(cell.dataset.hour, 10);
        updateTimeCell(cell, hour, use12HourFormat);
    });
}

function createTable() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ''; // Clear existing rows
    
    for (let i = 0; i < 24; i++) {
        addRow(i);
    }
}

// Modal Events
function setupModalListeners() {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const cancelBtn = document.getElementById('cancelBtn');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedOption = document.getElementById('source').value;
        alert(`Thank you for your feedback: ${selectedOption}`);
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}





































