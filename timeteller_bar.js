const MINUTES_IN_DAY = 24 * 60;
let needsChecking = true;
let clearCurrentinterval = false;

const timeLine = document.createElement("hr");
timeLine.setAttribute("id", "timeLine");
timeLine.style.background = "rgba(0, 0, 0, 0.7)";
timeLine.style.border = "rgba(0, 0, 0, 0.7)";
timeLine.style.zIndex = 0.5;
timeLine.style.position = "absolute";
timeLine.style.width = "100%";
timeLine.style.height = "2px";

function getDateTimeInfo() {
    const date = new Date();
    const dateData = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        day: date.getDay() + 1
    };

    const total_minutes = dateData.hour * 60 + dateData.minute + 8;
    // +8 because for some reason, the bar seems to be about 8 minutes off without it.
    let dayPercentage = total_minutes / MINUTES_IN_DAY * 100 - 1;
    timeLine.style.top = String(dayPercentage) + "%";

    return dateData;
}

function addTimebar(dateData) {
    try {
        if (document.getElementById("timeLine")) { document.getElementById("timeLine").remove(); }

        if (document.getElementsByClassName(`day-${dateData.day} wc-today`)[0].childNodes && dateData.day !== 2) {
            document.getElementsByClassName(`day-${dateData.day} wc-today`)[0].childNodes[0].appendChild(timeLine);
        } else if (document.getElementsByClassName(`day-${dateData.day} wc-today`)[1].childNodes && dateData.day === 2) {
            document.getElementsByClassName(`day-${dateData.day} wc-today`)[1].childNodes[0].appendChild(timeLine);
        }
    } catch(err) {} finally {
        if (!document.getElementById("timeLine")) { console.error("Couldn't find the elements to append the time bar to."); }
    }
}

function createInterval() {
    // BUG: When createInterval() is called, the element apparently doesn't exist enough yet for the function to append the timebar to. Adding it to a setinterval it does make it work.
    const dateData = getDateTimeInfo();
    addTimebar(dateData);
    
    var loadBar = setInterval(function applyChanges() {
        if (clearCurrentinterval) {
            clearCurrentinterval = false;
            clearInterval(loadBar);
        }
        const dateData = getDateTimeInfo();
        addTimebar(dateData);
    }, 10000);
}

let bodyObserver = new MutationObserver((mutationList, observer) => {
    if (document.querySelector('.wc-today') && needsChecking) {
        // console.log("found today");
        needsChecking = false;
        clearCurrentinterval = false;
        createInterval();
    } else if (!document.querySelector('.wc-today')) {
        // console.log("Clearing interval");
        needsChecking = true;
        clearCurrentinterval = true;
    }
});

bodyObserver.observe(document.querySelector('body'), { attributes: false, childList: true, subtree: true });

const dateData = getDateTimeInfo();
if (dateData.day === 1 || dateData.day === 7) { bodyObserver.disconnect(); }