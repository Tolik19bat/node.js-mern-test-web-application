import { loadList, loadItem } from "./model.mjs";

export async function mainPage(res) {
  let s = `<!DOCTYPE html>
    <html>
        <head>
        <meta charset='utf-8'>
        <title>Список запланированных дел</title>
        </head>
          <body>
            <h1>Запланированные дела</h1>`;
  const list = await loadList();
  for (const task of list) {
    s += `<p>
            <a href="/item/${task._id}">${task.title}</a>
          </p>`;
  }
  s += `<p>Welcome to the main page.</p>
          </body>
    </html>`;
  res.end(s);
}

export async function detailPage(res, id) {
  const task = await loadItem(id);
  if (!task) {
    // специфичная 404 для несуществующей задачи
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Дело не найдено</title></head><body><h1>Дело не найдено</h1><p>Задача с id: ${id} не найдена, ошибка 404.</p></body></html>`
    );
    return;
  }
  res.end(
    `<!DOCTYPE html>
        <html>
        <head>
        <meta charset='utf-8'>
        <title>Дело ${task.title}</title>
        </head>
          <body>  
            <h1>Дело - ${task.title}</h1>
            <p>Дополнительно: ${task.desc}</p>
          </body>
        </html>`
  );
}

export function errorPage(res) {
  res.statusCode = 404;
  console.log("errorPage called");
  res.end(
    `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Страница не найдена</title></head><body><h1>Ошибка 404: Страница не найдена</h1><p>The page you are looking for does not exist, сработала функция errorPage().</p></body></html>`
  );
}
