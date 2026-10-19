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

- `webhookUrl`: endpoint do CRM. O envio é `application/x-www-form-urlencoded` com `nome`, `email`, `telefone`, `empresa`, `cargo`, `consentimento`, `origem`, `pagina` e os `utm_*` da URL.
- `semCors`: `true` se o CRM não devolver cabeçalhos CORS (o envio segue, sem conferir a resposta).
- `checkoutUrl`: quando existir, todos os botões de CTA passam a levar ao checkout.
- `politicaUrl`: link da política de privacidade no consentimento.

GA4: o código não instala o GA4. Se `gtag` ou o `dataLayer` do GTM já estiverem na página, dispara `pge_clique_cta` e `generate_lead`.

## Prévia local

```bash
node scripts/preview.mjs
```

Abre em `http://localhost:3001`, simulando a página Canvas com estilos de tema propositalmente hostis e um webhook de teste.

## Pendências

- Fotos de Rodolfo e Lucas (os retratos têm um placeholder com a malha) e foto da citação (Unsplash, provisória).
- Itens `VALIDAR` no HTML: conteúdo das etapas, formato e carga horária, e-mail oficial.
- Números divergentes do dossiê ficaram de fora até a validação.

A versão Next.js (`app/`, `components/`, `content/`) foi a primeira proposta e não é mais usada.
