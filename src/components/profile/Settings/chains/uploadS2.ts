import AWS from 'aws-sdk'
import os from 'os'

export const uploadFileToS3 = async (file: File): Promise<string> => {
  // Configure AWS SDK with your credentials and region
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })

  // Create an instance of the S3 service
  const s3 = new AWS.S3()

  // Set the S3 bucket name and file key (path)
  const bucketName = 'cards'
  const fileKey = `uploads/${file.name}`

  // Create the upload parameters
  const uploadParams: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
    ACL: 'public-read' // Set the appropriate ACL for your use case
  }

  // Upload the file to S3
  const uploadResult = await s3.upload(uploadParams).promise()

  // Return the public URL of the uploaded file
  return uploadResult.Location
}
