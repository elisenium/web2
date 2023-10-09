
const msg = "This is the best moment to have a look at this website !";

const full_message = addDateTime(msg);
alert(full_message + ' : ' + msg);

function addDateTime(message) {
    const dateTimeNow = new Date();
    const date = dateTimeNow.toLocaleDateString();
    const time = dateTimeNow.toLocaleTimeString();
    return date + ' ' + time;
}