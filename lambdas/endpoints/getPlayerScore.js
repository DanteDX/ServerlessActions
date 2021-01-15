const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const {withHooks} = require("../common/hooks");

const tableName = process.env.tableName; // this is defined in serverless.yml

const handler = async (event) =>{

    if(!event.pathParameters.ID){
        return Responses._400({msg:'Missing ID'});
    }
    let ID = event.pathParameters.ID;
    const user = await Dynamo.get(ID,tableName);
    if(!user){
        return Responses._400({msg:'No user found with this ID'});
    }
    if(user){
        return Responses._200({user});
    }
};
exports.handler = withHooks(handler);
/* before adding hooks,
const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName; // this is defined in serverless.yml

exports.handler = async (event) =>{
    console.log('event',event);

    if(!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({msg:'Missing ID'});
    }
    let ID = event.pathParameters.ID;
    const user = await Dynamo.get(ID,tableName).catch(err =>{
        console.log('Error in dynamo',err);
        return null;
    })
    if(!user){
        return Responses._400({msg:'No user found with this ID'});
    }
    if(user){
        return Responses._200({user});
    }
};

*/
