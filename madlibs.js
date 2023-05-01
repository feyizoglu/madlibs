function parseStory(rawStory) {
  //Using this Object creating array of object(wordsObj)
  const turnedObject = {
    n: "noun",
    v: "verb",
    a: "adjective",
  };
  let wordsArray = rawStory.split(/\s|\]/);
  wordsArray = wordsArray.filter((item) => item !== "");
  // console.log(wordsArray);
  document.title = "Simple is the Best!";
  let regEx = /^\w+(?:...[n|a|v])/;
  let wordsObj = []; //objects of sentence
  let inputArr = []; //inputs of sentence
  let firstId = 0; //giving id's to inputs

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
  console.log(wordsObj);

  console.log(
    wordsObj[
      wordsObj.findIndex((item) => {
        return item.id === 1;
      })
    ].pos
  );

  //Creating inputs array(12 elements)
  for (let i = 0; i < wordsArray.length; i++) {
    if (regEx.test(wordsArray[i])) {
      inputArr.push(wordsObj[i]);
    }
  }
  console.log(inputArr);

  arrangeFirstDiv(wordsObj); //Creating First Div
  arrangeSecondDiv(wordsObj); //Creating Second Div

  //Using function adding values of input to Second Div
  for (let i = 1; i <= inputArr.length; i++) {
    valueTake(i, wordsObj);
  }
}

//value changing function
function valueTake(num, arr) {
  let input = document.getElementById(num);

  //Focusing An element and adding background class
  input.addEventListener("focus", () => {
    input.className = "now";
  });
  input.addEventListener("blur", updateValue); // quit focusing
  input.addEventListener("input", updateValue);

  function updateValue(e) {
    if (e.target.value) {
      document.getElementById(`a${num}`).innerText = e.target.value;
      document.getElementById(`a${num}`).className = "black";
      input.className = "filled"; //background class
    } else {
      document.getElementById(`a${num}`).innerText = `${
        arr[
          arr.findIndex((item) => {
            return item.id === num;
          })
        ].pos
      }`;
      document.getElementById(`a${num}`).className = "output";
      input.className = "empty"; //background class
    }
  }
  input.addEventListener("keypress", nextInput);
  function nextInput(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById(num + 1).focus();
    }
  }
}

//Creating first div function
function arrangeFirstDiv(arr) {
  const storyDiv = document.querySelector(".madLibsEdit");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pos) {
      storyDiv.innerHTML += `<input class='first-sit' type='text' maxlength="20" id=${arr[i].id} placeholder=${arr[i].pos}> `;
    } else {
      storyDiv.innerHTML += arr[i].word + " ";
    }
  }
}

//Creating second div function
function arrangeSecondDiv(arr) {
  const storyDiv2 = document.querySelector(".madLibsPreview");
  numId = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pos) {
      numId++;
      let para = `<i class='output' id=a${numId}>${arr[i].pos}</i> `;
      storyDiv2.innerHTML += para;
    } else {
      storyDiv2.innerHTML += arr[i].word + " ";
    }
  }
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
