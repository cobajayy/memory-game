const boardElement = document.querySelector(".board")
const cardsElement = document.querySelectorAll(".card")
const wrongGuessElement = document.querySelector("#wrong-guess")
const pairCountElement = document.querySelector("#pair-count")
const timerElement = document.querySelector("#timer")
const messageElement = document.getElementById("message")
const startElement = document.querySelector("#start")
const playElement = document.querySelector("#play")
const frontOfCardElement = document.querySelectorAll(".front")
const instructionsElement = document.querySelector("#instructions");

const state = {
    pairCount: 0,
    wrongGuess: 0,
    timeRemain: 60,
}

let firstCard;
let secondCard; 
let revealCard = false;
let lockBoard = false;
let gameOver;

const cards = [
    {
        src: "george-binoculars.jpg",
        alt: "Monkey using binoculars",
    },
    {
        src: "george-ballon.jpg",
        alt: "Monkey with red baloon",
    },
    {
        src: "george-banana.jpg",
        alt: "Monkey eating a banana",
    },
    {
        src: "george-baseball-hat.png",
        alt: "Monkey wearing a baseball hat",
    },
    {
        src: "george-bike.jpg",
        alt: "Monkey riding a bicycle",
    },
    {
        src: "george-cake.png",
        alt: "Monkey decorating a cake",
    },
    {
        src: "george-binoculars.jpg",
        alt: "Monkey using binoculars",
    },
    {
        src: "george-ballon.jpg",
        alt: "Monkey with red baloon",
    },
    {
        src: "george-banana.jpg",
        alt: "Monkey eating a banana",
    },
    {
        src: "george-baseball-hat.png",
        alt: "Monkey wearing a baseball hat",
    },
    {
        src: "george-bike.jpg",
        alt: "Monkey riding a bicycle",
    },
    {
        src: "george-cake.png",
        alt: "Monkey decorating a cake",
    },
 
];

const init = () => {
    messageElement.classList.add("hidden")
    populateBoard();
    resetBoard()
    state.pairCount = 0
    state.wrongGuess = 0
    state.timeRemain = 60
    clearInterval(timer)
    timeClock()
    render()
}

function flipCard() {
    if(lockBoard) return; 
    if(this === firstCard) return;

    this.classList.toggle('flip') 
    if(!revealCard) { 
        revealCard = true; 
        firstCard = this; 


    } else {
        revealCard = false; 
        secondCard = this; 
        compare()
    } 
}

function compare() {
    if (firstCard.dataset.img === secondCard.dataset.img) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        messageElement.textContent = "A Match!";
        state.pairCount += 1;
        render()
        checkWinner()
    } 
    else {
        lockBoard = true; 

        setTimeout(() => {

            
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            messageElement.classList.remove("hidden")
            messageElement.textContent = "Try Again!"
            state.wrongGuess += 1;
            lockBoard = false 
            firstCard = null;
            secondCard = null;
            render()    
            checkWinner()
        },1500)
    } 
    }

function populateBoard() {
    shuffleCards();
    boardElement.innerHTML = "";
    cards.forEach(card => {
     
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.setAttribute("data-img", card.src);

        cardDiv.addEventListener("click", flipCard);

        const backImg = document.createElement("img");
        backImg.classList.add("back");
        backImg.setAttribute("src", "img/george-face.png");
        backImg.setAttribute("alt", "Monkey Face");
        
        const frontImg = document.createElement("img");
        frontImg.classList.add("front");
        const src = "img/" + card.src;
        frontImg.setAttribute("src", src);
        frontImg.setAttribute("alt", card.alt);
        
        cardDiv.appendChild(frontImg);
        cardDiv.appendChild(backImg);

        boardElement.appendChild(cardDiv);
    })
}

function shuffleCards() {
        for(let i = cards.length-1; i >= 0; i--) {
            const randomPosition = Math.floor(Math.random() * cards.length); 
            [cards[i], cards[randomPosition]] = [cards[randomPosition], cards[i]];
        }

    }

function render() {
        wrongGuessElement.textContent = state.wrongGuess
        pairCountElement.textContent = state.pairCount
    }

function checkWinner() {
    if(state.pairCount === 6) {
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
}


function resetBoard() {
    revealCard = false; 
    lockBoard = false; 
    firstCard = null; 
    secondCard = null;

    cardsElement.forEach(card => {
        card.classList.remove("flip")
        card.addEventListener("click", flipCard)
    })
}

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

playElement.addEventListener("click", () => {
    instructionsElement.remove();
});

playElement.addEventListener("click", init)

/*-----------Graveyard--------------------*/
// function render() {
    
//     if(gameOver === true) {
//         messageElement.classList.remove("hidden")
//         playAgainElement.classList.remove("hidden")
//         clearInterval(timer)
//     }
// }
// cardsElement.forEach(card => card.addEventListener("click", flipCard))

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

// let randomElementDataSetImg = cardsElement[randomPosition].dataset.img


            // let randomElement = cardsElement[randomPosition]
            
            // let tempDiv = cardsElement[i]//saving current div
            // let tempDivDataSetImg = cardsElement[i].dataset.img
            // // cardsElement[i].dataset.img = randomElementDataSetImg //changing dataset.img from current to random position
            // // randomElementDataSetImg = tempDivDataSetImg//changing random position dataset.img to current dataset.img
            // // console.log(cardsElement[i].dataset.img, randomElementDataSetImg)

            // let tempImg = tempDiv.children[0] //holding current position
            // // console.log(tempImg)
            // tempImg.src = randomElement.children[0].src
            // tempImg.alt = randomElement.children[0].alt
            // randomElement.children[0].src = tempImg.src //random index becomes current poistion
            // randomElement.children[0].alt = tempImg.alt //random index becomes current poistion

               // {
    //     src: "george-firetruck.jpg",
    //     alt: "Monkey on top of a firetruck",
    // },
    // {
    //     src: "george-reading-map.jpg",
    //     alt: "Monkey reading a map",
    // },
    // {
    //     src: "george-yellow-hat.jpg",
    //     alt: "Monkey wearing a yellow hat",
    // },
    // {
    //     src: "man-yellow-hat.jpg",
    //     alt: "Monkey with man with a yellow hat",
    // }

        // {
    //     src: "george-firetruck.jpg",
    //     alt: "Monkey on top of a firetruck",
    // },
    // {
    //     src: "george-reading-map.jpg",
    //     alt: "Monkey reading a map",
    // },
    // {
    //     src: "george-yellow-hat.jpg",
    //     alt: "Monkey wearing a yellow hat",
    // },
    // {
    //     src: "man-yellow-hat.jpg",
    //     alt: "Monkey with man with a yellow hat",
    // },

        // playElement.classList.add("hidden")
    // instructionsElement.classList.add("hidden-after")