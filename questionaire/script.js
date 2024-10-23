import { database } from "../firebase.js";
import {
  ref,
  set,
  update,
  push,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

updateDatabaseIndex(0);

let params = {
  text: "造浪者 WAVE MAKER",
  frequency: 5,
  amplitude: 100,
  phase: 0,
  dutyCycle: 0.9,
  symmetry: 0.5,
  phase2: 0,
  phase3: 0,
  textSize: 20,
  amplitudeMod: 0.5,
  frequencyMod: 0,
  yesBackground: true,
  waveType: "Sawtooth",
  city: "台北市",
  country: "台灣",
  offsetX: 10,
  offsetY: 20,
  rotate: 0,
  staggerX: 10,
  staggerY: 10,
  num: 10,
  overallX: 0,
  overallY: 0,
  squareYes: true,
  foregroundColor: "#000000",
  backgroundColor: "#000000",
  howManyColors: 1,
  squareColor: "#AA77DD",
  secondColor: "#ff0000",
  thirdColor: "#ffff00",
  forthColor: "#00ff00",
  fifthColor: "#0000ff",
};

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
  console.log(ans);
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

function hideStartingOver() {
  document.getElementById("starting-over").style.display = "none";
}

document.getElementById("starting-over").addEventListener("click", () => {
  location.reload();
} );

// end
document.getElementById("submit").addEventListener("click", function() {
  hideStartingOver();
  swiper.slideNext();
  updateDatabaseIndex(6);
  randomizeParams();
  generateRandomColors();

  const answers = {
    city: document.getElementById("answer1").value, // 問題1: 縣市
    age: document.getElementById("answer2").value, // 問題2: 年齡
    group: document.getElementById("answer3").value, // 問題3: 組別
    country: document.getElementById("answer4").value, // 問題4: 留學國家
    message: document.getElementById("answer5").value, // 問題5: 想分享的話
    foregroundColor: params.foregroundColor,
    backgroundColor: params.backgroundColor,
    squareColor: params.squareColor,
    secondColor: params.secondColor,
    thirdColor: params.thirdColor,
    forthColor: params.forthColor,
    fifthColor: params.fifthColor,
    frequency: params.frequency,
    amplitude: params.amplitude,
    rotate: params.rotate,
    offsetX: params.offsetX,
    offsetY: params.offsetY,
    textSize: params.textSize,
    howManyColors: params.howManyColors,
    num: params.num,
    overallX: params.overallX,
    overallY: params.overallY,
  };

  pushNewAnswer(answers);
  updateDatabaseAnswer(answers);

  const queryParams = new URLSearchParams(answers).toString();

  const newLink = `${window.location.origin}/custom-wave.html?${queryParams}`;

  console.log(newLink);

  const qr = new QRious({
    element: document.getElementById('qrcanvas'),
    value: newLink,
    size: 500
  });
});

function generateRandomColors() {
  params.foregroundColor = getRandomColor();
  // params.backgroundColor = getRandomColor();
  params.squareColor = getRandomColor();
  params.secondColor = getRandomColor();
  params.thirdColor = getRandomColor();
  params.forthColor = getRandomColor();
  params.fifthColor = getRandomColor();
}

// random value generated for the user's custom wave
function randomizeParams(randomWave = false) {
  params.frequency = random(3, 20);
  params.amplitude = random(10, 500);
  // params.phase = random(0, TWO_PI);
  params.dutyCycle = random(0, 1);
  params.rotate = random(-0.01, 0.01);
  params.offsetX = random(30, 250);
  params.offsetY = random(30, 250);
  params.howManyColors = Math.floor(random(1, 5));
  // params.squareYes = random([true, false]);
  // params.staggerX = random(-1000, 1000);
  // params.staggerY = random(-1000, 1000);
  params.num = random(5, 30);
  params.overallX = random(-100, 100);
  params.overallY = random(-100, 100);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}


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
  document.querySelector("#start-btn").style.pointerEvents = "none";
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
      "#start-btn",
      {
        duration: 1.5,
        opacity: 1,
        y: 0, // Reset the Y position
        ease: "power2.out",
        onComplete: () => {
          // Re-enable pointer events once the animation is complete
          document.querySelector(".big-btn").style.pointerEvents = "auto";
        }
      },
      "-=0.5"
    ); // Animate button
};
