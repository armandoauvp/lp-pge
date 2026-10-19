import { perfil } from "@/content/conteudo";
import styles from "./Perfil.module.css";

export function Perfil() {
  return (
    <section className={styles.secao} aria-labelledby="perfil-titulo">
      <div className={`wrap ${styles.grade}`}>
        <h2 id="perfil-titulo" className={styles.titulo}>
          {perfil.titulo}
        </h2>
        <div>
          <h3 className={styles.subtitulo}>Faz sentido se</h3>
          <ul className={styles.lista}>
            {perfil.sim.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.subtitulo}>Ainda não é o momento se</h3>
          <ul className={`${styles.lista} ${styles.nao}`}>
            {perfil.nao.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
