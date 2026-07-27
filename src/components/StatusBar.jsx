import React from 'react';
import { Terminal, Calendar, Award } from 'lucide-react';

export default function StatusBar({ schoolName, year, term, eventCount, studentId }) {
  const getYearName = (y) => {
    const names = ['', '大一', '大二', '大三', '大四'];
    return names[y] || '毕业';
  };

  return (
    <div className="cyber-box" style={{ padding: '14px 18px', marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* University Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid var(--primary-cyan)',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '0.75rem'
          }} className="cyber-mono-font glow-text-cyan">
            ID: #{studentId}
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#fff' }}>
            {schoolName}
          </div>
        </div>

        {/* Current Time Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.85rem' }} className="cyber-mono-font">
          <div style={{ color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} />
            <span>{getYearName(year)} 第{term}学期</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            瞬间: <span className="glow-text-cyan">{eventCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
