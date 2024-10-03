// 這是一個簡單的 JS 檔案，當按鈕被點擊時改變文字內容
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const text = document.getElementById('myText');

    button.addEventListener('click', function() {
        text.textContent = '你點擊了按鈕！';
    });
});


