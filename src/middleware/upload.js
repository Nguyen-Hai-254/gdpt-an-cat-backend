import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "../../resources/")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;