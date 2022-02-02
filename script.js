const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const guessedWord = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const noOfGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const resetButton = document.querySelector(".play-again hide");

const word = "mangolia";

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
    const letter = letterInput.ariaValueMax;
    console.log(`${letter}`);
    letterInput.value="";
});