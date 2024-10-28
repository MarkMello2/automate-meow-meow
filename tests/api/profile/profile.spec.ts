import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { ProfileRequest } from '../../../utils/request-data';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { ProfileRes } from '../../../interface/profile-interface';

const apiActions = new APIActions();

let token: string;

test.beforeEach(async ({ request }) => {
  token = await apiActions.loginAndGetToken(request);
});

test(`should get profile`, { tag: '@API' }, async ({ request }) => {
  const response = await request.get(PathUrl.PROFILE, { headers: { Authorization: `Bearer ${token}` } });

  await apiActions.verifyStatusCode(response);

  const properties = {
    id: { type: "number" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    mobile: { type: "string" },
    sex: { type: "string" },
    status: { type: "string" },
    image: { type: "string" },
    user_id: { type: "number" }
  }

  const signInSchema: JSONSchemaType<ProfileRes> = CreateDynamicSchema(properties)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<ProfileRes>(signInSchema, responseBody[0]); //not true from api spec
});

test(`should update profile`, { tag: '@API' }, async ({ request }) => {
  const reqBody = ProfileRequest.updateProfile
  const response = await request.patch(PathUrl.PROFILE, { data: reqBody, headers: { Authorization: `Bearer ${token}` } });

  await apiActions.verifyStatusCode(response);

  const properties = {
    message: { type: "string" },
  }
  const signInSchema: JSONSchemaType<ProfileRes> = CreateDynamicSchema(properties)
  const responseBody = await response.json();

  await apiActions.verifyResponseField<ProfileRes>(signInSchema, responseBody);
});