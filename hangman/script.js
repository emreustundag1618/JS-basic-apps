const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const button = document.getElementById("play-again");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message__el = document.querySelector("#message");

// Generate a random word
function getRandomWord() {
    const words = ["javascript", "java", "python","css","html","ruby","delphi","pascal"]

    return words[Math.floor(Math.random() * words.length)]
}

// global variables
const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

//
function displayWord() {


    word_el.innerHTML = `
    ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </div>
        `).join("")}`;

    // console.log(word_el.innerText.replace(/\n/g,""))

    const w = word_el.innerText.replace(/\n/g, "");
    if (w === selectedWord) {
        button.innerText = "Play again!";
        popup.style.display = "flex";
        message_el.innerHTML = "You won!";
    }
}

function updateWrongLetters() {
    title = "Wrong Letters";
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? `<h3>${title}</h3>` : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";

        }

        if (errorCount === items.length) {
            button.innerText = "Play again!";
            popup.style.display = "flex";
            message_el.innerHTML = "You lose!";
        }
    });
}

function displayMessage() {
    message__el.classList.add("show");
    setTimeout(function(){
        message__el.classList.remove("show");
    }, 2000)
}

button.addEventListener("click", function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = "none";
})

window.addEventListener('keydown', function (e) {
    // only english characters
    if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 222) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
                
            } else {
                displayMessage();
            }
        }
    }
})

displayWord();