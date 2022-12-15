const express = require("express");
const router = express.Router();
const mintRoute = require("./mint");

const defaultRoutes = [
    {
      path: "/mint",
      route: mintRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;  