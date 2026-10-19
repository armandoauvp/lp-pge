"use client";

import { useRef, useState } from "react";
import { aplicacao } from "@/content/conteudo";
import styles from "./Aplicacao.module.css";

const ETAPAS = ["Você", "Empresa", "Momento"];

type Status = "editando" | "enviando" | "enviado" | "erro";

export function Aplicacao() {
  const [etapa, setEtapa] = useState(0);
  const [status, setStatus] = useState<Status>("editando");
  const [erro, setErro] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const tituloEtapaRef = useRef<HTMLHeadingElement>(null);

  // Valida só os campos visíveis antes de avançar
  function etapaValida() {
    const grupo = formRef.current?.querySelector<HTMLFieldSetElement>(`[data-etapa="${etapa}"]`);
    if (!grupo) return true;
    const campos = Array.from(grupo.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const invalido = campos.find((c) => !c.checkValidity());
    if (invalido) {
      invalido.reportValidity();
      return false;
    }
    return true;
  }

  function irPara(proxima: number) {
    setEtapa(proxima);
    requestAnimationFrame(() => tituloEtapaRef.current?.focus());
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etapa < ETAPAS.length - 1) {
      if (etapaValida()) irPara(etapa + 1);
      return;
    }
    if (!etapaValida()) return;

    setStatus("enviando");
    setErro("");
    const dados = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const resposta = await fetch("/api/aplicacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!resposta.ok) {
        const corpo = (await resposta.json().catch(() => null)) as { erro?: string } | null;
        throw new Error(corpo?.erro ?? "O servidor não aceitou o envio.");
      }
      setStatus("enviado");
    } catch (falha) {
      setStatus("erro");
      setErro(
        `${falha instanceof Error ? falha.message : "Falha de conexão."} Suas respostas continuam preenchidas. Tente enviar de novo ou escreva para contato@xradvisor.com.br.`,
      );
    }
  }

  return (
    <section id="aplicacao" className={`${styles.secao} escuro`} aria-labelledby="aplicacao-titulo">
      <div className={`wrap ${styles.grade}`}>
        <div className={styles.lado}>
          <h2 id="aplicacao-titulo" className={styles.titulo}>
            {aplicacao.titulo}
          </h2>
          <p className={styles.texto}>{aplicacao.texto}</p>

          {status !== "enviado" && (
            // Barra da aula do kit gráfico: uma célula por etapa
            <ol className={styles.barra} aria-label="Etapas da aplicação">
              {ETAPAS.map((nome, i) => (
                <li key={nome} className={i <= etapa ? styles.feita : undefined} aria-current={i === etapa ? "step" : undefined}>
                  <span aria-hidden="true" />
                  {nome}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className={styles.painel}>
          {status === "enviado" ? (
            <div className={styles.sucesso} role="status">
              <h3>Aplicação enviada</h3>
              <p>{aplicacao.sucesso}</p>
            </div>
          ) : (
            // noValidate: a validação nativa barraria campos das etapas ainda ocultas
            <form ref={formRef} onSubmit={enviar} noValidate>
              <h3 ref={tituloEtapaRef} tabIndex={-1} className={styles.etapaTitulo}>
                {etapa + 1} de {ETAPAS.length}. {ETAPAS[etapa]}
              </h3>

              <fieldset data-etapa="0" hidden={etapa !== 0} className={styles.grupo}>
                <legend className="sr-only">Seus dados</legend>
                <Campo id="nome" rotulo="Nome completo" autoComplete="name" required />
                <Campo id="email" rotulo="E-mail" type="email" autoComplete="email" required />
                <Campo
                  id="whatsapp"
                  rotulo="WhatsApp com DDD"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[0-9()+\- ]{10,20}"
                  title="Use só números, com DDD."
                  required
                />
                <div className={styles.campo}>
                  <label htmlFor="cargo">Seu papel na empresa</label>
                  <select id="cargo" name="cargo" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option>Fundador ou sócio</option>
                    <option>CEO ou diretor</option>
                    <option>Conselheiro</option>
                    <option>Outro</option>
                  </select>
                </div>
              </fieldset>

              <fieldset data-etapa="1" hidden={etapa !== 1} className={styles.grupo}>
                <legend className="sr-only">Dados da empresa</legend>
                <Campo id="empresa" rotulo="Nome da empresa" autoComplete="organization" required />
                <Campo
                  id="cnpj"
                  rotulo="CNPJ"
                  inputMode="numeric"
                  pattern="[0-9./\- ]{14,18}"
                  title="14 números, com ou sem pontuação."
                  required
                />
                <Campo id="segmento" rotulo="Segmento" placeholder="Ex.: distribuição de alimentos" required />
                <Campo id="cidade" rotulo="Cidade e estado" placeholder="Ex.: Goiânia (GO)" required />
              </fieldset>

              <fieldset data-etapa="2" hidden={etapa !== 2} className={styles.grupo}>
                <legend className="sr-only">Momento da empresa</legend>
                <fieldset className={styles.opcoes}>
                  <legend>Faturamento bruto anual</legend>
                  {aplicacao.faturamento.map((f, i) => (
                    <label key={f} className={styles.opcao}>
                      <input type="radio" name="faturamento" value={f} required={i === 0} />
                      {f}
                    </label>
                  ))}
                </fieldset>

                <div className={styles.campo}>
                  <label htmlFor="socios">Quantos sócios a empresa tem</label>
                  <select id="socios" name="socios" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option>Só eu</option>
                    <option>Dois</option>
                    <option>De três a cinco</option>
                    <option>Mais de cinco</option>
                  </select>
                </div>

                <fieldset className={styles.opcoes}>
                  <legend>O que mais pesa hoje</legend>
                  {aplicacao.desafios.map((d, i) => (
                    <label key={d} className={styles.opcao}>
                      <input type="radio" name="desafio" value={d} required={i === 0} />
                      {d}
                    </label>
                  ))}
                </fieldset>

                <div className={styles.campo}>
                  <label htmlFor="mensagem">
                    Algo mais que o time deva saber <span className={styles.opcional}>(opcional)</span>
                  </label>
                  <textarea id="mensagem" name="mensagem" rows={4} maxLength={1200} />
                </div>

                <label className={styles.consentimento}>
                  <input type="checkbox" name="consentimento" value="sim" required />
                  Autorizo a XR Advisor a usar estes dados para avaliar a aplicação e entrar em contato comigo.
                </label>
              </fieldset>

              {status === "erro" && (
                <p className={styles.erro} role="alert">
                  {erro}
                </p>
              )}

              <div className={styles.acoes}>
                {etapa > 0 && (
                  <button type="button" className="botao botao-contorno" onClick={() => irPara(etapa - 1)}>
                    Voltar
                  </button>
                )}
                <button type="submit" className="botao botao-primario" disabled={status === "enviando"}>
                  {etapa < ETAPAS.length - 1
                    ? `Continuar para ${ETAPAS[etapa + 1].toLowerCase()}`
                    : status === "enviando"
                      ? "Enviando..."
                      : "Enviar aplicação"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type CampoProps = React.InputHTMLAttributes<HTMLInputElement> & { id: string; rotulo: string };

function Campo({ id, rotulo, type = "text", ...resto }: CampoProps) {
  return (
    <div className={styles.campo}>
      <label htmlFor={id}>{rotulo}</label>
      <input id={id} name={id} type={type} {...resto} />
    </div>
  );
}
