const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const Dynamo = {
    async get(ID, TableName){
        const params = {
            TableName,
            Key:{
                ID
            }
        };
        const data = await documentClient.get(params).promise();
        if(!data || !data.Item){
            throw new Error(`Error from ID ${ID} , TableName ${TableName}`);
        }
        console.log('data',data);
        return data.Item;
    },
    async write(data, TableName){
        if(!data.ID){
            throw new Error('No ID in the data');
        }
        const params = {
            TableName,
            Item: data
        };
        const res = await documentClient.put(params).promise();
        if(!res){
            throw new Error('There was Error with ID ${data.ID} and TableName ${TableName}');
        }
        return data;
    },
    async update({tableName,primaryKey,primaryKeyValue,updateKey,updateValue}){
        const params = {
            TableName: tableName,
            Key: {[primaryKey]: primaryKeyValue},
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues:{
                ':updateValue': updateValue
            }
        };
        return documentClient.update(params).promise();
    },
    async query({tableName,index,queryKey,queryValue}){
        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues:{
                ':hkey': queryValue
            }
        };
        const res = await documentClient.query(params).promise();
        return res.Items || [];
    },
    async scan({tableName,filterExpression,expressionAttributes}){
        const params = {
            TableName: tableName,
            FilterExpression: filterExpression,
            ExpressionAttributeValues: expressionAttributes
        };
        const res = await documentClient.scan(params).promise();
        return res.Items || [];
    }
    
};
module.exports = Dynamo;