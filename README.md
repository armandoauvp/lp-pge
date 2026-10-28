# LP PGE

Landing page do Programa de Governança Empresarial, por XR Advisor, publicada em `/pge` no site da XR (WordPress + Elementor).

A entrega é um arquivo só: [pge.html](pge.html). CSS, JS e os SVGs da marca vão embutidos; todo estilo fica preso a `#pge`.

## Como publicar no Elementor

1. Crie a página `/pge` com o template **Elementor Canvas**.
2. Adicione um contêiner em **largura total**, sem padding e sem gap.
3. Dentro dele, um widget **HTML**. Cole o conteúdo inteiro de `pge.html`.
4. O usuário precisa ser administrador com permissão de HTML sem filtro, senão o WordPress remove o `<script>`.
5. Se o site usa WP Rocket, LiteSpeed ou similar com "atrasar JavaScript", exclua esta página da regra ou aceite que as padronagens só reajam depois da primeira interação.

## Configuração

No fim de `pge.html`, o objeto `CONFIG`:

- `webhookUrl`: URL do App da Web do Apps Script (abaixo). O envio é `application/x-www-form-urlencoded` com `nome`, `email`, `telefone`, `empresa`, `cargo`, `consentimento`, `autoavaliacao`, `site` (anti-spam), `origem`, `pagina` e os `utm_*` da URL. A página só mostra sucesso se a resposta for `{"ok": true}`; se um dia o destino virar o webhook do CRM, ajuste essa conferência.
- `semCors`: `true` se o destino não devolver cabeçalhos CORS (o envio segue, sem conferir a resposta).
- `checkoutUrl`: quando existir, todos os botões de CTA passam a levar ao checkout.
- `politicaUrl`: link da política de privacidade no consentimento.

### Leads no Google Sheets

O formulário grava na planilha por meio de [scripts/google-sheets.gs](scripts/google-sheets.gs).

1. Crie uma planilha no Google Sheets (ex.: "PGE · Leads"). Não precisa criar cabeçalhos: o script cria a aba `Leads` com as colunas no primeiro envio.
2. Na planilha, abra **Extensões → Apps Script**, apague o conteúdo de `Código.gs`, cole o arquivo inteiro e salve.
3. Clique em **Implantar → Nova implantação**, escolha o tipo **App da Web** e configure: *Executar como*: **Eu**; *Quem pode acessar*: **Qualquer pessoa**.
4. Autorize o acesso à planilha quando o Google pedir. Se aparecer "O Google não verificou este app", use **Avançado → Acessar** (o app é seu).
5. Copie a URL que termina em `/exec` e cole em `CONFIG.webhookUrl` no `pge.html`. Abrir essa URL no navegador deve mostrar `{"ok":true,"servico":"pge-leads"}`.

Se você alterar o script depois, publique de novo em **Implantar → Gerenciar implantações → editar → Nova versão**. Assim a URL continua a mesma. Uma "Nova implantação" gera outra URL.

A planilha guarda nome, e-mail e telefone: deixe o compartilhamento restrito a quem trata os leads. Envios com o campo invisível `site` preenchido (robôs) recebem "ok", mas não são gravados.

GA4: o código não instala o GA4. Se `gtag` ou o `dataLayer` do GTM já estiverem na página, dispara `pge_clique_cta` e `generate_lead`.

## Prévia local

```bash
node scripts/preview.mjs
```

Abre em `http://localhost:3001`, simulando a página Canvas com estilos de tema propositalmente hostis e um webhook de teste. A versão B fica em `http://localhost:3001/b`.

## Versão B

[pge-b.html](pge-b.html) é a mesma página com o hero antigo: foto da mesa de reunião e malha animada da marca. Ela é gerada a partir do `pge.html` (o hero vem do commit `1cf83d7`) e não deve ser editada à mão. Depois de mudar o `pge.html`, rode:

```bash
node scripts/versao-b.mjs
```

Para publicar a B no Elementor, cole o `pge-b.html` no widget HTML do mesmo jeito que o `pge.html`. Na prévia da Vercel, ela fica em `/b`.

## Pendências

- Foto da citação (Unsplash, provisória).
- Itens `VALIDAR` no HTML: conteúdo das etapas, formato e carga horária, e-mail oficial.
- Números divergentes do dossiê ficaram de fora até a validação.

A versão Next.js (`app/`, `components/`, `content/`) foi a primeira proposta e não é mais usada.
