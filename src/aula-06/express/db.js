const sqlite = require("sqlite3");
const path = require("path");
const db = new sqlite.Database(
  path.resolve(__dirname, "pedidos.db"),
  (erro) => {
    if (erro) {
      console.log("Erro ao criar banco de dados.", erro);
    }
  }
);

db.serialize(function () {
  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos(
        id int primary key not null,
        pedido text not null,
        data text not null,
        valor text not null,
        email text not null,
        previsao text not null
    )
    `);
});

module.exports = db;
