const express = require('express');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
})

app.use('/graphql', graphqlHttp({
  schema: schema,
  rootValue: resolvers
}));

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message, errors: error});
})

mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@standincluster-y4p0j.mongodb.net/standIn?retryWrites=true`, {useNewUrlParser: true})
  .then(res => {
    app.listen(process.env.PORT || 8080)
  })
  .catch(err => console.log(err));