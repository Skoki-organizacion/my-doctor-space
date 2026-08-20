# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

FROM base AS deps

ENV CI=true
ENV BETTER_AUTH_URL=http://localhost:3000
ENV BETTER_AUTH_SECRET=ci-placeholder-secret-not-for-production-use
ENV DATABASE_URL=postgresql://ci:ci@localhost:5432/ci
ENV DIRECT_DATABASE_URL=postgresql://ci:ci@localhost:5432/ci

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts .npmrc ./
COPY prisma ./prisma

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS build

ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

ARG BETTER_AUTH_URL=http://localhost:3000
ARG BETTER_AUTH_SECRET=ci-placeholder-secret-not-for-production-use
ARG DATABASE_URL=postgresql://ci:ci@localhost:5432/ci
ARG DIRECT_DATABASE_URL=postgresql://ci:ci@localhost:5432/ci

ENV BETTER_AUTH_URL=$BETTER_AUTH_URL
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_DATABASE_URL=$DIRECT_DATABASE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/lib/generated ./lib/generated

USER node

EXPOSE 3000

CMD ["node", "server.js"]
