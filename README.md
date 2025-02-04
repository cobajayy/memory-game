# memory-game
deployed link: https://cobajayy.github.io/memory-game/

Name : Curious George Memory Game

Description: This is a memory matching game. Click on the cards to reveal their picture and try to match all the cards. When you get a wrong match you get 1.5secs to remember where it was before they flip back over. When you match all 6 pairs you win, but if you guess wrong 5 times you lose.

Project Planning:
A theme. The player must lose after a certain amount of time has passed or a certain number of wrong guesses.

Memory (concentration): My goal is to develop a memory game for kids. 
Theme: Either Curious George, Disney's UP, or generic (ie fruits, clothes, shapes)
Pseudocode:
25 buttons (5 x 5 column) - using grid or flexbox
random function to change the tiles every time the game resets
reset button
const msg above the tiles displaying win/lose
const timer with a count down (setInterval() and closeInterval())
const wrongGuess count down for wrong guesses
const userChoice selects buttons and flip the card
compare() to compare the buttons, if correct display stays, if incorrect flip back over
Technologies: JavaScript, CSS, HTML

Next Steps: I want to create a difficulity option that will add more cards and adjust the wrong guess amount. Even further I'd like to create more themes in one app.