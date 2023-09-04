// Function to update the countdown
function updateCountdown(endTime) {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    if (timeRemaining <= 0) {
        // If the event has already passed, you can handle it here.
        document.getElementById("countdown-timer").innerHTML = "Event has ended";
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}

// Define the target time (e.g., 09:00:00 for 9 AM)
const targetTime = new Date();
targetTime.setHours(9, 0, 0, 0);

// Update the countdown every second
setInterval(function () {
    updateCountdown(targetTime);
}, 1000);

// Initial call to display the countdown immediately
updateCountdown(targetTime);
