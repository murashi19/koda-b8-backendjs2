import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import noteRoute from "./routes/noteRoute.js";
import authRoute from "./routes/authRoute.js";
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger NoteMe - Open API 3.0 ",
      version: "1.0.0",
      description:
        "API documentation untuk aplikasi NoteMe (auth + notes CRUD)",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};
const openapi = swaggerJSDoc(options);
// console.log(openapi);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
// Middleware
app.use(express.json());
app.use(cors());

// Route Testing
app.use("/auth", authRoute);
app.use("/notes", noteRoute);

export default app;
