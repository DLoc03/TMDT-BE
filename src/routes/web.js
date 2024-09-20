const UsersRouter = require("./UsersRoutes");
const ProductRouter = require("./ProductRoutes");

const routes = (app) => {
  app.use("/api/user", UsersRouter);
  app.use("/api/product", ProductRouter);
};

module.exports = routes;
