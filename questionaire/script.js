import { database } from "../firebase.js";
import {
  ref,
  set,
  update,
  push,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

updateDatabaseIndex(0);

// Swiper setup
const swiper = new Swiper("#quiz-container", {
  allowTouchMove: false, // Disable swiping
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    slideChange: function() {
      const currentIndex = swiper.activeIndex;
      updateDatabaseIndex(currentIndex + 1);

      if (currentIndex === 5) {
        startAutoSlideTimer();
      }
    },
  },
});

function randomizeVideo() {
  // Create an array of video filenames
  const videoFiles = [
    "../../assets/wave-01.webm",
    "../../assets/wave-02.webm",
    "../../assets/wave-03.webm",
    "../../assets/wave-04.webm",
    "../../assets/wave-05.webm",
    "../../assets/wave-06.webm",
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * videoFiles.length);

  // Get the video element
  const videoElement = document.getElementById("wave-video");

  // Set the video source to the random video
  videoElement.src = videoFiles[randomIndex];

  // Load the new video
  videoElement.load();
}

function startAutoSlideTimer() {
  setTimeout(() => {
    swiper.slideNext();
    gsap
      .timeline()
      .to("#final h2", {
        opacity: 1,
        y: 0, // start below the screen
        duration: 1,
        ease: "power2.out",
      })
      .to(
        "#final p",
        {
          opacity: 1,
          y: 0, // start below the screen
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      ) // Overlap with h2 animation
      .to(
        "#final .big-btn",
        {
          opacity: 1,
          y: 50,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      ); // Animate button with slight overlap
  }, 5000);
}

function updateDatabaseIndex(currentIndex) {
  const quizStateRef = ref(database, databaseIndex);
  set(quizStateRef, {
    currentIndex: currentIndex,
  })
    .then(() => {
      console.log("currentIndex set successfully!");
    })
    .catch((error) => {
      console.error("Error setting currentIndex: ", error);
    });
}

function updateDatabaseAnswer(ans) {
  const quizStateRef = ref(database, databaseIndex);
  update(quizStateRef, {
    answers: ans,
  })
    .then(() => {
      console.log("Ans updated successfully!");
    })
    .catch((error) => {
      console.error("Error setting currentIndex: ", error);
    });
}

function pushNewAnswer(ans) {
  const ansRef = ref(database, `answersSaved`); // Reference to the 'answers' node

  push(ansRef, ans) // Push a new object to 'answers'
    .then(() => {
      console.log("Answer added successfully!");
    })
    .catch((error) => {
      console.error("Error adding answer: ", error);
    });

  console.log("pushed!");
}

const selectElements = document.querySelectorAll("select");
selectElements.forEach((select, index) => {
  select.addEventListener("change", function() {
    if (this.value) {
      swiper.slideNext();
    }
  });
});

// end
document.getElementById("submit").addEventListener("click", function() {
  swiper.slideNext();
  updateDatabaseIndex(6);

  const answers = {
    city: document.getElementById("answer1").value, // 問題1: 縣市
    age: document.getElementById("answer2").value, // 問題2: 年齡
    group: document.getElementById("answer3").value, // 問題3: 組別
    country: document.getElementById("answer4").value, // 問題4: 留學國家
    message: document.getElementById("answer5").value, // 問題5: 想分享的話
  };

  pushNewAnswer(answers);
  updateDatabaseAnswer(answers);
});

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

// start
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-container").style.opacity = "0";
  document.getElementById("start-container").style.pointerEvents = "none";
  document.getElementById("quiz-container").style.opacity = "1";
  document.getElementById("wave-logo").classList.add("scaleDown");
  updateDatabaseIndex(1);
});

document.getElementById("answer2").oninput = function() {
  document.getElementById("ageLabel").textContent = this.value + " 歲";
};

const nextButtons = document.querySelectorAll("button.next");

// Loop through each button and add an event listener
nextButtons.forEach((button) => {
  button.addEventListener("click", nextSlide);
});

function nextSlide() {
  swiper.slideNext();
}

// 當網頁加載完成時
window.onload = () => {
  document.getElementById("quiz-container").style.opacity = "0";
  randomizeVideo();
  gsap
    .timeline()
    .to("#wave-logo", {
      duration: 1.5,
      opacity: 1,
      y: 0, // Reset the Y position
      ease: "power2.out",
    })
    .to(
      "#start-container",
      {
        duration: 1.5,
        opacity: 1,
        y: 0, // Reset the Y position
        ease: "power2.out",
      },
      "-=0.5"
    ) // Overlap animations slightly
    .to(
      ".big-btn",
      {
        duration: 1.5,
        opacity: 1,
        y: 0, // Reset the Y position
        ease: "power2.out",
      },
      "-=0.5"
    ); // Animate button
};
