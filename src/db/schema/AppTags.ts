import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb";

const schema = {
  title: "app_tags",
  version: 0,
  description: "a app tag-view collection save by namespace",
  primaryKey: "namespace",
  type: "object",
  properties: {
    // namespace
    namespace: {
      type: "string",
    },
    current: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          // url
          url: {
            type: "string",
          },
          title: {
            type: "string",
          },
          order: {
            type: "number",
          },
        },
      },
    },
  },
  required: ["namespace"],
} as const;

export default schema;

const schemaTyped = toTypedRxJsonSchema(schema);

export type AppTagsType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
