#!/usr/bin/env node

import { FastMCP } from "fastmcp";
import { config } from "./config.js";
import { sampleTools } from "./tools/sample.js";

const server = new FastMCP(config);

sampleTools(server);

server.start({
  transportType: "stdio",
});
