import { Assinatura } from "@/components/marca/Assinatura";
import { hero, rodape } from "@/content/conteudo";
import styles from "./Rodape.module.css";

export function Rodape() {
  return (
    <footer className={`${styles.rodape} escuro`}>
      <div className={`wrap ${styles.topo}`}>
        <p className={styles.chamada}>Para entrar no PGE, o primeiro passo é a aplicação.</p>
        <a href="#aplicacao" className="botao botao-primario">
          {hero.cta}
        </a>
      </div>

      <div className={`wrap ${styles.grade}`}>
        <Assinatura className={styles.assinatura} />
        <address className={styles.bloco}>
          {rodape.endereco.map((linha) => (
            <span key={linha}>{linha}</span>
          ))}
        </address>
        <ul className={styles.bloco}>
          <li>
            <a href={`mailto:${rodape.email}`}>{rodape.email}</a>
          </li>
          <li>
            <a href={rodape.instagram} target="_blank" rel="noopener noreferrer">
              Instagram da XR Advisor
            </a>
          </li>
          <li>
            <a href={rodape.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn da XR Advisor
            </a>
          </li>
        </ul>
      </div>

      <div className={`wrap ${styles.base}`}>
        <p>© {new Date().getFullYear()} XR Advisor. Programa de Governança Empresarial.</p>
      </div>
    </footer>
  );
}
