// 1. Basic setup
console.log("Welcome to the Community Portal");

window.addEventListener('load', () => {
  alert("Page fully loaded! Welcome to the Community Portal");
});

// 2. Event info variables
const eventName = "Community Cleanup";
const eventDate = "2025-06-15";
let availableSeats = 30;
console.log(`Event: ${eventName}, Date: ${eventDate}, Seats: ${availableSeats}`);

// 3. Sample events array
const events = [
  { id: 1, name: "Community Cleanup", date: "2025-06-15", category: "Environment", location: "Park", seats: 30 },
  { id: 2, name: "Music Fest", date: "2024-12-10", category: "Music", location: "City Hall", seats: 0 },
  { id: 3, name: "Art Workshop", date: "2025-07-20", category: "Art", location: "Library", seats: 10 },
];

// Helper: Check if event is upcoming and has seats
const isEventAvailable = (event) => {
  const today = new Date();
  const eventDay = new Date(event.date);
  return eventDay >= today && event.seats > 0;
};

// 4. Functions

// Add a new event
const addEvent = (newEvent) => {
  events.push(newEvent);
  renderEvents();
};

// Closure to track total registrations by category
const registrationCounter = () => {
  const counts = {};
  return (category) => {
    counts[category] = (counts[category] || 0) + 1;
    return counts[category];
  };
};
const countRegistration = registrationCounter();

// Register user for an event with error handling
const registerUser = (eventId) => {
  try {
    const event = events.find(e => e.id === eventId);
    if (!event) throw new Error("Event not found");
    if (event.seats <= 0) throw new Error("No seats available");
    
    event.seats--;
    const total = countRegistration(event.category);
    alert(`Registered for "${event.name}". Total registrations in ${event.category}: ${total}`);
    renderEvents();
  } catch (error) {
    alert(error.message);
  }
};

// Filter events by category (callback)
const filterEventsByCategory = (category, callback) => {
  const filtered = category === "all" ? events : events.filter(e => e.category === category);
  callback(filtered);
};

// 5. Event object class
class Event {
  constructor(id, name, date, category, location, seats) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.category = category;
    this.location = location;
    this.seats = seats;
  }

  checkAvailability() {
    return this.seats > 0 && new Date(this.date) >= new Date();
  }
}

// 6. Array methods
// Show only music events
const musicEvents = events.filter(e => e.category === "Music");

// Format event names
const eventCards = events.map(e => `${e.name} on ${e.date}`);

// 7. DOM manipulation

const eventContainer = document.querySelector("#events");

function renderEvents(filteredEvents = events) {
  eventContainer.innerHTML = "";

  filteredEvents.forEach(({id, name, date, category, location, seats}) => {
    if (!isEventAvailable({date, seats})) return;

    const card = document.createElement("div");
    card.className = "eventCard";

    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Seats left:</strong> ${seats}</p>
      <button onclick="registerUser(${id})" ${seats === 0 ? "disabled" : ""}>Register</button>
    `;

    eventContainer.appendChild(card);
  });
}

// 8. Event Handling

// Filter dropdown change handler
document.querySelector("#categoryFilter").addEventListener("change", (e) => {
  const category = e.target.value;
  filterEventsByCategory(category, renderEvents);
});

// Quick search by name
document.querySelector("#searchInput").addEventListener("keydown", (e) => {
  const query = e.target.value.toLowerCase();

  const filtered = events.filter(e => e.name.toLowerCase().includes(query) && isEventAvailable(e));
  renderEvents(filtered);
});

// Initial render
renderEvents();

// 9. Async JS - Fetch mock events from API (simulated)
async function fetchEvents() {
  const spinner = document.querySelector("#loadingSpinner");
  spinner.style.display = "block";

  try {
    const response = await fetch("https://mockapi.io/projects/123/events"); // Mock URL
    if (!response.ok) throw new Error("Failed to fetch events");
    const data = await response.json();

    // Add fetched events to local events list
    data.forEach(ev => addEvent(new Event(ev.id, ev.name, ev.date, ev.category, ev.location, ev.seats)));
  } catch (error) {
    console.error(error);
    alert("Error loading events");
  } finally {
    spinner.style.display = "none";
  }
}

// Uncomment to test fetchEvents()
// fetchEvents();

// 10. Modern JS Features already used: let, const, template literals, arrow functions, destructuring, classes

// 11. Working with form submission
const form = document.querySelector("#registrationForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const selectedEventId = parseInt(form.elements["eventSelect"].value);

  if (!name || !email || !selectedEventId) {
    alert("Please fill all fields correctly.");
    return;
  }

  registerUser(selectedEventId);
  form.reset();
});

// 12. AJAX & Fetch API simulation - sending registration data
function sendRegistration(data) {
  const message = document.querySelector("#message");
  message.textContent = "Submitting registration...";

  setTimeout(() => {
    fetch("https://mockapi.io/projects/123/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(() => {
        message.textContent = "Registration successful!";
      })
      .catch(() => {
        message.textContent = "Failed to register. Please try again.";
      });
  }, 1500);
}

// 13. Debugging is supported via console and devtools

// 14. jQuery example (assuming jQuery is loaded)
if (window.jQuery) {
  $("#registerBtn").click(() => {
    $(".eventCard").fadeOut(500).fadeIn(500);
  });
}

// Benefit of frameworks: easier state management, reusable components, better maintainability
