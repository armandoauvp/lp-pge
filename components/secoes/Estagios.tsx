import { estagios } from "@/content/conteudo";
import styles from "./Estagios.module.css";

export function Estagios() {
  return (
    <section className={`${styles.secao} claro`} aria-labelledby="estagios-titulo">
      <div className="wrap">
        <div className={styles.intro}>
          <h2 id="estagios-titulo" className={styles.titulo}>
            {estagios.titulo}
          </h2>
          <p className={styles.texto}>{estagios.texto}</p>
        </div>

        {/* Escada do kit gráfico: cada estágio empilha uma célula sobre o anterior */}
        <ol className={styles.escada}>
          {estagios.itens.map((item, i) => {
            const destino = i === estagios.itens.length - 1;
            return (
              <li key={item.nome} className={destino ? styles.destino : undefined}>
                <span className={styles.celulas} aria-hidden="true">
                  {Array.from({ length: i + 1 }, (_, n) => (
                    <span key={n} className={n === 0 ? styles.topo : undefined} />
                  ))}
                </span>
                <h3 className={styles.nome}>{item.nome}</h3>
                <p className={styles.descricao}>{item.descricao}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
