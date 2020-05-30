import { Application } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";

import schema from "./app/schema/Contacts.schema.ts";
import resolvers from './app/resolvers/Contacts.resolvers.ts'

const app = new Application();

const GraphQLService = await applyGraphQL({
  typeDefs: schema,
  resolvers: resolvers,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
console.log("Server start at http://localhost:8080/graphql");

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});
// Run the application on the specified port
await app.listen({ port: 8080 });

