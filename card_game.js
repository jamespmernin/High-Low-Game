const readlineSync = require('readline-sync');

// getInput() is a function that takes a `prompt` as an argument which
// is a question (string) to ask the user.
// the returning value of getInput() is a string of whatever the user has typed as the response

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

// YOUR CODE STARTS HERE!!

// STEP ONE - Building A Deck.
// 1. Use a function declaration to create a buildDeck function. [This has already been done for you].
// 2. Inside the buildDeck function, create an array called "suits" that lists all four suits from a deck of card as strings [This has already been done for you].
// 3. Inside the buildDeck function, create a 2nd array called "ranks" that lists all 13 cards from ace to King as strings. [This has already been done for you].
// 4. Inside the buildDeck function, create an empty array called "deck"
// 5. Inside the buildDeck function, create a for loop INSIDE of another for loop. The outer loop should loop through the ranks. The inner loop should loop through the suits. Make sure to use different variables for your iterators.
// 6. Inside your inner for loop, push your looped iterations of ranks and suits as OBJECTS into the empty deck array. Add a third property to this object with the key "value" and the value equal to the current iterator.
// HINT: The result of step 6 is that each card will be an object inside of the deck array, for example [{suit: "diamonds", rank: "A", value: 0}, {suit: "diamonds", rank: "2", value: 1},...{etc}]. For example, if we wanted to organize the players and teams of the NBA with index numbers, we could write: nba.push({player: players[i], team: teams[n], index: i})
// 7. After your loops, return deck, which should now return an array full of card objects if you were to run buildDeck().

function buildDeck() {
  const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
  const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  const deck = [];
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      let object = {
        suit: suits[j],
        rank: ranks[i],
        value: i
      };
      deck.push(object);
    }
  }
  return deck;
}

// STEP TWO - Shuffling your deck
// 1. use a function declaration to create a function called shuffle that takes deck as an argument.
// 2. Inside this function create a variable called "shuffledDeck" that takes deck as its value.
// 3. Using "let" declare three new variables: currentIndex, whos value should equal the length of the deck array, and two more: temporaryValue and randomIndex, each of which should currently have no value assigned.
// 4. Create a while loop whos condition is that "currentIndex" does not equal 0, so that we stop looping once we've gone through all 52 cards.
// 5. Inside the while loop, use the javascript Math.methods to generate a random integer between 0 and "currentIndex"
// 6. Inside the while loop, decrement current index by 1.
// 7. Inside the while loop, assign "temporaryValue" with "shuffledDeck" (which is an array) to the [currentIndex].
// 8. Still inside, assign "shuffledDeck[currentIndex]" a value of shuffledDeck to the [randomIndex]
// 9. Still inside, assign "shuffledDeck[randomIndex]" a value of "temporaryValue".
// 10. Review the code from steps 7,8, and 9, and leave a comment explaining what you believe those lines of code are doing as they swap assignments of values between them.
// 11. Finally, close the while loop and return "shuffledDeck". You should now be able to run shuffle(buildDeck()) in node and see your shuffled deck of cards.

function shuffle(deck) {
  let shuffledDeck = deck;
  let currentIndex = deck.length;
  let temporaryValue;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * 51);
    currentIndex--;
    // The three steps below allow for the deck to be given a random order, to simulate a deck of cards being shuffled
    temporaryValue = shuffledDeck[currentIndex];
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temporaryValue;
  }
  return shuffledDeck;
}

// STEP THREE - Greeting the player
// 1. Declare a function called greet()
// 2. Inside that function, declare a variable called "name" and use "getInput()" to welcome the user to the game, ask for their name, and assign their answer.
// 3. Console.log name
// 4. Return name
// 5. Done.

function greet() {
  console.log("Welcome to High-Low, an amazing card game!")
  let name = getInput("What's your name?");
  console.log(`Nice to meet you, ${name}!`);
  return name;
}

//greet();

// STEP FOUR - comparing cards
// 1. Declare a function called compare that takes two cards as arguments
// 2. Return the value property of the first card minus the value property of the second card.

function compare(currentCard, nextCard) {
  return currentCard.value - nextCard.value;
}

// STEP FIVE - Respond to User Guess
// 1. Declare a function called guess that takes two cards as arguments
// 2. console.log the rank and suit of the current card
// 3. Declare a variable called "input" that uses getInput() to ask the user if they think the next card will be higher (h) or lower (l) than their current card and stores the user's response.
// 4. Use a conditional statement to see if "input" equals "h" or "l".
// 5. If input equals h, return an expression that checks if the outcome of the compare function (using the same arguments as you used for guess) is a negative number.
// 6. If input equals l, check and see if it's a positive number.
// 7. If input doesn't equal h or l, tell the user that they need to guess either h or l and that they get no points for this round, then return false.

function guess(currentCard, nextCard) {
  console.log(`The current card is the ${currentCard.rank} of ${currentCard.suit} with value ${currentCard.value}!`);
  console.log(`The next card is the ${nextCard.rank} of ${nextCard.suit} with value ${nextCard.value}!`);
  let input = getInput("Will the next card be higher than, lower than, or the same as the current card? Type h for higher, l for lower, or s for same");
  if (input.toLowerCase() != 'h' && input.toLowerCase() != 'l' && input.toLowerCase() != 's') {
    console.log("Sorry! You did not enter a valid guess! You need to type h for higher, l for lower, or s for the same.");
    return false;
  } else if (input.toLowerCase() === 'h') {
    return (compare(currentCard, nextCard) < 0);
  } else if (input.toLowerCase() === 'l') {
    return (compare(currentCard, nextCard) > 0);
  } else {
    return (compare(currentCard, nextCard) === 0);
  }
}

// STEP SIX - Let's play!
// 1. Declare a function called playGame
// 2. Declare a variable called deck (it's okay to reuse -- remember scope!) that takes the result of the shuffle function. Remember that the shuffle function needs to take the results one of our other functions as its argument...
// 3. Declare a variable called playerName that takes the result of the greet function as its value.
// 4. Using let, declare a score variable that's currently set to the number zero
// 5. Use an array method on deck to remove the last object in deck. using let, declare a variable called currentCard and assign it this value.
// 6. Create a while loop whos conditions are that the score is less than five or less than the amount of items still in the deck array.
// 7. Inside the while loop, use an array method on deck to remove the last object and assign that value to a variable named nextCard.
// 8. Inside the while loop, create a conditional statement. If the outcome of guess is true, increment the score by 1, congratulate the user, and tell them their score. If it's false, tell them they were wrong and got no points.
// 9. Close the conditional statement and assign nextCard to currentCard. You may have to write this as the type of variable that's always global...
// 10. Close the while loop and use a ternary statement that checks if the length of the deck array has reached zero. If it has not, tell the user that they won. If it has reached zero, tell them that they're out of cards and they lost.
// 11. Write a line of code to execute the playGame function.

function playGame() {
  let deck = shuffle(buildDeck());
  let playerName = greet();
  let score = 0;
  const winningScore = 5;
  let currentCard = deck.pop();
  while (score < winningScore || score < deck.length) {
    let nextCard = deck.pop();
    if (guess(currentCard, nextCard)) {
      score++;
      console.log(`Congratulations! Your guess was correct! Your score is ${score}!`);
    } else {
      console.log(`Too bad! Your guess was incorrect and you got no points! Your score is still ${score}!`);
    }
    currentCard = nextCard;
    console.log(score);
  }
  (deck.length != 0) ? console.log("You won!") : console.log("You're out of cards! You lose!");
}

playGame();