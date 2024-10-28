export interface DynamicSchema {
  [key: string]: { type: string; required?: boolean };
}