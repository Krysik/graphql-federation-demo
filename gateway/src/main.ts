import { ApolloServer } from "@apollo/server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { startStandaloneServer } from "@apollo/server/standalone";

main();

async function main() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: "movies",
          url: "http://localhost:5001/",
        },
        {
          name: "reviews",
          url: "http://localhost:8080/query",
        },
      ],
    }),
  });

  try {
    const server = new ApolloServer({
      gateway,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 5000 },
    });
    console.log(`Server is listening on ${url}`);
  } catch (err) {
    console.log("Error while starting the gateway", err);
    process.exit(1);
  }
}
