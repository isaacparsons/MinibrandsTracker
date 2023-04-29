import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import AmazonS3URI from "amazon-s3-uri";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default class S3Service {
  s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region: "us-west-2" });
  }

  createUploadLink = async (name: string) => {
    const bucketParams = {
      Bucket: "minibrands-icon-bucket",
      Key: name,
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
