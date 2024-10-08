import { database } from '../firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
const currentIndexElement = document.getElementById("currentIndex");

const quizStateRef = ref(database, "visual/currentIndex");
onValue(quizStateRef, (snapshot) => {
  if (snapshot.exists()) {
    const currentIndex = snapshot.val();
    currentIndexElement.textContent = currentIndex;
  } else {
    currentIndexElement.textContent = "No data available";
  }
}, (error) => {
  console.error("Error fetching data: ", error);
});
