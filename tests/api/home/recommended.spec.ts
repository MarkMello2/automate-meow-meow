import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { RecRes } from '../../../interface/home-interface';

const apiActions = new APIActions();

test(`should get all recommended`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_SHOPPING_REC);

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
    mall_id: { type: "number" },
  }

  const signInSchema: JSONSchemaType<RecRes> = CreateDynamicSchema(properties)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<RecRes>(signInSchema, responseBody[0]);
});