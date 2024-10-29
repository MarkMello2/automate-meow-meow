import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { HomeDefaultRes } from '../../../interface/home-interface';

const apiActions = new APIActions();

test(`should get all shopping mall`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_SHOPPING_MALL);

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    image: { type: "string" }
  }

  const fieldValidate: JSONSchemaType<HomeDefaultRes> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<HomeDefaultRes>(fieldValidate, responseBody);
});