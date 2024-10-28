import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { HomeDefaultRes } from '../../../interface/home-interface';

const apiActions = new APIActions();

test(`should get banner`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_BANNER);

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    image: { type: "string" }
  }

  const signInSchema: JSONSchemaType<HomeDefaultRes> = CreateDynamicSchema(properties)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<HomeDefaultRes>(signInSchema, responseBody[0]);
});