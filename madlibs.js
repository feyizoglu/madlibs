/**

 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *

 
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/

 */

function parseStory(rawStory) {
  const turnedObject = {
    n: "noun",
    v: "verb",
    a: "adjective",
  };

  let wordsArray = rawStory.split(/\s|\]/);
  wordsArray = wordsArray.filter((item) => item !== "");
  console.log(wordsArray);

  let regEx = /^\w+(?:...[n|a|v])/;

  let wordsObj = [];
  for (let i = 0; i < wordsArray.length; i++) {
    if (regEx.test(wordsArray[i])) {
      let word = wordsArray[i].match(regEx)[0];
      let pos = word.slice(word.length - 1, word.length);
      pos = turnedObject[pos];
      word = word.slice(0, word.length - 2);

      wordsObj.push({ word: word, pos: pos });
    } else {
      word = wordsArray[i];
      wordsObj.push({ word: word });
    }
  }
  // firstDiv(wordsObj);
  console.log(wordsObj);
}

function firstDiv(arr) {
  const sentence = document.createElement("p");
  const storyDiv = document.querySelector(".madLibsEdit");
  sentence.innerHTML = arr[word].join();
  storyDiv.appendChild(sentence);
}
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
