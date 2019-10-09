const fs = require("fs");

const directory = `./files`

// isFile(directory, "nipss.txt")
readFiles()


function readFiles() {

    fs.readdir(__dirname, (err, files) => {
        console.log("error", err)
        console.log('Files: ', files)
    })

}


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