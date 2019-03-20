var textElements = {
	directionsText : document.getElementById("directions-text"),
	winsText : document.getElementById("wins-text"),
	guessesLeftText : document.getElementById("guesses-left"),
	lettersGuessedText : document.getElementById("letters-guessed"),
	currentWordText : document.getElementById("current-word"),
	hintText : document.getElementById("hint")
};  
	
var game = {
	
	words : [ // may want to create hint words as well
		"misanthrope",
		"meander",
		"lycanthropy",
		"vertigo",
		"chillblains",
		"homonculous",
		"wendigo",
		"datura",
		"mitre",
		"scramples"
	],
	
	hints : [
		"doesn't play well with others",
		"rivers do this",
		"werewolf syndrome",
		"an inner-ear condition and a classic Hitchcock thriller",
		"I don't know what this is",
		"latin for \"little man\"",
		"a mythical native American cannibal beast",
		"a hallucinagenic fruit",
		"pope hat",
		"not a real word"
		],
	
	guessesRemaining : 5,
	wins : 0,
	lettersGuessed : [],
	currentWord : "",
	revealedWordArray : [],
	over : false,
	
	initializeValues : function() {
		this.guessesRemaining = 5; textElements.guessesLeftText.textContent = this.guessesRemaining;
		textElements.winsText.textContent = this.wins ;
		this.lettersGuessed = []; textElements.lettersGuessedText.textContent = "none";
		this.randomizeCurrentWord();
		for (this.revealedWordArray = []; this.revealedWordArray.length < this.currentWord.length ; this.revealedWordArray.push('_')) {} ;
		this.updateDisplayedRevealedWord();
	},
	
	updateRevealedWordArray : function(x, y) {
	this.revealedWordArray[x] = y;
	},
	
	updateDisplayedRevealedWord : function () {
		document.getElementById("current-word").innerHTML = "";
		for (var i = 0; i < this.revealedWordArray.length; i++) {
		document.getElementById("current-word").innerHTML += "<span class=\"letterbox\">";
			document.getElementById("current-word").innerHTML += this.revealedWordArray[i];
			document.getElementById("current-word").innerHTML += "</span>";
		}
	},
	
	randomizeCurrentWord : function() {
		var index = Math.floor(Math.random() * this.words.length);
		this.currentWord = this.words[index];
		textElements.hintText.textContent = this.hints[index] ;	}
	
};
	
	function getAllIndexes(arr, val) {
    var indexes = [];	
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === val) { indexes.push(i); }
	}
	return indexes;
}


game.initializeValues();
document.onkeyup = function(event) {
	if (game.over) return; // end game
	var userGuess = event.key.toLowerCase(); // Determines which key was pressed.
	
	if ("abcdefghijklmnopqrstuvwxyz".includes(userGuess)) {  //then the keypress was a letter
		if (!game.lettersGuessed.includes(userGuess) && !game.revealedWordArray.includes(userGuess)) { //userGuess isn't in either lettersGuessed or revealedWordArray
				var ind = getAllIndexes(game.currentWord, userGuess) ; //check if userguess is in the current word
				if (ind.length != 0) {  //then it is in current word
					for (var x = 0; x < ind.length; x++) {
						game.updateRevealedWordArray(ind[x], userGuess);
					}
					game.updateDisplayedRevealedWord();
					if (!game.revealedWordArray.includes('_')) {
						game.wins++;
						textElements.directionsText.textContent = "Congratulations! Can you guess this one?";
						game.initializeValues();
					}
				}
				else {
					game.lettersGuessed.push(userGuess); //add userGuess to letters guessed
					textElements.lettersGuessedText.textContent = game.lettersGuessed;
					game.guessesRemaining--; //reduce guessesRemaining by one 
					textElements.guessesLeftText.textContent = game.guessesRemaining;
					if (game.guessesRemaining < 1) {
						textElements.directionsText.textContent = "Game Over. Thanks for playing!";
						game.over = true; //end game
					}
				}
		}
	}
}