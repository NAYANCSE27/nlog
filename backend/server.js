const express = require("express");
const moragn = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// bring routes
const blogRoutes = require("./routes/blog");

// app
const app = express();

// db

// database connection using cloud atlas
// mongoose
//   .connect(process.env.DATABASE_CLOUD, {})
//   .then(() => console.log("DB Connected"));

// database connection using local database
mongoose.connect(process.env.DATABASE_LOCAL, {}).then(() => {
  console.log("DB Connected");
});

// middlewares
app.use(moragn("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
//this part is use for browser to browser communication
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use("/api", blogRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
