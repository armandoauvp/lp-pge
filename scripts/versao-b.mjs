// Gera pge-b.html: a página atual (pge.html) com o hero antigo, da foto da mesa de reunião com a malha animada.
// O hero antigo vem do commit 1cf83d7 (markup, CSS, regras de celular e JS da entrada); o resto é o pge.html de hoje.
// Rode de novo sempre que o pge.html mudar. Uso: node scripts/versao-b.mjs
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const COMMIT_HERO = "1cf83d7";
const raiz = new URL("../", import.meta.url);
const atual = await readFile(new URL("pge.html", raiz), "utf8");
const antigo = execFileSync("git", ["show", `${COMMIT_HERO}:pge.html`], { cwd: fileURLToPath(raiz), maxBuffer: 64 * 1024 * 1024 }).toString("utf8");

// Trecho entre dois marcadores (o fim não entra)
const trecho = (texto, de, ate, nome) => {
  const i = texto.indexOf(de);
  const j = i < 0 ? -1 : texto.indexOf(ate, i + de.length);
  if (i < 0 || j < 0) throw new Error(`versao-b: não achei ${nome}`);
  return [i, j];
};
const troca = (de, ate, nome) => {
  const [ai, aj] = trecho(h, de[0], de[1], `${nome} no pge.html`);
  const [bi, bj] = trecho(antigo, ate[0], ate[1], `${nome} no ${COMMIT_HERO}`);
  h = h.slice(0, ai) + antigo.slice(bi, bj) + h.slice(aj);
};

let h = atual;
// Markup do hero
troca(['<section id="pge-topo" class="pge-hero"', "</section>"], ['<section id="pge-topo" class="pge-hero"', "</section>"], "o markup do hero");
// CSS do hero
troca(["/* ---------- Hero ---------- */", "/* ---------- Faixa de malha uniforme"], ["/* ---------- Hero ---------- */", "/* ---------- Faixa de malha uniforme"], "o CSS do hero");
// Regras do hero no celular
troca(["  /* No celular a foto fica em cima e o texto começa abaixo do rosto */", "  #pge .pge-pessoas,\n"], ["  /* No celular o texto começa abaixo da malha, sem célula atrás do título */", "  #pge .pge-pessoas,\n"], "as regras de celular do hero");
// JS da entrada do hero
troca(["  /* --- Hero: a foto clareia", "  /* --- Faixas de borda a borda"], ["  /* --- Hero, em três tempos", "  /* --- Faixas de borda a borda"], "o JS do hero");

// O hero antigo começa abaixo do cabeçalho: o cabeçalho fica sólido, como era
const transparente = /\/\* No topo da página o cabeçalho fica sobre a foto do hero[^]*?\n\}\n\n/;
if (!transparente.test(h)) throw new Error("versao-b: não achei a regra do cabeçalho transparente");
h = h.replace(transparente, "");

h = `<!-- VERSÃO B: hero com a foto da mesa de reunião. Gerada por scripts/versao-b.mjs a partir do pge.html; não edite à mão -->\n` + h;
await writeFile(new URL("pge-b.html", raiz), h);
console.log("Gerado:", fileURLToPath(new URL("pge-b.html", raiz)), Math.round(h.length / 1024) + " KB");
