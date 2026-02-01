const MINUTES_IN_DAY = 24 * 60;

const timeLine = document.createElement("hr");
timeLine.setAttribute("id", "timeLine");
timeLine.style.background = "rgba(0, 0, 0, 0.7)";
timeLine.style.border = "rgba(0, 0, 0, 0.7)";
timeLine.style.zIndex = 0;
timeLine.style.position = "absolute";
timeLine.style.width = "100%";
timeLine.style.height = "2px";

let loadBar = setInterval(function applyChanges() {
    const date = new Date();
    const data = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        day: date.getDay() + 1
    };
    if (data.day === 1 || data.day === 7) { clearInterval(loadBar); };
    const total_minutes = data.hour * 60 + data.minute + 7;
    // +7 because for some reason, the bar seems to be about 7 minutes off without it.
    let dayPercentage = total_minutes / MINUTES_IN_DAY * 100 - 1;
    
    if (document.getElementById("timeLine") !== null) {
        document.getElementById("timeLine").remove();
    }
    if (document.getElementById("day" + data.day) !== null) {
        timeLine.style.top = dayPercentage + "%";
        document.getElementById("day" + data.day).appendChild(timeLine);
    }
}, 1500);