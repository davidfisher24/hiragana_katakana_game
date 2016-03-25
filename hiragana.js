/*
JAVASCRIPT FILE FOR HIRAGANA FLASHCARD GAME
PART 1 - collection of elements needed for javascript function
PART 2 - initialization of statistics boxes
PART 3 - Hiragana and katakana arrays
PART 4 - initilaization game settings
PART 5 - FUNCTIONS
PART 6 - EVENTS
*/

window.onload = function() {
// COLLECTION OF ELEMENTS NEEDED FOR JAVASCRIPT FUNCTIONS
	var character = document.getElementById('character'); 
	var correctBox = document.getElementById('correct');   
	var wrongBox = document.getElementById('wrong');
	var percentBox = document.getElementById('percent');
	var input = document.getElementById('input');
	var button = document.getElementById('submit');
	var numberBoxes = document.querySelectorAll('p.stats');
	var catPictures = document.querySelectorAll('#cat img');
	var errorBox = document.getElementById('errorbox');
	var changeButton = document.getElementById('change');
	var resetButton = document.getElementById('reset');
	var body = document.getElementsByTagName('body');
	var logo = document.getElementsByTagName('h1');
// NUMBERS FOR THE INITILIAZION OF STATISTICS BOXES
	var correct = 0;
	var wrong = 0;
	var total = 0;
	var percent = 0;
	numberBoxes[0].innerHTML = correct;
	numberBoxes[1].innerHTML = wrong;
	numberBoxes[2].innerHTML = 0;
	catPictures[0].style.display = "none";
	catPictures[1].style.display = "block";
	catPictures[2].style.display = "none";
// ARRAYS FOR THE CHARACTERS OF HIRAGANA AND KATAKANA
	var hiragana = ['A','B','C','D','E','F','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
	var romaji = ['a','i','u','e','o','ka','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','hu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','n'];
	var katakana = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'];
	var romaji2 = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','ma','mi','mu','me','mo','na','ni','nu','ne','no','ha','hi','fu','he','ho','n','wa','wo','ra','ri','ru','re','ro','ya','yu'];
// INTILAIzATION SETTINGS 
	var currentMode = "hiragana";
	var currentSet = hiragana;
	var currentFont = "hiragana_tfbregular";
	var currentRomaji = romaji;
// INITLIZATION - FIRST CHARACTER TO BE LOADED
	var i = Math.floor((Math.random() * 45));
	character.innerHTML = hiragana[i] + "<br>";
// ARRAY TO STORE RECENT CHARACTERS SO THAT CHARACTERS DONT REPEAT WITHIN 10 FLASHCARDS
	var recent = [null,null,null,null,null,null,null,null,null,null];





// FUNCTIONS
	function randomCharacter() {
		do {
			i = Math.floor((Math.random() * 45));
		} while (i == recent[0] || i == recent[1] || i == recent[2] || i == recent[3] || i == recent[4] || i == recent[5] || i == recent[6] || i == recent[7] || i == recent[8] || i == recent[9]);
		recent.shift();
		recent.push(i);
		return i;
	}

	function changeHiraganaAndKatakana() {
		if (currentMode == "hiragana") {
			currentSet = katakana;
			currentRomaji = romaji2;
			currentFont = "katakana_tfbregular";
			currentMode = "katakana";

			input.className = "katakana";
			button.className = "katakana";
			changeButton.className = "katakana";
			resetButton.className = "katakana";
			changeButton.innerHTML = "PRACTICE<br>HIRAGANA";
			logo[0].innerHTML = "Lilette's Katakana Practice";
			body[0].style.background = "#53DCFF";

			randomCharacter();
			character.style.fontFamily = currentFont;
			character.style.fontSize = "20rem";
			character.innerHTML = currentSet[i] + "<br>";
			button.disabled = false;
			input.focus();
			catPictures[0].style.display = "none";
			catPictures[1].style.display = "block";
			catPictures[2].style.display = "none";
		} else if (currentMode == "katakana") {
			currentSet = hiragana;
			currentRomaji = romaji;
			currentFont = "hiragana_tfbregular";
			currentMode = "hiragana";

			input.className = "hiragana";
			button.className = "hiragana";
			changeButton.className = "hiragana";
			resetButton.className = "hiragana";
			changeButton.innerHTML = "PRACTICE<br>KATAKANA";
			logo[0].innerHTML = "Lilette's Hiragana Practice";
			body[0].style.background = "#FF5C56";

			randomCharacter();
			character.style.fontFamily = currentFont;
			character.style.fontSize = "20rem";
			character.innerHTML = currentSet[i] + "<br>";
			button.disabled = false;
			input.focus();
			catPictures[0].style.display = "none";
			catPictures[1].style.display = "block";
			catPictures[2].style.display = "none";
		}
	}

	function gameLoop() {
		if (input.value == "" || isNaN(input.value) === false) {
			errorBox.style.display = "block";
			input.value = "";
			return;		
		} else {
			errorBox.style.display = "none";
			var guess = input.value;
		if (guess == currentRomaji[i]) {
			character.style.fontFamily = "japanese_brushregular";
			character.style.fontSize = "5.5rem";
			character.innerHTML = "Correct" + "<br><br>";
			correct = (correct + 1);
			total = (total + 1);
			percent = Math.floor(((correct / total) * 100)) + "%";
			numberBoxes[0].innerHTML = correct;
			numberBoxes[2].innerHTML = percent;
			input.value = "";
			button.disabled = true;
			catPictures[0].style.display = "block";
			catPictures[1].style.display = "none";
			// button.style.display = "none";
		} else if (guess != currentRomaji[i]) {
			character.style.fontFamily = "japanese_brushregular";
			character.style.fontSize = "4rem";
			character.innerHTML = "Wrong. The correct answer is " + currentRomaji[i];
			wrong = (wrong + 1);
			total = (total + 1);
			percent = Math.floor(((correct / total) * 100)) + "%";
			numberBoxes[1].innerHTML = wrong;
			numberBoxes[2].innerHTML = percent;
			input.value = "";
			button.disabled = true;
			catPictures[1].style.display = "none";
			catPictures[2].style.display = "block";
		}
		setTimeout(function(){ 
			randomCharacter();
			character.style.fontFamily = currentFont;
			character.style.fontSize = "20rem";
			character.innerHTML = currentSet[i] + "<br>";
			button.disabled = false;
			input.focus();
			catPictures[0].style.display = "none";
			catPictures[1].style.display = "block";
			catPictures[2].style.display = "none";
		}, 2000);
		
		return i;
		}
	}

	function resetStatistics() {
		correct = 0;
		wrong = 0;
		total = 0;
		percent = 0;
		numberBoxes[0].innerHTML = correct;
		numberBoxes[1].innerHTML = wrong;
		numberBoxes[2].innerHTML = 0;
	}



// EVENTS
// 1. button to change between hiragana and katakana font sets
	changeButton.addEventListener('click', function() {
		changeHiraganaAndKatakana();
	});
// 2. button to start the game loop
	button.addEventListener('click', function() {
		gameLoop();
	});
// 3. keypress of enter to start the gameloop
	window.addEventListener('keypress', function (e) {
	    if (e.which == 13) {
	    	gameLoop();
	    }
	});
// 4. button to reset the statistics
	resetButton.addEventListener('click', function(){
		resetStatistics();
	});


}