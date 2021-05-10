const envKit = require('env-kit');

const endpoint = envKit.get('SHOPIFY_GRAPHQL_ENDPOINT');
const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN');

module.exports = {
  client: {
    service: {
      name: 'shopify',
      url: endpoint,
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    },
    excludes: ['graphql.ts'],
    includes: ['graphql/**/*.gql'],
  },
};
