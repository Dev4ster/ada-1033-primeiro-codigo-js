const operacao = (a, b, op) => op(a, b);

const soma = (a, b) => a + b;

const minhaPromise = (callback, ms) =>
  new Promise((resolve, reject) => {
    // Código assíncrono aqui'

    if (callback && typeof callback === "function") {
      const resultado = callback();

      setTimeout(() => {
        if (resultado) {
          resolve(resultado);
        } else {
          // se der errado RESULTADO = reject
          reject(new Error(`Falha Resultado=${resultado}`));
        }
      }, ms);
    } else {
      // se der errado CALLBACK = reject

      reject(new Error(`Falha Callback=${typeof callback}`));
    }
  });

console.log("Inicio");

minhaPromise(() => operacao(2, 3, soma), 5000)
  .then((resultado) => {
    console.log("resultado:", resultado);
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });

minhaPromise(() => operacao(12, 3, soma), 3000)
  .then((resultado) => {
    console.log("resultado:", resultado);
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });

console.log("+++++++");

minhaPromise(() => operacao(20, 5, soma), 1000)
  .then((resultado1) => {
    minhaPromise(() => operacao(resultado1, 5, soma), 1000).then(
      (resultado2) => {
        minhaPromise(() => operacao(resultado2, resultado1, soma), 1000).then(
          (re) => {
            minhaPromise(() => operacao(20, 5, soma), 1000);
          }
        );
      }
    );
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log(error.message);
    }
  });

console.log("Fim");

// READFILE TO PROMISE
const path = require("path");
const fs = require("fs");

new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, "arquivo.txt"), "utf-8", (erro, data) => {
    if (erro) {
      reject(erro);
    }
    resolve(data);
  });
})
  .then((resultado) => resultado.toLowerCase())
  .then(console.log)
  .catch(console.log);

const levaUmTempo = async () => {
  console.log("COMECOU levaUmTempo");
  const resultado1 = await minhaPromise(() => operacao(2, 2, soma), 3000);
  const resultado2 = await minhaPromise(
    () => operacao(resultado1, 2, soma),
    5000
  );
  const resultado3 = await minhaPromise(
    () => operacao(resultado2, 4, soma),
    1000
  );
  const resultado4 = await minhaPromise(
    () => operacao(resultado3, resultado1, soma),
    10000
  );
  console.table({
    resultado1,
    resultado2,
    resultado3,
    resultado4,
  });
  console.log("Finalizou levaUmTempo");
};

(async () => {
  try {
    const resultado = await Promise.any([
      minhaPromise(() => operacao(2, 2, 10), 5000),
      minhaPromise(() => operacao(3, 3, 10), 2000),
      minhaPromise(() => operacao(4, 4, soma), 10000),
    ]);
    console.table({
      resultado,
    });
  } catch (error) {
    console.log("deu algum problema", error.message);
  }
})();
