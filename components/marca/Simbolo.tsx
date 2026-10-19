// Geometria exata do símbolo no Figma (frame "Símbolo", 92,16 × 92,16)
const CELULAS: Array<[x: number, y: number, lado: number, raio: number, acento?: boolean]> = [
  [75.62, 0, 16.542, 4.632],
  [55.3, 0, 15.596, 4.824],
  [35.92, 0, 14.651, 4.962],
  [17.49, 0, 13.706, 5.044],
  [0, 0, 12.761, 5.07],
  [76.56, 21.27, 15.596, 4.824],
  [56.24, 21.27, 14.651, 4.962],
  [36.86, 21.27, 13.706, 5.044],
  [18.43, 21.27, 12.761, 5.07],
  [0.95, 21.27, 11.815, 5.041, true],
  [77.51, 41.59, 14.651, 4.962],
  [57.19, 41.59, 13.706, 5.044],
  [37.81, 41.59, 12.761, 5.07],
  [19.38, 41.59, 11.815, 5.041, true],
  [78.45, 60.97, 13.706, 5.044],
  [58.13, 60.97, 12.761, 5.07],
  [38.75, 60.97, 11.815, 5.041, true],
  [79.4, 79.4, 12.761, 5.07],
  [59.08, 79.4, 11.815, 5.041, true],
];

type Props = {
  tom?: "negativo" | "positivo";
  className?: string;
};

export function Simbolo({ tom = "negativo", className }: Props) {
  const corBase = tom === "negativo" ? "var(--branco)" : "var(--base)";
  // No escuro o manual troca o coral pelo acento claro
  const corAcento = tom === "negativo" ? "var(--acento-claro)" : "var(--acento)";

  return (
    <svg viewBox="0 0 92.16 92.16" className={className} aria-hidden="true">
      {CELULAS.map(([x, y, lado, raio, acento]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={lado}
          height={lado}
          rx={raio}
          fill={acento ? corAcento : corBase}
        />
      ))}
    </svg>
  );
}
