import axios from 'axios';
import envKit from 'env-kit';
import axiosRetry from 'axios-retry';

const endpoint = envKit.get('SHOPIFY_REST_ENDPOINT') as string;
const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN') as string;

const shopify = axios.create({
  baseURL: endpoint,
  headers: {
    'X-Shopify-Access-Token': accessToken,
  },
});

axiosRetry(shopify, { retries: 10 });

export { shopify };

export interface Blog {
  id?: number;
  handle?: string;
  title: string;
}

export interface Article {
  id?: number;
  handle?: string;
  title: string;
  body_html: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface Data {
  blogs: Blog[];
  article: Article;
}
