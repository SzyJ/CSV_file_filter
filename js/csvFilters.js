function checkFilter(value, header) {
    if (!filters.hasOwnProperty(header)) {
        return true;
    }

    var headerFilters = filters[header];
    for (var filterIndx = 0; filterIndx < headerFilters.length; ++filterIndx) {
        var regEx = new RegExp(headerFilters[filterIndx]);

        if (regEx.test(value)) {
            return true;
        }
    }
    
    return false;
}

function createCSV(csvValue) {
    const FILENAME = "filtered.csv";
    var blob = new Blob([csvValue], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, FILENAME);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", FILENAME);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function parseRows(allRows) {
    if (allRows.length < 1) {
        alert("Empty file received.");
        return;
    }

    const DELIMITER = ",";
    const NEW_LINE = "\n";

    var filteredCSV = allRows[0] + NEW_LINE;

    var headerRow = allRows[0].trim().split(DELIMITER);

    for (var rowIndx = 1; rowIndx < allRows.length; ++rowIndx) {
        var items = allRows[rowIndx].trim().split(DELIMITER);
        var printRow = true;

        for (var itemIndx = 0; itemIndx < items.length; ++itemIndx) {
            var thisHeader = headerRow[itemIndx];
            var thisValue = items[itemIndx];

            if (!checkFilter(thisValue, thisHeader)) {
                printRow = false;
                break;        
            }
        }

        if (printRow) {
            filteredCSV += allRows[rowIndx] + NEW_LINE;
        }
        
    }

    createCSV(filteredCSV);
}

function printCSV() {
    var selectedFile = document.getElementById("selector").files[0]; 

    console.log(selectedFile);
    var fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');

    fileReader.onload = readerEvent => {
        var csvVal = readerEvent.target.result;
        parseRows(csvVal.split("\n"));
    }
}


