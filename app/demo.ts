import { shopify } from './shopify-rest';

(async () => {
  const { blogs } = await shopify.get('/blogs.json').then(({ data }) => data);

  console.log(blogs);
})();
