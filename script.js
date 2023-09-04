// Function to update the countdown
function updateCountdown(targetTimes) {
    const now = new Date().getTime();

    // Find the closest target time in the array
    let closestTime = null;
    for (const time of targetTimes) {
        const targetTime = new Date();
        targetTime.setHours(time.hours, time.minutes, 0, 0);
        if (targetTime > now && (closestTime === null || targetTime < closestTime)) {
            closestTime = targetTime;
        }
    }

    if (closestTime === null) {
        // If all target times have passed, you can handle it here.
        document.getElementById("countdown-timer").innerHTML = "All events have ended";
        return;
    }

    const timeRemaining = closestTime - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}

// Define an array of target times
const targetTimes = [
    { hours: 8, minutes: 42 },
    { hours: 8, minutes: 45 },
    { hours: 15, minutes: 15 },
];

// Update the countdown every second
setInterval(function () {
    updateCountdown(targetTimes);
}, 1000);

// Initial call to display the countdown immediately
updateCountdown(targetTimes);
