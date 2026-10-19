import Image from "next/image";
import { citacaoRodolfo, fotos } from "@/content/conteudo";
import { Aspa } from "@/components/marca/Aspa";
import styles from "./Citacao.module.css";

export function Citacao() {
  return (
    <section className={`${styles.secao} escuro`} aria-label="Citação de Rodolfo Oliveira">
      <Image src={fotos.fabrica.src} alt={fotos.fabrica.alt} fill sizes="100vw" className={styles.foto} />
      {/* Véu em Base a 62%, segunda opção do manual para marca e texto sobre foto */}
      <div className={styles.veu} aria-hidden="true" />
      <figure className={`wrap ${styles.conteudo}`}>
        <Aspa className={styles.aspa} />
        <blockquote className={styles.texto}>
          <p>{citacaoRodolfo.texto}</p>
        </blockquote>
        <figcaption className={styles.autor}>
          <strong>{citacaoRodolfo.autor}</strong>
          <span>{citacaoRodolfo.papel}</span>
        </figcaption>
      </figure>
    </section>
  );
}
