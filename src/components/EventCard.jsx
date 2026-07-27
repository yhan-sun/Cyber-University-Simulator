import React from 'react';
import ChoiceButton from './ChoiceButton';
import { Terminal, Clock, Flame } from 'lucide-react';

export default function EventCard({ event, onChoiceSelect, choiceHistory }) {
  if (!event) return null;

  return (
    <div className="cyber-box" style={{ padding: '24px 28px', marginBottom: '20px' }}>
      {/* Event Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-cyan)' }}>
          <Terminal size={18} />
          <span className="cyber-hud-font" style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>
            {event.isDynamic ? 'NEURAL GENERATED' : `EVENT_ID: #${event.id}`}
          </span>
        </div>
        <div style={{
          fontSize: '0.8rem',
          color: 'var(--accent-amber)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }} className="cyber-mono-font">
          <Clock size={14} /> 10 SECONDS MOMENT
        </div>
      </div>

      {/* Event Title & Narrative */}
      <h2 style={{
        fontSize: '1.4rem',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '12px',
        lineHeight: '1.4'
      }}>
        {event.title}
      </h2>

      <p style={{
        fontSize: '1.05rem',
        color: 'var(--text-main)',
        lineHeight: '1.7',
        marginBottom: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '16px',
        borderRadius: '8px',
        borderLeft: '3px solid var(--primary-cyan)'
      }}>
        {event.text}
      </p>

      {/* Choices Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {event.choices && event.choices.map((choice, idx) => (
          <ChoiceButton
            key={idx}
            choice={choice}
            onSelect={onChoiceSelect}
          />
        ))}
      </div>

      {/* Recent History Feed (Cyber Log) */}
      {choiceHistory.length > 0 && (
        <div style={{
          marginTop: '28px',
          paddingTop: '16px',
          borderTop: '1px dashed rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }} className="cyber-mono-font">
            <Flame size={14} color="var(--accent-pink)" /> RECENT MOMENTS LOG:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {choiceHistory.slice(-2).reverse().map((logItem, i) => (
              <div key={i} style={{
                fontSize: '0.85rem',
                color: 'rgba(226, 232, 240, 0.7)',
                fontStyle: 'italic'
              }} className="cyber-mono-font">
                › {logItem}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
