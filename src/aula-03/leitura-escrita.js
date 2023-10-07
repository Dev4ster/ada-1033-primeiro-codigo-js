const fs = require("fs");
const path = require("path");

const ARQUIVO = path.join(__dirname, "arquivo.txt");

const ARQUIVO2 = path.join(__dirname, "arquivo.json");

const ARQUIVO3 = path.join(__dirname, "large-file.json");

// try {
//   console.log("Inicio readFileSync");
//   const data = fs.readFileSync(ARQUIVO, "utf-8");
//   console.log(data.toLowerCase());
//   console.log("Fim readFileSync");
// } catch (error) {
//   console.error("Erro ao ler arquivo:", error);
// }

// try {
//   console.log("Inicio writeFileSync");
//   fs.writeFileSync(ARQUIVO, "Arquivo escrito via node", "utf-8");
//   console.log("Fim writeFileSync");
// } catch (error) {
//   console.error("Erro ao ler arquivo:", error);
// }

// try {
//   const pedido = {
//     id: 1,
//     pedido: "teste",
//     dataISO: new Date().toISOString(),
//     data: new Date(),
//     dataToString: new Date().toString(),
//   };
//   fs.writeFileSync(ARQUIVO2, JSON.stringify(pedido), "utf-8");
// } catch (error) {
//   console.error("Erro ao ler arquivo:", error);
// }

// try {
//   const data = fs.readFileSync(ARQUIVO2, "utf-8");
//   const pedido = JSON.parse(data);
//   console.log("pedido", pedido);
// } catch (error) {
//   console.error("Erro ao ler arquivo:", error);
// }

// fs.readFile(ARQUIVO3, "utf-8", (erro, data) => {
//   console.log("readFile", JSON.parse(data));
// });

// const readStream = fs.createReadStream(ARQUIVO3, "utf-8");

// readStream.on("open", () => {
//   console.log("Iniciou a leitura");
// });

// readStream.on("end", () => {
//   console.log("Terminou a leitura");
// });

// readStream.on("data", (chunk) => {
//   console.log("Chunk", chunk);
// });

// const readStream = fs.createReadStream(ARQUIVO3, "utf-8");
// const witeStream = fs.createWriteStream(
//   path.join(__dirname, "arquivo-comprimido.gz")
// );

// const zlib = require("zlib");

// const gzip = zlib.createGzip();

// readStream.pipe(gzip).pipe(witeStream);

// readStream.on("end", () => {
//   console.log("Leitura concluída");
// });

// gzip.on("end", () => {
//   console.log("Compactação concluída");
// });

// witeStream.on("finish", () => {
//   console.log("Escrita concluída");
// });

const { Transform } = require("stream");

const readStream = fs.createReadStream(ARQUIVO3, "utf-8");
const witeStream = fs.createWriteStream(
  path.join(__dirname, "arquivo-transformado.txt")
);

let pedacos = 0;
const trasnformacao = new Transform({
  transform(chunk, encoding, callback) {
    const pedaco = chunk.toString() + "-ada#1033";
    pedacos++;
    this.push(pedaco);
    callback();
  },
});

readStream.pipe(trasnformacao).pipe(witeStream);

witeStream.on("finish", () => {
  console.log("pedacos", pedacos);
});
