import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { ObjectIdentifier } from "aws-sdk/clients/s3";

interface ResponseProp {
    url: string;
    key: string;
}

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
        console.log(files);
        let locationArray: Array<ResponseProp> = []
        for (let i = 0; i < files.length; i++) {
            locationArray.push({ url: files[i].location, key: files[i].key });
        }
        res.json({ locationArray });
    })
}

export const deleteObject = (objects: Array<ObjectIdentifier>) => {
    if (objects) {
        s3.deleteObjects({
            Bucket: "testalk",
            Delete: {
                Objects: objects
            }
        }, (error, data) => {
            if (error) {
                console.log(error)
                return;
            }
        })
    }
}