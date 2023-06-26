const display = document.querySelector('[data-counter-output]');
const buttons = document.querySelectorAll('[data-counter-button]');
const initialCount = 0;
let count = initialCount;
display.textContent = count;
for (const button of buttons) {
    button.addEventListener('click', handleClick);
}
function handleClick(e) {
    const action = e.target.dataset.counterButton;
    switch (action) {
        case 'decrement':
            count--;
            break;
        case 'increment':
            count++;
            break;
        case 'reset':
            count = initialCount;
            break;
        default:
            throw new Error(`The action '${action}' is not implemented!`);
    }
    display.classList.add('test');
    display.textContent = count;
}
