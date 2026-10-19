import styles from "./Malha.module.css";

// Malha progressiva da capa A01: a própria marca ampliada, sangrando pela borda.
// Coordenadas do Figma (237:14 a 237:32), recortadas no viewBox.
const CELULAS: Array<[x: number, y: number, lado: number, acento?: boolean]> = [
  [1918.46, -80, 161.538],
  [1720, -80, 152.308],
  [1530.77, -80, 143.077],
  [1350.77, -80, 133.846],
  [1180, -80, 124.615],
  [1927.69, 127.69, 152.308],
  [1729.23, 127.69, 143.077],
  [1540, 127.69, 133.846],
  [1360, 127.69, 124.615],
  [1189.23, 127.69, 115.385, true],
  [1936.92, 326.15, 143.077],
  [1738.46, 326.15, 133.846],
  [1549.23, 326.15, 124.615],
  [1369.23, 326.15, 115.385, true],
  [1946.15, 515.38, 133.846],
  [1747.69, 515.38, 124.615],
  [1558.46, 515.38, 115.385, true],
  [1955.38, 695.38, 124.615],
  [1756.92, 695.38, 115.385, true],
];

export function Malha({ className }: { className?: string }) {
  return (
    <svg viewBox="1180 -80 900 900" className={`${styles.malha} ${className ?? ""}`} aria-hidden="true">
      {CELULAS.map(([x, y, lado, acento], i) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={lado}
          height={lado}
          rx={lado * 0.34}
          className={acento ? styles.acento : styles.celula}
          style={{ animationDelay: `${i * 35}ms` }}
        />
      ))}
    </svg>
  );
}
