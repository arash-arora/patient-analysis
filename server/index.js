const express = require("express");
const cors = require("cors");
const router = require("./routes/main-routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/", router);

app.listen(5000, () => {
  console.log("Server running on 5000");
});
