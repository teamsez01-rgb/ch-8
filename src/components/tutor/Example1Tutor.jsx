import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ChevronRight
} from 'lucide-react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e1DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e1FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e1Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e1PulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.35); }
    50%      { box-shadow: 0 0 0 7px rgba(2, 132, 199, 0); }
  }
  @keyframes e1Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .e1-fade { animation: e1FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e1-draw { stroke-dasharray: 400; animation: e1DrawLine 0.75s ease-out both; }
  .e1-glow { animation: e1Glow 1.8s ease-in-out infinite; }
  .e1-pop  { animation: e1Pop 0.4s cubic-bezier(.16,1,.3,1) both; }

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

/* ─────────── 10 NCERT MATHEMATICAL STEPS ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Right Triangle ABC',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Draw Right Triangle ABC',
    diagramType: 'construct',
    mathLines: [
      '\\text{Consider a right-angled } \\triangle ABC \\text{ in which } \\angle B = 90^\\circ',
      '\\text{For acute } \\angle A : \\text{Opposite side} = BC, \\; \\text{Adjacent side} = AB, \\; \\text{Hypotenuse} = AC'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Given Ratio',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
    title: 'Given tan A = 4/3',
    diagramType: 'given',
    mathLines: [
      '\\tan A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Side adjacent to } \\angle A} = \\dfrac{BC}{AB}',
      '\\text{Given : } \\tan A = \\dfrac{4}{3} \\implies \\dfrac{BC}{AB} = \\dfrac{4}{3}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Side Lengths',
    badgeColor: '#92400e',
    badgeBg: '#fef3c7',
    title: 'Assign Sides in Terms of k',
    diagramType: 'assignK',
    mathLines: [
      '\\dfrac{BC}{AB} = \\dfrac{4}{3}',
      'BC = 4k, \\quad AB = 3k \\quad (\\text{where } k > 0 \\text{ is a positive constant})'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Pythagoras',
    badgeColor: '#5b21b6',
    badgeBg: '#ede9fe',
    title: 'Find Hypotenuse AC',
    diagramType: 'pythagoras',
    mathLines: [
      '\\text{By Pythagoras Theorem in } \\triangle ABC : AC^2 = AB^2 + BC^2',
      'AC^2 = (3k)^2 + (4k)^2 = 9k^2 + 16k^2 = 25k^2',
      'AC = \\sqrt{25k^2} = 5k'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'sin A',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
    title: 'Find sin A',
    diagramType: 'ratio',
    ratioName: 'sin',
    mathLines: [
      '\\sin A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Hypotenuse}} = \\dfrac{BC}{AC}',
      '\\sin A = \\dfrac{4k}{5k}',
      '\\sin A = \\dfrac{4}{5}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'cos A',
    badgeColor: '#047857',
    badgeBg: '#d1fae5',
    title: 'Find cos A',
    diagramType: 'ratio',
    ratioName: 'cos',
    mathLines: [
      '\\cos A = \\dfrac{\\text{Side adjacent to } \\angle A}{\\text{Hypotenuse}} = \\dfrac{AB}{AC}',
      '\\cos A = \\dfrac{3k}{5k}',
      '\\cos A = \\dfrac{3}{5}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'cot A',
    badgeColor: '#9d174d',
    badgeBg: '#fce7f3',
    title: 'Find cot A',
    diagramType: 'ratio',
    ratioName: 'cot',
    mathLines: [
      '\\cot A = \\dfrac{1}{\\tan A} = \\dfrac{\\text{Side adjacent to } \\angle A}{\\text{Side opposite to } \\angle A} = \\dfrac{AB}{BC}',
      '\\cot A = \\dfrac{3k}{4k} = \\dfrac{3}{4}'
    ]
  },
  {
    id: 8,
    label: 'Step 8',
    badge: 'cosec A',
    badgeColor: '#6d28d9',
    badgeBg: '#ede9fe',
    title: 'Find cosec A',
    diagramType: 'ratio',
    ratioName: 'cosec',
    mathLines: [
      '\\operatorname{cosec} A = \\dfrac{1}{\\sin A} = \\dfrac{\\text{Hypotenuse}}{\\text{Side opposite to } \\angle A} = \\dfrac{AC}{BC}',
      '\\operatorname{cosec} A = \\dfrac{5k}{4k} = \\dfrac{5}{4}'
    ]
  },
  {
    id: 9,
    label: 'Step 9',
    badge: 'sec A',
    badgeColor: '#be123c',
    badgeBg: '#ffe4e6',
    title: 'Find sec A',
    diagramType: 'ratio',
    ratioName: 'sec',
    mathLines: [
      '\\sec A = \\dfrac{1}{\\cos A} = \\dfrac{\\text{Hypotenuse}}{\\text{Side adjacent to } \\angle A} = \\dfrac{AC}{AB}',
      '\\sec A = \\dfrac{5k}{3k}',
      '\\sec A = \\dfrac{5}{3}'
    ]
  },
  {
    id: 10,
    label: 'Step 10',
    badge: 'All Ratios',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'All Trigonometric Ratios of Angle A',
    diagramType: 'summary',
    mathLines: [
      '\\sin A = \\dfrac{4}{5}, \\quad \\cos A = \\dfrac{3}{5}, \\quad \\tan A = \\dfrac{4}{3}',
      '\\cot A = \\dfrac{3}{4}, \\quad \\operatorname{cosec} A = \\dfrac{5}{4}, \\quad \\sec A = \\dfrac{5}{3}'
    ]
  }
]

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Big) ─────────── */
const Ax = 65, Ay = 185
const Bx = 250, By = 185
const Cx = 250, Cy = 40
const HYP_ANGLE = -38
const HypLabelX = 138
const HypLabelY = 110

const COLOR_ADJ = '#0284c7' // Blue
const COLOR_OPP = '#059669' // Green
const COLOR_HYP = '#d97706' // Amber
const COLOR_MUTED = '#94a3b8'

/* ─────────── ANIMATED STEP TRIANGLE SVG ─────────── */
function AnimatedStepTriangle({
  stepId,
  subStep = 3,
  ratioName,
  isCurrent = true
}) {
  const isBasic = stepId === 1
  const isGiven = stepId === 2
  const isAssignK = stepId === 3
  const isPyth = stepId === 4
  const isSin = ratioName === 'sin'
  const isCos = ratioName === 'cos'
  const isCot = ratioName === 'cot'
  const isCosec = ratioName === 'cosec'
  const isSec = ratioName === 'sec'
  const isSummary = stepId === 10

  const hasK = stepId >= 3
  const hypSolved = stepId >= 4 && (stepId > 4 || subStep >= 3)

  const highlightOpp = isGiven || isAssignK || (isPyth && subStep < 3) || isSin || isCot || isCosec || isSummary
  const highlightAdj = isGiven || isAssignK || (isPyth && subStep < 3) || isCos || isCot || isSec || isSummary
  const highlightHyp = (isPyth && subStep >= 2) || isSin || isCos || isCosec || isSec || isSummary

  // Dynamic Animated Badge Text corresponding to the exact current sub-step
  let calloutText = ''
  let badgeBg = '#e0f2fe'
  let badgeColor = '#0369a1'

  if (stepId === 1) {
    calloutText = subStep === 1 ? 'Right △ABC (∠B = 90°)' : '∠A : BC (opp), AB (adj), AC (hyp)'
    badgeBg = '#d1fae5'
    badgeColor = '#065f46'
  } else if (stepId === 2) {
    calloutText = subStep === 1 ? 'tan A = Opposite ÷ Adjacent' : 'tan A = BC ÷ AB = 4/3'
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (stepId === 3) {
    calloutText = subStep === 1 ? 'BC ÷ AB = 4 ÷ 3' : 'BC = 4k  |  AB = 3k'
    badgeBg = '#fef3c7'
    badgeColor = '#b45309'
  } else if (stepId === 4) {
    calloutText = subStep === 1 ? 'AC² = AB² + BC²' : (subStep === 2 ? 'AC² = 25k²' : 'AC = 5k (Hypotenuse)')
    badgeBg = '#ede9fe'
    badgeColor = '#5b21b6'
  } else if (isSin) {
    calloutText = subStep === 1 ? 'sin A = BC ÷ AC' : (subStep === 2 ? 'sin A = 4k ÷ 5k' : 'sin A = 4/5')
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (isCos) {
    calloutText = subStep === 1 ? 'cos A = AB ÷ AC' : (subStep === 2 ? 'cos A = 3k ÷ 5k' : 'cos A = 3/5')
    badgeBg = '#d1fae5'
    badgeColor = '#047857'
  } else if (isCot) {
    calloutText = subStep === 1 ? 'cot A = AB ÷ BC' : 'cot A = 3k ÷ 4k = 3/4'
    badgeBg = '#fce7f3'
    badgeColor = '#9d174d'
  } else if (isCosec) {
    calloutText = subStep === 1 ? 'cosec A = AC ÷ BC' : 'cosec A = 5k ÷ 4k = 5/4'
    badgeBg = '#ede9fe'
    badgeColor = '#6d28d9'
  } else if (isSec) {
    calloutText = subStep === 1 ? 'sec A = AC ÷ AB' : (subStep === 2 ? 'sec A = 5k ÷ 3k' : 'sec A = 5/3')
    badgeBg = '#ffe4e6'
    badgeColor = '#be123c'
  } else if (isSummary) {
    calloutText = 'All 6 Ratios Solved'
    badgeBg = '#dcfce7'
    badgeColor = '#15803d'
  }

  const calloutWidth = Math.max(160, calloutText.length * 8.6 + 32)

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
      {/* Visual Animated Callout Badge (Cleanly placed ABOVE diagram - ZERO overlap with vertex C or lines) */}
      {calloutText && (
        <div
          className={isCurrent ? 'e1-pop' : ''}
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
          <linearGradient id={`triGrad-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.09)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={`url(#triGrad-${stepId})`}
          className={isCurrent ? 'e1-fade' : ''}
        />

        {/* Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={COLOR_ADJ} strokeWidth="14" strokeLinecap="round" className="e1-glow" />
        )}
        {highlightOpp && isCurrent && (
          <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={COLOR_OPP} strokeWidth="14" strokeLinecap="round" className="e1-glow" />
        )}
        {highlightHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke={COLOR_HYP} strokeWidth="14" strokeLinecap="round" className="e1-glow" />
        )}

        {/* Base AB (Adjacent) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightAdj ? COLOR_ADJ : (isBasic ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e1-draw' : ''}
        />

        {/* Perpendicular BC (Opposite) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? COLOR_OPP : (isBasic ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e1-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={hypSolved ? (highlightHyp ? COLOR_HYP : COLOR_MUTED) : (highlightHyp ? COLOR_HYP : '#94a3b8')}
          strokeWidth={highlightHyp && hypSolved ? 4 : 2.6}
          strokeLinecap="round"
          strokeDasharray={hypSolved ? 'none' : '6 4'}
          className={isCurrent && hypSolved ? 'e1-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on highlighted sides */}
        {highlightAdj && isCurrent && (
          <circle r="4" fill={COLOR_ADJ}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Bx} ${By}`} />
          </circle>
        )}
        {highlightOpp && isCurrent && (
          <circle r="4" fill={COLOR_OPP}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Bx} ${By} L${Cx} ${Cy}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4" fill={COLOR_HYP}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Cx} ${Cy}`} />
          </circle>
        )}

        {/* Right Angle Symbol at B */}
        <rect
          x={Bx - 16} y={By - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="1.8"
          className={isCurrent ? 'e1-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Ax} cy={Ay} r="5" fill="#0284c7" className={isCurrent ? 'e1-pop' : ''} />
        <circle cx={Bx} cy={By} r="5" fill="#0284c7" className={isCurrent ? 'e1-pop' : ''} />
        <circle cx={Cx} cy={Cy} r="5" fill="#0284c7" className={isCurrent ? 'e1-pop' : ''} />

        {/* Vertex Labels */}
        <text x={Ax - 20} y={Ay + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">A</text>
        <text x={Bx + 10} y={By + 6} fill="#0f172a" fontSize="13.5" fontWeight="800" fontFamily="Inter">B (90°)</text>
        <text x={Cx + 10} y={Cy + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">C</text>

        {/* Angle A Arc */}
        <path
          d={`M${Ax + 28} ${Ay} A28 28 0 0 0 ${Ax + 28 * Math.cos(0.66)} ${Ay - 28 * Math.sin(0.66)}`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.2"
          className={isCurrent ? 'e1-pop' : ''}
        />
        <text x={Ax + 36} y={Ay - 8} fill="#d97706" fontSize="13" fontWeight="800" fontFamily="Inter">∠A</text>

        {/* Side AB Label */}
        <text
          x={(Ax + Bx) / 2} y={Ay + 24}
          fill={highlightAdj ? COLOR_ADJ : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
        >
          {isBasic ? 'AB (adjacent side)' : (hasK ? 'AB = 3k (adj)' : 'AB (adjacent side)')}
        </text>

        {/* Side BC Label */}
        <text
          x={Bx + 12} y={(By + Cy) / 2}
          fill={highlightOpp ? COLOR_OPP : '#475569'}
          fontSize="13" fontWeight="700" dominantBaseline="middle" fontFamily="Inter"
        >
          {isBasic ? 'BC (opposite side)' : (hasK ? 'BC = 4k (opp)' : 'BC (opposite side)')}
        </text>

        {/* Side AC Label (Generous clearance from top-left badge) */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={hypSolved ? (highlightHyp ? COLOR_HYP : '#475569') : '#94a3b8'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
          transform={`rotate(${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff" strokeWidth="3" paintOrder="stroke"
        >
          {hypSolved ? 'AC = 5k (hyp)' : 'AC = ? (hyp)'}
        </text>
      </svg>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example1Tutor({ onNextExample, onPrevExample, hasPrev = true, hasNext = true }) {
  const total = STEPS.length
  const [step, setStep] = useState(1)
  const [subStep, setSubStep] = useState(1)
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)
  const rightScrollContainerRef = useRef(null)

  const currentStepObj = STEPS[step - 1] || STEPS[0]
  const currentTotalLines = currentStepObj.mathLines.length

  // Auto-scroll the active step card into view on the right pane
  useEffect(() => {
    if (!rightScrollContainerRef.current) return
    const el = rightScrollContainerRef.current.querySelector(`[data-right-step="${step}"]`)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 70)
    }
  }, [step])

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
                  className={isCurrent ? 'e1-fade' : ''}
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
                  <AnimatedStepTriangle
                    stepId={s.id}
                    subStep={isCurrent ? subStep : s.mathLines.length}
                    ratioName={s.ratioName}
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
                        className="e1-fade"
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
          PART 2 (RIGHT PANE): QUESTION DISPLAY & CONTROLS
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
        {/* Main Question Display - Right Pane is clean with only the question */}
        <div style={{ margin: 0, fontSize: '1.32rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
          <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
            Example 1 :
          </span>
          <MathText text={'Given $\\tan A = \\dfrac{4}{3}$, find the other trigonometric ratios of the angle A.'} />
        </div>
      </div>
    </div>
  )
}

