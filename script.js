// Function to update the countdown
function updateCountdown(targetTimes) {
    const now = new Date();
    const currentTime = now.getTime();

    // Find the closest target time in the array
    let closestTime = null;
    let foundToday = false;

    for (const time of targetTimes) {
        const targetTime = new Date(now);
        targetTime.setHours(time.hours, time.minutes, 0, 0);

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
        // If there are no more bells today and none scheduled for the future,
        // set the next event time to the first event of the next day
        const nextDay = new Date(now);
        nextDay.setDate(nextDay.getDate() + 1);
        closestTime = new Date(nextDay);
        closestTime.setHours(targetTimes[0].hours, targetTimes[0].minutes, 0, 0);
    }

    const timeRemaining = closestTime - currentTime;

    if (timeRemaining <= 0) {
        // If all target times have passed, you can handle it here.
        document.getElementById("countdown-timer").innerHTML = "All events have ended";
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
    { hours: 15, minutes: 15 },
];

// Update the countdown every second
setInterval(function () {
    updateCountdown(targetTimes);
}, 1000);

// Initial call to display the countdown immediately
updateCountdown(targetTimes);
