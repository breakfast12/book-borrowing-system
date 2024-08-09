const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/Auth/route");
const memberRoutes = require("./routes/Member/route");
const bookRoutes = require("./routes/Book/route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger/swagger");

// Creating an instance of the Express application
const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Registering routes
app.use("/api/auth", authRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/book", bookRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Export module
module.exports = app;
