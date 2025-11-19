import { createServer } from "node:http";
import { config } from "dotenv";
import { URL } from "node:url";
import { mainPage, detailPage, errorPage } from "./sourse/controllers.mjs";

config();

const port = process.env.PORT || 8000;

// простой маршрут: /item/:id — захватываем id как всё после /item/
const reDetail = /^\/item\/([^/]+)$/;

const server = createServer();

server.on("request", (req, res) => {
  const requestedPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  console.log(req.method, requestedPath);

  // игнорируем автоматические запросы от браузера/инструментов (возвращаем 204 No Content)
  if (
    requestedPath === "/favicon.ico" ||
    requestedPath.startsWith("/.well-known")
  ) {
    res.writeHead(204);
    res.end();
    return;
  }

  res.statusCode = 200;
  // корректно указываем Content-Type с кодировкой
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const r = reDetail.exec(requestedPath);
  if (r) {
    detailPage(res, r[1]);
  } else if (requestedPath === "/") {
    mainPage(res);
  } else {
    errorPage(res);
  }
});

// пример: запустить сервер
server.listen(port);
