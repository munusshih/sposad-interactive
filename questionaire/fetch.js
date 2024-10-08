import { database } from "../firebase.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

function setupSlides(
  slideElementIds,
  currentIndexElementId,
  databasePath
) {
  const currentIndexElement = document.getElementById(currentIndexElementId);
  const gifElement = document.getElementById('gif-element');
  let lastIndex = null; // To store the previous index

  // HTML elements for the slides
  const slides = slideElementIds.reduce((acc, id, index) => {
    acc[index] = document.getElementById(id);
    return acc;
  }, {});

  // Reference to the database paths
  const quizStateRef = ref(database, `${databasePath}/currentIndex`);
  const answersRef = ref(database, `${databasePath}/answers`);
  let answers = [];

  onValue(
    quizStateRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const currentIndex = snapshot.val();
        currentIndexElement.textContent = currentIndex;

        if (lastIndex === 7 && currentIndex === 0) {
          // Pause and show GIF for 30 seconds when going from slide 7 to 0
          pauseAndShowGif(() => {
            showSlide(0); // Show slide 0 after the GIF
          });
        } else {
          hideAllSlides();
          if (slides[currentIndex]) {
            slides[currentIndex].style.opacity = "1";
          } else {
            slides.default.style.opacity = "1";
          }
        }

        lastIndex = currentIndex; // Update lastIndex
      } else {
        currentIndexElement.textContent = "No data available";
        hideAllSlides();
        slides.default.style.opacity = "1";
      }
    },
    (error) => {
      console.error("Error fetching data: ", error);
    }
  );

  onValue(
    answersRef,
    (snapshot) => {
      if (snapshot.exists()) {
        answers = snapshot.val(); // Store fetched answers in the global variable
        console.log("Fetched answers: ", answers);
        window.answers = answers;
      } else {
        console.error("No data available in " + answersRef.toString());
      }
    },
    (error) => {
      console.error("Error fetching data: ", error);
    }
  );

  function hideAllSlides() {
    Object.values(slides).forEach((slide) => {
      if (!slide) return;
      slide.style.opacity = "0";
    });
  }

  function pauseAndShowGif(callback) {
    // Show the GIF
    gifElement.style.display = "flex";

    // Hide all slides
    hideAllSlides();

    // After 30 seconds, hide the GIF and call the callback
    setTimeout(() => {
      gifElement.style.display = "none";
      callback();
    }, 2000); // 30 seconds delay
  }

  function showSlide(index) {
    if (slides[index]) {
      slides[index].style.opacity = "1";
    }
  }

  return { answers }; // Return answers for use elsewhere if needed
}

export { setupSlides };
