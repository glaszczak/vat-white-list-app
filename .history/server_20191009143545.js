const fs = require("fs");

const directory = `./files`

isFile(directory, "nipss.txt")
readFiles()


// Read all files in direction
function readFiles() {

    fs.readdir(__dirname, (err, files) => {
        console.log("error", err)
        console.log('Files: ', files)
    })

}

// Check if file exist
function isFile(filePath, fileName) {
    let ans
    fs.access(`${filePath}/${fileName}`, (err) => {
        if (err) {
            ans = false
        } else {
            ans = true
        }
    })
}