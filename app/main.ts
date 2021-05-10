import { shopify } from './shopify';

(async () => {
  const { products } = await shopify.getProducts();

  console.log(products.edges);
})();
