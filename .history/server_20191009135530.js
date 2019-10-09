console.log(deleteFile())


function deleteFile(filePath, fileName) {

    //const directory = `${filePath}/${fileName}`
    fs.readdir(filePath, (err, files) => {
        if (err) throw err
        fs.unlink(path.join(filePath, fileName), err => {
            if (err) throw err
        })
    })
}