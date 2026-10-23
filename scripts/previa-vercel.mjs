// Gera previa/index.html: o pge.html dentro de uma página limpa, para revisão interna na Vercel.
// Uso: node scripts/previa-vercel.mjs && vercel deploy previa
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const raiz = new URL("../", import.meta.url);
const bloco = await readFile(new URL("pge.html", raiz), "utf8");

const pagina = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Prévia interna da página do PGE, Programa de Governança Empresarial da XR Advisor.">
<link rel="icon" href="data:,">
<title>Prévia PGE</title>
<style>body { margin: 0; }</style>
</head>
<body>
${bloco}
</body>
</html>
`;

await mkdir(new URL("previa/", raiz), { recursive: true });
await writeFile(new URL("previa/index.html", raiz), pagina);
await writeFile(new URL("previa/robots.txt", raiz), "User-agent: *\nDisallow: /\n");
console.log("Gerado:", fileURLToPath(new URL("previa/index.html", raiz)));
