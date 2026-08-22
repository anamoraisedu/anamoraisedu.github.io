import { WhatsAppFloat } from 'ana-morais-site-styles';

// The FAB is position:fixed (bottom-right of the page). A transformed ancestor
// becomes its containing block, so the card shows it in place instead of
// pinning it to the preview viewport.
export const Default = () => (
  <div style={{ position: 'relative', transform: 'translate(0)', width: 160, height: 140, borderRadius: 16, background: 'var(--paper-2)' }}>
    <WhatsAppFloat />
  </div>
);
