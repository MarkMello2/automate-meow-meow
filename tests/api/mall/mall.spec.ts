import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { MallByID } from '../../../interface/mall-interface';

const apiActions = new APIActions();

test(`should get shopping mall by id`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_CATEGORY_BY_ID);

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

  const fieldValidate: JSONSchemaType<MallByID> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<MallByID>(fieldValidate, responseBody);
});