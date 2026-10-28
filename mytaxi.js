
const vehicles = {
  bike: {
    name: "Bike",
    baseFare: 20,
    perKm: 8,
    perMinute: 0.6
  },
  auto: {
    name: "Auto",
    baseFare: 30,
    perKm: 12,
    perMinute: 1.2
  },
  cab: {
    name: "Cab",
    baseFare: 60,
    perKm: 20,
    perMinute: 2
  }
};

// Demo values. These are NOT live route data.
const demoTrip = {
  distanceKm: 5.2,
  durationMinutes: 18
};

let selectedVehicle = "bike";

const form = document.getElementById("bookingForm");
const pickupInput = document.getElementById("pickup");
const destinationInput = document.getElementById("destination");
const fareElement = document.getElementById("fare");
const distanceElement = document.getElementById("tripDistance");
const messageElement = document.getElementById("message");
const bookButton = document.getElementById("bookBtn");

function calculateFare(vehicleKey) {
  const vehicle = vehicles[vehicleKey];

  const fare =
    vehicle.baseFare +
    demoTrip.distanceKm * vehicle.perKm +
    demoTrip.durationMinutes * vehicle.perMinute;

  return Math.round(fare);
}

function formatRupees(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function updatePrices() {
  document.getElementById("bikePrice").textContent =
    formatRupees(calculateFare("bike"));

  document.getElementById("autoPrice").textContent =
    formatRupees(calculateFare("auto"));

  document.getElementById("cabPrice").textContent =
    formatRupees(calculateFare("cab"));

  fareElement.textContent =
    formatRupees(calculateFare(selectedVehicle));

  distanceElement.textContent =
    `${demoTrip.distanceKm} km · ${demoTrip.durationMinutes} min`;
}

function showMessage(text, type) {
  messageElement.textContent = text;
  messageElement.className = `message visible ${type}`;
}

function clearMessage() {
  messageElement.textContent = "";
  messageElement.className = "message";
}

// Select Bike, Auto, or Cab.
document.querySelectorAll(".vehicle").forEach((button) => {
  button.addEventListener("click", () => {
    selectedVehicle = button.dataset.vehicle;

    document.querySelectorAll(".vehicle").forEach((item) => {
      const isSelected = item === button;

      item.classList.toggle("selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    updatePrices();
    clearMessage();
  });
});

// Validate the form and simulate a booking.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();

  const pickup = pickupInput.value.trim();
  const destination = destinationInput.value.trim();

  if (!pickup || !destination) {
    showMessage(
      "Please enter both pickup and destination.",
      "error"
    );
    return;
  }

  if (pickup.toLowerCase() === destination.toLowerCase()) {
    showMessage(
      "Pickup and destination must be different.",
      "error"
    );
    return;
  }

  const rideId = "ZR" + Date.now().toString().slice(-8);
  const fare = calculateFare(selectedVehicle);
  const vehicleName = vehicles[selectedVehicle].name;

  showMessage(
    `Demo booking created! ID: ${rideId}. ` +
    `${vehicleName} ride from ${pickup} to ${destination}. ` +
    `Estimated fare: ${formatRupees(fare)}. ` +
    `No real driver has been assigned.`,
    "success"
  );

  bookButton.innerHTML = "Demo booking created ✓";
});

document.getElementById("helpBtn").addEventListener("click", () => {
  showMessage(
    "This is a demo website. Real customer support will be added later.",
    "success"
  );

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Display initial fare estimates.
updatePrices();