// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAlScuKIq6CFsEgnsejYs4MYz0tMoOOHI",
  authDomain: "sposad-b0f6f.firebaseapp.com",
  databaseURL: "https://sposad-b0f6f-default-rtdb.firebaseio.com",
  projectId: "sposad-b0f6f",
  storageBucket: "sposad-b0f6f.appspot.com",
  messagingSenderId: "573229265720",
  appId: "1:573229265720:web:a916c8b88a0983345907cd",
  measurementId: "G-ZPZMRXMMZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (location.hostname !== "localhost") {
  const analytics = getAnalytics(app);
}

// Export the database instance
export const database = getDatabase(app);
