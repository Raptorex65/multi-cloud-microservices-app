FROM node:20-alpine

WORKDIR /app

COPY src/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src/ ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["npm", "start"]