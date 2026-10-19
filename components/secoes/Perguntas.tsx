import { faq } from "@/content/conteudo";
import styles from "./Perguntas.module.css";

export function Perguntas() {
  return (
    <section id="perguntas" className={`${styles.secao} claro`} aria-labelledby="perguntas-titulo">
      <div className={`wrap ${styles.grade}`}>
        <h2 id="perguntas-titulo" className={styles.titulo}>
          Perguntas
        </h2>
        <div className={styles.lista}>
          {faq.map((item) => (
            <details key={item.pergunta} className={styles.item}>
              <summary>
                {item.pergunta}
                <span className={styles.sinal} aria-hidden="true" />
              </summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
