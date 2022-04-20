import { UploadedFile } from '@nestjs/common';
import { S3 } from 'aws-sdk';

export class UploadService {
  async uploadFileS3(@UploadedFile() file: Express.Multer.File) {
    const s3 = new S3();
    const name = `${new Date().getTime()}-${file.originalname}`;
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: file.buffer,
        Key: name,
        ContentEncoding: 'base64',
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    return {
      data: uploadResult.Location,
      message: '',
      error: {},
    };
  }
}
