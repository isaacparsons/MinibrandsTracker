import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import AmazonS3URI from "amazon-s3-uri";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default class S3Service {
  s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.REGION });
  }

  createUploadLink = async (name: string) => {
    const id = Math.random().toString(16).slice(2);
    const bucketParams = {
      Bucket: process.env.MINIBRANDS_ICONS_S3_BUCKET_NAME,
      Key: name + id,
      ContentType: "image/*"
    };
    const command = new PutObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600
    });
    return signedUrl;
  };

  deleteIcon = async (imgUrl: string) => {
    const { bucket, key } = new AmazonS3URI(imgUrl);
    if (!bucket || !key) throw new Error(`Bucket or key does not exist for url: ${imgUrl}`);
    const bucketParams = {
      Bucket: bucket,
      Key: key,
      ContentType: "image/*"
    };
    const command = new DeleteObjectCommand(bucketParams);
    const response = await this.s3Client.send(command);
    return response;
  };
}
