// Prévia local do pge.html: simula a página Canvas do Elementor (só body vazio + o bloco colado)
// e oferece um webhook de teste em /webhook-teste. Uso: node scripts/preview.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const arquivo = fileURLToPath(new URL("../pge.html", import.meta.url));
const arquivoB = fileURLToPath(new URL("../pge-b.html", import.meta.url));
const porta = Number(process.env.PORT ?? 3001);

const casca = (bloco) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Prévia PGE</title>
<style>
  /* Estilos típicos de tema WordPress, para conferir se o #pge resiste a eles */
  body { margin: 0; font-family: Georgia, serif; color: #333; }
  h1, h2, h3 { color: purple; font-family: Georgia, serif; text-transform: uppercase; margin: 1em 0; }
  a { color: green; }
  button, input, select { border: 3px solid red; background: yellow; padding: 20px; }
  p { margin-bottom: 2em; }
  .elementor-widget-container { max-width: 100%; }
</style>
<script>window.PGE_WEBHOOK_TESTE = "/webhook-teste";</script>
</head>
<body>
<div class="elementor-widget-container">
${bloco}
</div>
</body>
</html>`;

createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/webhook-teste") {
    let corpo = "";
    for await (const parte of req) corpo += parte;
    // Responde como o scripts/google-sheets.gs: descarta o que vier com o campo anti-spam
    const dados = Object.fromEntries(new URLSearchParams(corpo));
    console.log(dados.site ? "[webhook-teste] descartado (anti-spam)" : "[webhook-teste]", dados);
    res.writeHead(200, { "Content-Type": "application/json" }).end('{"ok":true}');
    return;
  }
  // /b mostra a versão B (pge-b.html, gerada por scripts/versao-b.mjs)
  const versaoB = /^\/b\/?(\?|$)/.test(req.url ?? "");
  if (versaoB || req.url === "/" || req.url?.startsWith("/?")) {
    const bloco = await readFile(versaoB ? arquivoB : arquivo, "utf8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }).end(casca(bloco));
    return;
  }
  res.writeHead(404).end();
}).listen(porta, () => console.log(`Prévia em http://localhost:${porta}`));
