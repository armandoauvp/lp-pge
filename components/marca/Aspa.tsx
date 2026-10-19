// Aspa do kit gráfico: duas células, uma grande e uma pequena
export function Aspa({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 30" width="64" height="30" className={className} aria-hidden="true">
      <rect x="0" y="0" width="30" height="30" rx="10.2" fill="currentColor" />
      <rect x="40" y="0" width="20" height="20" rx="6.8" fill="currentColor" />
    </svg>
  );
}
