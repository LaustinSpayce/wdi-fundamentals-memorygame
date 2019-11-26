console.log("Up and running!");

const cards = ["queen", "queen", "king", "king"];
var cardsInPlay = [];

function checkForMatch() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert("You found a match!");
		}
		else {
			alert("Sorry, try again.");
		}
	}
}

function flipCard(cardID) {
	console.log("User flipped " + cards[cardID]);
	cardsInPlay.push(cards[cardID]);
	checkForMatch();
}

flipCard(0);
flipCard(2);
