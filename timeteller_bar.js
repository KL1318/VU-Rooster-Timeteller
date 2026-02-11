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
    timeLine.style.top = dayPercentage + "%";
    
    if (document.getElementById("timeLine")) {
        document.getElementById("timeLine").remove();
    }
    
    try {
        if (document.getElementsByClassName(`day-${data.day} wc-today`)[0].childNodes && data.day !== 2) {
            document.getElementsByClassName(`day-${data.day} wc-today`)[0].childNodes[0].appendChild(timeLine);
        } else if (document.getElementsByClassName(`day-${data.day} wc-today`)[1].childNodes && data.day === 2) {
            document.getElementsByClassName(`day-${data.day} wc-today`)[1].childNodes[0].appendChild(timeLine);
        }
    } catch(err) {} finally {
        if (!document.getElementById("timeLine")) { console.error("Couldn't find the elements to append the time bar to."); }
    }
}, 1500);