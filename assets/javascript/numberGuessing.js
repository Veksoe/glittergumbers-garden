const message = document.querySelector(".message "),
    guessEl = document.querySelector(".numberInput"),
    checkBtnEl = document.querySelector(".checkNumber"),
    restartBtnEl = document.querySelector(".restart")
chancesEl = document.querySelector(".counter");


let randomNum = Math.floor(Math.random() * 100);
let currentChances = 10;

guessEl.focus()
function checkNumber() {
    guessEl.focus()
    let inputValue = guessEl.value;
    currentChances--;

    if (inputValue == randomNum) {
        checkBtnEl.classList.toggle("hidden")
        restartBtnEl.classList.toggle("hidden")
        message.textContent = `Congratulation! ${randomNum} was the correct number!`;
        guessEl.disabled = true;
        checkBtnEl.textContent = `Replay`;
        guessEl.value = "";

        message.classList.add("correct");
    } else if (inputValue > randomNum && inputValue < 100) {
        message.classList.remove("correct");
        message.classList.remove("wrong");
        message.innerHTML = `${inputValue}  is to <span>high</span>`;
        chancesEl.textContent = currentChances;
        guessEl.value = "";
    } else if (inputValue < randomNum && inputValue > 0) {
        message.classList.remove("correct");
        message.classList.remove("wrong");
        message.innerHTML = `${inputValue} is to <span>low</span>`;
        chancesEl.textContent = currentChances;
        guessEl.value = "";
    } else {
        message.classList.add("wrong");
        message.innerHTML = `Your guess is invalid`;
    }

    if (currentChances === 0) {
        checkBtnEl.classList.toggle("hidden")
        restartBtnEl.classList.toggle("hidden")
        guessEl.disabled = true;
        inputValue = ""
        message.textContent = `You have lost the game.`
        message.classList.add("wrong");
    }
}

checkBtnEl.addEventListener("click", checkNumber)

guessEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkNumber()
    }
})

restartBtnEl.addEventListener("click", () => {
    location.reload()
})