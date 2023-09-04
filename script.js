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

// Function to update the countdown
function updateCountdown(targetTimes, skipDates) {
    const now = new Date();
    const currentTime = now.getTime();

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

        if (targetTime > now && (closestTime === null || targetTime < closestTime)) {
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
        // If all target times have passed, you can handle it here.
        document.getElementById("countdown-timer").innerHTML = "All weekday events have ended";
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

    // Update the next event time
    const nextEventTime = closestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("next-event-time").innerText = nextEventTime;
}


// Define an array of dates to skip (in YYYY-MM-DD format)
const skipDates = ["2023-09-07", "2023-09-08"]; // Add dates to be skipped here

// Update the countdown every second
setInterval(function () {
    updateCountdown(targetTimes, skipDates);
}, 1000);

// Initial call to display the countdown immediately
updateCountdown(targetTimes, skipDates);
