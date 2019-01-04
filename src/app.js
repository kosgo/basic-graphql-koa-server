import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-bodyparser";
import cors from "@koa/cors";
import hemlet from "koa-helmet";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";

import { endpointURL, isDevelopment } from "./utils/config";

import typeDefs from "./schema.gql";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = new Koa();
const router = new Router();

app.use(hemlet());
app.use(koaBody());
app.use(cors());

router.all(
  endpointURL,
  graphqlKoa(() => ({
    schema,
    context: {},
    debug: isDevelopment
  }))
);

if (isDevelopment) {
  router.get("/graphiql", graphiqlKoa({ endpointURL }));
}

app.use(router.routes()).use(router.allowedMethods());

export default app;
