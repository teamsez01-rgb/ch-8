import React, { useEffect, useRef, useState } from 'react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e3DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e3FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e3Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e3PulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.35); }
    50%      { box-shadow: 0 0 0 7px rgba(2, 132, 199, 0); }
  }
  @keyframes e3Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .e3-fade { animation: e3FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e3-draw { stroke-dasharray: 400; animation: e3DrawLine 0.75s ease-out both; }
  .e3-glow { animation: e3Glow 1.8s ease-in-out infinite; }
  .e3-pop  { animation: e3Pop 0.4s cubic-bezier(.16,1,.3,1) both; }

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

/* ─────────── NCERT MATHEMATICAL STEPS FOR EXAMPLE 3 ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Right Triangle ACB',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Construct Right Triangle ACB',
    mathLines: [
      '\\text{Consider a right-angled } \\triangle ACB \\text{ in which } \\angle C = 90^\\circ',
      '\\text{For acute angle } \\angle ABC = \\theta :',
      '\\text{Opposite side to } \\theta = AC, \\quad \\text{Adjacent side to } \\theta = BC, \\quad \\text{Hypotenuse} = AB'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Given Values',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
    title: 'Identify Given Sides',
    mathLines: [
      '\\text{Given : Hypotenuse } AB = 29 \\text{ units}',
      '\\text{Given : Side adjacent to } \\theta, \\; BC = 21 \\text{ units}',
      '\\text{We must find opposite side } AC \\text{ to determine } \\sin\\theta \\text{ and } \\cos\\theta'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Pythagoras',
    badgeColor: '#5b21b6',
    badgeBg: '#ede9fe',
    title: 'Find Opposite Side AC',
    mathLines: [
      '\\text{In right-angled } \\triangle ACB, \\text{ by Pythagoras Theorem : } AB^2 = AC^2 + BC^2',
      'AC^2 = AB^2 - BC^2 = (29)^2 - (21)^2',
      '\\text{Using } a^2 - b^2 = (a - b)(a + b) : AC^2 = (29 - 21)(29 + 21) = 8 \\times 50 = 400',
      'AC = \\sqrt{400} = 20 \\text{ units} \\quad (\\text{Length is always positive})'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'sin θ & cos θ',
    badgeColor: '#d97706',
    badgeBg: '#fef3c7',
    title: 'Calculate sin θ and cos θ',
    mathLines: [
      '\\sin\\theta = \\dfrac{\\text{Side opposite to } \\theta}{\\text{Hypotenuse}} = \\dfrac{AC}{AB} = \\dfrac{20}{29}',
      '\\cos\\theta = \\dfrac{\\text{Side adjacent to } \\theta}{\\text{Hypotenuse}} = \\dfrac{BC}{AB} = \\dfrac{21}{29}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Part (i)',
    badgeColor: '#047857',
    badgeBg: '#d1fae5',
    title: 'Determine Value of cos²θ + sin²θ',
    mathLines: [
      '\\cos^2\\theta + \\sin^2\\theta = \\left(\\dfrac{21}{29}\\right)^2 + \\left(\\dfrac{20}{29}\\right)^2',
      '= \\dfrac{21^2 + 20^2}{29^2} = \\dfrac{441 + 400}{841}',
      '= \\dfrac{841}{841} = 1',
      '\\mathbf{\\cos^2\\theta + \\sin^2\\theta = 1} \\quad \\text{(Verified Fundamental Identity)}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Part (ii)',
    badgeColor: '#be123c',
    badgeBg: '#ffe4e6',
    title: 'Determine Value of cos²θ - sin²θ',
    mathLines: [
      '\\cos^2\\theta - \\sin^2\\theta = \\left(\\dfrac{21}{29}\\right)^2 - \\left(\\dfrac{20}{29}\\right)^2',
      '= \\dfrac{21^2 - 20^2}{29^2} = \\dfrac{(21 + 20)(21 - 20)}{841}',
      '= \\dfrac{41 \\times 1}{841} = \\dfrac{41}{841}',
      '\\mathbf{\\cos^2\\theta - \\sin^2\\theta = \\dfrac{41}{841}}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Summary',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Final Answers for Both Parts',
    mathLines: [
      '\\text{In } \\triangle ACB, \\; AC = 20, \\; BC = 21, \\; AB = 29 \\text{ units}',
      '\\text{(i) } \\cos^2\\theta + \\sin^2\\theta = 1',
      '\\text{(ii) } \\cos^2\\theta - \\sin^2\\theta = \\dfrac{41}{841}'
    ]
  }
]

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean) ─────────── */
// Vertex C (Right Angle at bottom-left): (75, 185)
// Vertex A (Top): (75, 42) -> Opposite side AC = 143px
// Vertex B (Right): (265, 185) -> Adjacent base BC = 190px
const Cx = 75, Cy = 185
const Ax = 75, Ay = 42
const Bx = 265, By = 185

// Hypotenuse label position and angle
const HYP_ANGLE = 37
const HypLabelX = 176
const HypLabelY = 104

const COLOR_ADJ = '#0284c7' // Blue (BC = 21)
const COLOR_OPP = '#059669' // Green (AC = 20)
const COLOR_HYP = '#d97706' // Amber (AB = 29)
const COLOR_MUTED = '#94a3b8'

/* ─────────── ANIMATED STEP TRIANGLE SVG ─────────── */
function AnimatedStepTriangle3({
  stepId,
  subStep = 1,
  isCurrent = true
}) {
  const isBasic = stepId === 1
  const isGiven = stepId === 2
  const isPyth = stepId === 3
  const isRatios = stepId === 4
  const isPart1 = stepId === 5
  const isPart2 = stepId === 6
  const isSummary = stepId === 7

  const oppSolved = stepId >= 3 && (stepId > 3 || subStep >= 4)

  const highlightOpp = (isPyth && subStep >= 2) || (isRatios && subStep === 1) || isPart1 || isPart2 || isSummary
  const highlightAdj = isGiven || (isPyth && subStep < 4) || (isRatios && subStep === 2) || isPart1 || isPart2 || isSummary
  const highlightHyp = isGiven || (isPyth && subStep < 4) || isRatios || isPart1 || isPart2 || isSummary

  // Dynamic Animated Badge Text corresponding to current sub-step
  let calloutText = ''
  let badgeBg = '#e0f2fe'
  let badgeColor = '#0369a1'

  if (stepId === 1) {
    calloutText = subStep === 1 ? 'Right △ACB (∠C = 90°)' : '∠ABC = θ : AC (opp), BC (adj), AB (hyp)'
    badgeBg = '#d1fae5'
    badgeColor = '#065f46'
  } else if (stepId === 2) {
    calloutText = subStep === 1 ? 'Given: AB = 29 (hyp) | BC = 21 (adj)' : 'Need to find AC (opp) via Pythagoras'
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (stepId === 3) {
    if (subStep === 1) calloutText = 'AB² = AC² + BC² (Pythagoras)'
    else if (subStep === 2) calloutText = 'AC² = 29² - 21²'
    else if (subStep === 3) calloutText = 'AC² = (29 - 21)(29 + 21) = 8 × 50 = 400'
    else calloutText = 'AC = √400 = 20 units (Solved!)'
    badgeBg = '#ede9fe'
    badgeColor = '#5b21b6'
  } else if (stepId === 4) {
    calloutText = subStep === 1 ? 'sin θ = opp ÷ hyp = 20/29' : 'cos θ = adj ÷ hyp = 21/29'
    badgeBg = '#fef3c7'
    badgeColor = '#b45309'
  } else if (stepId === 5) {
    calloutText = subStep < 3 ? 'cos²θ + sin²θ = (21/29)² + (20/29)²' : '841 ÷ 841 = 1 (Identity Verified)'
    badgeBg = '#d1fae5'
    badgeColor = '#047857'
  } else if (stepId === 6) {
    calloutText = subStep < 3 ? 'cos²θ - sin²θ = (21/29)² - (20/29)²' : 'Result = 41/841'
    badgeBg = '#ffe4e6'
    badgeColor = '#be123c'
  } else if (isSummary) {
    calloutText = 'Both Parts (i) = 1 & (ii) = 41/841 Solved'
    badgeBg = '#dcfce7'
    badgeColor = '#15803d'
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      margin: '0.8rem 0 1.2rem'
    }}>
      {/* Visual Animated Callout Badge Above Diagram */}
      {calloutText && (
        <div
          className={isCurrent ? 'e3-pop' : ''}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px 18px',
            borderRadius: '20px',
            background: badgeBg,
            border: `1.5px solid ${badgeColor}`,
            color: badgeColor,
            fontSize: '0.88rem',
            fontWeight: 800,
            fontFamily: 'Inter',
            marginBottom: '0.6rem',
            letterSpacing: '0.02em',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}
        >
          {calloutText}
        </div>
      )}

      <svg
        viewBox="0 0 380 230"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: '270px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`triGrad3-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.09)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Cx},${Cy} ${Bx},${By} ${Ax},${Ay}`}
          fill={`url(#triGrad3-${stepId})`}
          className={isCurrent ? 'e3-fade' : ''}
        />

        {/* Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line x1={Cx} y1={Cy} x2={Bx} y2={By} stroke={COLOR_ADJ} strokeWidth="14" strokeLinecap="round" className="e3-glow" />
        )}
        {highlightOpp && isCurrent && (
          <line x1={Cx} y1={Cy} x2={Ax} y2={Ay} stroke={COLOR_OPP} strokeWidth="14" strokeLinecap="round" className="e3-glow" />
        )}
        {highlightHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={COLOR_HYP} strokeWidth="14" strokeLinecap="round" className="e3-glow" />
        )}

        {/* Base BC (Adjacent) */}
        <line
          x1={Cx} y1={Cy} x2={Bx} y2={By}
          stroke={highlightAdj ? COLOR_ADJ : (isBasic ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e3-draw' : ''}
        />

        {/* Perpendicular AC (Opposite) */}
        <line
          x1={Cx} y1={Cy} x2={Ax} y2={Ay}
          stroke={oppSolved ? (highlightOpp ? COLOR_OPP : COLOR_MUTED) : (highlightOpp ? COLOR_OPP : '#94a3b8')}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          strokeDasharray={oppSolved ? 'none' : '6 4'}
          className={isCurrent ? 'e3-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AB */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightHyp ? COLOR_HYP : (isBasic ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightHyp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e3-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on active sides */}
        {highlightAdj && isCurrent && (
          <circle r="4" fill={COLOR_ADJ}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Cx} ${Cy} L${Bx} ${By}`} />
          </circle>
        )}
        {highlightOpp && isCurrent && (
          <circle r="4" fill={COLOR_OPP}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Cx} ${Cy} L${Ax} ${Ay}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4" fill={COLOR_HYP}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Bx} ${By}`} />
          </circle>
        )}

        {/* Right Angle Symbol at C (90°) */}
        <rect
          x={Cx} y={Cy - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="1.8"
          className={isCurrent ? 'e3-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Cx} cy={Cy} r="5" fill="#0284c7" className={isCurrent ? 'e3-pop' : ''} />
        <circle cx={Bx} cy={By} r="5" fill="#0284c7" className={isCurrent ? 'e3-pop' : ''} />
        <circle cx={Ax} cy={Ay} r="5" fill="#0284c7" className={isCurrent ? 'e3-pop' : ''} />

        {/* Vertex Labels */}
        <text x={Cx - 12} y={Cy + 18} textAnchor="end" fill="#0f172a" fontSize="13.5" fontWeight="800" fontFamily="Inter">C (90°)</text>
        <text x={Bx + 12} y={By + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">B (θ)</text>
        <text x={Ax - 14} y={Ay + 4} textAnchor="end" fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">A</text>

        {/* Angle θ Arc at Vertex B */}
        <path
          d={`M 231 185 A 34 34 0 0 1 238 165`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.4"
          className={isCurrent ? 'e3-pop' : ''}
        />
        <text x={Bx - 44} y={By - 10} fill="#d97706" fontSize="13.5" fontWeight="800" fontFamily="Inter">θ</text>

        {/* Base BC Label */}
        <text
          x={(Cx + Bx) / 2 + 10} y={Cy + 25}
          fill={highlightAdj ? COLOR_ADJ : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
        >
          BC = 21 (adj)
        </text>

        {/* Perpendicular AC Label */}
        <text
          x={Cx - 14} y={(Ay + Cy) / 2}
          fill={highlightOpp ? COLOR_OPP : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="end" dominantBaseline="middle" fontFamily="Inter"
        >
          {oppSolved ? 'AC = 20 (opp)' : 'AC = ? (opp)'}
        </text>

        {/* Hypotenuse AB Label */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={highlightHyp ? COLOR_HYP : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
          transform={`rotate(${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff" strokeWidth="3" paintOrder="stroke"
        >
          AB = 29 (hyp)
        </text>
      </svg>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example3Tutor({ onNextExample, onPrevExample, hasPrev = true, hasNext = true }) {
  const total = STEPS.length
  const [step, setStep] = useState(1)
  const [subStep, setSubStep] = useState(1)
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)

  const currentStepObj = STEPS[step - 1] || STEPS[0]
  const currentTotalLines = currentStepObj.mathLines.length

  // Keyboard navigation: Left / Right arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
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

  // Smoothly scroll the newly revealed step or line into view
  useEffect(() => {
    if (!scrollContainerRef.current) return
    const el = scrollContainerRef.current.querySelector(`[data-step="${step}"]`)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 70)
    }
  }, [step, subStep])

  // Single click progresses one line at a time; when lines complete, goes to next step!
  const goNextStep = () => {
    if (subStep < currentTotalLines) {
      setSubStep(s => s + 1)
    } else if (step < total) {
      setStep(s => s + 1)
      setSubStep(1)
    } else if (hasNext && onNextExample) {
      onNextExample()
    }
  }

  // Backwards navigation steps back one line at a time
  const goPrevStep = () => {
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevTotalLines = STEPS[step - 2].mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalLines)
    } else if (hasPrev && onPrevExample) {
      onPrevExample()
    }
  }

  // Single click = Next sub-step, Double click = Previous sub-step
  const handleContainerClick = (e) => {
    if (e.target.closest('button, a, input, select, [data-noclick]')) return

    const selection = window.getSelection()?.toString()
    if (selection && selection.length > 0) return

    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      goPrevStep()
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null
        goNextStep()
      }, 250)
    }
  }

  return (
    <div
      className="main-content"
      onClick={handleContainerClick}
      style={{
        display: 'flex',
        height: 'calc(100vh - 106px)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#ffffff'
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* ══════════════════════════════════════════════════════════════════
          PART 1 (LEFT PANE): PROGRESSIVE STEP-BY-STEP WORKSPACE (BIG DIAGRAM IN EVERY STEP)
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
          <div style={{ width: '100%', maxWidth: '760px' }}>
            {STEPS.slice(0, step).map((s, idx) => {
              const isCurrent = idx === step - 1
              const visibleLines = isCurrent ? s.mathLines.slice(0, subStep) : s.mathLines

              return (
                <div
                  key={s.id}
                  data-step={s.id}
                  className={isCurrent ? 'e3-fade' : ''}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    paddingBottom: '2.5rem',
                    borderBottom: idx < step - 1 ? '1px dashed #e2e8f0' : 'none',
                    opacity: isCurrent ? 1 : 0.82,
                    transition: 'all 0.25s ease'
                  }}
                >
                  {/* Step Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '0.8rem'
                  }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: s.badgeColor,
                      background: s.badgeBg,
                      borderRadius: '6px',
                      padding: '4px 14px'
                    }}>
                      {s.badge}
                    </span>
                    <span style={{
                      fontSize: '1.38rem',
                      fontWeight: 800,
                      color: isCurrent ? '#0f172a' : '#475569'
                    }}>
                      {s.title}
                    </span>
                  </div>

                  {/* Step Diagram (Big, Prominent, Live Motion Animations) */}
                  <AnimatedStepTriangle3
                    stepId={s.id}
                    subStep={isCurrent ? subStep : s.mathLines.length}
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
                        className="e3-fade"
                        style={{
                          fontSize: isCurrent ? '1.42rem' : '1.22rem',
                          color: '#0f172a',
                          fontWeight: isCurrent ? 600 : 500,
                          lineHeight: 1.85,
                          textAlign: 'center'
                        }}
                      >
                        <MathText text={`$${line}$`} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PART 2 (RIGHT PANE): QUESTION DISPLAY & TARGETS
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="right-pane"
        style={{
          flex: 0.85,
          padding: '2.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          overflowY: 'auto',
          background: '#ffffff',
          fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Main Question Display */}
        <div style={{ margin: 0, fontSize: '1.32rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
          <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
            Example 3 :
          </span>
          <MathText text={'Consider $\\triangle ACB$, right-angled at $C$, in which $AB = 29\\text{ units}$, $BC = 21\\text{ units}$ and $\\angle ABC = \\theta$. Determine the values of (i) $\\cos^2\\theta + \\sin^2\\theta$, (ii) $\\cos^2\\theta - \\sin^2\\theta$.'} />
        </div>

        {/* Given Information Card */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          marginTop: '0.5rem'
        }}>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
            marginBottom: '0.75rem'
          }}>
            Given in Problem
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '1.1rem', color: '#0f172a' }}>
            <div>• <MathText text={'$\\text{Hypotenuse } AB = 29\\text{ units}$'} /></div>
            <div>• <MathText text={'$\\text{Base } BC = 21\\text{ units (adjacent to } \\theta\\text{)}$'} /></div>
            <div>• <MathText text={'$\\angle C = 90^\\circ, \\quad \\angle ABC = \\theta$'} /></div>
          </div>
        </div>

        {/* Determine / Evaluate Targets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{
            background: step >= 5 ? '#ecfdf5' : '#f8fafc',
            border: step >= 5 ? '1.5px solid #10b981' : '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: step >= 5 ? '#065f46' : '#64748b' }}>
                Part (i)
              </span>
              {step >= 5 && (
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  background: '#d1fae5',
                  color: '#065f46',
                  padding: '2px 10px',
                  borderRadius: '12px'
                }}>
                  {step >= 5 && subStep >= 3 ? '= 1' : 'Evaluating...'}
                </span>
              )}
            </div>
            <div style={{ fontSize: '1.18rem', marginTop: '0.4rem', color: '#0f172a' }}>
              <MathText text={'$\\cos^2\\theta + \\sin^2\\theta$'} />
            </div>
          </div>

          <div style={{
            background: step >= 6 ? '#fff1f2' : '#f8fafc',
            border: step >= 6 ? '1.5px solid #f43f5e' : '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: step >= 6 ? '#9f1239' : '#64748b' }}>
                Part (ii)
              </span>
              {step >= 6 && (
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  background: '#ffe4e6',
                  color: '#9f1239',
                  padding: '2px 10px',
                  borderRadius: '12px'
                }}>
                  {step >= 6 && subStep >= 3 ? '= 41/841' : 'Evaluating...'}
                </span>
              )}
            </div>
            <div style={{ fontSize: '1.18rem', marginTop: '0.4rem', color: '#0f172a' }}>
              <MathText text={'$\\cos^2\\theta - \\sin^2\\theta$'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
