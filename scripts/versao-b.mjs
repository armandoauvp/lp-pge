// Gera pge-b.html a partir do pge.html: mesma página, com o hero ilustrado pelos quatro tutores em escada.
// Rode de novo sempre que o pge.html mudar. Uso: node scripts/versao-b.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const raiz = new URL("../", import.meta.url);
let h = await readFile(new URL("pge.html", raiz), "utf8");

const falha = (o) => { throw new Error(`versao-b: não achei ${o} no pge.html`); };
const slug = (nome) => nome.split(" ")[0].normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// 1. Retratos de "Quem conduz": cada foto vira uma variável CSS, usada aqui e no hero (o arquivo leva cada foto uma vez só)
const fotos = {};
h = h.replace(
  /<figure class="pge-retrato" data-ver>\s*(?:<!--[^]*?-->\s*)?<img src="(data:image\/jpeg;base64,[^"]+)" alt="([^"]*)"[^>]*>\s*<\/figure>(\s*<h3>([^<]+)<\/h3>)/g,
  (m, src, alt, resto, nome) => {
    const s = slug(nome);
    fotos[s] = src;
    return `<figure class="pge-retrato" data-ver role="img" aria-label="${alt}" style="--foto: var(--pge-foto-${s})"></figure>${resto}`;
  }
);
for (const s of ["rodolfo", "lucas", "wilson", "pedro"]) if (!fotos[s]) falha(`o retrato de ${s}`);

// 2. Hero: sai a foto do Rodolfo, entra a escada dos tutores (Pedro embaixo à esquerda, Rodolfo no topo à direita)
const ini = h.indexOf('<section id="pge-topo" class="pge-hero"');
const fim = h.indexOf("</section>", ini);
if (ini < 0 || fim < 0) falha("o hero");
const heroA = h.slice(ini, fim);
const c0 = heroA.indexOf('<div class="pge-wrap pge-conteudo">');
if (c0 < 0) falha("o conteúdo do hero");
const conteudo = heroA.slice(c0).replace(/\s*<p class="pge-hero-legenda">[^]*?<\/p>/, "").replace(/\s*$/, "");
const tutores = [
  ["pedro", "Pedro Kreischer", "Diretor de operações da XR"],
  ["wilson", "Wilson Sanches", "Sócio da XR Advisor"],
  ["lucas", "Lucas Costa", "CEO da XR Advisor"],
  ["rodolfo", "Rodolfo Oliveira", "Fundador da XR Advisor"],
];
const escada = tutores
  .map(([s, nome, papel], i) => `        <li style="--i: ${i}"><span class="pge-tutor-foto" style="--foto: var(--pge-foto-${s})"></span><span class="pge-tutor-nome">${nome}</span><span class="pge-tutor-papel">${papel}</span></li>`)
  .join("\n");
const heroB = `<section id="pge-topo" class="pge-hero pge-hero-b" aria-labelledby="pge-hero-titulo">
      ${conteudo}
      <!-- Os quatro tutores em degraus, como a escada do kit gráfico. As fotos são as mesmas de "Quem conduz" -->
      <ul class="pge-tutores" aria-label="Quem conduz o treinamento">
${escada}
      </ul>
    `;
h = h.slice(0, ini) + heroB + h.slice(fim);

// 3. CSS da versão B, depois do CSS principal
const css = `<style>
/* ---------- Versão B: hero com os quatro tutores ---------- */
#pge {
${Object.entries(fotos).map(([s, src]) => `  --pge-foto-${s}: url("${src}");`).join("\n")}
}

#pge .pge-retrato[style] {
  background: var(--foto) center / cover no-repeat, var(--pge-base-600);
}

#pge .pge-hero-b {
  --pge-degrau: clamp(28px, 4.2vw, 64px);
  --pge-folga: clamp(8px, 1vw, 16px);
  --pge-celula: clamp(16px, 2.4vw, 36px);
}

#pge .pge-hero-b h1 {
  max-width: min(13ch, 44vw);
}

#pge .pge-hero-b .pge-lead {
  max-width: min(50ch, 40vw);
}

/* Escada alinhada à margem direita do conteúdo e centralizada na altura visível do hero */
#pge .pge-tutores {
  position: absolute;
  z-index: 1;
  top: 50%;
  right: calc(max(0px, (100% - var(--pge-largura) - 2 * var(--pge-gutter)) / 2) + var(--pge-gutter));
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--pge-folga);
  align-items: start;
  width: min(44%, 620px);
  translate: 0 -50%;
}

#pge.pge-js .pge-tutores {
  top: calc(50% + var(--pge-cab) / 2);
}

/* Cada tutor um degrau acima do anterior */
#pge .pge-tutores li {
  margin-top: calc((3 - var(--i)) * var(--pge-degrau));
}

/* Célula coral da marca no vão acima do primeiro degrau */
#pge .pge-tutores::before {
  content: "";
  position: absolute;
  top: calc(3 * var(--pge-degrau) - var(--pge-celula) - var(--pge-folga));
  left: 0;
  width: var(--pge-celula);
  aspect-ratio: 1;
  border-radius: 30%;
  background: var(--pge-acento);
}

#pge .pge-tutor-foto {
  display: block;
  aspect-ratio: 4 / 5;
  border-radius: var(--pge-r-painel);
  background: var(--foto) center / cover no-repeat, var(--pge-base-600);
  transition: translate 420ms var(--pge-ease);
}

@media (hover: hover) {
  #pge .pge-tutores li:hover .pge-tutor-foto {
    translate: 0 -6px;
  }
}

#pge .pge-tutor-nome {
  display: block;
  margin-top: 12px;
  color: var(--pge-branco);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
}

#pge .pge-tutor-papel {
  display: block;
  margin-top: 2px;
  color: var(--pge-neutro-300);
  font-size: 13px;
  line-height: 1.35;
}

/* Entrada: os retratos sobem um a um, de baixo para o topo da escada */
#pge .pge-hero-b.pge-entrando .pge-tutores li {
  opacity: 0;
  translate: 0 28px;
}

#pge .pge-hero-b.pge-entrando.pge-revelada .pge-tutores li {
  opacity: 1;
  translate: 0 0;
  transition: opacity 700ms var(--pge-ease), translate 900ms var(--pge-ease);
  transition-delay: calc(var(--i) * 110ms + 100ms);
}

/* Telas médias e celular: a escada vai para cima do texto */
@media (max-width: 960px) {
  #pge .pge-hero-b {
    display: flex;
    flex-direction: column;
    --pge-degrau: clamp(12px, 3vw, 28px);
  }
  #pge .pge-tutores,
  #pge.pge-js .pge-tutores {
    position: relative;
    top: auto;
    right: auto;
    order: -1;
    width: min(100% - 2 * var(--pge-gutter), 560px);
    margin: 40px var(--pge-gutter) 0;
    translate: none;
  }
  #pge.pge-js .pge-tutores {
    margin-top: calc(var(--pge-cab) + 32px);
  }
  #pge .pge-hero-b .pge-conteudo,
  #pge.pge-js .pge-hero-b .pge-conteudo {
    min-height: 0;
    padding-top: 48px;
    padding-bottom: 72px;
  }
  #pge .pge-hero-b h1,
  #pge .pge-hero-b .pge-lead {
    max-width: 54ch;
  }
  #pge .pge-hero-b h1 {
    max-width: 13ch;
  }
}

@media (max-width: 720px) {
  #pge .pge-hero-b {
    --pge-folga: 8px;
  }
  #pge .pge-tutor-foto {
    border-radius: 12px;
  }
  #pge .pge-tutor-nome {
    margin-top: 8px;
    font-size: 12px;
  }
  #pge .pge-tutor-papel {
    display: none;
  }
}
</style>
`;
const div = h.indexOf('<div id="pge"');
if (div < 0) falha('o <div id="pge">');
h = h.slice(0, div) + css + h.slice(div);

// 4. JS: a entrada do hero B não depende de foto
const j0 = h.indexOf("  /* --- Hero: a foto clareia");
const j1 = h.indexOf("  /* --- Faixas de borda a borda", j0);
if (j0 < 0 || j1 < 0) falha("o JS do hero");
h = h.slice(0, j0) + `  /* --- Hero B: os retratos sobem em degraus e o texto entra junto --- */
  var hero = raiz.querySelector(".pge-hero");
  if (hero && anima) {
    hero.classList.add("pge-entrando");
    Array.prototype.forEach.call(hero.querySelectorAll(".pge-conteudo > *"), function (el, i) {
      el.style.setProperty("--i", i);
    });
    var revela = function () { hero.classList.add("pge-revelada"); };
    requestAnimationFrame(function () { requestAnimationFrame(revela); });
    // Segurança: em aba de fundo o rAF não roda
    setTimeout(revela, 1200);
  }

` + h.slice(j1);

h = `<!-- VERSÃO B, gerada por scripts/versao-b.mjs a partir do pge.html. Não edite à mão: mude o pge.html e rode o script -->\n` + h;
await writeFile(new URL("pge-b.html", raiz), h);
console.log("Gerado:", fileURLToPath(new URL("pge-b.html", raiz)), Math.round(h.length / 1024) + " KB");
