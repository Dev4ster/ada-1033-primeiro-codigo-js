const express = require("express");
const db = require("./db");
const cors = require("cors");
const path = require("path");
const { object, number, string, date, ValidationError } = require("yup");
const porta = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

const pedidoSchema = object({
  id: number().required("id é necessário").positive(),
  pedido: string().required("pedido é obrigatório"),
  data: date().required(),
  valor: number().min(11).required(),
  email: string().email().required(),
  previsao: string().required(),
});

const query = (sql) =>
  new Promise((resolve, reject) => {
    db.exec(sql, function (error) {
      if (error) {
        reject(error);
      }
      const result = { ...this };
      resolve(result);
    });
  });

const queryAll = (sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, function (error, rows) {
      if (error) {
        reject(error);
      }

      resolve(rows);
    });
  });
};

app.get("/tela-pedido", async (requisicao, resposta) => {
  const pedidos = await queryAll(`SELECT * FROM pedidos`);
  return resposta.render("pedido", { pedidos });
});

app.post("/pedidos", async (requisicao, resposta) => {
  try {
    const pedidoEValido = await pedidoSchema.validate(requisicao.body);

    if (pedidoEValido) {
      const { id, pedido, data, valor, email, previsao } = requisicao.body;
      const resultado = await query(
        `INSERT INTO pedidos VALUES(${id}, "${pedido}", "${data}","${valor}","${email}", "${previsao}")`
      );
      console.log("resultado", resultado);
      return resposta.status(201).json({});
    }
    return resposta.status(400).json(pedidoEValido);
  } catch (error) {
    if (error instanceof ValidationError) {
      return resposta.status(400).json({
        msg: error.message,
      });
    }
    return resposta.status(500).json(error);
  }
});

app.get("/pedidos", async (requisicao, resposta) => {
  const pedidos = await queryAll("SELECT * FROM pedidos");
  return resposta.status(200).json(pedidos);
});

app.get("/pedidos/:pedidoId", async (requisicao, resposta) => {
  const { pedidoId } = requisicao.params;
  console.log("pedidoId", pedidoId);
  const pedidos = await queryAll(
    `SELECT * FROM pedidos WHERE id = ${Number(pedidoId)}`
  );
  return resposta.status(200).json(pedidos[0]);
});

app.listen(porta, () => {
  console.log("Servidor no arrrrr");
});
