const axios = require("axios");
const readline = require("readline");
const fs = require("fs");



function getDataFromFileAsJSON() {

  let resData = [];

  //add each line into array
  resData = fs.readFileSync("public/text.txt", "utf-8").split("\r\n");
  resData.forEach(e => console.log(e))

  // const rd = readline.createInterface({
  //   input: fs.createReadStream('public/text.txt')
  // });

  // const results = await rd.on('line', (line) => {
  //   resData.push(JSON.parse(line.toString().split('\r\n')))
  // });

}

module.exports.getDataFromFileAsJSON = getDataFromFileAsJSON;