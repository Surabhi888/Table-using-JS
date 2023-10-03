document.addEventListener("DOMContentLoaded", () => {
    const tableContainer = document.getElementById("table-container");
    const addRowButton = document.getElementById("add-row");
    const addColumnButton = document.getElementById("add-column");
    const removeRowButton = document.getElementById("remove-row");
    const removeColumnButton = document.getElementById("remove-column");
    const copyButton = document.getElementById("copy-button");

    // Initial table data
    const initialRows = 3;
    const initialColumns = 3;

    // Generate initial table
    generateTable(initialRows, initialColumns);

    addRowButton.addEventListener("click", () => addRow());
    addColumnButton.addEventListener("click", () => addColumn());
    removeRowButton.addEventListener("click", () => removeRow());
    removeColumnButton.addEventListener("click", () => removeColumn());
    copyButton.addEventListener("click", () => copyTableHTML());

    // Function to generate a table with the given number of rows and columns
    function generateTable(rows, columns) {
        let tableHTML = "<table>";
        for (let i = 0; i < rows; i++) {
            tableHTML += "<tr>";
            for (let j = 0; j < columns; j++) {
                tableHTML += "<td contenteditable='true'></td>";
            }
            tableHTML += "</tr>";
        }
        tableHTML += "</table>";
        tableContainer.innerHTML = tableHTML;
    }

    // Function to add a row to the table
    function addRow() {
        const table = tableContainer.querySelector("table");
        const newRow = document.createElement("tr");
        const columns = table.rows[0].cells.length;

        for (let i = 0; i < columns; i++) {
            const newCell = document.createElement("td");
            newCell.contentEditable = true;
            newRow.appendChild(newCell);
        }

        table.appendChild(newRow);
    }

    // Function to add a column to the table
    function addColumn() {
        const table = tableContainer.querySelector("table");
        const rows = table.rows;

        for (let i = 0; i < rows.length; i++) {
            const newCell = document.createElement("td");
            newCell.contentEditable = true;
            rows[i].appendChild(newCell);
        }
    }

    // Function to remove a row from the table
    function removeRow() {
        const table = tableContainer.querySelector("table");
        const rows = table.rows;
        if (rows.length > 1) {
            table.deleteRow(rows.length - 1);
        }
    }

    // Function to remove a column from the table
    function removeColumn() {
        const table = tableContainer.querySelector("table");
        const rows = table.rows;
        const columns = rows[0].cells;
        if (columns.length > 1) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].deleteCell(columns.length - 1);
            }
        }
    }

    // Function to copy the table HTML code to the clipboard
    function copyTableHTML() {
        const table = tableContainer.querySelector("table");

        // Create a clone of the table to avoid modifying the original table
        const clonedTable = table.cloneNode(true);

        // Remove unwanted attributes from clonedTable
        removeUnwantedAttributes(clonedTable);

        // Get the HTML code of the cleaned table
        const tableHTML = clonedTable.outerHTML;

        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = tableHTML;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);

        alert("Table HTML code copied to clipboard!");
    }

    // Function to remove specific attributes from a table
    function removeUnwantedAttributes(table) {
        const cells = table.getElementsByTagName("td");

        // Loop through all <td> elements and remove unwanted attributes
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("data-gramm");
            cells[i].removeAttribute("wt-ignore-input");
            cells[i].removeAttribute("contenteditable");
        }
    }
});