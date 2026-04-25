FROM node:20-alpine

WORKDIR /app

COPY src/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src/ ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

USER appuser

CMD ["npm", "start"]