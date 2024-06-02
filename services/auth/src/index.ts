import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require('express-openapi-validator');
import path from "path";
import {
  userLogin,
  userRegistration,
  verifyEmail,
  verifyToken,
  updateUserRole
} from "./controllers";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP.." });
});

const enableSwagger = process.env.ENABLE_SWAGGER === 'true';

if (enableSwagger) {
  const swaggerPath = path.resolve(__dirname, '..', 'swagger.yaml');
  const swaggerDoc = YAML.load(swaggerPath);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerPath,
    }),
  );
}

app.use((req, res, next) => {
  const ALLOWED_ORIGINS_STR = process.env.ALLOWED_ORIGINS;

  const allowedOrigins = ALLOWED_ORIGINS_STR
    ? ALLOWED_ORIGINS_STR.split(",").map(url=>url.trim())
    : [];

  const origin = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    next();
  } else {
    res.status(403).json({ message: "Forbidden." });
  }
});

// routes
app.post("/auth/register", userRegistration);
app.post("/auth/login", userLogin);
app.post("/auth/verify-token", verifyToken);
app.post("/auth/verify-email", verifyEmail);
app.patch("/auth/update-user-role/:id", updateUserRole);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const port = process.env.PORT || 4003;
const serviceName = process.env.SERVICE_NAME || "Auth-Service";

app.listen(port, () => {
  console.log(`${serviceName} is running on port ${port}`);
});
