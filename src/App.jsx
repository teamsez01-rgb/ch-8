import React, { useState } from 'react'
import './App.css'
import { BookOpen, Compass, Maximize2, Minimize2 } from 'lucide-react'
import { CHAPTER_INFO, EXAMPLES, EXERCISES } from './data/chapter8Data'
import TutorView from './components/tutor/TutorView'
import BasicsExplorer from './components/basics/BasicsExplorer'
import ExerciseView from './components/exercise/ExerciseView'

export default function App() {
  const [activeCenterTab, setActiveCenterTab] = useState('Interactive Tutor')
  const [activeRightTab, setActiveRightTab] = useState('Examples')
  const [activeExampleIndex, setActiveExampleIndex] = useState(0)
  const [activeExercise, setActiveExercise] = useState('8.1')
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [activeSubQuestionIndex, setActiveSubQuestionIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.error(err))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.error(err))
    }
  }

  const currentQuestions = EXERCISES[activeExercise] || []
  const currentQuestion = currentQuestions[activeQuestionIndex]

  // Next / Previous navigation handlers
  const handleNext = () => {
    if (activeRightTab === 'Examples') {
      if (activeExampleIndex < EXAMPLES.length - 1) {
        setActiveExampleIndex(i => i + 1)
      } else {
        setActiveRightTab('Exercises')
        setActiveExercise('8.1')
        setActiveQuestionIndex(0)
        setActiveSubQuestionIndex(0)
      }
    } else {
      // In Exercises
      if (currentQuestion?.hasSubQuestions && activeSubQuestionIndex < currentQuestion.subQuestions.length - 1) {
        setActiveSubQuestionIndex(i => i + 1)
      } else if (activeQuestionIndex < currentQuestions.length - 1) {
        setActiveQuestionIndex(i => i + 1)
        setActiveSubQuestionIndex(0)
      } else if (activeExercise === '8.1') {
        setActiveExercise('8.2')
        setActiveQuestionIndex(0)
        setActiveSubQuestionIndex(0)
      } else if (activeExercise === '8.2') {
        setActiveExercise('8.3')
        setActiveQuestionIndex(0)
        setActiveSubQuestionIndex(0)
      }
    }
  }

  const handlePrev = () => {
    if (activeRightTab === 'Examples') {
      if (activeExampleIndex > 0) {
        setActiveExampleIndex(i => i - 1)
      }
    } else {
      if (currentQuestion?.hasSubQuestions && activeSubQuestionIndex > 0) {
        setActiveSubQuestionIndex(i => i - 1)
      } else if (activeQuestionIndex > 0) {
        const prevQ = currentQuestions[activeQuestionIndex - 1]
        setActiveQuestionIndex(i => i - 1)
        setActiveSubQuestionIndex(prevQ?.hasSubQuestions ? prevQ.subQuestions.length - 1 : 0)
      } else if (activeExercise === '8.3') {
        setActiveExercise('8.2')
        const prevList = EXERCISES['8.2']
        const lastIdx = prevList.length - 1
        setActiveQuestionIndex(lastIdx)
        setActiveSubQuestionIndex(prevList[lastIdx]?.hasSubQuestions ? prevList[lastIdx].subQuestions.length - 1 : 0)
      } else if (activeExercise === '8.2') {
        setActiveExercise('8.1')
        const prevList = EXERCISES['8.1']
        const lastIdx = prevList.length - 1
        setActiveQuestionIndex(lastIdx)
        setActiveSubQuestionIndex(prevList[lastIdx]?.hasSubQuestions ? prevList[lastIdx].subQuestions.length - 1 : 0)
      }
    }
  }

  const currentExample = EXAMPLES[activeExampleIndex]

  return (
    <div className="app-container">
      {/* ====================================================================
          TOP NAVIGATION HEADER
          ==================================================================== */}
      <header className="top-nav">
        {/* Left: Shreeji Logo & Chapter Title */}
        <div className="logo-section">
          <img src="/logo.png" alt="Shreeji Education Zone" className="logo-img" />
          <div className="title-section">
            <h1 className="chapter-title">{CHAPTER_INFO.title}</h1>
            <span className="subtitle">{CHAPTER_INFO.subtitle}</span>
          </div>
        </div>

        {/* Center: Module Navigation Tabs */}
        <div className="center-tabs">
          <button
            className={`tab-btn ${activeCenterTab === 'Basics Explorer' ? 'active-blue' : ''}`}
            onClick={() => setActiveCenterTab('Basics Explorer')}
          >
            <BookOpen size={16} />
            Basics Explorer
          </button>

          <button
            className={`tab-btn ${activeCenterTab === 'Interactive Tutor' ? 'active-blue' : ''}`}
            onClick={() => setActiveCenterTab('Interactive Tutor')}
          >
            <Compass size={16} />
            Interactive Tutor
          </button>
        </div>

        {/* Right: Examples / Exercises Toggle & Fullscreen */}
        <div className="right-tabs">
          {activeCenterTab === 'Interactive Tutor' && (
            <div className="toggle-group">
              <button
                className={`pill-btn ${activeRightTab === 'Examples' ? 'active-pill' : ''}`}
                onClick={() => {
                  setActiveRightTab('Examples')
                  setActiveExampleIndex(0)
                }}
              >
                Examples
              </button>
              <button
                className={`pill-btn ${activeRightTab === 'Exercises' ? 'active-pill' : ''}`}
                onClick={() => {
                  setActiveRightTab('Exercises')
                  setActiveExercise('8.1')
                  setActiveQuestionIndex(0)
                }}
              >
                Exercises
              </button>
            </div>
          )}

          <button
            className="icon-btn fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* ====================================================================
          SUB NAVIGATION BAR
          ==================================================================== */}
      <div className="sub-nav">
        <div className="sub-left">
          {activeCenterTab === 'Interactive Tutor' && activeRightTab === 'Examples' && (
            EXAMPLES.map((ex, index) => (
              <button
                key={ex.id}
                className={`nav-btn ${activeExampleIndex === index ? 'active-dark' : ''}`}
                onClick={() => setActiveExampleIndex(index)}
              >
                {ex.label}
              </button>
            ))
          )}

          {activeCenterTab === 'Interactive Tutor' && activeRightTab === 'Exercises' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {/* Exercise Selector */}
              <div style={{
                display: 'flex',
                background: '#f1f5f9',
                padding: '0.2rem',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                flexShrink: 0
              }}>
                {['8.1', '8.2', '8.3'].map(exNum => (
                  <button
                    key={exNum}
                    onClick={() => {
                      setActiveExercise(exNum)
                      setActiveQuestionIndex(0)
                      setActiveSubQuestionIndex(0)
                    }}
                    style={{
                      padding: '0.3rem 0.9rem',
                      borderRadius: '16px',
                      border: 'none',
                      background: activeExercise === exNum ? '#ffffff' : 'transparent',
                      color: activeExercise === exNum ? '#0284c7' : '#64748b',
                      fontWeight: activeExercise === exNum ? '700' : '600',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Ex {exNum}
                  </button>
                ))}
              </div>

              <div style={{ width: '1px', height: '20px', background: '#cbd5e1', flexShrink: 0 }} />

              {/* Questions Pills */}
              <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', alignItems: 'center' }}>
                {currentQuestions.map((q, qIndex) => (
                  <button
                    key={q.id}
                    className={`nav-btn ${activeQuestionIndex === qIndex ? 'active-dark' : ''}`}
                    onClick={() => {
                      setActiveQuestionIndex(qIndex)
                      setActiveSubQuestionIndex(0)
                    }}
                  >
                    {q.title}
                  </button>
                ))}
              </div>

              {/* Sub-Question Pills if current question has parts */}
              {currentQuestion?.hasSubQuestions && (
                <>
                  <div style={{ width: '1px', height: '22px', background: '#cbd5e1', flexShrink: 0, margin: '0 4px' }} />
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexShrink: 0 }}>
                    {currentQuestion.subQuestions.map((subQ, sIdx) => {
                      const isActive = activeSubQuestionIndex === sIdx
                      return (
                        <button
                          key={subQ.id}
                          onClick={() => setActiveSubQuestionIndex(sIdx)}
                          style={{
                            padding: '0.22rem 0.7rem',
                            borderRadius: '14px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            backgroundColor: isActive ? 'var(--primary-dark)' : '#ffffff',
                            color: isActive ? '#ffffff' : '#334155',
                            border: isActive ? '1px solid var(--primary-dark)' : '1px solid #cbd5e1',
                            cursor: 'pointer',
                            transition: 'all 0.12s ease'
                          }}
                        >
                          {subQ.label}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {activeCenterTab === 'Basics Explorer' && (
            <div style={{ fontSize: '0.9rem', color: '#0369a1', fontWeight: '600' }}>
              Chapter 8 Foundations & Concepts
            </div>
          )}
        </div>

        {/* Right Navigation (Prev / Next Buttons) */}
        <div className="sub-right">
          <button
            className="nav-btn small"
            onClick={handlePrev}
            disabled={
              activeRightTab === 'Examples'
                ? activeExampleIndex === 0
                : (activeExercise === '8.1' && activeQuestionIndex === 0 && (!currentQuestion?.hasSubQuestions || activeSubQuestionIndex === 0))
            }
            style={{
              opacity: (
                activeRightTab === 'Examples'
                  ? activeExampleIndex === 0
                  : (activeExercise === '8.1' && activeQuestionIndex === 0 && (!currentQuestion?.hasSubQuestions || activeSubQuestionIndex === 0))
              ) ? 0.4 : 1,
              cursor: (
                activeRightTab === 'Examples'
                  ? activeExampleIndex === 0
                  : (activeExercise === '8.1' && activeQuestionIndex === 0 && (!currentQuestion?.hasSubQuestions || activeSubQuestionIndex === 0))
              ) ? 'not-allowed' : 'pointer'
            }}
          >
            Prev
          </button>

          <button
            className="nav-btn active-yellow small"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* ====================================================================
          MAIN WORKSPACE
          ==================================================================== */}
      {activeCenterTab === 'Basics Explorer' && (
        <BasicsExplorer onSwitchToTutor={() => {
          setActiveCenterTab('Interactive Tutor')
          setActiveRightTab('Examples')
          setActiveExampleIndex(0)
        }} />
      )}

      {activeCenterTab === 'Interactive Tutor' && activeRightTab === 'Examples' && (
        <TutorView
          example={currentExample}
          onNextExample={() => {
            if (activeExampleIndex < EXAMPLES.length - 1) {
              setActiveExampleIndex(i => i + 1)
            } else {
              setActiveRightTab('Exercises')
              setActiveExercise('8.1')
              setActiveQuestionIndex(0)
              setActiveSubQuestionIndex(0)
            }
          }}
          onPrevExample={() => {
            if (activeExampleIndex > 0) {
              setActiveExampleIndex(i => i - 1)
            }
          }}
          hasPrev={activeExampleIndex > 0}
          hasNext={true}
        />
      )}

      {activeCenterTab === 'Interactive Tutor' && activeRightTab === 'Exercises' && (
        <ExerciseView
          exercise={activeExercise}
          question={currentQuestion}
          activeSubQuestionIndex={activeSubQuestionIndex}
          onSelectSubQuestion={setActiveSubQuestionIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={
            activeExercise !== '8.1' ||
            activeQuestionIndex > 0 ||
            (currentQuestion?.hasSubQuestions && activeSubQuestionIndex > 0)
          }
          hasNext={true}
        />
      )}
    </div>
  )
}
