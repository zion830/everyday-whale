function getDate() {
    const date = new Date();
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${date.getFullYear()}.${
        month < 10 ? `0${month}` : month}.${
        day < 10 ? `0${day}` : day} ${
        weeks[date.getDay()]}요일`
}

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    let hours = date.getHours();
    const seconds = date.getSeconds();
    let period = '<span class="datetime">오전</span>';

    if (hours >= 12) {
        hours = hours - 12;
        period = '<span class="datetime">오후</span>';
    }

    $(".clock>h1").html(
        `<span class="date"> ${getDate()} </span> <br>
        ${period} ${
            hours < 10 ? ((hours === 0) ? '12' : `0${hours}`) : hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`);
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();