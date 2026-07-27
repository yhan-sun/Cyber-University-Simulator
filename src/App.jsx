import React, { useState, useEffect } from 'react';
import eventsData from './data/events.json';
import endingsData from './data/endings.json';
import { generateProceduralEvent, INITIAL_STATS } from './engine/simulator';

import StatusBar from './components/StatusBar';
import EventCard from './components/EventCard';
import Ending from './components/Ending';

import { Terminal, Play, RefreshCw, Zap, Building2 } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState('INPUT_SCHOOL'); // 'INPUT_SCHOOL' | 'PLAYING' | 'ENDED'
  const [schoolNameInput, setSchoolNameInput] = useState('');
  const [selectedSchoolName, setSelectedSchoolName] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // Internal Player Stats & Progress
  const [stats, setStats] = useState(INITIAL_STATS);
  const [year, setYear] = useState(1);
  const [term, setTerm] = useState(1);
  const [eventIndex, setEventIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [usedEventIds, setUsedEventIds] = useState([]);
  const [finalEnding, setFinalEnding] = useState(null);

  // Quick preset school recommendations
  const PRESET_SCHOOLS = ['重庆邮电大学', '清华大学', '北京大学', '中山大学', '赛博黑客学院'];

  // Initialize or load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('cyber_uni_state_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed.gameState || 'INPUT_SCHOOL');
        setSelectedSchoolName(parsed.selectedSchoolName || '');
        setStudentId(parsed.studentId || '');
        setStats(parsed.stats || INITIAL_STATS);
        setYear(parsed.year || 1);
        setTerm(parsed.term || 1);
        setEventIndex(parsed.eventIndex || 0);
        setCurrentEvent(parsed.currentEvent || null);
        setChoiceHistory(parsed.choiceHistory || []);
        setUsedEventIds(parsed.usedEventIds || []);
        setFinalEnding(parsed.finalEnding || null);
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, []);

  // Save progress to LocalStorage
  useEffect(() => {
    if (gameState !== 'INPUT_SCHOOL') {
      localStorage.setItem('cyber_uni_state_v3', JSON.stringify({
        gameState,
        selectedSchoolName,
        studentId,
        stats,
        year,
        term,
        eventIndex,
        currentEvent,
        choiceHistory,
        usedEventIds,
        finalEnding
      }));
    }
  }, [gameState, selectedSchoolName, studentId, stats, year, term, eventIndex, currentEvent, choiceHistory, usedEventIds, finalEnding]);

  // Start game with custom user input school
  const handleStartGame = (targetName) => {
    const finalName = targetName.trim() || '赛博大学';
    setSelectedSchoolName(finalName);
    const generatedId = `2026${Math.floor(100000 + Math.random() * 900000)}`;
    setStudentId(generatedId);

    setStats({ ...INITIAL_STATS });
    setYear(1);
    setTerm(1);
    setEventIndex(0);
    setChoiceHistory([]);
    setFinalEnding(null);

    const firstEvent = eventsData.find(e => e.year === 1 && e.term === 1) || generateProceduralEvent(1, 1, 0);
    setCurrentEvent(firstEvent);
    setUsedEventIds([firstEvent.id]);
    setGameState('PLAYING');
  };

  const handleChoiceSelect = (choice) => {
    // 1. Secretly update internal stats
    const newStats = { ...stats };
    if (choice.effect) {
      Object.entries(choice.effect).forEach(([key, delta]) => {
        newStats[key] = Math.max(0, Math.min(100, (newStats[key] || 0) + delta));
      });
    }
    setStats(newStats);

    if (choice.log) {
      setChoiceHistory(prev => [...prev, choice.log]);
    }

    const nextEventIndex = eventIndex + 1;
    setEventIndex(nextEventIndex);

    let nextYear = year;
    let nextTerm = term;

    // Advance term every 3 events, advance year every 2 terms
    if (nextEventIndex % 3 === 0) {
      if (term === 1) {
        nextTerm = 2;
      } else {
        nextTerm = 1;
        nextYear = year + 1;
      }
    }

    setYear(nextYear);
    setTerm(nextTerm);

    if (nextYear > 4) {
      calculateEnding(newStats);
      setGameState('ENDED');
      return;
    }

    // 2. Pick unused event for the current year/term, or generate a procedural event
    const newUsedIds = currentEvent ? [...usedEventIds, currentEvent.id] : usedEventIds;
    setUsedEventIds(newUsedIds);

    const matchedEvent = eventsData.find(e => e.year === nextYear && e.term === nextTerm && !newUsedIds.includes(e.id));
    if (matchedEvent) {
      setCurrentEvent(matchedEvent);
    } else {
      setCurrentEvent(generateProceduralEvent(nextYear, nextTerm, nextEventIndex));
    }
  };

  const calculateEnding = (finalStats) => {
    let matched = endingsData.find(e => {
      if (!e.condition) return false;
      return Object.entries(e.condition).every(([key, val]) => (finalStats[key] || 0) >= val);
    });

    if (!matched) {
      matched = endingsData[endingsData.length - 1];
    }
    setFinalEnding(matched);
  };

  const handleRestart = () => {
    localStorage.removeItem('cyber_uni_state_v3');
    setGameState('INPUT_SCHOOL');
    setSchoolNameInput('');
    setSelectedSchoolName('');
    setFinalEnding(null);
    setUsedEventIds([]);
  };

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '16px 14px 40px 14px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Mobile-optimized Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '18px',
        borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
        paddingBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-cyan), var(--accent-purple))',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0 0 12px rgba(0, 240, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Terminal size={20} color="#050811" />
          </div>
          <div>
            <h1 className="cyber-hud-font glow-text-cyan" style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: '1.1' }}>
              CYBER UNIVERSITY
            </h1>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }} className="cyber-mono-font">
              赛博上大学 • 10秒微瞬间模拟器
            </div>
          </div>
        </div>

        {gameState === 'PLAYING' && (
          <button
            onClick={handleRestart}
            className="cyber-btn"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            <RefreshCw size={13} /> 重来
          </button>
        )}
      </header>

      {/* Screen 1: School Input Page */}
      {gameState === 'INPUT_SCHOOL' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="cyber-box" style={{ padding: '28px 20px', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-amber)',
              fontSize: '0.85rem',
              marginBottom: '12px'
            }} className="cyber-mono-font">
              <Zap size={16} /> INITIALIZATION
            </div>
            
            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px', fontWeight: '700' }}>
              输入你的大学名称
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
              经历 1000 个微小瞬间，生成属于你的专属大学人生。
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleStartGame(schoolNameInput); }}>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="例如：重庆邮电大学 / 清华大学..."
                  value={schoolNameInput}
                  onChange={(e) => setSchoolNameInput(e.target.value)}
                  className="cyber-input"
                  maxLength={20}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="cyber-btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '15px',
                  fontSize: '1.05rem',
                  fontWeight: 'bold',
                  background: 'var(--primary-cyan)',
                  color: '#050811'
                }}
              >
                <Play size={18} /> 开启大学人生
              </button>
            </form>

            {/* Quick Select Preset Pills */}
            <div style={{ marginTop: '24px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }} className="cyber-mono-font">
                或快速选择推荐院校：
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PRESET_SCHOOLS.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStartGame(name)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      color: 'var(--text-main)',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Building2 size={12} color="var(--primary-cyan)" /> {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Playing State */}
      {gameState === 'PLAYING' && currentEvent && (
        <div style={{ flex: 1 }}>
          <StatusBar
            schoolName={selectedSchoolName}
            year={year}
            term={term}
            eventCount={eventIndex + 1}
            studentId={studentId}
          />
          <EventCard
            key={currentEvent.id}
            event={currentEvent}
            onChoiceSelect={handleChoiceSelect}
            choiceHistory={choiceHistory}
          />
        </div>
      )}

      {/* Screen 3: Ending State */}
      {gameState === 'ENDED' && finalEnding && (
        <Ending
          ending={finalEnding}
          stats={stats}
          schoolName={selectedSchoolName}
          studentId={studentId}
          eventHistoryCount={eventIndex}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
