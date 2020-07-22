const apiRouter = require("express").Router();

apiRouter.use("/auth", require("./Auth"));
apiRouter.use("/boards", require("./Boards"));

module.exports = apiRouter;
