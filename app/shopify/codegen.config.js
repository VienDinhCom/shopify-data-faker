const envKit = require('env-kit');

const endpoint = envKit.get('SHOPIFY_GRAPHQL_ENDPOINT');
const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN');

module.exports = {
  overwrite: true,
  generates: {
    'app/shopify/generated.ts': {
      schema: [
        {
          [endpoint]: {
            headers: {
              'X-Shopify-Access-Token': accessToken,
            },
          },
        },
      ],
      documents: 'app/shopify/graphql/**/*.gql',
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};
