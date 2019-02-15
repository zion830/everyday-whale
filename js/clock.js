const clockContainer = document.querySelector(".clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    let hours = date.getHours();
    const seconds = date.getSeconds();
    let scope = 'AM';

    if (hours > 12) {
        hours = hours - 12;
        scope = 'PM';
    }

    clockTitle.innerText =
        `${
            hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds} ${scope}`
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();