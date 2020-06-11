const express = require("express");
require("dotenv").config();

const app = express();

app.get("/rest", function (req, res) {
  res.json({
    data: " you hit rest endpoint",
  });
});

app.listen(process.env.PORT, () => console.log("server running..."));
