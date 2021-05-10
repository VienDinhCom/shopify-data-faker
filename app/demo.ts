import * as faker from 'faker';
import { Article, Data, shopify } from './shopify-rest';

async function getBlog(handle: string) {
  const { blogs } = await shopify.get<Data>('/blogs.json').then(({ data }) => data);
  return blogs.find((blog) => blog.handle === handle);
}

async function createArticle() {
  const article: Article = {
    title: 'Test',
    body_html: 'Test Test',
    image: {
      src: faker.image.city(1600, 900),
      alt: 'Rails logo',
    },
  };

  const blog = await getBlog('news');

  const data = await shopify
    .post<Data>(`/blogs/${blog.id}/articles.json`, { article })
    .then(({ data }) => data);

  return data;
}

(async () => {
  const { article } = await createArticle();

  console.log(article);
})();
