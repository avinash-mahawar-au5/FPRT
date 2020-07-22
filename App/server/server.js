const express = require("express");
const bodyParser = require("body-parser");

const methodOverride = require("method-override");
const mongoosedb = require("./db/mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const ApiRouter = require("./routes/Api");
// mongoosedb()
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", ApiRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
