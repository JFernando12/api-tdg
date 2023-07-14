import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY } from '../config/envs';

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'api-tdg',
    contentType: function (req, file, cb) {
      cb(null, 'image/jpeg');
    },
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const uploadImage = () => {
  return upload.single('image');
};

export { uploadImage };
