import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ChoiceButton({ choice, onSelect, disabled }) {
  return (
    <button
      onClick={() => onSelect(choice)}
      disabled={disabled}
      className="cyber-btn"
      style={{
        width: '100%',
        justifyContent: 'space-between',
        padding: '16px 18px',
        textAlign: 'left',
        background: 'rgba(0, 240, 255, 0.05)',
        borderColor: 'rgba(0, 240, 255, 0.3)',
        alignItems: 'center',
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <div style={{ flex: 1, paddingRight: '10px' }}>
        <div style={{
          fontSize: '1.05rem',
          fontWeight: '500',
          color: '#fff',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          lineHeight: '1.4'
        }}>
          <Sparkles size={16} className="glow-text-cyan" style={{ flexShrink: 0, marginTop: '3px' }} />
          <span>{choice.text}</span>
        </div>
      </div>

      <ArrowRight size={18} className="glow-text-cyan" style={{ flexShrink: 0 }} />
    </button>
  );
}
