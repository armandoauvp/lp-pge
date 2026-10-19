import Image from "next/image";
import { conducao, fotos } from "@/content/conteudo";
import styles from "./Conducao.module.css";

export function Conducao() {
  return (
    <section id="conducao" className={`${styles.secao} escuro`} aria-labelledby="conducao-titulo">
      <div className={`wrap ${styles.grade}`}>
        <div className={styles.foto}>
          {/* Sala vazia de propósito: foto com pessoas ao lado dos nomes sugeriria que são Rodolfo e Lucas */}
          <Image
            src={fotos.conselho.src}
            alt={fotos.conselho.alt}
            fill
            sizes="(max-width: 860px) 100vw, 45vw"
          />
        </div>

        <div>
          <h2 id="conducao-titulo" className={styles.titulo}>
            {conducao.titulo}
          </h2>
          <p className={styles.texto}>{conducao.texto}</p>

          <ul className={styles.pessoas}>
            {conducao.pessoas.map((p) => (
              <li key={p.nome}>
                <h3 className={styles.nome}>{p.nome}</h3>
                <p className={styles.papel}>{p.papel}</p>
                <p className={styles.bio}>{p.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <dl className={styles.numeros}>
          {conducao.numeros.map((n) => (
            <div key={n.rotulo}>
              <dt className="sr-only">{n.rotulo}</dt>
              <dd className={styles.valor}>{n.valor}</dd>
              <dd className={styles.rotulo}>{n.rotulo}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.fonte}>{conducao.fonte}</p>
      </div>
    </section>
  );
}
