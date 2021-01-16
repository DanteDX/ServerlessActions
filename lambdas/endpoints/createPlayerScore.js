const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const {withHooks,hooksWithValidation} = require("../common/hooks");
const yup = require("yup");
const tableName = process.env.tableName; // this is defined in serverless.yml

const bodySchema = yup.object().shape({
    name: yup.string().required(),
    score: yup.number().required()
});
const pathSchema = yup.object().shape({
    ID: yup.string().required()
});

const handler = async (event) =>{
    // we don't need this check as pathSchema will already validate this
    // if(!event.pathParameters.ID){
    //     return Responses._400({msg:'Missing ID'});
    // }
    let ID = event.pathParameters.ID;
    const user = event.body;
    user.ID = ID;
    const newUser = await Dynamo.write(user,tableName);
    if(!newUser){
        return Responses._400({message:"Failed to write user by ID"});
    }
    return Responses._200({newUser});
};

exports.handler = hooksWithValidation({bodySchema,pathSchema})(handler);
/* Before adding hooks,
const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName; // this is defined in serverless.yml

exports.handler = async (event) =>{
    console.log('event',event);

    if(!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({msg:'Missing ID'});
    }
    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);
    user.ID = ID;
    const newUser = await Dynamo.write(user,tableName).catch(err =>{
        console.log("Error in DynamoDB write", err);
        return null;
    });
    if(!newUser){
        return Responses._400({message:"Failed to write user by ID"});
    }
    return Responses._200({newUser});
};
*/
