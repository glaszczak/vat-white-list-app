const fs = require("fs");

const directory = `./files`

// isFile(directory, "nipss.txt")

console.log(fs.readdir(__dirname))


function isFile(filePath, fileName) {

    let ans

    // Check if file exist
    fs.access(`${filePath}/${fileName}`, (err) => {
        if (err) {
            ans = false
        } else {
            ans = true
        }
    })
}