const AWS = require('aws-sdk');
const s3Client = new AWS.S3();

const S3 = {
    async get(fileName,bucket){
        const params = {
            Bucket: bucket,
            Key: fileName
        };
        let data = await s3Client.getObject(params).promise();
        if(!data){
            throw new Error(`Failed to get file ${fileName} from bucket ${bucket}`);
        }
        // if(fileName.slice(fileName.length - 4, fileName.length) === "json"){
        //     data = data.Body.toString();
        // }
        data = data.Body.toString();
        return data;
    },
    async write(data,fileName,bucket,ACL,ContentType){
        const params = {
            Bucket: bucket,
            Body: Buffer.isBuffer(data) ? data : JSON.stringify(data),
            Key: fileName,
            ACL,
            ContentType
        };
        console.log('params',params);
        const newData = await s3Client.putObject(params).promise();
        if(!newData){
            throw new Error("There was error writing the file");
        }
        return newData;
    }
}
module.exports = S3;