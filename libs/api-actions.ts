import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import Ajv, { JSONSchemaType } from 'ajv';
import { AuthRequest } from '../utils/request-data';
import { PathUrl } from '../utils/urls';

export class APIActions {
  private ajv: Ajv

  constructor() {
    this.ajv = new Ajv();
  }

  async verifyStatusCode(response: APIResponse): Promise<void> {
    await expect(response).toBeOK();
  }

  async verifyResponseField<T>(expectedField: JSONSchemaType<T>, responsePart: T): Promise<void> {
    const validate = this.ajv.compile(expectedField);
    const valid = validate(responsePart);

    if (!valid) {
      console.error('Validation errors:', validate.errors);
    }

    expect(valid).toBe(true);
  }

  async loginAndGetToken(request: APIRequestContext): Promise<string> {
    const reqBody = AuthRequest.userLogin
    const response: APIResponse = await request.post(PathUrl.SIGN_IN, { data: reqBody });

    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()}`);
    }

    const responseBody = await response.json();
    return responseBody.token;
  }
}