import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { MallByID } from '../../../interface/mall-interface';
import { Product } from '../../../interface/product-interface';

const apiActions = new APIActions();

test(`should get all product`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT);

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    code: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    rating: { type: "number" },
    image: { type: "string" },
    category_id: { type: "number" },
    mall_id: { type: "number" }
  }

  const fieldValidate: JSONSchemaType<Product> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<Product>(fieldValidate, responseBody);
});

test(`should get product by id`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_BY_ID);

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    code: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    rating: { type: "number" },
    image: { type: "string" },
    category_id: { type: "number" },
    mall_id: { type: "number" }
  }

  const fieldValidate: JSONSchemaType<Product> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<Product>(fieldValidate, responseBody);
});