import SchemaBuilder from "@pothos/core";
import DirectivePlugin from "@pothos/plugin-directives";
import FederationPlugin from "@pothos/plugin-federation";

export { createSchemaBuilder };
export type { SchemaBuilder };

type SchemaBuilder = ReturnType<typeof createSchemaBuilder>;

function createSchemaBuilder() {
  return new SchemaBuilder({
    plugins: [DirectivePlugin, FederationPlugin],
  });
}
