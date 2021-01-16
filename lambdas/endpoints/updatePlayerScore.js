const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const {withHooks,hooksWithValidation} = require("../common/hooks");
const yup = require("yup");
const tableName = process.env.tableName; // this is defined in serverless.yml

const bodySchema = yup.object().shape({
    // name: yup.string().required(),
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
    const {score} = event.body;
    // user.ID = ID;
    const res = await Dynamo.update({
        tableName,
        primaryKey: "ID",
        primaryKeyValue:ID,
        updateKey: "score",
        updateValue: score
    });
    return Response._200({});
};

exports.handler = hooksWithValidation({bodySchema,pathSchema})(handler);