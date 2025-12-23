import type { SchemaBuilder } from "../schema-builder.js";

export { buildMovieEntity, getMovieById };

interface Movie {
  id: string;
  title: string;
  // releaseDate: Date;
  director: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const DB_MOVIES = [
  {
    id: "1-movie",
    title: "Inception",
    director: {
      id: "2-person",
      firstName: "Christopher",
      lastName: "Nolan",
    },
  },
];

function buildMovieEntity(builder: SchemaBuilder) {
  const Person = builder.objectRef<Movie["director"]>("Person").implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      firstName: t.exposeString("firstName"),
      lastName: t.exposeString("lastName"),
    }),
  });

  const Movie = builder.objectRef<Movie>("Movie").implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      title: t.exposeString("title"),
      director: t.expose("director", { type: Person }),
    }),
  });

  const movieEntity = builder.asEntity(Movie, {
    key: builder.selection<{ id: string }>("id"),
    resolveReference: ({ id: movieId }) => {
      // TODO: here API CALL
      const movie = getMovieById(movieId);

      if (!movie) {
        throw new Error("Movie not found");
      }

      return movie;
    },
  });

  return {
    typeDef: Movie,
    entity: movieEntity,
  };
}

const getMovieById = (movieId: string) => {
  return DB_MOVIES.find(({ id }) => id === movieId);
};
