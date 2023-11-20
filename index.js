const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./src/router/user.router');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIAZGHOSMTDSH2DCFNU',
    secretAccessKey: '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',
    region: 'ap-south-1',
  });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', userRouter);

app.get('/', (req, res)=>{
    res.send("CRUD API - DynamoDb");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});