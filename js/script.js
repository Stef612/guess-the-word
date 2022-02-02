const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const guessedWord = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const noOfGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const resetButton = document.querySelector(".play-again hide");

const word = "mangolia";
const guessedLetters = [];

const start = function(word){
    const wordInArray = [];
    for (let i=0 ; i<word.length; i++)
    {
        wordInArray.push("●")
    }
    console.log(wordInArray.join(""));
    guessedWord.innerText = wordInArray.join("");
};

start(word);

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
    else {guessedLetters.push(letter);console.log(guessedLetters.join(","))}
};