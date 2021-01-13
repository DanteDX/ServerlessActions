const Responses = require("../common/API_RESPONSES");
exports.handler = async(event) =>{
    console.log(event);
    if(!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message:"No ID parameter is provided"});
    }
    let ID = event.pathParameters.ID;
    if(!data[ID]){
        return Responses._400({message:"Given ID doesn't have any data"});
    }
    if(data[ID]){
        return Responses._200(data[ID]);
    }
}

const data = {
    "D01":{name:"Jarif",age:10,roll:"D01",profession:"engineer"},
    "D02":{name:"Shukhon",age:20,roll:"D02",profession:"physicist"},
    "D03":{name:"Piyal",age:30,roll:"D03",profession:"web Developer"}
}