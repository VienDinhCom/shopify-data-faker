import envKit from 'env-kit';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const endpoint = envKit.get('SHOPIFY_GRAPHQL_ENDPOINT') as string;
const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN') as string;

(async () => {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Access-Token': accessToken,
    },
  });

  const shopify = getSdk(client);

  const { products } = await shopify.products();

  console.log(products);
})();
