const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

class User {
  constructor(name, email, contact) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.contact = contact;
  }
}

module.exports = User;
