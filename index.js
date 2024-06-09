const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");

const folderToWatch = "./minha_pasta";

const watcher = chokidar.watch(folderToWatch, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on("add", (filePath) => {
  console.log(`Arquivo ${filePath} foi adicionado.`);
  const newLocation = path.join("./outra_pasta", path.basename(filePath));
  fs.rename(filePath, newLocation, (err) => {
    if (err) console.error("Erro ao mover arquivo:", err);
    else console.log(`Arquivo movido para ${newLocation}`);
  });
});

watcher.on("change", (filePath) => {
  console.log(`Arquivo ${filePath} foi modificado.`);
});

watcher.on("unlink", (filePath) => {
  console.log(`Arquivo ${filePath} foi removido.`);
});

console.log(`Monitorando mudanças na pasta: ${folderToWatch}`);
