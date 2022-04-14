import { IFileUploaderProvider, ISaveFileDTO } from '../IFileUploaderProvider';
import * as uuid from 'uuid';
import { S3 } from 'aws-sdk';

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'somekey';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'somesecret';
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'somebucket';

const s3 = new S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export class Aws implements IFileUploaderProvider {
  saveFile = async (data: ISaveFileDTO): Promise<{ fileName: string }> => {
    const fileName = `${uuid.v4().split('-')[0]}.${data.fileExt}`;

    await s3
      .upload({
        Bucket: AWS_BUCKET_NAME,
        Body: data.fileBuffer,
        Key: `${data.dirPath}/${fileName}`,
        ContentType: data.mimetype,
      })
      .promise();

    return { fileName };
  };

  removeFile = async (relativePath: string): Promise<void> => {
    try {
      await s3
        .deleteObject({
          Bucket: AWS_BUCKET_NAME,
          Key: relativePath,
        })
        .promise();
    } catch (error) {
      console.error(
        `AWS_S3_DELETE_OBJECT: ${
          error instanceof Error ? error.message : 'erro desconhecido'
        }`
      );
      return;
    }
  };
}
