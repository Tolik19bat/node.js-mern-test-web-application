import { createServer } from "node:http";
import { config } from "dotenv";
import { URL } from "node:url";
import { mainPage, detailPage, errorPage } from "./sourse/controllers.mjs";

config();

const port = process.env.PORT || 8000;

const reDetail = /\/([0-9abcdf]{24})/;

const server = createServer();

server.on("request", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html", "charset=utf-8");
  const requestedPath = new URL(req.url, `http://${req.headers.host}`).pathname;

  const r = reDetail.exec(requestedPath);
  if (r) detailPage(res, r[1]);
  else if (requestedPath === "/") mainPage(res);
  else errorPage(res);
});

server.listen(port);
// пример: запустить сервер

console.log(process.env);
