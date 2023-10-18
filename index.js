document.addEventListener('DOMContentLoaded', function () {
    // Initialize Flatpickr for date picking
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const excludedDatesInput = document.getElementById('excluded-dates');

    const dateInputs = [startDateInput, endDateInput];

    const flatpickrOptions = {
        dateFormat: 'Y-m-d',
        onClose(selectedDates, dateStr, instance) {
            updateDateFields();
        }
    };

    dateInputs.forEach(input => flatpickr(input, flatpickrOptions));

    // Handle excluded dates input changes
    excludedDatesInput.addEventListener('input', updateDateFields);

    // Handle save button click
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', saveData);
});

function updateDateFields() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const excludedDates = document.getElementById('excluded-dates').value.split(',');

    // Update Number of Days
    const numDays = calculateNumDays(startDate, endDate, excludedDates);
    document.getElementById('num-days').textContent = numDays;

    // Update Expected Lead Count
    const numLeads = document.getElementById('num-leads').value;
    const expectedLeadCount = calculateExpectedLeadCount(numLeads, numDays);
    document.getElementById('expected-lead-count').textContent = expectedLeadCount;
}

function calculateNumDays(startDate, endDate, excludedDates) {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    let numDays = Math.round(Math.abs((startTimestamp - endTimestamp) / oneDay));

    // Exclude specified dates
    excludedDates.forEach(date => {
        const excludedTimestamp = new Date(date).getTime();
        if (startTimestamp <= excludedTimestamp && excludedTimestamp <= endTimestamp) {
            numDays--;
        }
    });

    return numDays;
}

function calculateExpectedLeadCount(numLeads, numDays) {
    return numLeads * numDays;
}

function saveData() {
    // Implement your save data logic using Ajax or any other method here
    alert('Data saved!');
}
