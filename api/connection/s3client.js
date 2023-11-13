const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');


// create S3 client 
const s3Client = new AWS.S3({
    accessKeyId: 'AKIA3E4KF3SX3IHXJJAC',
    secretAccessKey: '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',
    region: 'ap-south-1'
  });

  function uploadS3(filePath,fileDirectoryName,fileName)  {
    return new Promise((resolve, reject) => {
      
    try {
        // So you need to move the file on $filePath to a temporary place.
        if (!fs.existsSync(fileDirectoryName)) {
          fs.mkdirSync(fileDirectoryName, { recursive: true })
        }

        // Create temp file
        let tempFilePath = fileDirectoryName+'/' + path.basename(fileName);
        let tempfile = fs.open(tempFilePath, "w", function (err, f) {
        if (err) {
          return console.error(err);
        }
        console.log(f);
        fs.writeSync(f, filePath.buffer, 0, filePath.buffer.length, null,  function (err) {
            if (err)
              throw 'error writing file: ' + err;
            fs.close(f, function () {
              console.log('file written');
            });
          });
          console.log('file opened');
          let filepng = fs.readFileSync(tempFilePath);

          const uploadParams = {
            Bucket: 'canmart-db',
            Key: fileDirectoryName+'/'+fileName,
            Body: filepng,
          }
          s3Client.upload(uploadParams, function (err, data) {
            if (err) {
              throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            resolve(data.Location);
          })
        })
      } catch (error) {
          console.log(error);
          reject(error);
      }
    });  
  }

  module.exports = {
    uploadS3
}