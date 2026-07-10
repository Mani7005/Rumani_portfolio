export default function TechBadge({ children }) {
  return (
    <span className="rounded-sm border border-cyan-core/15 bg-cyan-core/5 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-cyan-core/70 uppercase">
      {children}
    </span>
  );
}
