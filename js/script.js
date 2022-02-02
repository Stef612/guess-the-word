const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const guessedWord = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const noOfGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const resetButton = document.querySelector(".play-again hide");

let word = "mangolia";
const guessedLetters = [];
let noOfRemainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    start(word);
    console.log(word);
};

getWord(word);

const start = function(word){
    const wordInArray = [];
    for (let i=0 ; i<word.length; i++)
    {
        wordInArray.push("●")
    }
    //console.log(wordInArray.join(""));
    guessedWord.innerText = wordInArray.join("");
};

guessButton.addEventListener("click",function(e){
    e.preventDefault();
    message.innerText = "";
    const letter = letterInput.value;
    const validatedLetter = inputValidation(letter);
    if(validatedLetter){makeGuess(validatedLetter);console.log(validatedLetter);}
    letterInput.value="";
    
});

const inputValidation = function (input){
    const acceptedInput = /[a-zA-Z]/;
    if (input.length===0){message.innerText = "Please enter a letter";}
    else if (input.length>1){message.innerText="Please enter a single letter";}
    else if (!input.match(acceptedInput)){message.innerText="Please a valid letter from A to Z";}
    else{return input;}
    
};

const makeGuess = function (letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){message.innerText="You already guessed that letter. Try again.";}
    else {guessedLetters.push(letter);console.log(guessedLetters.join(","));updateGuesses(letter);updateGuessedLettersList(guessedLetters);updateGuessedWord(guessedLetters);}
};

const updateGuessedLettersList = function (guessedLetters){
    guessList.innerHTML ="";
    for (let letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessList.append(li);
    }
};

const updateGuessedWord = function (guessedLetters){
    wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealed = [];
    for (let letter of wordArray){
        if (guessedLetters.includes(letter)){revealed.push(letter);}
        else {revealed.push("●");}
    }
    guessedWord.innerText = revealed.join("");
    checkWin(revealed.join(""));
}

const updateGuesses = function(guess)
{
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){message.innerText = `Sorry, the word has no ${guess}.`; noOfRemainingGuesses -= 1;}
    else{message.innerText = `Good guess! The word has the letter ${guess}.`;}

    if (noOfRemainingGuesses === 0) {message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;}
    else if (noOfRemainingGuesses === 1) {noOfGuesses.innerText = `${noOfRemainingGuesses} guess`;}
    else {noOfGuesses.innerText = `${noOfRemainingGuesses} guesses`;}
}

const checkWin = function(wordInProgress){
    if (!wordInProgress.includes("●")){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }

    
};

