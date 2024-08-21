import AWS from "aws-sdk";
import "dotenv/config";
import crypto from "crypto";
import { promisify } from "util";
import path from "path";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const randomBytes = promisify(crypto.randomBytes);

export async function generateUploadURL(fileName) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const extension = path.extname(fileName);
  const key = `${imageName}${extension}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Expires: 60,
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
  } catch (error) {
    console.log(error);
  }
}
