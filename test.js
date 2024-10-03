// 這是一個簡單的 JS 檔案，當按鈕被點擊時改變文字內容
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const text = document.getElementById('myText');

    button.addEventListener('click', function() {
        text.textContent = '你點擊了按鈕！';
    });
});

// 倒數計時器功能，從 10 開始倒數，直到 0
document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    let countdownValue = 10;

    const countdownTimer = setInterval(function() {
        if (countdownValue > 0) {
            countdownElement.textContent = countdownValue;
            countdownValue--;
        } else {
            countdownElement.textContent = '倒數結束！';
            clearInterval(countdownTimer);
        }
    }, 1000); // 每秒更新一次
});
