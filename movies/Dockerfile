FROM node:23.11-bookworm-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /home/node/app

COPY package.json tsconfig.json pnpm-lock.yaml ./

COPY . .
ENV CI="true"
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Fetch and install production dependencies only
RUN pnpm fetch --prod && pnpm install --frozen-lockfile --prod

FROM node:23.11-bookworm-slim AS runner

ENV NODE_ENV="production"
WORKDIR /home/node/app
COPY --chown=node:node --from=builder  /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/dist ./

USER node
EXPOSE 5001
CMD [ "node", "src/main.js" ]
