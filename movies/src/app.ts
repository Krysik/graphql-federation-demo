import fs from "node:fs/promises";

import fastify from "fastify";
import mercurius from "mercurius";

import { createSchemaBuilder } from "./schema-builder.js";
import { buildMovieEntity, getMovieById } from "./entities/movie.js";
import { printSchema } from "graphql";

export { createApp };

async function createApp() {
  const app = fastify({
    logger: true,
  });

  const builder = createSchemaBuilder();
  const { typeDef: Movie, entity: movieEntity } = buildMovieEntity(builder);

  builder.queryField("movies", (t) =>
    t.field({
      type: [Movie],
      resolve: () => {
        return [
          {
            id: "movie-1",
            title: "Inception",
            director: {
              id: "director-1",
              firstName: "Christopher",
              lastName: "Nolan",
            },
          },
        ];
      },
    })
  );

  builder.queryField("movie", (t) =>
    t.field({
      type: Movie,
      args: {
        id: t.arg.id({ required: true, description: "Id of the movie" }),
      },
      resolve: (_, arg) => {
        const movie = getMovieById(arg.id);

        if (!movie) {
          throw new Error("Movie not found");
        }

        return movie;
      },
    })
  );

  builder.queryType();
  const schema = builder.toSubGraphSchema({
    // defaults to v2.6
    linkUrl: "https://specs.apollo.dev/federation/v2.3",
    // defaults to the list of directives used in your schema
    federationDirectives: ["@key", "@external", "@requires", "@provides"],
  });

  await app.register(mercurius, {
    schema,
    path: "/",
    graphiql: "graphiql",
    errorHandler(err, request, reply) {
      console.dir(err, { depth: null });
    },
  });

  await fs.writeFile("schema.graphql", printSchema(builder.toSchema()));

  return app;
}
