// Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; 
// 👆 In local dev, you can still use localhost if VITE_API_BASE_URL isn’t set

// ---------------- User side ----------------

// Example test route
export async function getHello() {
  const res = await fetch(`${API_URL}/api/hello`);
  return res.json();
}

// Get all foods (for food page)
export async function getFoods() {
  const res = await fetch(`${API_URL}/api/foods`);
  return res.json();
}

// Create a stationery order
export async function createStationeryOrder(orderData) {
  const payload = {
    userId: localStorage.getItem("userId") || "guest",
    ...orderData, // 👈 this will now include items[]
  };

  const res = await fetch(`${API_URL}/api/stationery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Create a movie booking
export async function createMovieOrder(orderData) {
  const res = await fetch(`${API_URL}/api/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

// Create a gym booking
export async function createGymBooking(orderData) {
  const res = await fetch(`${API_URL}/api/gym`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

// Create a hall booking
export async function createHallBooking(orderData) {
  const res = await fetch(`${API_URL}/api/hall`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

// Create a salon booking
export async function createSalonBooking(orderData) {
  const res = await fetch(`${API_URL}/api/salon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

// ---------------- Admin side ----------------

export async function getAllCateringOrders() {
  const res = await fetch(`${API_URL}/api/admin/catering`);
  return res.json();
}

export async function getAllStationeryOrders() {
  const res = await fetch(`${API_URL}/api/admin/stationery`);
  return res.json();
}

export async function getAllMovieBookings() {
  const res = await fetch(`${API_URL}/api/admin/movies`);
  return res.json();
}

export async function getAllGymBookings() {
  const res = await fetch(`${API_URL}/api/admin/gym`);
  return res.json();
}

export async function getAllHallBookings() {
  const res = await fetch(`${API_URL}/api/admin/hall`);
  return res.json();
}

export async function getAllSalonBookings() {
  const res = await fetch(`${API_URL}/api/admin/salon`);
  return res.json();
}

export async function updateOrderStatus(section, orderId, status) {
  const res = await fetch(`${API_URL}/api/admin/${section}/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
