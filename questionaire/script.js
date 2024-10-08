import { database } from "../firebase.js";
import {
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const databaseIndex = "visual";

updateDatabaseIndex(-1);

// Swiper setup
const swiper = new Swiper("#quiz-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    slideChange: function() {
      const currentIndex = swiper.activeIndex;
      updateDatabaseIndex(currentIndex);
    },
  },
});

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
  updateDatabaseIndex(6);
});


// start
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  updateDatabaseIndex(0);
  initSwiper();
});

// 當用戶提交答案時
document.getElementById("submit").addEventListener("click", () => {
  // 收集所有選擇的答案
  answers = {
    city: document.getElementById("answer1").value, // 問題1: 縣市
    age: document.getElementById("answer5").value, // 問題2: 年齡
    group: document.getElementById("answer3").value, // 問題3: 組別
    country: document.getElementById("answer4").value, // 問題4: 留學國家
    message: document.getElementById("answer5").value, // 問題5: 想分享的話
  };

  localStorage.setItem("quizAnswers", JSON.stringify(answers));

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("sketch-container").style.display = "block";
});

function updateLabel(value) {
  document.getElementById("ageLabel").textContent = value;
}

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
  document.getElementById("start-container").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("end-container").style.display = "none";
  document.getElementById("sketch-container").style.display = "none";
  initSwiper();
};
