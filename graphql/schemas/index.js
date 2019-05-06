const path = require('path');
const { buildSchema } = require('graphql');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const types = fileLoader(path.join(__dirname, './types'));

module.exports = buildSchema(mergeTypes(types, { all: true}));