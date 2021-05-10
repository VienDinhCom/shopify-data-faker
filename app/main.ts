import { shopify } from './shopify';

(async () => {
  const { products } = await shopify.products();

  console.log(products);
})();
