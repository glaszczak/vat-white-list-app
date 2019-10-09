const directory = `${filePath}/files`

console.log(isFile(directory, "nip.txt"))


function isFile(filePath, fileName) {

    fs.readdir(filePath, (err, files) => {
        if (err) throw err
        fs.unlink(path.join(filePath, fileName), err => {
            if (err) throw err
        })
    })
}