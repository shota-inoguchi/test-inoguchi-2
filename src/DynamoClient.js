// src/DynamoClient.js
import AWS from 'aws-sdk';
import awsConfig from './aws--config';

AWS.config.update(awsConfig);

const dynamoDb = new AWS.DynamoDB.DocumentClient();
export default dynamoDb;
