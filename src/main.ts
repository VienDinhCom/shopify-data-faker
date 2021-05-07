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
    cursor = products[products.length - 1].cursor;
  }

  return products.map(({ id }) => ({
    id,
  }));
}
