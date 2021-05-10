const path = require('path');

const schema = path.join(__dirname, 'schema.gql');
const generated = path.join(__dirname, 'generated.ts');
const documents = path.join(__dirname, 'graphql/**/*.gql');

module.exports = {
  client: {
    service: {
      name: 'shopify',
      localSchemaFile: schema,
    },
    excludes: [generated],
    includes: [documents],
  },
};
