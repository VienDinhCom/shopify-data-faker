import * as _ from 'lodash';
import * as faker from 'faker';
import { Article, Data, shopify } from './shopify-rest';

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

async function getBlog(handle: string) {
  const { blogs } = await shopify.get<Data>('/blogs.json').then(({ data }) => data);
  return blogs.find((blog) => blog.handle === handle);
}

async function createArticle() {
  const input: Article = {
    title: faker.lorem.sentence(),
    body_html: _.range(_.random(5, 10))
      .map(() => `<p>${faker.lorem.paragraph()}</p>`)
      .join('\n'),
    image: {
      src: 'http://placeimg.com/1600/900',
      alt: faker.lorem.sentence(),
    },
  };

  const blog = await getBlog('news');

  const { article } = await shopify
    .post<Data>(`/blogs/${blog?.id}/articles.json`, { article: input })
    .then(({ data }) => data);

  return article.title;
}

(async () => {
  try {
    const total = 60;

    for (const step of _.range(total / 5)) {
      const each = total / (total / 5);
      const requests = _.range(each).map(() => createArticle());

      const articles = await Promise.all(requests);

      console.log(`${(step + 1) * each} / ${total}`);

      await sleep(3000);
    }
  } catch (error) {
    console.log(error.message);
  }
})();
