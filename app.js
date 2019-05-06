const express = require('express');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');

const auth = require('./middlewares/auth');
const schema = require('./graphql/schemas');
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

app.use(auth);

app.use('/graphql', graphqlHttp({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  customFormatErrorFn(err) {
    if(!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'An error occurred';
    const code = err.originalError.code || 500;
    return { message: message, status: code, data: data };
  }
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