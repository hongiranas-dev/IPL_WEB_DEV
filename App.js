/* =====================================================
   IPL 2026 Ticket Booking - app.js
   Activity 4: toast notifications + smooth scrolling
   ===================================================== */


/* ---------- 1. TOAST NOTIFICATION ----------
   A "toast" is a small message that pops up for a few seconds
   and then disappears by itself.

   showToast() is reusable - we can call it from anywhere:
     showToast("Booking confirmed!");
     showToast("Please fill in all fields", 5000);
   The second value is optional: how long to show it (in milliseconds). */
function showToast(message, duration = 3000) {

  // If an old toast is still on the screen, remove it first
  // so toasts don't pile up on top of each other
  const oldToast = document.querySelector(".toast");
  if (oldToast) {
    oldToast.remove();
  }

  // Create a brand new <div> for the toast and put the message inside it
  const toast = document.createElement("div");
  toast.className = "toast";        // the CSS in styles.css styles this class
  toast.textContent = message;

  // Add the toast to the page (inside <body>)
  document.body.appendChild(toast);

  // Wait a tiny moment, then add the "show" class.
  // This makes the CSS fade-in animation play.
  setTimeout(function () {
    toast.classList.add("show");
  }, 50);

  // After the chosen time, fade the toast out...
  setTimeout(function () {
    toast.classList.remove("show");
  }, duration);

  // ...and once the fade-out is finished (0.3s), remove it from the page
  setTimeout(function () {
    toast.remove();
  }, duration + 400);
}


/* ---------- 2. SMOOTH SCROLLING FROM THE BOOK BUTTONS ----------
   When someone clicks "Book" in the match schedule, we want to:
     1. scroll down smoothly to the booking form
     2. show a toast message to confirm which match they picked */

// Grab every Book button inside the schedule table
const bookButtons = document.querySelectorAll("#matches td button");

// The booking form section and the match dropdown we want to scroll to / fill
const bookingSection = document.getElementById("booking");
const matchDropdown = document.getElementById("match");

// Go through each Book button one by one
bookButtons.forEach(function (button) {

  // Run this code every time that button is clicked
  button.addEventListener("click", function (event) {

    // The button sits inside a link (<a href="#booking">), which would
    // normally jump straight to the form. We stop that sudden jump
    // so we can scroll smoothly instead.
    event.preventDefault();

    // Find the table row (<tr>) this button belongs to
    const row = button.closest("tr");

    // Read the match number and team names from that row's cells
    const matchNumber = row.cells[0].textContent;   // e.g. "1"
    const teams = row.cells[1].textContent;         // e.g. "CSK vs MI"

    // Pre-select the same match in the booking form's dropdown
    // (the option values in the HTML are the match numbers)
    matchDropdown.value = matchNumber;

    // Scroll smoothly to the booking form
    bookingSection.scrollIntoView({ behavior: "smooth" });

    // Show a confirmation toast
    showToast("Match " + matchNumber + " (" + teams + ") selected. Fill in your details below.");
  });
});