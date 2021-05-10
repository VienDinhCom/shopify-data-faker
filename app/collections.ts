import * as _ from 'lodash';
import * as faker from 'faker';
import { shopify, CollectionRuleColumn, CollectionRuleRelation } from './shopify';

(async () => {
  interface Input {
    title: string;
    keyword: string;
  }

  const inputs: Input[] = [
    {
      title: 'Bracelets',
      keyword: 'bracelet',
    },
    {
      title: 'Drawers',
      keyword: 'drawer',
    },
    {
      title: 'Tables',
      keyword: 'table',
    },
    {
      title: 'Pots',
      keyword: 'pot',
    },
    {
      title: 'Bags',
      keyword: 'bag',
    },
    {
      title: 'Tuxedos',
      keyword: 'tuxedo',
    },
    {
      title: 'Earrings',
      keyword: 'earring',
    },
    {
      title: 'Pillows',
      keyword: 'pillow',
    },
    {
      title: 'Shirts',
      keyword: 'shirt',
    },
    {
      title: 'Chokers',
      keyword: 'choker',
    },
    {
      title: 'Jackets',
      keyword: 'jacket',
    },
    {
      title: 'Tops',
      keyword: 'top',
    },
    {
      title: 'Lights',
      keyword: 'light',
    },
    {
      title: 'Sofas',
      keyword: 'sofa',
    },
    {
      title: 'Necklaces',
      keyword: 'necklace',
    },
    {
      title: 'Trowels',
      keyword: 'trowel',
    },
    {
      title: 'Armchairs',
      keyword: 'armchair',
    },
    {
      title: 'Tees',
      keyword: 'tee',
    },
    {
      title: 'Blouses',
      keyword: 'blouse',
    },
    {
      title: 'Skirts',
      keyword: 'skirt',
    },
    {
      title: 'Candles',
      keyword: 'candle',
    },
    {
      title: 'Fences',
      keyword: 'fence',
    },
    {
      title: 'Wooden Items',
      keyword: 'wooden',
    },
    {
      title: 'Cans',
      keyword: 'can',
    },
    {
      title: 'Jumpers',
      keyword: 'jumper',
    },
  ];

  async function create(input: Input) {
    const {
      collectionCreate: { collection },
    } = await shopify.createCollection({
      input: {
        title: input.title,
        handle: input.keyword,
        descriptionHtml: faker.lorem.paragraph(),
        ruleSet: {
          appliedDisjunctively: true,
          rules: [
            {
              column: CollectionRuleColumn.Title,
              condition: input.keyword,
              relation: CollectionRuleRelation.Contains,
            },
          ],
        },
      },
    });

    return collection;
  }

  const chunks = _.chunk(inputs, 5);

  for (const chunk of chunks) {
    const collectionRequests = chunk.map((input) => create(input));
    const collections = await Promise.all(collectionRequests);

    console.log(collections);
  }
})();
