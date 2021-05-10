const path = require('path');
const envKit = require('env-kit');

const endpoint = envKit.get('SHOPIFY_GRAPHQL_ENDPOINT');
const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN');

const generated = path.join(__dirname, 'generated.ts');
const documents = path.join(__dirname, 'graphql/**/*.gql');

module.exports = {
  overwrite: true,
  generates: {
    [generated]: {
      schema: [
        {
          [endpoint]: {
            headers: {
              'X-Shopify-Access-Token': accessToken,
            },
          },
        },
      ],
      documents,
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};
