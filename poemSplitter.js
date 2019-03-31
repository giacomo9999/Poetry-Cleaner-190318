const poem = require("./dreamLandRaw.js");

const splitPoem = { words: poem.split(" ") };
console.log(splitPoem);

const fs = require("fs");

let data = JSON.stringify(splitPoem);

fs.writeFileSync("./dreamSplit.json", data, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
