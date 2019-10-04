const axios = require("axios");
const readline = require("readline");



async function getDataFromFileAsJSON() {
  try {
    let resData = [];

    //add each line into array
    resData = fs.readFileSync("public/text.txt", "utf-8").split("\r\n");

    resData.forEach(e => console.log(e))
    //console.log(resData)

    /*
        const rd = readline.createInterface({
            input: fs.createReadStream('public/text.txt')
        });

        const results = await rd.on('line', (line) => {
            resData.push(JSON.parse(line.toString().split('\r\n')))
        });
        */
  } catch (e) {
    return [];
  }
}

module.exports.getDataFromFileAsJSON = getDataFromFileAsJSON;