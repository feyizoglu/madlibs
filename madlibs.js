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
  let firstId = 0;
  for (let i = 0; i < wordsArray.length; i++) {
    if (regEx.test(wordsArray[i])) {
      firstId++;
      let word = wordsArray[i].match(regEx)[0];
      let pos = word.slice(word.length - 1, word.length);
      pos = turnedObject[pos];
      word = word.slice(0, word.length - 2);

      wordsObj.push({ word: word, pos: pos, id: firstId });
    } else {
      word = wordsArray[i];
      wordsObj.push({ word: word });
    }
  }
  arrangeDiv(wordsObj);
  console.log(wordsObj);
}

function arrangeDiv(arr) {
  const storyDiv = document.querySelector(".madLibsEdit");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pos) {
      storyDiv.innerHTML += `<input id=${arr[i].id} placeholder=${arr[i].pos}> `;
    } else {
      storyDiv.innerHTML += arr[i].word + " ";
    }
  }

  // const input = document.querySelector("input");
  // const log = document.getElementById("values");
  // input.addEventListener("input", updateValue);
  // function updateValue(e) {
  //   log.textContent = e.target.value;
  // }

  const storyDiv2 = document.querySelector(".madLibsPreview");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pos) {
      let input = document.getElementById(`${arr[i].id}`);
      input.addEventListener("input", updateValue);
      function updateValue(e) {
        storyDiv2.innerHTML += e.target.value;
      }
    } else {
      storyDiv2.innerHTML += arr[i].word + " ";
    }
  }
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
