const apiRouter = require("express").Router();

apiRouter.use("/auth", require("./Auth"));

module.exports = apiRouter;
