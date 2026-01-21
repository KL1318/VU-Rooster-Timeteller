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
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDay() + 1;
    let total_minutes = hours * 60 + minutes + 7;
    let dayPercentage = total_minutes / MINUTES_IN_DAY * 100 - 1;
    
    if (document.getElementById("timeLine") !== null) {
        document.getElementById("timeLine").remove();
    }
    if (document.getElementById("day" + day) !== null) {
        timeLine.style.top = dayPercentage + "%";
        document.getElementById("day" + day).appendChild(timeLine);
    }
}, 1500);