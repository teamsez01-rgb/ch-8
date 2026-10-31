import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import MathText from '../common/MathText'
import { EXERCISE_SOLUTIONS } from '../../data/exerciseSolutions'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes exFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes exPop {
    0%   { transform: scale(0.7); opacity: 0; }
    70%  { transform: scale(1.06); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes exGlowPulse {
    0%, 100% { opacity: 0.2; }
    50%      { opacity: 0.6; }
  }

  .ex-fade { animation: exFadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .ex-pop  { animation: exPop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .ex-glow { animation: exGlowPulse 1.8s ease-in-out infinite; }

  /* Completely hide all scrollbars */
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  * {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
`

/* Step Header Badge Color Palette */
const BADGE_PALETTE = [
  { color: '#065f46', bg: '#d1fae5' }, // Emerald
  { color: '#0369a1', bg: '#e0f2fe' }, // Sky
  { color: '#5b21b6', bg: '#ede9fe' }, // Violet
  { color: '#92400e', bg: '#fef3c7' }, // Amber
  { color: '#9f1239', bg: '#ffe4e6' }, // Rose
  { color: '#15803d', bg: '#dcfce7' }, // Green
  { color: '#4338ca', bg: '#e0e7ff' }, // Indigo
  { color: '#c2410c', bg: '#ffedd5' }  // Orange
]

/* ─────────── STEP VISUAL DISPATCHER ─────────── */
function StepVisual({ visual }) {
  if (!visual) return null

  // 1. Right Triangle Visual (Exercise 8.1 & geometric questions)
  if (visual.type === 'triangle') {
    const opp = visual.opp !== undefined ? visual.opp : 'Opp'
    const adj = visual.adj !== undefined ? visual.adj : 'Adj'
    const hyp = visual.hyp !== undefined ? visual.hyp : 'Hyp'
    const angleRef = visual.angle || 'A'
    const hl = visual.highlight || 'all'

    // Vertex names based on angle
    const isPQR = angleRef === 'P' || angleRef === 'R'
    const bottomVertex = angleRef === 'C' ? 'C' : (isPQR ? 'P' : 'A')
    const rightVertex = isPQR ? 'Q' : (visual.angleC ? 'C' : 'B')
    const topVertex = angleRef === 'C' ? 'A' : (isPQR ? 'R' : (visual.angleC ? 'B' : 'C'))

    const Ax = 65, Ay = 175
    const Bx = 275, By = 175
    const Cx = 275, Cy = 38

    const hiOpp = hl === 'all' || hl === 'opp'
    const hiAdj = hl === 'all' || hl === 'adj'
    const hiHyp = hl === 'all' || hl === 'hyp'

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '0.4rem 0 1.2rem' }}>
        {/* Crisp SVG Right Triangle */}
        <svg viewBox="0 0 360 215" style={{ width: '100%', maxWidth: '400px', height: '185px', overflow: 'visible' }}>
          {/* Triangle Background */}
          <polygon
            points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
            fill="rgba(240, 249, 255, 0.55)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Right Angle Corner Square */}
          <rect
            x={Bx - 16}
            y={By - 16}
            width="16"
            height="16"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.8"
          />

          {/* Angle Arc at Acute Vertex */}
          <path
            d={`M${Ax + 28} ${Ay} A28 28 0 0 0 ${Ax + 24} ${Ay - 15}`}
            fill="rgba(217, 119, 6, 0.14)"
            stroke="#d97706"
            strokeWidth="2.2"
          />
          <text x={Ax + 34} y={Ay - 7} fill="#d97706" fontSize="12" fontWeight="800" fontFamily="Inter">
            ∠{angleRef}
          </text>

          {/* Adjacent Side (Base) */}
          <line
            x1={Ax} y1={Ay} x2={Bx} y2={By}
            stroke={hiAdj ? '#0284c7' : '#94a3b8'}
            strokeWidth={hiAdj ? '4' : '2'}
            strokeLinecap="round"
          />
          <g transform={`translate(${(Ax + Bx) / 2}, ${Ay + 18})`}>
            <rect
              x="-56" y="-11" width="112" height="22" rx="11"
              fill={hiAdj ? '#e0f2fe' : '#f8fafc'}
              stroke={hiAdj ? '#0284c7' : '#cbd5e1'}
              strokeWidth="1.3"
            />
            <text x="0" y="4" fill={hiAdj ? '#0369a1' : '#64748b'} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Inter">
              Adj : {String(adj)}
            </text>
          </g>

          {/* Opposite Side (Vertical) */}
          <line
            x1={Bx} y1={By} x2={Cx} y2={Cy}
            stroke={hiOpp ? '#059669' : '#94a3b8'}
            strokeWidth={hiOpp ? '4' : '2'}
            strokeLinecap="round"
          />
          <g transform={`translate(${Bx + 16}, ${(By + Cy) / 2})`}>
            <rect
              x="0" y="-11" width="104" height="22" rx="11"
              fill={hiOpp ? '#d1fae5' : '#f8fafc'}
              stroke={hiOpp ? '#059669' : '#cbd5e1'}
              strokeWidth="1.3"
            />
            <text x="52" y="4" fill={hiOpp ? '#065f46' : '#64748b'} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Inter">
              Opp : {String(opp)}
            </text>
          </g>

          {/* Hypotenuse (Slanted) */}
          <line
            x1={Ax} y1={Ay} x2={Cx} y2={Cy}
            stroke={hiHyp ? '#d97706' : '#94a3b8'}
            strokeWidth={hiHyp ? '4' : '2'}
            strokeLinecap="round"
          />
          <g transform={`translate(${(Ax + Cx) / 2 - 20}, ${(Ay + Cy) / 2 - 14}) rotate(-33)`}>
            <rect
              x="-56" y="-11" width="112" height="22" rx="11"
              fill={hiHyp ? '#fef3c7' : '#f8fafc'}
              stroke={hiHyp ? '#d97706' : '#cbd5e1'}
              strokeWidth="1.3"
            />
            <text x="0" y="4" fill={hiHyp ? '#92400e' : '#64748b'} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Inter">
              Hyp : {String(hyp)}
            </text>
          </g>

          {/* Vertex Points */}
          <circle cx={Ax} cy={Ay} r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
          <text x={Ax - 16} y={Ay + 6} fill="#0f172a" fontSize="14" fontWeight="900" fontFamily="Inter">{bottomVertex}</text>

          <circle cx={Bx} cy={By} r="5" fill="#64748b" stroke="#ffffff" strokeWidth="2" />
          <text x={Bx + 12} y={By + 6} fill="#0f172a" fontSize="14" fontWeight="900" fontFamily="Inter">{rightVertex}</text>

          <circle cx={Cx} cy={Cy} r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
          <text x={Cx + 10} y={Cy - 4} fill="#0f172a" fontSize="14" fontWeight="900" fontFamily="Inter">{topVertex}</text>
        </svg>
      </div>
    )
  }

  // 2. Standard Angle Values Visual (Exercise 8.2)
  if (visual.type === 'values') {
    const values = visual.values || []
    return (
      <div
        className="ex-pop"
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '0.65rem 1.4rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          border: '1.5px solid #bae6fd',
          margin: '0.4rem 0 1.2rem',
          boxShadow: '0 2px 8px rgba(2, 132, 199, 0.08)'
        }}
      >
        <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0369a1' }}>
          📐 Table Values :
        </span>
        {values.length > 0 ? (
          values.map((v, i) => (
            <span
              key={i}
              style={{
                padding: '3px 12px',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid #7dd3fc',
                color: '#0284c7',
                fontWeight: 700,
                fontSize: '0.94rem'
              }}
            >
              <MathText text={`$${v}$`} />
            </span>
          ))
        ) : (
          <span style={{
            padding: '3px 12px',
            borderRadius: '8px',
            background: '#ffffff',
            border: '1px solid #7dd3fc',
            color: '#0284c7',
            fontWeight: 700,
            fontSize: '0.94rem'
          }}>
            Standard Trigonometric Values
          </span>
        )}
      </div>
    )
  }

  // 3. Trigonometric Identity Visual (Exercise 8.3 & algebraic rules)
  if (visual.type === 'identity') {
    const idText = visual.identity || (
      visual.lhs && visual.rhs
        ? `${visual.lhs} = ${visual.rhs}`
        : 'Fundamental Trigonometric Identity'
    )

    return (
      <div
        className="ex-pop"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0.65rem 1.5rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
          border: '1.5px solid #d8b4fe',
          margin: '0.4rem 0 1.2rem',
          boxShadow: '0 2px 8px rgba(124, 58, 237, 0.08)'
        }}
      >
        <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6d28d9' }}>
          ⚡ Key Identity :
        </span>
        <span style={{
          padding: '3px 14px',
          borderRadius: '8px',
          background: '#ffffff',
          border: '1px solid #c084fc',
          color: '#5b21b6',
          fontWeight: 800,
          fontSize: '0.98rem'
        }}>
          <MathText text={idText.includes('$') ? idText : `$${idText}$`} />
        </span>
      </div>
    )
  }

  // 4. Result or Option Confirmation Visual
  if (visual.type === 'result' || visual.type === 'option') {
    const val = visual.value || visual.choice || ''
    return (
      <div
        className="ex-pop"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.6rem 1.4rem',
          borderRadius: '24px',
          background: '#ecfdf5',
          border: '1.5px solid #6ee7b7',
          color: '#065f46',
          fontWeight: 800,
          fontSize: '0.96rem',
          margin: '0.4rem 0 1.2rem',
          boxShadow: '0 2px 6px rgba(5, 150, 105, 0.08)'
        }}
      >
        <CheckCircle2 size={17} color="#059669" />
        <span>{visual.type === 'option' ? 'Correct Choice :' : 'Evaluation Result :'}</span>
        <span style={{ color: '#047857', fontWeight: 900 }}>
          <MathText text={val.includes('$') ? val : `$${val}$`} />
        </span>
      </div>
    )
  }

  return null
}

/* ─────────── MAIN EXERCISE VIEW COMPONENT ─────────── */
export default function ExerciseView({
  exercise,
  question,
  activeSubQuestionIndex = 0,
  onSelectSubQuestion: _onSelectSubQuestion,
  onNext,
  onPrev,
  hasPrev,
  hasNext
}) {
  const hasSubQuestions = Boolean(question?.hasSubQuestions && question?.subQuestions?.length > 0)
  const currentSubQ = hasSubQuestions ? question?.subQuestions?.[activeSubQuestionIndex] || question?.subQuestions?.[0] : null

  // Fetch solution steps from EXERCISE_SOLUTIONS
  const exSol = question ? EXERCISE_SOLUTIONS[exercise]?.[question.id] : null
  let solutionSteps = []
  if (exSol) {
    if (hasSubQuestions && currentSubQ) {
      solutionSteps = exSol[currentSubQ.id] || exSol['default'] || []
    } else {
      solutionSteps = exSol['default'] || []
    }
  }

  const totalSteps = solutionSteps.length || 1

  // Progressive Step & Sub-Step State (Starts at 0: Question first!)
  const [step, setStep] = useState(0)
  const [subStep, setSubStep] = useState(0)
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)
  const rightScrollRef = useRef(null)

  // Track question / sub-question changes to reset progressive state cleanly
  const currentKey = `${exercise}_${question?.id || 'none'}_${currentSubQ?.id || 'main'}`
  const prevKeyRef = useRef(currentKey)

  useEffect(() => {
    if (prevKeyRef.current !== currentKey) {
      prevKeyRef.current = currentKey
      setStep(0)
      setSubStep(0)
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
      if (rightScrollRef.current) {
        rightScrollRef.current.scrollTop = 0
      }
    }
  }, [currentKey])

  const currentStepObj = step > 0 ? (solutionSteps[step - 1] || null) : null
  const currentTotalLines = currentStepObj ? (currentStepObj.lines?.length || 0) : 0

  // Advance forward line by line or step by step
  const goNextStep = () => {
    if (step === 0) {
      setStep(1)
      setSubStep(1)
      return
    }
    if (subStep < currentTotalLines) {
      setSubStep(s => s + 1)
    } else if (step < totalSteps) {
      setStep(s => s + 1)
      setSubStep(1)
    } else if (hasNext && onNext) {
      onNext()
    }
  }

  // Go backward line by line or step by step
  const goPrevStep = () => {
    if (step === 0) return
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevTotalLines = solutionSteps[step - 2]?.lines?.length || 1
      setStep(s => s - 1)
      setSubStep(prevTotalLines)
    } else {
      setStep(0)
      setSubStep(0)
    }
  }

  // Keyboard navigation: Left / Right arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goNextStep()
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goPrevStep()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  // Auto-scroll the active step card into view on the right pane
  useEffect(() => {
    if (step === 0 || !rightScrollRef.current) return
    const el = rightScrollRef.current.querySelector(`[data-right-step="${step}"]`)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 70)
    }
  }, [step])

  // Smooth auto-scroll left pane to the latest active step or revealed line
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || step === 0) return

    const timer = setTimeout(() => {
      if (subStep === 1) {
        const stepEl = container.querySelector(`[data-step="${step}"]`)
        if (stepEl) {
          stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        const stepEl = container.querySelector(`[data-step="${step}"]`)
        if (stepEl) {
          const lines = stepEl.querySelectorAll('[data-line]')
          const latestLine = lines[lines.length - 1]
          if (latestLine) {
            latestLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        }
      }
    }, 60)

    return () => clearTimeout(timer)
  }, [step, subStep])

  // Single click = Next sub-step, Double click = Previous sub-step
  const handleContainerClick = (e) => {
    if (e.target.closest('button, a, input, select, [data-noclick]')) return

    // Double click detected: either browser e.detail >= 2 or second click within 300ms window
    if (e.detail >= 2 || clickTimer.current) {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current)
        clickTimer.current = null
      }
      window.getSelection()?.removeAllRanges?.()
      goPrevStep()
      return
    }

    clickTimer.current = setTimeout(() => {
      clickTimer.current = null
      goNextStep()
    }, 300)
  }

  if (!question) return null

  const isAllComplete = step === totalSteps && subStep >= currentTotalLines

  return (
    <div
      className="main-content"
      onClick={handleContainerClick}
      style={{
        display: 'flex',
        height: 'calc(100vh - 106px)',
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        background: '#ffffff'
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* ══════════════════════════════════════════════════════════════════
          PART 1 (LEFT PANE): PROGRESSIVE STEP-BY-STEP WORKSPACE
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="left-pane"
        style={{
          flex: 1.15,
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          background: '#ffffff',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Scrollable Progressive Steps Workspace */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2.5rem 3rem 6rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            scrollBehavior: 'smooth'
          }}
        >
          {step === 0 ? null : (
            <div style={{ width: '100%', maxWidth: '760px' }}>
              {solutionSteps && solutionSteps.length > 0 ? (
                solutionSteps.slice(0, step).map((s, idx) => {
                  const isCurrent = idx === step - 1
                  const visibleLines = isCurrent ? s.lines.slice(0, subStep) : s.lines
                  const badgeStyle = BADGE_PALETTE[idx % BADGE_PALETTE.length]
                  const showReason = !isCurrent || subStep >= s.lines.length

                  return (
                    <div
                      key={idx}
                      data-step={s.stepNum || idx + 1}
                      className={isCurrent ? 'ex-fade' : ''}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginBottom: '3rem',
                        paddingBottom: '2.5rem',
                        borderBottom: 'none',
                        opacity: isCurrent ? 1 : 0.84,
                        transition: 'all 0.25s ease',
                        scrollMarginTop: '2rem',
                        scrollMarginBottom: '4rem'
                      }}
                    >
                      {/* Step Header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '0.9rem'
                      }}>
                        <span style={{
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: badgeStyle.color,
                          background: badgeStyle.bg,
                          borderRadius: '6px',
                          padding: '4px 14px'
                        }}>
                          Step {s.stepNum || idx + 1}
                        </span>
                        <span style={{
                          fontSize: '1.38rem',
                          fontWeight: 800,
                          color: isCurrent ? '#0f172a' : '#475569'
                        }}>
                          {s.title}
                        </span>
                      </div>

                      {/* Step Visual / Diagram */}
                      <StepVisual
                        visual={s.visual}
                        stepNum={s.stepNum || idx + 1}
                        exercise={exercise}
                        isCurrent={isCurrent}
                      />

                      {/* Mathematical Solution Lines (Unfolds line by line on each click!) */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginTop: '0.4rem',
                        width: '100%'
                      }}>
                        {visibleLines.map((line, lIdx) => (
                          <div
                            key={lIdx}
                            data-line={lIdx}
                            className="ex-fade"
                            style={{
                              fontSize: isCurrent ? '1.42rem' : '1.22rem',
                              color: '#0f172a',
                              fontWeight: isCurrent ? 600 : 500,
                              lineHeight: 1.85,
                              textAlign: 'center',
                              scrollMarginBottom: '3.5rem'
                            }}
                          >
                            <MathText text={line} />
                          </div>
                        ))}
                      </div>

                      {/* Step Reason Callout */}
                      {s.reason && showReason && (
                        <div
                          className="ex-fade"
                          style={{
                            marginTop: '1.2rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '20px',
                            padding: '6px 18px',
                            fontSize: '0.92rem',
                            color: '#334155'
                          }}
                        >
                          <span style={{
                            fontWeight: 800,
                            color: '#0284c7',
                            fontSize: '0.88rem',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            flexShrink: 0
                          }}>
                            Reason :
                          </span>
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>
                            <MathText text={s.reason} />
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '50vh',
                  color: '#94a3b8',
                  textAlign: 'center',
                  gap: '12px'
                }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#64748b' }}>
                    Solution in preparation
                  </div>
                </div>
              )}

              {/* Bottom Status Hint Pill */}
              {solutionSteps.length > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1.5rem',
                  paddingBottom: '2rem'
                }}>
                  <span style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: isAllComplete ? '#059669' : '#64748b',
                    background: isAllComplete ? '#ecfdf5' : '#f1f5f9',
                    border: isAllComplete ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                    padding: '5px 16px',
                    borderRadius: '20px',
                    letterSpacing: '0.02em'
                  }}>
                    {isAllComplete
                      ? '✓ Solution Complete • Click Next or press → for next sum'
                      : `Step ${step} of ${totalSteps} (Line ${subStep} of ${currentTotalLines}) • Click or press → to continue`}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PART 2 (RIGHT PANE): QUESTION DISPLAY, PROGRESSIVE TIMELINE & NAVIGATION
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={rightScrollRef}
        className="right-pane"
        style={{
          flex: 0.85,
          padding: '2.5rem 2.8rem 6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          overflowY: 'auto',
          background: '#ffffff',
          fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
          scrollBehavior: 'smooth'
        }}
      >
        {/* Main Problem Header */}
        <div style={{ margin: 0, fontSize: '1.32rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
          <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
            Question {question.number || question.id.replace('Q', '')} :
          </span>
          <MathText text={question.mainText} />
          {hasSubQuestions && currentSubQ && (
            <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ color: '#0284c7', fontWeight: 700, fontSize: '1.22rem' }}>
                <span style={{ fontWeight: 800, marginRight: '10px' }}>{currentSubQ.label}</span>
                <MathText text={currentSubQ.text} />
              </div>
            </div>
          )}
        </div>

        {/* Subtle Horizontal Divider */}
        <div style={{ borderBottom: '1px solid #f1f5f9', margin: '0.1rem 0' }} />

        {/* PROGRESSIVE TIMELINE OF ALL STEPS (EXACTLY LIKE EXAMPLE 1) */}
        {step === 0 ? null : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {solutionSteps.slice(0, step).map((s, idx) => {
              const stepNum = s.stepNum || idx + 1
              const isCurrent = idx === step - 1
              const isCompleted = idx < step - 1

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'ex-fade' : ''}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    opacity: isCurrent ? 1 : 0.85,
                    transition: 'opacity 0.25s ease',
                    scrollMarginTop: '1.5rem',
                    scrollMarginBottom: '3rem'
                  }}
                >
                  {/* Step Marker Circle */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isCompleted ? '#ecfdf5' : (isCurrent ? '#e0f2fe' : '#f1f5f9'),
                      border: isCompleted ? '2px solid #10b981' : (isCurrent ? '2px solid #0284c7' : '2px solid #cbd5e1'),
                      color: isCompleted ? '#059669' : (isCurrent ? '#0284c7' : '#64748b'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      boxShadow: isCurrent ? '0 0 0 3px rgba(2, 132, 199, 0.15)' : 'none',
                      transition: 'all 0.25s ease'
                    }}>
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
                    </div>
                    {idx < step - 1 && (
                      <div style={{
                        width: '2px',
                        flex: 1,
                        minHeight: '28px',
                        background: isCompleted ? '#10b981' : '#e2e8f0',
                        margin: '4px 0'
                      }} />
                    )}
                  </div>

                  {/* Step Title & 1-Line Summary */}
                  <div style={{ flex: 1, paddingTop: '2px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px'
                    }}>
                      <div style={{
                        fontSize: '1.02rem',
                        fontWeight: 800,
                        color: isCurrent ? '#0f172a' : '#475569',
                        lineHeight: 1.4
                      }}>
                        Step {stepNum} : {s.title}
                      </div>
                      {isCurrent && (
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          color: '#0284c7',
                          background: '#e0f2fe',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}>
                          Active
                        </span>
                      )}
                    </div>
                    {s.reason && (
                      <div style={{
                        fontSize: '0.88rem',
                        color: '#64748b',
                        lineHeight: 1.55
                      }}>
                        <MathText text={s.reason} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* COMPLETION CARD AT END OF TIMELINE */}
            {isAllComplete && (
              <div
                className="ex-fade"
                data-noclick="true"
                style={{
                  marginTop: '0.8rem',
                  padding: '1.2rem 1.4rem',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                  border: '1.5px solid #86efac',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <CheckCircle2 size={20} color="#16a34a" />
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803d' }}>
                    Question Solved Successfully!
                  </div>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  All derivation steps and values have been thoroughly derived and verified.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation */}
        <div
          data-noclick="true"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: '2rem',
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.55rem 1.4rem',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: !hasPrev ? '#94a3b8' : '#0f172a',
              cursor: !hasPrev ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.92rem',
              fontFamily: 'Inter',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.55rem 1.5rem',
              borderRadius: '20px',
              border: '1px solid transparent',
              background: !hasNext ? '#94a3b8' : '#0284c7',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: !hasNext ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter',
              transition: 'all 0.15s ease'
            }}
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
