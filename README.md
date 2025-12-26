# GraphQL federation demo

This repository presents a quick demo of how the GraphQL [federation](https://graphql.org/learn/federation/) works. It contains three services:

1. Movies service - owns the data about `movies`, written in Typescript
2. Reviews service - extends the movie type with `reviews`, written in Golang
3. Gateway service - entrypoint for the system, it exposes the server and combines all the subgraphs

## How to run

You need to have pnpm and node installed to run the `movies` and `gateway` services. To be able to run the `reviews` service you need to have the Go installed.

1. runs the `movies` service `cd movies && pnpm install && pnpm run start`, it runs the server on the 5001 port
1. runs the `reviews` service `cd reviews && go run server.go`, it runs the server on the 5002 port
1. runs the `gateway` service `cd gateway && pnpm install && pnpm run start`, it runs the server on the 5000 port

## Play around with queries

To be able to check how the GraphQL federation works go to the `http://localhost:5000/graphiql`. You should see the apollo sandbox.
