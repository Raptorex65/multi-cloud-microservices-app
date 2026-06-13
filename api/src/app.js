const express = require("express");

const app = express();

const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "api_http_requests_total",
  help: "Total number of HTTP requests received by the API",
  labelNames: ["method", "route", "status_code"],
});


const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });

  next();
});

app.get("/", (req, res) => {
  res.json({
    service: "api",
    status: "ok",
    environment: process.env.APP_ENV || "local",
    message: "Hello from PROD promotion demo"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/api", (req, res) => {
  res.json({
    service: "api",
    status: "ok",
    environment: process.env.APP_ENV || "local",
    version: "v6",
    message: "Hello from the API service with Prometheus metrics"
    });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "api/health healthy"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`API service listening on port ${port}`);
});