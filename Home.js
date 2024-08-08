const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "15 Aug 2024";

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000);


const placeholders = ["Search 'milk'", "Search 'curd'", "Search 'bread'","Search 'medicines'","Search 'sugar'","Search 'butter'","Search 'paneer'","Search 'chocolate'"];
let placeholderIndex = 0;
const placeholderText = document.querySelector('.placeholder-text');
const searchBox = document.getElementById('searchBox');
const suggestionsList = document.getElementById('suggestions');

let placeholderInterval;

// Placeholder animation
function changePlaceholder() {
    placeholderText.innerText = placeholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
}

// Start the placeholder animation
function startPlaceholderAnimation() {
    changePlaceholder();
    placeholderText.style.animation = 'slideUp 3s infinite';
    placeholderInterval = setInterval(changePlaceholder, 3000);
}

// Stop the placeholder animation
function stopPlaceholderAnimation() {
    clearInterval(placeholderInterval);
    placeholderText.style.animation = 'none';
    placeholderText.style.opacity = '0';
}

// Set the initial placeholder and start animation
startPlaceholderAnimation();

// Suggestions data
const suggestions = ["milk", "curd", "bread", "butter", "cheese", "yogurt", "paneer", "cream"];

// Show suggestions
searchBox.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    suggestionsList.innerHTML = '';
    if (query) {
        const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(query));
        filteredSuggestions.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.addEventListener('click', function() {
                searchBox.value = item;
                suggestionsList.innerHTML = '';
            });
            suggestionsList.appendChild(listItem);
        });
    }
});

// Stop placeholder animation when user starts typing
searchBox.addEventListener('focus', stopPlaceholderAnimation);
searchBox.addEventListener('input', stopPlaceholderAnimation);

// Resume placeholder animation if input is empty when it loses focus
searchBox.addEventListener('blur', function() {
    if (!this.value) {
        placeholderText.style.opacity = '1';
        startPlaceholderAnimation();
    }
});
