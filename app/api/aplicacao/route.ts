import { NextResponse } from "next/server";

const OBRIGATORIOS = [
  "nome",
  "email",
  "whatsapp",
  "cargo",
  "empresa",
  "cnpj",
  "segmento",
  "cidade",
  "faturamento",
  "socios",
  "desafio",
  "consentimento",
] as const;

const OPCIONAIS = ["mensagem"] as const;

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Não foi possível ler os dados enviados." }, { status: 400 });
  }

  // Aceita só os campos conhecidos e limita o tamanho de cada um
  const dados: Record<string, string> = {};
  for (const campo of [...OBRIGATORIOS, ...OPCIONAIS]) {
    const valor = corpo[campo];
    if (typeof valor === "string") dados[campo] = valor.trim().slice(0, 1200);
  }

  const faltando = OBRIGATORIOS.filter((c) => !dados[c]);
  if (faltando.length) {
    return NextResponse.json({ erro: `Faltou preencher: ${faltando.join(", ")}.` }, { status: 422 });
  }
  if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
    return NextResponse.json({ erro: "O e-mail informado parece incompleto." }, { status: 422 });
  }
  if (dados.cnpj.replace(/\D/g, "").length !== 14) {
    return NextResponse.json({ erro: "O CNPJ precisa ter 14 números." }, { status: 422 });
  }

  const lead = { ...dados, origem: "lp-pge", recebidoEm: new Date().toISOString() };

  // Destino definido por variável de ambiente até o time escolher o CRM
  const destino = process.env.APLICACAO_WEBHOOK_URL;
  if (!destino) {
    console.info("[aplicacao] APLICACAO_WEBHOOK_URL não configurada; lead recebido:", dados.empresa);
    return NextResponse.json({ ok: true });
  }

  try {
    const resposta = await fetch(destino, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!resposta.ok) throw new Error(String(resposta.status));
  } catch (falha) {
    console.error("[aplicacao] falha ao repassar lead:", falha);
    return NextResponse.json({ erro: "Não conseguimos registrar a aplicação agora." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
