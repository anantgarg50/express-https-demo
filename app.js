if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const logger = require("morgan");
const http = require("http");
const https = require("https");
const fs = require("fs");

const app = express();

app.use(logger("dev"));

app.get("/", (req, res) => res.send("Yay!...You're secured over HTTPS."));

const httpPort = normalizePort(process.env.HTTP_PORT) || 80;

const httpsPort = normalizePort(process.env.HTTPS_PORT) || 443;

/*
 *  Creating HTTP Server
 */

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers["host"].split(":")[0] + ":" + httpsPort + req.url });
  res.end();
}).listen(httpPort);

httpServer.on("error", (error) => {
  onError(error, httpPort);
});

httpServer.on("listening", () => {
  onListening("HTTP", httpPort);
});

/*
 *  Creating HTTPS Server
 */

const httpsOptions = {
  key: fs.readFileSync(process.env.KEY_PATH, "utf-8"),
  cert: fs.readFileSync(process.env.CERT_PATH, "utf-8")
}

const httpsServer = https.createServer(httpsOptions, app).listen(httpsPort);

httpsServer.on("error", (error) => {
  onError(error, httpsPort);
});

httpsServer.on("listening", () => {
  onListening("HTTPS", httpsPort);
});

/*
 *  Normalize Port from String or Number
 */

function normalizePort (val) {
  const port = parseInt(val, 10);

  if (!isNaN(port) && port >= 0 && port <= 65535) {
    return port;
  }

  return false;
}

/*
 *  Handlers
 */

function onError (error, port) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(port + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(port + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening (type, port) {
  console.log(type + " server listening on port " + port + "...");
}
