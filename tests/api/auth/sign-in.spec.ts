import { test } from '@playwright/test';
import { APIActions } from '../../../libs/api-actions';
import { PathUrl } from '../../../utils/urls';
import { AuthRequest } from '../../../utils/request-data';
import { JSONSchemaType } from 'ajv';
import { CreateDynamicSchema } from '../../../utils/create-schema';
import { SignInRes } from '../../../interface/auth-interface';

const apiActions = new APIActions();

test(`should sign in`, { tag: '@API' }, async ({ request }) => {
  const reqBody = AuthRequest.userLogin
  const response = await request.post(PathUrl.SIGN_IN, { data: reqBody });
  await apiActions.verifyStatusCode(response);

  const properties = {
    token: { type: "string" },
  };

  const fieldValidate: JSONSchemaType<SignInRes> = CreateDynamicSchema(properties, ["token"])

  const responseBody = await response.json();
  await apiActions.verifyResponseField<SignInRes>(fieldValidate, responseBody);
});