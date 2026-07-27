import React, { useState, useEffect } from 'react';
import eventsData from './data/events.json';
import endingsData from './data/endings.json';
import { generateProceduralEvent, INITIAL_STATS, analyzeUniversityTier, MAJORS_LIST, MONTH_CALENDAR } from './engine/simulator';

import StatusBar from './components/StatusBar';
import EventCard from './components/EventCard';
import Ending from './components/Ending';

import { Terminal, Play, RefreshCw, Zap, Building2, BookOpen } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState('INPUT_SCHOOL'); 
  const [schoolNameInput, setSchoolNameInput] = useState('');
  const [selectedSchoolName, setSelectedSchoolName] = useState('');
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [universityTierInfo, setUniversityTierInfo] = useState(null);
  const [studentId, setStudentId] = useState('');
  
  // Chronological Time Engine
  const [currentStepIndex, setCurrentStepIndex] = useState(0); 
  const [stats, setStats] = useState(INITIAL_STATS);
  const [playerTags, setPlayerTags] = useState([]); 
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isProcessingChoice, setIsProcessingChoice] = useState(false);
  
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [usedEventIds, setUsedEventIds] = useState([]);
  const [finalEnding, setFinalEnding] = useState(null);

  const PRESET_SCHOOLS = [
    { name: '重庆邮电大学' },
    { name: '清华大学' },
    { name: '北京大学' },
    { name: '中山大学' },
    { name: '赛博黑客学院' }
  ];

  const currentCalendarStep = MONTH_CALENDAR[Math.min(currentStepIndex, MONTH_CALENDAR.length - 1)];

  // Helper to pick exact unique event for step
  const getEventForStep = (stepIndex, tags, usedIds) => {
    const calendarStep = MONTH_CALENDAR[stepIndex];
    if (!calendarStep) return null;

    const candidates = eventsData.filter(e => {
      if (usedIds.includes(e.id)) return false;
      if (e.year !== calendarStep.year || e.term !== calendarStep.term) return false;
      if (e.month && e.month !== calendarStep.month) return false;
      return true;
    });

    if (candidates.length > 0) {
      return candidates[0];
    }

    return generateProceduralEvent(stepIndex, tags, usedIds);
  };

  // Save/Load LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('cyber_uni_state_v16');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed.gameState || 'INPUT_SCHOOL');
        setSelectedSchoolName(parsed.selectedSchoolName || '');
        setSelectedMajor(parsed.selectedMajor || null);
        setUniversityTierInfo(parsed.universityTierInfo || null);
        setStudentId(parsed.studentId || '');
        setCurrentStepIndex(parsed.currentStepIndex || 0);
        setStats(parsed.stats || INITIAL_STATS);
        setPlayerTags(parsed.playerTags || []);
        setCurrentEvent(parsed.currentEvent || null);
        setChoiceHistory(parsed.choiceHistory || []);
        setUsedEventIds(parsed.usedEventIds || []);
        setFinalEnding(parsed.finalEnding || null);
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, []);

  useEffect(() => {
    if (gameState !== 'INPUT_SCHOOL') {
      localStorage.setItem('cyber_uni_state_v16', JSON.stringify({
        gameState,
        selectedSchoolName,
        selectedMajor,
        universityTierInfo,
        studentId,
        currentStepIndex,
        stats,
        playerTags,
        currentEvent,
        choiceHistory,
        usedEventIds,
        finalEnding
      }));
    }
  }, [gameState, selectedSchoolName, selectedMajor, universityTierInfo, studentId, currentStepIndex, stats, playerTags, currentEvent, choiceHistory, usedEventIds, finalEnding]);

  // Step 1: Input School Name
  const handleConfirmSchool = (targetName) => {
    const finalName = targetName.trim() || '赛博大学';
    setSelectedSchoolName(finalName);
    
    const tierResult = analyzeUniversityTier(finalName);
    setUniversityTierInfo(tierResult);

    const generatedId = `2026${Math.floor(100000 + Math.random() * 900000)}`;
    setStudentId(generatedId);

    setGameState('SELECT_MAJOR');
  };

  // Step 2: Select Major
  const handleSelectMajor = (major) => {
    setSelectedMajor(major);

    const initStats = { ...INITIAL_STATS };
    if (universityTierInfo && universityTierInfo.statBonus) {
      Object.entries(universityTierInfo.statBonus).forEach(([k, delta]) => {
        initStats[k] = Math.max(0, Math.min(100, (initStats[k] || 50) + delta));
      });
    }

    setStats(initStats);

    const initialTags = [universityTierInfo.eventsTag, major.tag];
    setPlayerTags(initialTags);

    setCurrentStepIndex(0);
    setChoiceHistory([`录取专业设定为：[${major.label}]`]);
    setFinalEnding(null);

    const firstEvent = getEventForStep(0, initialTags, []);

    setCurrentEvent(firstEvent);
    setUsedEventIds([firstEvent.id]);
    setGameState('PLAYING');
  };

  // Choice Selection with Strict Zero-Repetition Guarantee
  const handleChoiceSelect = (choice) => {
    if (isProcessingChoice) return;
    setIsProcessingChoice(true);

    const newStats = { ...stats };
    if (choice.effect) {
      Object.entries(choice.effect).forEach(([key, delta]) => {
        newStats[key] = Math.max(0, Math.min(100, (newStats[key] || 0) + delta));
      });
    }
    setStats(newStats);

    const updatedTags = [...playerTags];
    if (choice.tagAdd && !updatedTags.includes(choice.tagAdd)) {
      updatedTags.push(choice.tagAdd);
      setPlayerTags(updatedTags);
    }

    if (choice.log) {
      setChoiceHistory(prev => [...prev, choice.log]);
    }

    const nextStepIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextStepIndex);

    if (nextStepIndex >= MONTH_CALENDAR.length) {
      calculateEnding(newStats, updatedTags);
      setGameState('ENDED');
      setIsProcessingChoice(false);
      return;
    }

    const newUsedIds = currentEvent ? [...usedEventIds, currentEvent.id] : usedEventIds;
    setUsedEventIds(newUsedIds);

    const nextEvent = getEventForStep(nextStepIndex, updatedTags, newUsedIds);
    setCurrentEvent(nextEvent);

    setTimeout(() => {
      setIsProcessingChoice(false);
    }, 150);
  };

  // Organic Tag & Stat Dual-Matching Ending System
  const calculateEnding = (finalStats, finalTags) => {
    // 1. First priority: endings with matching playerChoice tags & stats
    const tagAndStatMatches = endingsData.filter(e => {
      if (e.requireTag && !finalTags.includes(e.requireTag)) return false;
      if (!e.condition || Object.keys(e.condition).length === 0) return true;
      return Object.entries(e.condition).every(([key, val]) => (finalStats[key] || 0) >= val);
    });

    if (tagAndStatMatches.length > 0) {
      setFinalEnding(tagAndStatMatches[0]);
      return;
    }

    // 2. Fallback: stat matches only
    const statMatches = endingsData.filter(e => {
      if (!e.condition || Object.keys(e.condition).length === 0) return false;
      return Object.entries(e.condition).every(([key, val]) => (finalStats[key] || 0) >= val);
    });

    if (statMatches.length > 0) {
      setFinalEnding(statMatches[0]);
    } else {
      setFinalEnding(endingsData[endingsData.length - 1]);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('cyber_uni_state_v16');
    setGameState('INPUT_SCHOOL');
    setSchoolNameInput('');
    setSelectedSchoolName('');
    setSelectedMajor(null);
    setUniversityTierInfo(null);
    setPlayerTags([]);
    setCurrentStepIndex(0);
    setFinalEnding(null);
    setUsedEventIds([]);
    setIsProcessingChoice(false);
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
      {/* Header */}
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
              经历 1000 个微小瞬间，在不知不觉的选择中推演属于你的大学人生。
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleConfirmSchool(schoolNameInput); }}>
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
                <Play size={18} /> 下一步：选择录取专业
              </button>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }} className="cyber-mono-font">
                或选择热门院校：
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PRESET_SCHOOLS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleConfirmSchool(item.name)}
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
                      gap: '6px'
                    }}
                  >
                    <Building2 size={12} color="var(--primary-cyan)" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Select Major */}
      {gameState === 'SELECT_MAJOR' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="cyber-box" style={{ padding: '24px 18px' }}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-pink)',
                fontSize: '0.85rem',
                marginBottom: '8px'
              }} className="cyber-mono-font">
                <BookOpen size={16} /> STEP 2: SELECT MAJOR
              </div>

              <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '700' }}>
                选择你的录取专业
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                专业将决定学年校历中专业课考试、上机与毕业论文考核。
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MAJORS_LIST.map((major) => (
                <button
                  key={major.id}
                  onClick={() => handleSelectMajor(major)}
                  className="cyber-btn"
                  style={{
                    padding: '14px 16px',
                    justifyContent: 'flex-start',
                    fontSize: '0.98rem',
                    textAlign: 'left'
                  }}
                >
                  {major.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Playing State */}
      {gameState === 'PLAYING' && currentEvent && currentCalendarStep && (
        <div style={{ flex: 1 }}>
          <StatusBar
            schoolName={selectedSchoolName}
            year={currentCalendarStep.year}
            term={currentCalendarStep.term}
            monthLabel={currentCalendarStep.monthLabel}
            eventCount={currentStepIndex + 1}
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

      {/* Screen 4: Ending State */}
      {gameState === 'ENDED' && finalEnding && (
        <Ending
          ending={finalEnding}
          stats={stats}
          schoolName={selectedSchoolName}
          studentId={studentId}
          eventHistoryCount={currentStepIndex}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
