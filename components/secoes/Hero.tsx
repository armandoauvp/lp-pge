import { Malha } from "@/components/marca/Malha";
import { hero } from "@/content/conteudo";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="topo" className={`${styles.hero} escuro`} aria-labelledby="hero-titulo">
      <Malha className={styles.malha} />
      <div className={`wrap ${styles.conteudo}`}>
        <h1 id="hero-titulo" className={styles.titulo}>
          {hero.titulo}
        </h1>
        <p className={styles.texto}>{hero.texto}</p>
        <div className={styles.acoes}>
          <a href="#aplicacao" className="botao botao-primario">
            {hero.cta}
          </a>
          <a href="#etapas" className="link-seta">
            {hero.secundario}
          </a>
        </div>
      </div>
    </section>
  );
}
