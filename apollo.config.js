const envKit = require('env-kit');

module.exports = {
  client: {
    service: {
      name: 'shopify',
      url: envKit.get('SHOPIFY_GRAPHQL_ENDPOINT'),
      headers: {
        'X-Shopify-Access-Token': envKit.get('SHOPIFY_ACCESS_TOKEN'),
      },
    },
    excludes: ['**/node_modules/**/*'],
    includes: ['app/graphql/**/*.gql'],
  },
};
