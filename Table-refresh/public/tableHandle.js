
/* Enter here how many rows seen in table. */
const maxRowsInTable = 5;

/* Enter here how many seconds till row is updated. */
const refreshPaceInFullSeconds = 6;

const table = document.getElementById('infoTable');

let mainIntervalId;
let mainCounterRunning = true;
let onGoingRowNumber = 1; //Global value to track which row is being updated at present.


function getTimeHHMMss() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return (`${hours}:${minutes}:${seconds}`);
}


function getRandomNumber() {
    return Math.floor(Math.random() * 10000);    
}


function addRow(name, number, time) {
    const row = table.insertRow();
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = number;
    row.insertCell(2).innerHTML = time;
}


for (let i = 1; i <= maxRowsInTable; i++) {
    addRow('Name ' + i, '0.00', '-', '');
}


function refreshSeconds(rowIndex, cell) {
    
    let count = refreshPaceInFullSeconds;
    
    const secondIntervalId = setInterval(() => {
        count--;

        if (count <= 0) {
            table.rows[rowIndex].cells[cell].innerHTML = getTimeHHMMss();
            clearInterval(secondIntervalId);        
        }
        else {
            table.rows[rowIndex].cells[cell].innerHTML = 'Refresh: ' + count + 's'
        }

    }, 1000); //1 second interval.
}


function updateRow(rowIndex) {
    
    table.rows[rowIndex].cells[1].innerHTML = getRandomNumber();    

    if (rowIndex >= maxRowsInTable) {
        rowIndex = 0;
    }
    refreshSeconds(rowIndex + 1, 2); 
    onGoingRowNumber = rowIndex + 1;
}


function startMainInterval() {
    let currentRow = onGoingRowNumber;    
    mainIntervalId = setInterval(() => {
        updateRow(currentRow);
        currentRow++;
        
        if (currentRow > maxRowsInTable) {
            currentRow = 1;
        }
        
    }, refreshPaceInFullSeconds * 1000);
}


function stopMainInterval() {
    clearInterval(mainIntervalId);
}


function updateClock() {    
    document.getElementById('clock').textContent = getTimeHHMMss();
}


refreshSeconds(onGoingRowNumber, 2); //Page load starts countdown for first line in table.
updateClock(); //Page load starts clock from ->first<- second.
setInterval(updateClock, 1000); //Start Clock updates every second.
startMainInterval();


document.getElementById('counter-button').addEventListener('click', toggleCounter);


function toggleCounter() {
    if (mainCounterRunning == true) {
        stopMainInterval();
        document.getElementById('counter-button').textContent = 'START counter!'
        mainCounterRunning = false;
    } else {
        refreshSeconds(onGoingRowNumber, 2);
        startMainInterval();
        document.getElementById('counter-button').textContent = 'STOP counter!'
        mainCounterRunning = true;
    }
}

