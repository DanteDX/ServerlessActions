const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const {withHooks} = require("../common/hooks");

const tableName = process.env.tableName; // this is defined in serverless.yml

const handler = async (event) =>{

    if(!event.pathParameters.game){
        return Responses._400({msg:'Missing game'});
    }
    let game = event.pathParameters.game;

    const gamePlayers = await Dynamo.query({
        tableName,
        index: 'game-index', // as defined in the serverless.yml file
        queryKey: 'game',
        queryValue: game // defined in the pathParameters
    });
    return Responses._200(gamePlayers);    
};
exports.handler = withHooks(handler);
