import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { HomeDefaultRes } from '../../../interface/home-interface';
import { CateAllRes, CateByIdRes } from '../../../interface/category-interface';

const apiActions = new APIActions();

test(`should get all category`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_CATEGORY);

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    image: { type: "string" }
  }

  const fieldValidate: JSONSchemaType<CateAllRes> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<CateAllRes>(fieldValidate, responseBody);
});

test(`should get category by id`, { tag: '@API' }, async ({ request }) => {
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
    mall_id: { type: "number" },
  }

  const fieldValidate: JSONSchemaType<CateByIdRes> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<CateByIdRes>(fieldValidate, responseBody);
});