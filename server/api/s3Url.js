const aws = require("aws-sdk");
const crypto = require("crypto");
const router = require("express").Router();
require("dotenv").config();

const region = "us-east-1";
const bucketName = "capstone-loopedin";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//connect to the s3 bucket in AWS
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

//send a secure URL to the client to upload images to the bucket
const generateUploadURL = async () => {
  const imageName = crypto.randomBytes(16).toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

// route to get a secure URL back
// url: /s3Url
router.get("/", async (req, res, next) => {
  try {
    // Is await needed here?
    const url = await generateUploadURL();
    res.send({ url });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
