const server = require("./api/server.js");
require("dotenv").config();

const port = process.env.PORT;

server.listen(port, function() {
  console.log(`\n 🔥🔥🔥 Service is running on localhost:${port} 🔥🔥🔥 \n`);
});
