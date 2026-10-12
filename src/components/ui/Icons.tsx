/** Inline SVG icons for things lucide lacks (lotus, rings, temple, brand-free). stroke/fill = currentColor. */
type P = { className?: string };

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const LotusIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden {...line}>
    <path d="M16 6c3 3 4.500 6.500 0 12-4.500-5.500-3-9 0-12Z" />
    <path d="M16 18c-1-3.500-4-6-9-6 0 6 3 9 9 9" />
    <path d="M16 18c1-3.500 4-6 9-6 0 6-3 9-9 9" />
    <path d="M7.500 21c2 3.200 5 4.500 8.500 4.500s6.500-1.300 8.500-4.500" />
  </svg>
);

export const RingsIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden {...line}>
    <circle cx="12" cy="20" r="6" />
    <circle cx="20" cy="20" r="6" />
    <path d="M13 7l2-3h2l2 3-3 4Z" />
  </svg>
);

export const TempleIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden {...line}>
    <path d="M16 3v3" />
    <path d="M11 11c0-3 2.200-5 5-5s5 2 5 5" />
    <path d="M8 16c0-2.500 3-5 8-5s8 2.500 8 5" />
    <path d="M5 28V16h22v12" />
    <path d="M13 28v-6a3 3 0 0 1 6 0v6" />
  </svg>
);

export const GaneshaMark = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden {...line}>
    <path d="M16 4c-2 0-3 1-3 3 0 1 .5 2 1 2.500" />
    <path d="M16 4c2 0 3 1 3 3 0 1-.5 2-1 2.500" />
    <path d="M10 10c-3 0-5 2-5 5s2 5 5 5c1 0 2-.5 2.500-1" />
    <path d="M22 10c3 0 5 2 5 5s-2 5-5 5c-1 0-2-.5-2.500-1" />
    <path d="M16 9c-2 2-2 6-1 9 1 3 0 5-2 7" />
    <path d="M16 9c2 2 2 6 1 9" />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2Zm0 18.200a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200Zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.100-.7.800-.8 1-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.3-.4.3-.4.7-1.400.1-.2 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.700 11.800 11.800 0 0 0 4.500 4c1.700.7 2.300.8 3.200.6a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);
