FROM node:22-slim
WORKDIR /app
COPY package*.json ./
COPY packages/react/package.json ./packages/react/
COPY apps/portal/package.json ./apps/portal/
COPY apps/mcp/package.json ./apps/mcp/
COPY apps/server/package.json ./apps/server/
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build -w @gabarito/portal
ENV NODE_ENV=production PORT=5190
EXPOSE 5190
CMD ["npm", "run", "start", "-w", "@gabarito/server"]
