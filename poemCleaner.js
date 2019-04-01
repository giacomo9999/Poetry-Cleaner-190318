const poem = require("./annabelLeeRaw.js");

const splitPoem = poem.split(" ");

const cleanedPoem = poemIn => {
  const arrOut = { wordsOut: [] };

  let cleanedEntry = entryIn => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (
      entryIn === "I" ||
      entryIn === "Lenore" ||
      entryIn === "December" ||
      entryIn === "Aidenn" ||
      entryIn === "Annabel" ||
      entryIn === "Lee" ||
      entryIn === "night-tide"
    ) {
      return entryIn;
    } else {
      let tempEntry = "";
      for (let i = 0; i < entryIn.length; i++) {
        if (alphabet.indexOf(entryIn[i]) !== -1) {
          tempEntry += entryIn[i];
        }
      }
      return tempEntry.toLowerCase();
    }
  };

  poemIn.forEach((entry, index) => {
    if (cleanedEntry(entry) === "" || cleanedEntry(entry) === " ") {
      // console.log(index, "-Empty string.");
    } else if (cleanedEntry(entry) === "zzz") {
      arrOut.wordsOut.push("");
    } else {
      arrOut.wordsOut.push(cleanedEntry(entry));
    }
  });
  return arrOut;
};

const extractLastSyllable = wordIn => {
  if (wordIn === "") {
    return "--";
  }
  if (wordIn === "you") {
    return "oo";
  }
  if (wordIn.length === 1) {
    return wordIn;
  }

  const vowels = "aeiouy";
  function isVowel(letter) {
    return vowels.indexOf(letter) !== -1;
  }

  let lastSyl = wordIn[wordIn.length - 1];
  const lastLetterIsVowel = isVowel(lastSyl);

  for (let i = wordIn.length - 2; i >= 0; i--) {
    if (
      (isVowel(wordIn[i]) && lastLetterIsVowel) ||
      (!isVowel(wordIn[i]) && !lastLetterIsVowel)
    ) {
      lastSyl = wordIn[i] + lastSyl;
    } else {
      lastSyl = wordIn[i] + lastSyl;
      return lastSyl;
    }
  }
};

let splitAndCleaned = cleanedPoem(splitPoem);
const poemByPairs = { wordPairs: [] };
splitAndCleaned.wordsOut.forEach(entry => {
  poemByPairs.wordPairs.push({ [entry]: extractLastSyllable(entry) });
});

console.log(poemByPairs);
const fs = require("fs");
let data = JSON.stringify(poemByPairs);

fs.writeFileSync("./annabelLeeCleaned.json", data, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
