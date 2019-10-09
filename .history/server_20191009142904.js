const fs = require("fs");

const directory = `./files`

isFile()

function isFile(filePath, fileName) {

    let ans

    // Check if file exist
    fs.access(`${filePath}/${fileName}`, (err) => {
        console.log(`${filePath}/${fileName}`)
        if (err) {
            ans = false
        } else {
            ans = true
        }

        console.log(ans)

    })

    // fs.readdir(filePath, (err, files) => {
    //     if (err) throw err
    //     fs.unlink(path.join(filePath, fileName), err => {
    //         if (err) throw err
    //     })
    // })
}