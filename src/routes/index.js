const express = require("express");
const router = express.Router();
const demoRoute = require("./demo");

const defaultRoutes = [
    {
      path: "/",
      route: demoRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;  