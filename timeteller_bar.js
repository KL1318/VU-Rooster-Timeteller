const MINUTES_IN_DAY = 24 * 60;

const timeLine = document.createElement("hr");
timeLine.setAttribute("id", "timeLine");
timeLine.style.background = "rgba(0, 0, 0, 0.7)";
timeLine.style.border = "rgba(0, 0, 0, 0.7)";
timeLine.style.zIndex = 10;
timeLine.style.position = "absolute";
timeLine.style.width = "100%";
timeLine.style.height = "2px";

let loadBar = setInterval(function applyChanges() {
    const date = new Date("February 2, 2026 18:13:00");
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
    
    if (document.getElementById("timeLine") !== null) {
        document.getElementById("timeLine").remove();
    }
    if (document.getElementById("day" + data.day) !== null && data.day !== 2) {
        document.getElementById("day" + data.day).appendChild(timeLine);
    } else if (data.day === 2) {
        // Extra code for on mondays, as the VU Rooster website contains an invisible copy of the schedule table that only contains the column for mondays
        if (document.querySelectorAll("td.wc-day-column div#day2")[1] !== null) {
            document.querySelectorAll("td.wc-day-column div#day2")[1].appendChild(timeLine);
        } else {
            document.querySelectorAll("td.wc-day-column div#day2")[0].appendChild(timeLine);
        }
    }
}, 1500);