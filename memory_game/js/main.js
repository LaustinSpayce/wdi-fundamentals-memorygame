console.log("Up and running!");

var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var score = 0;

// An array of cards in play's Id's
var cardsInPlay = [];

// An array of complete card details revealed rank, suit, cardImage and cardId.
const revealedCards = []; 

var scoreText = document.getElementById('score-text');

var resetButton = document.getElementById('reset-button');

function shuffleCards(array) {
	// Shuffle the cards
	// Using Fisher-Yates Algorithm from
	// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
	for (var i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}

function updateScore() {
	scoreText.textContent = score;
	cardsInPlay = [];
	if (cards.length === revealedCards.length) {
		endGame();
	}
}

function checkForMatch() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert("Success! " + nameOfCard(revealedCards[revealedCards.length-2]) + 
				" matches " + nameOfCard(revealedCards[revealedCards.length-1]))
			score++;
			updateScore();
		}
		else {
			alert("Sorry! " + nameOfCard(revealedCards[revealedCards.length-2]) + 
				" does not match " + nameOfCard(revealedCards[revealedCards.length-1]));
			unflipCards();
		}
	}
}

var createBoard = function () {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

var resetGame = function () {
	location.reload();
}

var unflipCards = function () {
	var iterations = cardsInPlay.length;
	for (var i = 0; i < iterations; i++) {
		cardsInPlay.pop();
		var cardToUnflip = revealedCards.pop();
		var dataId = cardToUnflip.cardId;
		// Select an image with the data-id matching the card id. 
		// And set the image to the card back
		document.querySelector("img[data-id='" + dataId + "']" ).setAttribute("src", 
			"images/back.png")
	}
}

// Checked the picked card against the cards already revealed in revealedCards.
// Each card has an id from its initial position in the cards array.
// Returns true if picked.
var checkPicked = function (inputCard) {
	for (var i = 0; i < revealedCards.length; i++) {
		if (revealedCards[i].cardId == inputCard.cardId) {
			console.log(nameOfCard(inputCard) + " already picked.")
			return true;
		}
	}
	return false;
}


var nameOfCard = function (card) {
	return(card.rank + " of " + card.suit);
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	var revealedCard = cards[cardId];
	revealedCard.cardId = cardId;
	if (checkPicked(revealedCard)) { 
		return;
	}
	console.log("User flipped " + revealedCard.rank);
	cardsInPlay.push(revealedCard.rank);
	revealedCards.push(revealedCard);
	console.log(revealedCards);
	this.setAttribute('src', cards[cardId].cardImage);
	checkForMatch();
}

var endGame = function () {
	alert("Congratulations, you finished the game with a score of " + score + 
		". Click Reset Game to play again.");
}

resetButton.addEventListener('click', resetGame);
cards = shuffleCards(cards);
createBoard();