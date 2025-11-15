export function mainPage(res) {
    let s = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Список запланированных дел</title></head><body><h1>Запланированные дела</h1><p>Welcome to the main page.</p></body></html>`;
    res.end(s);
}

export function detailPage(res, id) {
    res.end(`<!DOCTYPE html><html><head><meta charset='utf-8'><title>Детали дела ${id}</title></head><body><h1>Детали :: дела ${id}</h1><p>Details for item with ID: ${id}</p></body></html>`
    );
}

export function errorPage(res) {
    res.statusCode = 404;
    res.end(`<!DOCTYPE html><html><head><meta charset='utf-8'><title>Страница не найдена</title></head><body><h1>Ошибка 404: Страница не найдена</h1><p>The page you are looking for does not exist.</p></body></html>`);
}
