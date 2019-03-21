const splitPoem = require("./ravenSplit.json");

const cleanedPoem = poemIn => {
  console.log(typeof poemIn);
  //   return poemIn.words[6];
  const arrOut = { wordsOut: [] };

  let cleanedEntry = entryIn => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let tempEntry = "";
    for (let i = 0; i < entryIn.length; i++) {
      if (alphabet.indexOf(entryIn[i]) !== -1) {
        tempEntry += entryIn[i];
      }
    }
    if (
      tempEntry === "I" ||
      tempEntry === "Lenore" ||
      tempEntry === "December" ||
      tempEntry === "Aidenn"
    ) {
      return tempEntry;
    } else {
      return tempEntry.toLowerCase();
    }
  };

  poemIn.words.forEach(entry => {
    if (entry !== "") {
      arrOut.wordsOut.push(cleanedEntry(entry));
      console.log(cleanedEntry(entry));
    }
  });
  return arrOut;
};

// console.log(cleanedPoem(splitPoem));

const fs = require("fs");
let data = JSON.stringify(cleanedPoem(splitPoem));

fs.writeFileSync("./ravenCleaned.json", data, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
