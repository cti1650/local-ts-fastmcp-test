import { FastMCP } from "fastmcp";
import { config } from "./config.js";
import { sampleTools } from "./tools/sample.js";

const server = new FastMCP(config);

sampleTools(server);

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 8080,
  },
}).then(() => {
  console.log(`Server started on port 8080`);
}).catch((error) => {
  console.error("Failed to start server:", error);
});
