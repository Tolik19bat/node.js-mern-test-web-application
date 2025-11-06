import { createServer } from "node:http";

const port = 8000;

const server = createServer();

server.on("request", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain", "charset=utf-8");
  res.end("Hello, World!\n");
});

server.listen(port);
// пример: запустить сервер