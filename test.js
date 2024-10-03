document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('inputField');
    const button = document.getElementById('submitButton');
    const displayText = document.getElementById('displayText');

    button.addEventListener('click', function() {
        const userInput = inputField.value;
        displayText.textContent = `你剛輸入的是：${userInput}`;
    });
});