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
    },
    components: {
      securitySchemes: {
        token: {
          type: "apikey",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};
const openapi = swaggerJSDoc(options);
// console.log(openapi);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
// Middleware
app.use(express.json());
app.use(cors());

// Route Testing
app.use("/notes", noteRoute);
app.use("/auth", authRoute);

export default app;
