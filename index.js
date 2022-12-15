const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = require("./src/express/app");
let server;

server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port ${process.env.PORT}`);
});