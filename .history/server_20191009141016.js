const fs = require("fs");

const directory = `./files`

console.log(isFile(directory, "nip.txt"))


function isFile(filePath, fileName) {

    let ans

    fs.access(`${filePath}/${fileName}`, (err) => {
        console.log(`${filePath}/${fileName}`)
        console.log(err)
    })

    // fs.readdir(filePath, (err, files) => {
    //     if (err) throw err
    //     fs.unlink(path.join(filePath, fileName), err => {
    //         if (err) throw err
    //     })
    // })
}