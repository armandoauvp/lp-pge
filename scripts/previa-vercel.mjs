// Gera previa/index.html (pge.html) e previa/b/index.html (pge-b.html) em páginas limpas, para revisão interna na Vercel.
// Uso: node scripts/versao-b.mjs && node scripts/previa-vercel.mjs && vercel deploy previa
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const raiz = new URL("../", import.meta.url);

const pagina = (bloco, titulo) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Prévia interna da página do PGE, Programa de Governança Empresarial da XR Advisor.">
<link rel="icon" href="data:,">
<title>${titulo}</title>
<style>body { margin: 0; }</style>
</head>
<body>
${bloco}
</body>
</html>
`;

const versoes = [
  ["pge.html", "previa/", "Prévia PGE"],
  ["pge-b.html", "previa/b/", "Prévia PGE · versão B"],
];
for (const [origem, pasta, titulo] of versoes) {
  const bloco = await readFile(new URL(origem, raiz), "utf8");
  await mkdir(new URL(pasta, raiz), { recursive: true });
  await writeFile(new URL(pasta + "index.html", raiz), pagina(bloco, titulo));
  console.log("Gerado:", fileURLToPath(new URL(pasta + "index.html", raiz)));
}
await writeFile(new URL("previa/robots.txt", raiz), "User-agent: *\nDisallow: /\n");
