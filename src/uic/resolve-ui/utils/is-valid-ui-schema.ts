import { IUISchemaItem } from '../interfaces';

export function isValidUISchema(uiSchema: IUISchemaItem[] | any) {
  return uiSchema != null && Array.isArray(uiSchema) && uiSchema.length > 0;
}
