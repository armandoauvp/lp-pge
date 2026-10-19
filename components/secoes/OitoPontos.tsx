import { oitoPontos } from "@/content/conteudo";
import styles from "./OitoPontos.module.css";

export function OitoPontos() {
  return (
    <section className={`${styles.secao} escuro`} aria-labelledby="oito-titulo">
      <div className={`wrap ${styles.grade}`}>
        <div>
          <h2 id="oito-titulo" className={styles.titulo}>
            {oitoPontos.titulo}
          </h2>
          <p className={styles.texto}>{oitoPontos.texto}</p>
        </div>
        <ul className={styles.lista}>
          {oitoPontos.itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
