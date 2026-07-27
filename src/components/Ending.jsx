import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Share2, Sparkles, BookOpen, Cpu, Heart, Smile } from 'lucide-react';

export default function Ending({ ending, stats, schoolName, studentId, eventHistoryCount, onRestart }) {
  useEffect(() => {
    // Trigger congratulatory cyberpunk confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#ff007f', '#9d00ff', '#ffaa00']
    });
  }, []);

  return (
    <div className="cyber-box" style={{ padding: '36px 32px', textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        background: 'rgba(255, 0, 127, 0.1)',
        border: '1px solid var(--accent-pink)',
        borderRadius: '20px',
        color: 'var(--accent-pink)',
        marginBottom: '20px',
        fontSize: '0.85rem'
      }} className="cyber-hud-font">
        <Award size={16} /> GRADUATION REPORT & TERMINAL ENDING
      </div>

      <h1 className="glow-text-cyan cyber-hud-font" style={{ fontSize: '2.4rem', marginBottom: '8px' }}>
        {ending.title}
      </h1>

      <div style={{ fontSize: '1.2rem', color: 'var(--accent-amber)', marginBottom: '24px', fontWeight: '500' }}>
        {ending.subtitle}
      </div>

      {/* Quote Card */}
      <blockquote style={{
        background: 'rgba(0, 240, 255, 0.05)',
        borderLeft: '4px solid var(--primary-cyan)',
        padding: '16px 20px',
        margin: '0 auto 28px auto',
        maxWidth: '600px',
        borderRadius: '0 8px 8px 0',
        fontStyle: 'italic',
        color: '#e2e8f0',
        lineHeight: '1.6'
      }}>
        “{ending.quote}”
      </blockquote>

      <p style={{
        fontSize: '1.05rem',
        color: 'var(--text-main)',
        lineHeight: '1.8',
        maxWidth: '650px',
        margin: '0 auto 32px auto'
      }}>
        {ending.description}
      </p>

      {/* Summary Profile Box */}
      <div style={{
        background: 'rgba(5, 12, 28, 0.7)',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        borderRadius: '12px',
        padding: '20px',
        maxWidth: '550px',
        margin: '0 auto 36px auto',
        textAlign: 'left'
      }}>
        <div style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '8px'
        }} className="cyber-mono-font">
          CYBER ARCHIVE SUMMARY: #{studentId}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', marginBottom: '12px' }}>
          <div>所就读大学: <span style={{ color: '#fff', fontWeight: '600' }}>{schoolName}</span></div>
          <div>经历了瞬间: <span style={{ color: 'var(--primary-cyan)', fontWeight: '600' }}>{eventHistoryCount} 个小事件</span></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', paddingTop: '8px' }} className="cyber-mono-font">
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>学业</div>
            <div style={{ color: '#00f0ff', fontWeight: 'bold' }}>{stats.academic}</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>技能</div>
            <div style={{ color: '#9d00ff', fontWeight: 'bold' }}>{stats.skill}</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>爱情</div>
            <div style={{ color: '#ff007f', fontWeight: 'bold' }}>{stats.love}</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>快乐</div>
            <div style={{ color: '#00e5ff', fontWeight: 'bold' }}>{stats.happiness}</div>
          </div>
        </div>
      </div>

      {/* Restart & Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button
          onClick={onRestart}
          className="cyber-btn"
          style={{
            background: 'var(--primary-cyan)',
            color: '#050811',
            fontWeight: 'bold',
            padding: '14px 28px'
          }}
        >
          <RotateCcw size={18} /> 开启全新二周目大学人生
        </button>
      </div>
    </div>
  );
}
