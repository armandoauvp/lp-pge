import { etapas } from "@/content/conteudo";
import styles from "./Etapas.module.css";

export function Etapas() {
  return (
    <section id="etapas" className={styles.secao} aria-labelledby="etapas-titulo">
      <div className="wrap">
        <div className={styles.cabeca}>
          <h2 id="etapas-titulo" className={styles.titulo}>
            {etapas.titulo}
          </h2>
          <p className={styles.texto}>{etapas.texto}</p>
        </div>

        <ol className={styles.lista}>
          {etapas.itens.map((etapa, i) => (
            <li key={etapa.nome} className={styles.etapa}>
              <span className={styles.marcador} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.nome}>
                <span className="sr-only">Etapa {i + 1}: </span>
                {etapa.nome}
              </h3>
              <p className={styles.faz}>{etapa.faz}</p>
              <p className={styles.fica}>
                <span className={styles.ficaRotulo}>O que fica na empresa</span>
                {etapa.fica}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
