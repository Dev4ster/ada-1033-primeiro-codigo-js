// console.log("Início");

// for (let i = 0; i < 3; i++) {
//   console.log(i);
// }

// console.log("Fim");

const fs = require("fs");
const path = require("path");

// console.log("Início");

// fs.readFile(path.join(__dirname, "arquivo.txt"), "utf-8", (erro, data) => {
//   if (erro) {
//     console.error("Erro ao ler arquivo", erro);
//     return;
//   }

//   console.log("Conteúdo do arquivo:", data);
// });

// console.log("Fim");

const conta = (a = 0, b = 0, operacao = () => 0) => {
  return operacao(a, b);
};

const soma = (a, b) => a + b;

const subtracao = (a, b) => a - b;

// const resultado = conta(2, 3, (a, b) => {
//   return a + b;
// });

const resultado = conta(2, 3, subtracao());

console.log("Resultado:", resultado);
