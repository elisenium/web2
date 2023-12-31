import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const form = document.querySelector('form');
const linesInput = document.getElementById('lines');
const columnsInput = document.getElementById('columns');
const stringInput = document.getElementById('stringInput');
const tableWrapper = document.querySelector('#tableWrapper');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const expectedArray = createArray(linesInput.value, columnsInput.value, stringInput.value);
    const expectedHtmlTableAsString = createHtmlTableAsString(expectedArray);
    tableWrapper.innerHTML = expectedHtmlTableAsString;
});

function createArray(lineCount = 1, columnCount = 1, string = 'Cell') {
    const expectedArray = [];
    for (let x = 0; x < lineCount; x += 1) {
        expectedArray.push([]);
        for (let y = 0; y < columnCount; y += 1) {
            expectedArray[x].push(`${string}[${x}][${y}]`);
        }
    }
    return expectedArray;
}

function createHtmlTableAsString(expectedArray) {
    /* Neat way to loop through all data in the array, create a new array of string elements
    (HTML tr/td tags) with map(), and create one string from the resulting array with join('').
    '' means that the separator is a void string. */

    const htmlTableLinesAsString = expectedArray
        .map((line) => `<tr>${line.map((column) => `<td>${column}</td>`).join('')}</tr>`)
        .join('');

    const htmlTableAsString = `<table class="table table-bordered text-nowrap">
                          ${htmlTableLinesAsString}
                      </table>`;

    return htmlTableAsString;
}