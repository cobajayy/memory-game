console.log("connected to memory game")
// 
/*-------------------------------- Constants --------------------------------*/
const state = {
    pairCount: 0,
    wrongGuess: 0,
    timeRemain: 60,
}
// let timer;
// let gameOver;

let firstCard;
let secondCard; 
let revealCard = false;
let lockBoard = false;
let gameOver;



/*---------------------------- Variables (state) ----------------------------*/


/*------------------------ Cached Element References ------------------------*/
const boardElement = document.getElementsByClassName("board")
const cardsElement = document.querySelectorAll(".card")
const wrongGuessElement = document.querySelector("#wrong-guess")
const pairCountElement = document.querySelector("#pair-count")
const timerElement = document.querySelector("#timer")
const messageElement = document.getElementById("message")
const playAgainElement = document.getElementById("play-again")
const frontOfCardElement = document.querySelectorAll(".front")
/*-------------------------------- Functions --------------------------------*/
const init = () => {
    messageElement.classList.add("hidden")
    playAgainElement.classList.add("hidden")
    shuffleCards()
    resetBoard()
    state.pairCount = 0
    state.wrongGuess = 0
    state.timeRemain = 60
    clearInterval(timer)
    timeClock()
    render()
}

function flipCard() {
    if(lockBoard) return; //if lockBoard is false the board is not locked continue rest of code
    if(this === firstCard) return; // if the selected card is selected hold value so second card cannot select that card, if the secondCard is a match then it equal firstCard and we can return from the function

    this.classList.toggle('flip') //adds the "flip" to the selected cards class
    // event.target.add("flip")
    if(!revealCard) { //if card has not been flipped then let us click the card 
        revealCard = true; //now the card is flipped and has the class added of "flip"
        firstCard = this; // stores the card selected as firstCard

        // console.log({flippedCard, firstCard})

    } else {
        revealCard = false; //this resets so we can select the second card
        secondCard = this; //stores the second cards value
        compare()
        // resetBoard()

    } 

   
}

function compare() {
    //see if it is a match
    // console.log(firstCard.dataset.img, secondCard.dataset.img)
    if (firstCard.dataset.img === secondCard.dataset.img) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);//removes the ability to be clicked again
        messageElement.textContent = "A Match!", 1000;
        state.pairCount += 1;
        // console.log(pairCount)
        render()
        checkWinner()
    } 
    else {
        lockBoard = true; //locks the board so you cannot select another card after the second card is selected

        setTimeout(() => {

            //if not a match remove flip class and flip the card back over
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            messageElement.textContent = "Try Again!"
            state.wrongGuess += 1;
            lockBoard = false //releases the board so you can try another selection
            firstCard = null;
            secondCard = null;
            render()    
            checkWinner()
            //  // resetBoard()
        },1500)//1.5 secs to see if the cards are a match
    } 
    }

function shuffleCards() {
        for(let i = cardsElement.length-1; i >= 0; i--) {
            const randomPosition = Math.floor(Math.random() * cardsElement.length) //grabbing an random index from node list
            let randomElementDataSetImg = cardsElement[randomPosition].dataset.img

            let randomElement = cardsElement[randomPosition]
            
            let tempDiv = cardsElement[i]//saving current div
            let tempDivDataSetImg = cardsElement[i].dataset.img
            // cardsElement[i].dataset.img = randomElementDataSetImg //changing dataset.img from current to random position
            // randomElementDataSetImg = tempDivDataSetImg//changing random position dataset.img to current dataset.img
            // console.log(cardsElement[i].dataset.img, randomElementDataSetImg)

            let tempImg = tempDiv.children[0] //holding current position
            // console.log(tempImg)
            tempImg.src = randomElement.children[0].src
            tempImg.alt = randomElement.children[0].alt
            randomElement.children[0].src = tempImg.src //random index becomes current poistion
            randomElement.children[0].alt = tempImg.alt //random index becomes current poistion
            
            // console.log(cardsElement.length)
            console.log(tempImg, tempDiv)

        }
    }

function render() {
        wrongGuessElement.textContent = state.wrongGuess
        pairCountElement.textContent = state.pairCount
    }

function checkWinner() {
    if(state.pairCount === 10) {
        messageElement.textContent = "Congrats You Win!"
        clearInterval(timer)
    } 
    if(state.wrongGuess === 5) {
        messageElement.textContent = "Oh no! Too many Wrong Guesses, You Lose!"
        clearInterval(timer)
    } 
    if(state.timeRemain === 0) {
        messageElement.textContent = "Time's Up! You Lose!"
    }
    

    // lockBoard = true;
}


function resetBoard() {
    revealCard = false; //resets revealCard to allow us to select another card
    lockBoard = false; //resets the board so we can flip another card
    firstCard = null; //removes the previous selected value
    secondCard = null;

    cardsElement.forEach(card => {
        card.classList.remove("flip")
        card.addEventListener("click", flipCard)
    })
}

// creating a countdown timer
const timeClock = () => {
    timer = setInterval(() => {
        state.timeRemain--;
        timerElement.innerHTML = state.timeRemain;
        if(state.timeRemain === 0) {
            clearInterval(timer)
            messageElement.textContent = "Time's Up! You Lose!"
        }
    }, 1000)
    

}


// console.log(cardsElement)









// const runGame = () => {
//     updateStates()
//     checkGameOver()
//     render()
// }

// function render() {
    
//     if(gameOver === true) {
//         messageElement.classList.remove("hidden")
//         playAgainElement.classList.remove("hidden")
//         clearInterval(timer)
//     }
// }

/*----------------------------- Event Listeners -----------------------------*/

playAgainElement.addEventListener("click", init)
cardsElement.forEach(card => card.addEventListener("click", flipCard))

/*-----------Graveyard--------------------*/


// const timeClock = setInterval = (() => {
//     if (timeRemain <= 0) {
//         clearInterval(timeClock);
//         timerElement.textContent = "Time's up!"
//     } else {
//         timerElement.textContent = timeRemain;
//         timeRemain--;
//     }
// }, 1000);

// trying to add class of flip to the selected card so the css for .flip can turn the card over

// const flipCard = () => { 
//     // cardsElement.setAttribute("class", "flip");
//     this.classList.toggle('flip')
//     // cardsElement.classList.add("flip")
//     event.target.add("flip")
//     console.log("i'm clicked")
//     console.log(this)
// }

//trying to compare the two cards revealed to see if they are a match
// function compare() {
//     if(cardsElement.innerHTML === this) {
//         //match is made lock cards
//         console.log(cardsElement.innerHTML)
//     } else{
//         //match is not made flip cards back over
//     }
// }