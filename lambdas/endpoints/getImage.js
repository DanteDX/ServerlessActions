const Responses = require("../common/API_RESPONSES");
const S3 = require("../common/S3");

const bucket = process.env.imageUploadBucket;

exports.handler = async (event) =>{
    console.log("event", event);
    if(!event.pathParameters || !event.pathParameters.fileName){
        return Responses._400({message:"Missing filename"});
    }
    let fileName = event.pathParameters.fileName;

    const file = await S3.get(fileName,bucket).catch(err =>{
        console.log("error in S3 get",err);
        return null;
    });
    if(!file){
        return Responses._400({message:"Failed to read data by fileName"});
    }
    return Responses._200({file});
}