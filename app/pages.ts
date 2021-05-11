import * as _ from 'lodash';
import * as faker from 'faker';
import { Data, Page, shopify } from './shopify-rest';

async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

async function createArticle(title: string) {
  const input: Page = {
    title: title,
    body_html: _.range(_.random(3, 5))
      .map(() => `<p>${faker.lorem.paragraph()}</p>`)
      .join('\n'),
  };

  const { page } = await shopify
    .post<Data>(`/pages.json`, { page: input })
    .then(({ data }) => data);

  return page.title;
}

(async () => {
  await createArticle('About');
  await sleep(3000);
  await createArticle('Contact');
})();
