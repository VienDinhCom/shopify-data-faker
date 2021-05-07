/**
 * GQLESS: You can safely modify this file and Query Fetcher based on your needs
 */
import 'isomorphic-fetch';
import envKit from 'env-kit';
import { createClient, QueryFetcher } from 'gqless';
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';

const queryFetcher: QueryFetcher = async function (query, variables) {
  const endpoint = envKit.get('SHOPIFY_GRAPHQL_ENDPOINT') as string;
  const accessToken = envKit.get('SHOPIFY_ACCESS_TOKEN') as string;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: 'cors',
  });

  return response.json();
};

export const shopify = createClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
});

export * from './schema.generated';
