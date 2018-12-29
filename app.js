if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const https = require("https");
const fs = require('fs');

const app = express();

app.get("/", (req, res) => res.send("Yay!...You're secured over HTTPS."));

const httpsOptions = {
  key: fs.readFileSync(process.env.KEY_PATH, 'utf-8'),
  cert: fs.readFileSync(process.env.CERT_PATH, 'utf-8'),
}

const httpsPort = process.env.HTTPS_PORT || 443;
const port = process.env.PORT || 80;

const secureServer = https.createServer(httpsOptions, app).listen(httpsPort);

secureServer.on("listening", () => {
  console.log("Listening HTTPS");
});

secureServer.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("Port " + httpsPort + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error("Port " + httpsPort + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});

const server = http.createServer((req, res) => {
  console.log("Redirecting to HTTPS...");
  res.writeHead(301, { "Location": "https://" + req.headers['host'].split(":")[0] + ":" + httpsPort + req.url });
  res.end();
}).listen(port);

server.on("listening", () => {
  console.log("Listening HTTP");
});

server.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("Port " + port + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error("Port " + port + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});
