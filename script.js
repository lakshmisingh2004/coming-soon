// ------------------ Countdown Timer ------------------
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Check if launch date already saved in localStorage
let launchDate = localStorage.getItem("launchDate");

if (!launchDate) {
  // Set new launch date = 7 days from now
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 7);
  launchDate = newDate.getTime();
  localStorage.setItem("launchDate", launchDate);
} else {
  // Convert back to number (timestamp)
  launchDate = parseInt(launchDate, 10);
}

function updateTimer() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance <= 0) {
    document.getElementById("timer").innerHTML = "We’re Live!";
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// ------------------ LocalStorage Form ------------------
const form = document.getElementById("notifyForm");
const emailInput = document.getElementById("email");
const savedMessage = document.getElementById("savedMessage");

// Check if email already saved
const savedEmail = localStorage.getItem("userEmail");
if (savedEmail) {
  savedMessage.textContent = `You’re already registered with: ${savedEmail}`;
  form.style.display = "none";
}

// Save email on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email) {
    localStorage.setItem("userEmail", email);
    savedMessage.textContent = `Thank you! We'll notify you at ${email}`;
    form.reset();
    form.style.display = "none";
  }
});
