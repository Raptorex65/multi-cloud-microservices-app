const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    service: "api",
    status: "ok",
    environment: process.env.APP_ENV || "local",
    message: "Hello from the API service v2"
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
    message: "Hello from the API service v2 /api"
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "api/health healthy"
  });
});

app.listen(port, () => {
  console.log(`API service listening on port ${port}`);
});