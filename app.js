console.log("connected to memory game")
// 
/*-------------------------------- Constants --------------------------------*/

let timer;
let gameOver;

/*---------------------------- Variables (state) ----------------------------*/


/*------------------------ Cached Element References ------------------------*/
const boardElement = document.getElementsByClassName("board")
const cardsElement = document.querySelectorAll(".card")

const messageElement = document.getElementById("message")
const playAgainElement = document.getElementById("play-again")

console.dir(cardsElement)
/*-------------------------------- Functions --------------------------------*/
const init = () => {

}

flipCard = () => {
    // cardsElement.hasAttribute("disabled");

    console.log("i'm clicked")
}



/*----------------------------- Event Listeners -----------------------------*/
cardsElement.forEach(card => card.addEventListener("click", flipCard));
playAgainElement.addEventListener("click", init)