import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { Product } from '../../../interface/product-interface';
import { Favorite } from '../../../interface/favorite-interface';
import { FavRequest } from '../../../utils/request-data';

const apiActions = new APIActions();

let token: string;

test.beforeEach(async ({ request }) => {
  token = await apiActions.loginAndGetToken(request);
});

test(`should get all fav`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PRODUCT_FAV, { headers: { Authorization: `Bearer ${token}` } });

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    price: { type: "number" },
    quantity: { type: "number" },
    favorite_date: { type: "string" },
    product_code: { type: "string" },
    product_name: { type: "string" },
    product_description: { type: "string" },
    product_rating: { type: "number" },
    product_image: { type: "string" },
    user_id: { type: "number" },
  }

  const fieldValidate: JSONSchemaType<Favorite> = CreateDynamicSchema(properties, [], true)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<Favorite>(fieldValidate, responseBody);
});

test(`should add fav`, { tag: '@API' }, async ({ request }) => {
  const reqBody = FavRequest.addFav
  const response = await request.post(PathUrl.PRODUCT_FAV, { data: reqBody, headers: { Authorization: `Bearer ${token}` } });

  await apiActions.verifyStatusCode(response);

  const properties = {
    message: { type: "string" },
  }

  const fieldValidate: JSONSchemaType<{ message: string }> = CreateDynamicSchema(properties)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<{ message: string }>(fieldValidate, responseBody);
});

test(`should delete fav`, { tag: '@API' }, async ({ request }) => {
  const resFav = await request.get(PathUrl.PRODUCT_FAV, { headers: { Authorization: `Bearer ${token}` } });
  const favData = await resFav.json()
  const lastDataFav = favData[favData.length - 1].id

  const response = await request.delete(PathUrl.PRODUCT_FAV + `/${lastDataFav}`, { headers: { Authorization: `Bearer ${token}` } });

  await apiActions.verifyStatusCode(response);

  const properties = {
    message: { type: "string" },
  }

  const fieldValidate: JSONSchemaType<{ message: string }> = CreateDynamicSchema(properties)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<{ message: string }>(fieldValidate, responseBody);
});