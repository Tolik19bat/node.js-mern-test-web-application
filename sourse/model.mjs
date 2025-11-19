import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const currentDir = dirname(dirname(fileURLToPath(import.meta.url)));
const dataFileName = join(currentDir, "data", "todos.json");

export async function loadList() {
  try {
    const rawData = await readFile(dataFileName, "utf-8");
    const data = JSON.parse(rawData);
    return data.todos;
  } catch (err) {
    // файл не найден — возвращаем пустой список и логируем предупреждение
    if (err && err.code === "ENOENT") {
      console.warn(`Warning: data file not found: ${dataFileName}`);
      return null;
    }
    // ошибка парсинга JSON — бросаем понятную ошибку
    if (err && err.name === "SyntaxError") {
      throw new Error(
        `Failed to parse JSON in ${dataFileName}: ${err.message}`
      );
    }
    // прочие ошибки — пробрасываем выше
    throw err;
  }
}

export async function loadItem(id) {
  try {
    const rawData = await readFile(dataFileName, "utf-8");
    const data = JSON.parse(rawData);
    const item = data.todos.find((el) => el._id === id);
    return item ?? null;
  } catch (err) {
    if (err && err.code === "ENOENT") {
      console.warn(`Warning: data file not found: ${dataFileName}`);
      return null;
    }
    if (err && err.name === "SyntaxError") {
      throw new Error(
        `Failed to parse JSON in ${dataFileName}: ${err.message}`
      );
    }
    throw err;
  }
}
