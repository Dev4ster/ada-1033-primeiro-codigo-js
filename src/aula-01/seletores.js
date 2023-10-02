// var nome = "victor";

// let nome1 = "victor";

// const idade = 18;
// idade = 20;

// const endereco = {
//   nome: "teste",
//   numero: 30,
//   eRua: true,
//   complemento: {
//     linha1: "",
//     linha2: "",
//   },
// };

// const {
//   nome,
//   complemento: { linha1 },
// } = endereco;

// class Pessoa {
//   constructor(nome) {
//     this.nome = nome;
//   }
// }

// function pessoa1(nome, idade){

//     return {
//         nome
//     }
// }

// const pessoa = new Pessoa("Victor");
// const pessoaTeste = pessoa1("Teste")

const { JSDOM } = require("jsdom");

const dom = new JSDOM(
  `
  <!DOCTYPE html>
  <p>
  <span>teste</span>
  Este é um parágrafo
  </p>

  <p>
  Outro parágrafo
  </p>

  <p id="especifico">
  Outro parágrafo específico
  </p>
  <a  href="/home1">
    Link 1
    </a>
  <a class="menu" href="/home2">
    Link 2
  </a>
  `
);
const numeros = [1, 2, 3];
const nomes = ["teste", "teste1"];

// numeros.forEach(function (item) {
//   console.log("numero=", item);
// });

// for (let i = 0; i < numeros.length; i++) {
//   console.log("numero=", numeros[i]);
// }

// const teste = new NodeList()
// teste.

const document = dom.window.document;

const paragrafo = document.querySelector("p:nth-of-type(2)");
const linkClassMenu = document.querySelectorAll("a.menu");
const paragrafoID = document.getElementById("especifico");
const linkClass = document.getElementsByClassName("menu");
const linkTagName = document.getElementsByTagName("a");

const idade = null;

// console.log(paragrafo.textContent);

// paragrafo.textContent = "hello world";

// console.log(paragrafo.textContent);

// console.log(paragrafo?.textContent.length);

// paragrafos.forEach(function (paragrafo) {
//   console.log(paragrafo.textContent);
// });

console.log(linkClass?.[0]?.getAttribute("href"));

console.log(linkTagName?.[1]?.getAttribute("href"));

console.log(linkClassMenu?.[0]?.getAttribute("href"));
