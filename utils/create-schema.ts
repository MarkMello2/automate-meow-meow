import { JSONSchemaType } from "ajv"
import { DynamicSchema } from "../interface/schema-interface"

export const CreateDynamicSchema = <T>(properties: DynamicSchema, requiredFields: (keyof T)[] = [], isArray?: boolean): JSONSchemaType<T> => {
  if (isArray) {
    return {
      type: "array",
      properties: properties,
      required: requiredFields,
      additionalProperties: false
    }
  }

  return {
    type: "object",
    properties: properties,
    required: requiredFields,
    additionalProperties: false
  }
}