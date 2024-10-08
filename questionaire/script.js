let answers = {};
const swiper = new Swiper('#quiz-container', {
    // Swiper 配置選項
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// 監聽所有選擇下拉選單的變更事件
const selectElements = document.querySelectorAll('select');
selectElements.forEach((select, index) => {
    select.addEventListener('change', function () {
        // 檢查是否有選擇答案
        if (this.value) {
            // 切換到下一題
            swiper.slideNext();
        }
    });
});

// 監聽提交按鈕的點擊事件
document.getElementById('submit').addEventListener('click', function () {
    // 在此處處理查看結果的邏輯
    alert('結果已提交！');
});

// 開始測驗
document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("nav-buttons").style.display = "flex";
    initSwiper();
    document.getElementById("nav-buttons").style.display = "none";
});

// 當用戶提交答案時
document.getElementById("submit").addEventListener("click", () => {
    // 收集所有選擇的答案
    answers = {
        city: document.getElementById("answer1").value, // 問題1: 縣市
        age: document.getElementById("answer5").value,  // 問題2: 年齡
        group: document.getElementById("answer3").value, // 問題3: 組別
        country: document.getElementById("answer4").value, // 問題4: 留學國家
        message: document.getElementById("answer5").value // 問題5: 想分享的話
    };

    localStorage.setItem("quizAnswers", JSON.stringify(answers));

    // 隱藏測驗，顯示 p5 sketch
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("sketch-container").style.display = "block";

    window.location.href = "result.html"; // 假設結果頁面為 result.html
});

function updateLabel(value) {
    document.getElementById('ageLabel').textContent = value;
}

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
