console.log("Up and running!");

let cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/cardHeartsQ.png"
	},
	{
		rank: "queen",
		suit: "spades",
		cardImage: "images/cardSpadesQ.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/cardHeartsK.png"
	},
	{
		rank: "king",
		suit: "spades",
		cardImage: "images/cardSpadesK.png"
	},
	{
		rank: "jack",
		suit: "spades",
		cardImage: "images/cardSpadesJ.png"
	},
	{
		rank: "jack",
		suit: "hearts",
		cardImage: "images/cardHeartsJ.png"
	},
	{
		rank: "ace",
		suit: "hearts",
		cardImage: "images/cardHeartsA.png"
	},
	{
		rank: "ace",
		suit: "spades",
		cardImage: "images/cardSpadesA.png"
	},
	{
		rank: "10",
		suit: "hearts",
		cardImage: "images/cardHearts10.png"
	},
	{
		rank: "10",
		suit: "spades",
		cardImage: "images/cardSpades10.png"
	},	
];




let score = 0;

// An array of cards in play's Id's
let cardsInPlay = [];

// An array of complete card details revealed rank, suit, cardImage and cardId.
const revealedCards = []; 

const scorePlus = 5;
const scoreDeduct = 1;

const scoreText = document.getElementById('score-text');

const resetButton = document.getElementById('reset-button');

function shuffleCards(array) {
	// Shuffle the cards
	// Using Fisher-Yates Algorithm from
	// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
	for (let i = array.length - 1; i > 0; i--) {
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
	// In case there are more than 2 cards flipped over for some reason.
	while (cardsInPlay.length > 2) {
		cardsInPlay.pop();
		let cardToUnflip = revealedCards.pop();
		unflipOneCard(cardToUnflip);
	}

	if (cardsInPlay.length === 2) {
		let card1 = nameOfCard(revealedCards[revealedCards.length-2]);
		let card2 = nameOfCard(revealedCards[revealedCards.length-1]);
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert(`Success! ${card1} matches ${card2}`);
			score += scorePlus;
			updateScore();
		}
		else {
			alert(`Sorry! ${card1} does not match ${card2}.`);
			score -= scoreDeduct;
			unflipCards();
			updateScore();
		}
	}
}

var createBoard = function () {
	for (let i = 0; i < cards.length; i++) {
		let cardElement = document.createElement('img');
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i);
		cardElement.setAttribute("alt", "Card Back");
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

var resetGame = function () {
	// location.reload();
	score = 0;
	document.getElementById('game-board').innerHTML = "";
	while (cardsInPlay.length > 0) {
		cardsInPlay.pop();
	}
	while (revealedCards.length > 0) {
		revealedCards.pop();
	}
	updateScore();
	cards = shuffleCards(cards);
	createBoard();
}

var unflipOneCard = function (card) {
	let dataId = card.cardId;
	// Select an image with the data-id matching the card id. 
	// And set the image to the card back
	let cardElement = document.querySelector("img[data-id='" + dataId + "']" );
	cardElement.setAttribute("src", "images/back.png");
	cardElement.setAttribute("alt", "Card Back");
}

var unflipCards = function () {
	let iterations = cardsInPlay.length;
	for (let i = 0; i < iterations; i++) {
		cardsInPlay.pop();
		let cardToUnflip = revealedCards.pop();
		unflipOneCard(cardToUnflip);
	}
}

// Checked the picked card against the cards already revealed in revealedCards.
// Each card has an id from its initial position in the cards array.
// Returns true if picked.
var checkPicked = function (inputCard) {
	for (let i = 0; i < revealedCards.length; i++) {
		if (revealedCards[i].cardId === inputCard.cardId) {
			console.log(nameOfCard(inputCard) + " already picked.");
			return true;
		}
	}
	return false;
}


var nameOfCard = function (card) {
	return(card.rank + " of " + card.suit);
}

function flipCard() {
	let cardId = this.getAttribute('data-id');
	let revealedCard = cards[cardId];
	revealedCard.cardId = cardId;
	if (checkPicked(revealedCard)) { 
		return;
	}
	console.log("User flipped " + revealedCard.rank);
	cardsInPlay.push(revealedCard.rank);
	revealedCards.push(revealedCard);
	console.log(revealedCards);
	this.setAttribute('src', cards[cardId].cardImage);
	this.setAttribute('alt', nameOfCard(cards[cardId]));
	setTimeout(checkForMatch, 50);
	// TODO: Find a more elegant way to display the card before checking for a match.
	// using timeout can mean people flip 3 or more cards over.
}

var endGame = function () {
	alert(`Congratulations, you finished the game with a score of ${score}. Click Reset Game to play again.`);
}

document.getElementById('points-gained').textContent = scorePlus;
document.getElementById('points-lost').textContent = scoreDeduct;

resetButton.addEventListener('click', resetGame);
cards = shuffleCards(cards);
createBoard();