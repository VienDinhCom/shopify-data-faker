import * as _ from 'lodash';
import { shopify } from './shopify';

async function getAllProducts() {
  interface Product {
    id: string;
    cursor: string;
  }

  let hasNextPage = true;
  let products: Product[] = [];
  let cursor: string = undefined;

  while (hasNextPage) {
    const page = await shopify.resolved(() => {
      const connection = shopify.query.products({ first: 100, after: cursor });
      const products = connection.edges.map(({ node, cursor }) => ({
        id: node.id,
        cursor,
      }));

      const { hasNextPage } = connection.pageInfo;

      return { products, hasNextPage };
    });

    products = products.concat(page.products);
    hasNextPage = page.hasNextPage;

    if (products[products.length - 1]) {
      cursor = products[products.length - 1].cursor;
    }
  }

  return products.map(({ id }) => ({
    id,
  }));
}

async function deleteAllProducts() {
  const products = await getAllProducts();

  const chunks = _.chunk(products, 50);

  for (const chunk of chunks) {
    await shopify.resolved(() => {
      return chunk.map(({ id }) => {
        return shopify.mutation.productDelete({
          input: {
            id,
          },
        }).deletedProductId;
      });
    });
  }

  console.log('Deleted all products');
}

(async () => {
  await deleteAllProducts();
})();
