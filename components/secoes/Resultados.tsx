import { depoimentos, resultados } from "@/content/conteudo";
import { Aspa } from "@/components/marca/Aspa";
import styles from "./Resultados.module.css";

export function Resultados() {
  const { destaque } = resultados;
  const maximo = Math.max(...destaque.serie.map((s) => s.valor));
  const [principal, ...demais] = depoimentos;

  return (
    <section id="resultados" className={`${styles.secao} claro`} aria-labelledby="resultados-titulo">
      <div className="wrap">
        <h2 id="resultados-titulo" className={styles.titulo}>
          {resultados.titulo}
        </h2>

        <div className={styles.grade}>
          <article className={styles.destaque}>
            <h3 className={styles.empresa}>{destaque.empresa}</h3>
            <p className={styles.setor}>{destaque.setor}</p>
            <figure className={styles.grafico}>
              <ol aria-label={destaque.legenda}>
                {destaque.serie.map((s, i) => (
                  <li key={s.ano}>
                    <span className={styles.valor}>{s.rotulo}</span>
                    <span
                      className={`${styles.barra} ${i === destaque.serie.length - 1 ? styles.barraAtual : ""}`}
                      style={{ "--h": s.valor / maximo } as React.CSSProperties}
                      aria-hidden="true"
                    />
                    <span className={styles.ano}>{s.ano}</span>
                  </li>
                ))}
              </ol>
              <figcaption>{destaque.legenda}</figcaption>
            </figure>
            <p className={styles.destaqueTexto}>{destaque.texto}</p>
          </article>

          <ul className={styles.outros}>
            {resultados.outros.map((c) => (
              <li key={c.empresa}>
                <h3 className={styles.outroEmpresa}>{c.empresa}</h3>
                <p className={styles.setor}>{c.setor}</p>
                <p className={styles.numero}>{c.numero}</p>
                <p className={styles.outroTexto}>{c.texto}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.nota}>{resultados.nota}</p>

        <div className={styles.depoimentos}>
          <figure className={styles.depoimentoPrincipal}>
            <Aspa className={styles.aspa} />
            <blockquote>
              <p>{principal.texto}</p>
            </blockquote>
            <figcaption>
              <strong>{principal.autor}</strong>, {principal.papel}.{" "}
              <a href={principal.link} target="_blank" rel="noopener noreferrer">
                Assistir ao vídeo no Instagram
              </a>
            </figcaption>
          </figure>
          {demais.map((d) => (
            <figure key={d.autor} className={styles.depoimento}>
              <blockquote>
                <p>{d.texto}</p>
              </blockquote>
              <figcaption>
                <strong>{d.autor}</strong>, {d.papel}.{" "}
                <a href={d.link} target="_blank" rel="noopener noreferrer">
                  Assistir ao vídeo
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
