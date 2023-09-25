// Function to show admin controls when the correct password is entered
document.getElementById("show-admin-buttons").addEventListener("click", function () {
    const password = document.getElementById("admin-password").value;
    if (password === "ILoveSchool") {
        document.getElementById("admin-buttons").style.display = "block";
    }
});

// Function to update the countdown with a custom lag time
function updateCountdown(targetTimes, skipDates, lagMilliseconds) {
    const now = new Date();
    const currentTime = now.getTime() - lagMilliseconds; // Subtract lag time from current time
}

// Initialize a default lag time in milliseconds (10 seconds)
let lagMilliseconds = 46000; // 1000 milliseconds = 1 second

// Function to check if a date is a weekend (Saturday or Sunday)
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Function to check if a date should be skipped based on a list of skipDates
function shouldSkipDate(date, skipDates) {
    const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD
    return skipDates.includes(dateString);
}

// Function to update the countdown with a custom lag time
function updateCountdown(targetTimes, skipDates) {
    const now = new Date();
    const currentTime = now.getTime() - lagMilliseconds; // Subtract lag time from current time

    // Find the closest target time on weekdays
    let closestTime = null;
    let foundToday = false;

    for (const time of targetTimes) {
        const targetTime = new Date(now);
        targetTime.setHours(time.hours, time.minutes, 0, 0);

        // Skip weekends
        if (isWeekend(targetTime)) {
            continue;
        }

        if (shouldSkipDate(targetTime, skipDates)) {
            continue;
        }

        if (targetTime < now) {
            // If the target time is in the past, move it to the next day
            targetTime.setDate(targetTime.getDate() + 1);
        }

        if (closestTime === null || targetTime < closestTime) {
            closestTime = targetTime;
            foundToday = true;
        }
    }

    if (!foundToday && closestTime === null) {
        // If there are no more bells on weekdays today and none scheduled for the future,
        // find the first event on the next weekday
        let nextDay = new Date(now);
        while (true) {
            nextDay.setDate(nextDay.getDate() + 1);
            if (!isWeekend(nextDay) && !shouldSkipDate(nextDay, skipDates)) {
                break;
            }
        }
        closestTime = new Date(nextDay);
        closestTime.setHours(targetTimes[0].hours, targetTimes[0].minutes, 0, 0);
    }

    const timeRemaining = closestTime - currentTime;

    if (timeRemaining <= 0) {
        // If all target times have passed or all are on skipped days, you can handle it here.
        document.getElementById("countdown-timer").innerHTML = "No upcoming events";
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the countdown values
    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");

    // Update the next event time and date in the countdown label
    const nextEventTime = closestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nextEventDate = closestTime.toLocaleDateString();
    document.getElementById("next-event-label").innerText = `Until ${nextEventTime} bell on ${nextEventDate}`;
}

// Function to add 1 second to the lag time
document.getElementById("add-lag").addEventListener("click", function () {
    lagMilliseconds += 1000; // Add 1 second (1000 milliseconds) to the lag time
    updateCountdown(targetTimes, skipDates); // Update the countdown immediately
    applyLagTime()
});

// Function to subtract 1 second to the lag time
document.getElementById("subtract-lag").addEventListener("click", function () {
    lagMilliseconds -= 1000; // Subtract 1 second (1000 milliseconds) from lagMilliseconds
    updateCountdown(targetTimes, skipDates); // Update the countdown with the new lag time
    applyLagTime()
});

// Function to update the current time
function updateCurrentTime() {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 1);
    const currentTimeString = now.toLocaleTimeString();
    document.getElementById("current-clock").textContent = currentTimeString;
}

// Function to update the current time
function updateCurrentSchoolTime() {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 1 - 46);
    const currentSchoolTimeString = now.toLocaleTimeString();
    document.getElementById("current-school-clock").textContent = currentSchoolTimeString;
}

// Define an array of target times
const targetTimes = [
    { hours: 8, minutes: 45 },
    { hours: 9, minutes: 10 },
    { hours: 10, minutes: 10 },
    { hours: 11, minutes: 10 },
    { hours: 11, minutes: 30 },
    { hours: 12, minutes: 30 },
    { hours: 13, minutes: 15 },
    { hours: 14, minutes: 15 },
    { hours: 15, minutes: 15 }
];

// Define an array of dates to skip (in YYYY-MM-DD format)
const skipDates = ["2023-09-04"]; // Add dates to be skipped here

// Update the current time immediately and every second
updateCurrentTime(); // Call the function once to display the current time immediately
setInterval(updateCurrentTime, 1000); // Update the current time every second
updateCurrentSchoolTime(); // Call the function once to display the current time immediately
setInterval(updateCurrentSchoolTime, 1000); // Update the current time every second


// Update the countdown every second
setInterval(function () {
    updateCountdown(targetTimes, skipDates);
}, 1000);

// Initial call to display the countdown immediately
updateCountdown(targetTimes, skipDates);
