const btn = document.querySelector('#btn');

const expectedCount = 10;
let count = 0;
let timeoutID;
let startTime;

const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;

btn.addEventListener('onmouseover', start());
btn.addEventListener('click', clickHandler);

function start() {
    startTime = new Date();
    timeoutID = setTimeout(gameOver, delayInMiliSeconds);
}

function clickHandler() {
    count++;
    if (parseInt(count) === expectedCount) {
        clearTimeout(timeoutID);
        win();
    }
}

function win() {
    const spentTime = new Date().getTime() - startTime.getTime();
    alert(`You win ! You clicked ${expectedCount} times within ${spentTime} ms`);
}

function gameOver() {
    // const spentTime = new Date().getTime() - startTime.getTime();
    alert(`Game over, you did not click ${expectedCount} times within ${delayInSeconds}s !
    You clicked ${count} times`);
}