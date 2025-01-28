let data = []; // Array to store entered data

// Handle form submission and data entry
document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form input values
    const multiplier = parseFloat(document.getElementById('multiplier').value);
    const time = document.getElementById('time').value;
    const date = document.getElementById('date').value;

    // Create a new data entry object
    const entry = {
        multiplier: multiplier,
        time: time,
        date: date,
        prediction: getPrediction() // Call the prediction function
    };

    // Store the entry in the data array
    data.push(entry);

    // Add the entry to the table
    addToTable(entry);

    // Clear form inputs
    document.getElementById('multiplier').value = '';
    document.getElementById('time').value = '';
    document.getElementById('date').value = '';
});

// Add new entry to the data table
function addToTable(entry) {
    const tableBody = document.querySelector('#dataTable tbody');
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${entry.multiplier}</td>
        <td>${entry.time}</td>
        <td>${entry.date}</td>
        <td>${entry.prediction}</td>
    `;
}

// Fetch the prediction for the current round (for simplicity, a mock prediction here)
function getPrediction() {
    // Placeholder logic for prediction (use a model here for real prediction)
    return Math.random() * 20; // Random number between 0 and 20 as mock prediction
}

// Handle "current time" prediction button
document.getElementById('currentTimeButton').addEventListener('click', function() {
    const prediction = getPrediction();
    document.getElementById('predictionValue').textContent = `Predicted Multiplier: ${prediction.toFixed(2)}`;
});

// Export data to CSV
document.getElementById('exportButton').addEventListener('click', function() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Multiplier,Time,Date,Prediction\n" 
        + data.map(entry => `${entry.multiplier},${entry.time},${entry.date},${entry.prediction}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'crash_game_data.csv');
    link.click();
});
