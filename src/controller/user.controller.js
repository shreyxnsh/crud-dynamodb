const User = require('../model/user.model');
const AWS = require('aws-sdk');
require('dotenv').config();


const TABLE_NAME = 'crudapi'; // Replace with your DynamoDB table name
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

const createUser = async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const user = new User(name, email, contact);

    const params = {
      TableName: TABLE_NAME,
      Item: user,
    };

    await dynamoDB.put(params).promise();
    console.log('User created successfully:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);

    // Log the specific error details
    console.error('Error details:', JSON.stringify(error, null, 2));

    res.status(500).json({ error: 'Could not create user. Internal server error.' });
  }
};

const getUsers = async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    res.status(200).json(result.Items);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Could not get users' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #name = :name, #email = :email, #contact = :contact',
    ExpressionAttributeNames: { '#name': 'name', '#email': 'email', '#contact': 'contact' },
    ExpressionAttributeValues: { ':name': name, ':email': email, ':contact': contact },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDB.update(params).promise();
    console.log('User updated successfully:', user);
    res.status(200).json(result.Attributes);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Could not update user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(204).send("User deleted successfully");
    return; // Exit the function after sending the response
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Could not delete user' });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
