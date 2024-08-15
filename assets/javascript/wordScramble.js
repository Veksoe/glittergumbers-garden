const wordEl = document.querySelector(".word"),
    hintEl = document.querySelector(".hint"),
    checkBtnEl = document.querySelector(".checkWord"),
    userWordEl = document.querySelector(".wordInput"),
    streakEl = document.querySelector(".streak span"),
    messageEl = document.querySelector(".message"),
    timeEl = document.querySelector(".counter"),
    restartBtnEl = document.querySelector(".restart");

let correctWord, timer;
let currentStreak = 0;
let tempWords = [];

function initTimer(maxTime) {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeEl.textContent = maxTime
        }
        clearInterval(timer);
        messageEl.classList.remove("wrong")
        messageEl.classList.remove("correct")
        messageEl.textContent = `Time is up! "${correctWord.toLocaleUpperCase()}" was the correct word. Your streak of ${currentStreak} have reset.`
        currentStreak = 0;
        initGame()
    }, 1000)

}

function initGame() {
    initTimer(30);
    userWordEl.focus()
    let randomnNumber = Math.floor(Math.random() * words.length)
    let randomObj = words[randomnNumber];
    tempWords.push(randomObj)
    let wordArray = randomObj.word.split("");
    streakEl.textContent = currentStreak;

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = wordArray[i]; //stores the element at i temporarily
        wordArray[i] = wordArray[j]; //assigns the element at index 'j' to index 'i'
        wordArray[j] = temp // assigns the temporarily stored element to index 'j'.
    }
    wordEl.textContent = wordArray.join("");
    hintEl.textContent = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    userWordEl.value = ""
    userWordEl.setAttribute("maxlength", correctWord.length)

    words.splice(randomnNumber, 1)

}

function checkWord() {
    let userInput = userWordEl.value.toLocaleLowerCase();
    if (!userInput && words.length > 0) {
        messageEl.classList.remove("wrong")
        messageEl.classList.remove("correct")
        messageEl.textContent = `Please enter a word`;
        return;
    }
    if (userInput !== correctWord && words.length > 0) {
        messageEl.classList.remove("correct")
        messageEl.classList.add("wrong")
        messageEl.textContent = `Oops! "${userInput.toLocaleUpperCase()}" was not the correct word, it was "${correctWord.toLocaleUpperCase()}". Your streak of ${currentStreak} have reset.`
        currentStreak = 0;
        initGame()
        return;
    }

    if (words.length === 0 && userInput === correctWord) {
        currentStreak++
        streakEl.textContent = currentStreak;
        messageEl.classList.remove("wrong")
        messageEl.classList.add("correct")
        clearInterval(timer);
        words.push.apply(words, tempWords);
        tempWords = [];
        console.log("words: ", words)
        console.log("Temp words: ", tempWords)
        checkBtnEl.classList.add("hidden")
        restartBtnEl.classList.remove("hidden")
        userWordEl.setAttribute("disabled", "disabled")
        return messageEl.textContent = `Congratulation! "${userInput.toLocaleUpperCase()}" was the correct word. Glittergumber doesn't have any more words on his list.`
    }
    if (words.length === 0 && userInput !== correctWord) {
        currentStreak = 0;
        streakEl.textContent = currentStreak;
        messageEl.classList.remove("correct")
        messageEl.classList.add("wrong")
        clearInterval(timer);
        words.push.apply(words, tempWords);
        tempWords = [];
        checkBtnEl.classList.add("hidden")
        restartBtnEl.classList.remove("hidden")
        userWordEl.disabled = true;
        return messageEl.textContent = `Oops! "${userInput.toLocaleUpperCase()}" was not the correct word, it was "${correctWord.toLocaleUpperCase()}". Glittergumber doesn't have any more words on his list.`
    }

    currentStreak++
    messageEl.classList.remove("wrong")
    messageEl.classList.add("correct")
    messageEl.textContent = `Congatulation! "${userInput.toLocaleUpperCase()}" was the correct word!`
    initGame();

}



initGame();

if (userWordEl) {
    userWordEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkWord()
        }
    })
}
if (checkBtnEl) {
    checkBtnEl.addEventListener("click", checkWord)
}
if (restartBtnEl) {
    restartBtnEl.addEventListener("click", () => {
        location.reload()
    })
}