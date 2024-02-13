const bodyParser = require("body-parser");
const { logDebug } = require("sc_logger");
const createServer = require("./server");

const app = require("./app");
const { createClient } = require("redis");


async function start() {
  const server = await createServer(app);

  server.get("/", (req, res) => {
    res.send("Welcome to Holafly's Technical test!");
  });

  // Start the GraphQL server
  const port = process.env.PORT || 4567;
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    logDebug('Server is running at port: {}', port);
  });
}

start();
