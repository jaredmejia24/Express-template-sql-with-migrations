const express = require("express");

// Routers
const { usersRouter } = require("./routes/users.routes");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");
const { initModels } = require("./models/relations/initModels");

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use("/api/v1/users", usersRouter);

// Global error handler
app.use(globalErrorHandler);

//set relations between tables
initModels();

// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

//start server
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Express app running! in port ${PORT}`);
});
