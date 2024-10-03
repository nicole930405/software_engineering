document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const text = document.getElementById('myText');

    button.addEventListener('click', function() {
        text.textContent = '你點擊了按鈕！';
    });
});