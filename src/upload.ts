import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: "ap-northeast-2"
});

const uploadMiddleWare = () => {
    const upload = multer({
        storage: multerS3({
            s3,
            bucket: "testalk",
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname })
            },
            key: function (req, file, cb) {
                cb(null, Date.now().toString());
            }
        })
    })
    return upload.array("file", 5);
}

export const uploadController = (req, res) => {
    const upload = uploadMiddleWare();
    upload(req, res, next => {
        if (next) {
            //Error handle
            console.log(next);
            return;
        }
        const { files } = req;
        let locationArray: Array<any> = []
        for (let i = 0; i < files.length; i++) {
            locationArray.push(files[i].location);
        }
        res.json({ locationArray });
    })
}