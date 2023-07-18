import * as AWS from 'aws-sdk';

export class S3Wrapper {
  private s3: AWS.S3;

  constructor(private readonly region: string = 'eu-west-1') {
    this.s3 = new AWS.S3({ region });
  }

  async uploadFile(bucketName: string, key: string, file: Buffer): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: key,
      Body: file,
    };

    const response = await this.s3.upload(params).promise();
    return response.Location;
  }

  async downloadFile(bucketName: string, key: string): Promise<Buffer> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    const response = await this.s3.getObject(params).promise();
    return response.Body as Buffer;
  }
}
