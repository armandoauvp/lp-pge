import { Simbolo } from "./Simbolo";
import styles from "./Assinatura.module.css";

// Assinatura de realização "PGE por XR Advisor" (Figma 237:33).
// O manual só permite a marca da XR sobre fundo escuro, por isso não há versão positiva.
export function Assinatura({ className }: { className?: string }) {
  return (
    <span className={`${styles.assinatura} ${className ?? ""}`} role="img" aria-label="PGE, por XR Advisor">
      <Simbolo className={styles.simbolo} />
      <span className={styles.sigla} aria-hidden="true">
        PGE
      </span>
      <span className={styles.por} aria-hidden="true">
        POR
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.xr} src="/brand/xr-advisor-branco.svg" alt="" width={384.817} height={62.354} />
    </span>
  );
}
