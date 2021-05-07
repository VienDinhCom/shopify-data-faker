const envKit = require('env-kit');

/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: envKit.get('SHOPIFY_GRAPHQL_ENDPOINT'),
    headers: {
      'X-Shopify-Access-Token': envKit.get('SHOPIFY_ACCESS_TOKEN'),
    },
  },
  destination: './src/shopify/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
