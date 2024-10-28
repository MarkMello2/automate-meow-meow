import { JSONSchemaType } from "ajv"
import { DynamicSchema } from "../interface/schema-interface"

export const CreateDynamicSchema = <T>(properties: DynamicSchema, requiredFields: (keyof T)[] = []): JSONSchemaType<T> => {
  return {
    type: "object",
    properties: properties,
    required: requiredFields,
    additionalProperties: false
  }
}