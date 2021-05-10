import axios from 'axios';
import envKit from 'env-kit';

const endpoint = envKit.get('SHOPIFY_REST_ENDPOINT') as string;
const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN') as string;

const instance = axios.create({
  baseURL: endpoint,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
