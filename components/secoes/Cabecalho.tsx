import { Assinatura } from "@/components/marca/Assinatura";
import { hero } from "@/content/conteudo";
import styles from "./Cabecalho.module.css";

const LINKS = [
  { href: "#etapas", texto: "Como funciona" },
  { href: "#resultados", texto: "Resultados" },
  { href: "#conducao", texto: "Quem conduz" },
  { href: "#perguntas", texto: "Perguntas" },
];

export function Cabecalho() {
  return (
    <header className={`${styles.cabecalho} escuro`}>
      <div className={`wrap ${styles.linha}`}>
        <a href="#topo" className={styles.marca}>
          <Assinatura className={styles.assinatura} />
        </a>
        <nav aria-label="Seções" className={styles.nav}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.texto}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#aplicacao" className={`botao botao-primario ${styles.cta}`}>
          {hero.cta}
        </a>
      </div>
    </header>
  );
}
