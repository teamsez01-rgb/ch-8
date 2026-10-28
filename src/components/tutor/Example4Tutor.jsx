import React, { useEffect, useRef, useState } from 'react'
import { CheckCircle2, XCircle, HelpCircle, Sparkles, RotateCcw } from 'lucide-react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e4DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e4FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e4Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e4Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e4Shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-4px); }
    40%, 80% { transform: translateX(4px); }
  }
  
  .e4-fade { animation: e4FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e4-draw { stroke-dasharray: 400; animation: e4DrawLine 0.75s ease-out both; }
  .e4-glow { animation: e4Glow 1.8s ease-in-out infinite; }
  .e4-pop  { animation: e4Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e4-shake { animation: e4Shake 0.4s ease-in-out both; }

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

/* ─────────── NCERT MATHEMATICAL STEPS FOR EXAMPLE 4 ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Right Triangle ABC',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Draw Right Triangle ABC',
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
    title: 'Understand Given tan A = 1',
    mathLines: [
      '\\tan A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Side adjacent to } \\angle A} = \\dfrac{BC}{AB}',
      '\\text{Given : } \\tan A = 1 \\implies \\dfrac{BC}{AB} = 1 \\implies BC = AB'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Equal Sides (k)',
    badgeColor: '#92400e',
    badgeBg: '#fef3c7',
    title: 'Assign Sides AB = BC = k',
    mathLines: [
      '\\text{Since } BC = AB, \\text{ let } AB = BC = k \\quad (\\text{where } k > 0 \\text{ is a positive constant})',
      '\\text{Concept Insight : } \\triangle ABC \\text{ is an isosceles right-angled triangle!}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Pythagoras',
    badgeColor: '#5b21b6',
    badgeBg: '#ede9fe',
    title: 'Find Hypotenuse AC',
    mathLines: [
      '\\text{By Pythagoras Theorem in } \\triangle ABC : AC^2 = AB^2 + BC^2',
      'AC^2 = k^2 + k^2 = 2k^2',
      'AC = \\sqrt{2k^2} = \\sqrt{2}k'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'sin A & cos A',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Calculate sin A and cos A',
    mathLines: [
      '\\sin A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Hypotenuse}} = \\dfrac{BC}{AC} = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}',
      '\\cos A = \\dfrac{\\text{Side adjacent to } \\angle A}{\\text{Hypotenuse}} = \\dfrac{AB}{AC} = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Verification',
    badgeColor: '#047857',
    badgeBg: '#d1fae5',
    title: 'Substitute Values in LHS = 2 sin A cos A',
    mathLines: [
      '\\text{LHS} = 2 \\sin A \\cos A',
      '= 2 \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right) \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right)',
      '= 2 \\times \\left(\\dfrac{1}{2}\\right) = 1',
      '\\text{LHS} = 1 = \\text{RHS}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Verified',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Hence Verified : 2 sin A cos A = 1',
    mathLines: [
      '\\text{Since } \\text{LHS} = \\text{RHS} = 1,',
      '\\mathbf{2 \\sin A \\cos A = 1 \\quad \\text{is verified!}}',
      '\\text{Special Insight : When } \\tan A = 1, \\; \\angle A = 45^\\circ \\text{ and } \\sin 45^\\circ = \\cos 45^\\circ = \\dfrac{1}{\\sqrt{2}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS & CHECKPOINTS ─────────── */
const STEP_DETAILS = {
  1: {
    title: 'Draw Right Triangle ABC',
    summary: 'Construct right-angled $\\triangle ABC$ with $\\angle B = 90^\\circ$ and acute angle $A$.',
    quiz: null
  },
  2: {
    title: 'Understand Given tan A = 1',
    summary: 'Given $\\tan A = \\dfrac{\\text{Opposite}}{\\text{Adjacent}} = \\dfrac{BC}{AB} = 1$.',
    quiz: {
      question: 'Since $\\tan A = \\dfrac{BC}{AB} = 1$, what does this tell us?',
      options: [
        { id: 'a', text: '$BC = AB$ (Both legs are equal)', correct: true, feedback: 'Correct! Multiplying by $AB$ gives $BC = AB$.' },
        { id: 'b', text: '$BC = 2 \\times AB$', correct: false, feedback: 'A ratio of 1 means both sides are equal, not doubled.' }
      ]
    }
  },
  3: {
    title: 'Assign Equal Sides = k',
    summary: 'Since $BC = AB$, let $AB = BC = k$ (where $k > 0$ is a constant).',
    quiz: null
  },
  4: {
    title: 'Calculate Hypotenuse AC',
    summary: 'By Pythagoras theorem: $AC^2 = AB^2 + BC^2 = k^2 + k^2 = 2k^2$.',
    quiz: {
      question: 'Taking the positive square root of $AC^2 = 2k^2$, what is $AC$?',
      options: [
        { id: 'a', text: '$AC = \\sqrt{2}k$', correct: true, feedback: 'Spot on! Taking the square root gives $AC = \\sqrt{2}k$.' },
        { id: 'b', text: '$AC = 2k$', correct: false, feedback: 'Square root of 2 is $\\sqrt{2}$, not 2.' }
      ]
    }
  },
  5: {
    title: 'Compute sin A and cos A',
    summary: '$\\sin A = \\dfrac{BC}{AC} = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}$ and $\\cos A = \\dfrac{AB}{AC} = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}$.',
    quiz: null
  },
  6: {
    title: 'Substitute into 2 sin A cos A',
    summary: '$\\text{LHS} = 2 \\sin A \\cos A = 2 \\left(\\dfrac{1}{\\sqrt{2}}\\right) \\left(\\dfrac{1}{\\sqrt{2}}\\right)$.',
    quiz: {
      question: 'What is the evaluated value of $2 \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right) \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right)$?',
      options: [
        { id: 'a', text: '$2 \\times \\dfrac{1}{2} = 1$ (Matches RHS!)', correct: true, feedback: 'Brilliant! Since $\\sqrt{2} \\times \\sqrt{2} = 2$, we get $2 \\times \\dfrac{1}{2} = 1$!' },
        { id: 'b', text: '$2 \\times \\dfrac{1}{4} = \\dfrac{1}{2}$', correct: false, feedback: 'Note: $\\sqrt{2} \\times \\sqrt{2} = 2$, not 4.' }
      ]
    }
  },
  7: {
    title: 'Final Verification Complete',
    summary: '$\\text{LHS} = \\text{RHS} = 1$. The identity is completely proven!',
    quiz: null
  }
}

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean) ─────────── */
const Ax = 75, Ay = 185
const Bx = 245, By = 185
const Cx = 245, Cy = 35

const HYP_ANGLE = -41
const HypLabelX = 152
const HypLabelY = 104

const COLOR_ADJ = '#0284c7' // Blue (AB = k)
const COLOR_OPP = '#059669' // Green (BC = k)
const COLOR_HYP = '#d97706' // Amber (AC = √2 k)
const COLOR_MUTED = '#94a3b8'

/* ─────────── ANIMATED STEP TRIANGLE SVG ─────────── */
function AnimatedStepTriangle4({
  stepId,
  subStep = 1,
  isCurrent = true
}) {
  const isBasic = stepId === 1
  const isGiven = stepId === 2
  const isAssignK = stepId === 3
  const isPyth = stepId === 4
  const isRatios = stepId === 5
  const isVerify = stepId === 6
  const isSummary = stepId === 7

  const hasK = stepId >= 3
  const hypSolved = stepId >= 4 && (stepId > 4 || subStep >= 3)

  const highlightAdj = isGiven || isAssignK || (isPyth && subStep < 3) || (isRatios && subStep === 2) || isVerify || isSummary
  const highlightOpp = isGiven || isAssignK || (isPyth && subStep < 3) || (isRatios && subStep === 1) || isVerify || isSummary
  const highlightHyp = (isPyth && subStep >= 2) || isRatios || isVerify || isSummary

  // Dynamic Animated Badge Text corresponding to current sub-step
  let calloutText = ''
  let badgeBg = '#e0f2fe'
  let badgeColor = '#0369a1'

  if (stepId === 1) {
    calloutText = subStep === 1 ? 'Right △ABC (∠B = 90°)' : '∠A : BC (opp), AB (adj), AC (hyp)'
    badgeBg = '#d1fae5'
    badgeColor = '#065f46'
  } else if (stepId === 2) {
    calloutText = subStep === 1 ? 'tan A = Opposite ÷ Adjacent = BC ÷ AB' : 'tan A = 1  ⟹  BC = AB (Equal Sides!)'
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (stepId === 3) {
    calloutText = subStep === 1 ? 'Let AB = BC = k (k > 0)' : 'Isosceles Right Triangle (∠A = 45°)'
    badgeBg = '#fef3c7'
    badgeColor = '#b45309'
  } else if (stepId === 4) {
    if (subStep === 1) calloutText = 'AC² = AB² + BC² = k² + k²'
    else if (subStep === 2) calloutText = 'AC² = 2k²'
    else calloutText = 'AC = √2 k (Hypotenuse Solved!)'
    badgeBg = '#ede9fe'
    badgeColor = '#5b21b6'
  } else if (stepId === 5) {
    calloutText = subStep === 1 ? 'sin A = k ÷ √2 k = 1/√2' : 'cos A = k ÷ √2 k = 1/√2'
    badgeBg = '#e0f2fe'
    badgeColor = '#0284c7'
  } else if (stepId === 6) {
    calloutText = subStep < 3 ? 'LHS = 2 × (1/√2) × (1/√2)' : '2 × (1/2) = 1 = RHS (Verified!)'
    badgeBg = '#d1fae5'
    badgeColor = '#047857'
  } else if (isSummary) {
    calloutText = '2 sin A cos A = 1 Verified Successfully!'
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
          className={isCurrent ? 'e4-pop' : ''}
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
          <linearGradient id={`triGrad4-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.09)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={`url(#triGrad4-${stepId})`}
          className={isCurrent ? 'e4-fade' : ''}
        />

        {/* Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={COLOR_ADJ} strokeWidth="14" strokeLinecap="round" className="e4-glow" />
        )}
        {highlightOpp && isCurrent && (
          <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={COLOR_OPP} strokeWidth="14" strokeLinecap="round" className="e4-glow" />
        )}
        {highlightHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke={COLOR_HYP} strokeWidth="14" strokeLinecap="round" className="e4-glow" />
        )}

        {/* Base AB (Adjacent) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightAdj ? COLOR_ADJ : (isBasic ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e4-draw' : ''}
        />

        {/* Perpendicular BC (Opposite) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? COLOR_OPP : (isBasic ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e4-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={hypSolved ? (highlightHyp ? COLOR_HYP : COLOR_MUTED) : (highlightHyp ? COLOR_HYP : '#94a3b8')}
          strokeWidth={highlightHyp && hypSolved ? 4 : 2.6}
          strokeLinecap="round"
          strokeDasharray={hypSolved ? 'none' : '6 4'}
          className={isCurrent && hypSolved ? 'e4-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on active sides */}
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

        {/* Right Angle Symbol at B (90°) */}
        <rect
          x={Bx - 16} y={By - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="1.8"
          className={isCurrent ? 'e4-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Ax} cy={Ay} r="5" fill="#0284c7" className={isCurrent ? 'e4-pop' : ''} />
        <circle cx={Bx} cy={By} r="5" fill="#0284c7" className={isCurrent ? 'e4-pop' : ''} />
        <circle cx={Cx} cy={Cy} r="5" fill="#0284c7" className={isCurrent ? 'e4-pop' : ''} />

        {/* Vertex Labels */}
        <text x={Ax - 22} y={Ay + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">A</text>
        <text x={Bx + 10} y={By + 6} fill="#0f172a" fontSize="13.5" fontWeight="800" fontFamily="Inter">B (90°)</text>
        <text x={Cx + 10} y={Cy + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">C</text>

        {/* Angle A Arc */}
        <path
          d={`M 107 185 A 32 32 0 0 0 99 164`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.4"
          className={isCurrent ? 'e4-pop' : ''}
        />
        <text x={Ax + 36} y={Ay - 8} fill="#d97706" fontSize="13" fontWeight="800" fontFamily="Inter">∠A</text>

        {/* Base AB Label */}
        <text
          x={(Ax + Bx) / 2} y={Ay + 24}
          fill={highlightAdj ? COLOR_ADJ : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
        >
          {isBasic ? 'AB (adjacent side)' : (hasK ? 'AB = k (adj)' : 'AB (adjacent side)')}
        </text>

        {/* Perpendicular BC Label */}
        <text
          x={Bx + 14} y={(By + Cy) / 2}
          fill={highlightOpp ? COLOR_OPP : '#475569'}
          fontSize="13" fontWeight="700" dominantBaseline="middle" fontFamily="Inter"
        >
          {isBasic ? 'BC (opposite side)' : (hasK ? 'BC = k (opp)' : 'BC (opposite side)')}
        </text>

        {/* Hypotenuse AC Label */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={hypSolved ? (highlightHyp ? COLOR_HYP : '#475569') : '#94a3b8'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
          transform={`rotate(${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff" strokeWidth="3" paintOrder="stroke"
        >
          {hypSolved ? 'AC = √2 k (hyp)' : 'AC = ? (hyp)'}
        </text>
      </svg>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example4Tutor({ onNextExample, onPrevExample, hasPrev = true, hasNext = true }) {
  const total = STEPS.length
  const [step, setStep] = useState(1)
  const [subStep, setSubStep] = useState(1)
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)

  // Interactive Student Quiz State keyed by step: { [step]: optionId }
  const [selectedOptions, setSelectedOptions] = useState({})

  const currentStepObj = STEPS[step - 1] || STEPS[0]
  const currentTotalLines = currentStepObj.mathLines.length
  const currentStepData = STEP_DETAILS[step] || STEP_DETAILS[1]
  const currentQuiz = currentStepData.quiz
  const userChoiceId = selectedOptions[step]
  const chosenOption = currentQuiz?.options.find(o => o.id === userChoiceId)

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
                  className={isCurrent ? 'e4-fade' : ''}
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
                  <AnimatedStepTriangle4
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
                        className="e4-fade"
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
          PART 2 (RIGHT PANE): INTERACTIVE EXPLANATION & STUDENT CHECKPOINTS
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="right-pane"
        style={{
          flex: 0.85,
          padding: '2.2rem 2.6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          overflowY: 'auto',
          background: '#ffffff',
          fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Main Question Display */}
        <div style={{ margin: 0, fontSize: '1.28rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
          <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
            Example 4 :
          </span>
          <MathText text={'In a right triangle $ABC$, right-angled at $B$, if $\\tan A = 1$, then verify that $2 \\sin A \\cos A = 1$.'} />
        </div>

        {/* ACTIVE STEP CARD (Only the active step's goal and checkpoint appear!) */}
        <div
          key={`step-card-${step}`}
          className="e4-fade"
          style={{
            background: '#ffffff',
            border: chosenOption?.correct ? '1.5px solid #10b981' : (chosenOption ? '1.5px solid #f59e0b' : '1.5px solid #e2e8f0'),
            borderRadius: '16px',
            padding: '1.25rem 1.4rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.25s ease'
          }}
        >
          {/* Step Badge & Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.65rem'
          }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#0284c7',
              background: '#e0f2fe',
              padding: '3px 10px',
              borderRadius: '6px'
            }}>
              Step {step} of 7 • {currentStepData.title}
            </span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#059669'
            }}>
              Active Step
            </span>
          </div>

          {/* 1-Line Clean Summary (Concise & punchy, zero redundant walls of text) */}
          <div style={{
            fontSize: '0.98rem',
            color: '#334155',
            lineHeight: 1.6,
            marginBottom: currentQuiz ? '1rem' : '0'
          }}>
            <MathText text={currentStepData.summary} />
          </div>

          {/* Interactive Student Checkpoint (Only shown if this current step has a quiz!) */}
          {currentQuiz && (
            <div
              data-noclick="true"
              style={{
                marginTop: '0.75rem',
                paddingTop: '0.85rem',
                borderTop: '1px dashed #e2e8f0'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '0.55rem'
              }}>
                <span style={{
                  background: '#fef3c7',
                  color: '#b45309',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Sparkles size={12} />
                  Student Checkpoint
                </span>
              </div>

              {/* Question Text */}
              <div style={{
                fontSize: '0.98rem',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.5,
                marginBottom: '0.75rem'
              }}>
                <MathText text={currentQuiz.question} />
              </div>

              {/* 2 Clean Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentQuiz.options.map((opt) => {
                  const isChosen = userChoiceId === opt.id
                  const isCorrect = opt.correct

                  let btnBorder = '1px solid #e2e8f0'
                  let btnBg = '#f8fafc'
                  let btnColor = '#1e293b'

                  if (isChosen) {
                    if (isCorrect) {
                      btnBorder = '1.5px solid #10b981'
                      btnBg = '#ecfdf5'
                      btnColor = '#065f46'
                    } else {
                      btnBorder = '1.5px solid #f43f5e'
                      btnBg = '#fff1f2'
                      btnColor = '#9f1239'
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOptions(prev => ({ ...prev, [step]: opt.id }))
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.9rem',
                        borderRadius: '10px',
                        border: btnBorder,
                        background: btnBg,
                        color: btnColor,
                        cursor: 'pointer',
                        fontSize: '0.93rem',
                        fontWeight: isChosen ? 700 : 500,
                        textAlign: 'left',
                        fontFamily: 'Inter',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: isChosen ? (isCorrect ? '#10b981' : '#f43f5e') : '#e2e8f0',
                          color: isChosen ? '#ffffff' : '#64748b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          flexShrink: 0
                        }}>
                          {opt.id.toUpperCase()}
                        </span>
                        <MathText text={opt.text} />
                      </div>

                      {isChosen && (
                        isCorrect ? <CheckCircle2 size={18} color="#10b981" /> : <XCircle size={18} color="#f43f5e" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* 1-Line Clean Feedback */}
              {chosenOption && (
                <div
                  className="e4-pop"
                  style={{
                    marginTop: '0.65rem',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '10px',
                    background: chosenOption.correct ? '#ecfdf5' : '#fffbeb',
                    border: chosenOption.correct ? '1px solid #a7f3d0' : '1px solid #fef3c7',
                    fontSize: '0.86rem',
                    color: chosenOption.correct ? '#065f46' : '#92400e',
                    lineHeight: 1.45,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <div>
                    <strong>{chosenOption.correct ? '✓ Correct!' : '💡 Think About It:'}</strong>{' '}
                    <MathText text={chosenOption.feedback} />
                  </div>

                  {!chosenOption.correct && (
                    <button
                      onClick={() => {
                        setSelectedOptions(prev => {
                          const updated = { ...prev }
                          delete updated[step]
                          return updated
                        })
                      }}
                      title="Try Again"
                      style={{
                        border: 'none',
                        background: '#fef3c7',
                        color: '#b45309',
                        padding: '2px 6px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      <RotateCcw size={11} />
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* VERIFICATION TARGET STATUS BAR (Sleek, Compact, Zero Clutter) */}
        <div style={{
          background: step >= 6 ? '#ecfdf5' : '#f8fafc',
          border: step >= 6 ? '1.5px solid #10b981' : '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '0.8rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: step >= 6 ? '#065f46' : '#64748b'
            }}>
              Target
            </span>
            <span style={{ fontSize: '1.08rem', fontWeight: 700, color: '#0f172a' }}>
              <MathText text={'$2 \\sin A \\cos A = 1$'} />
            </span>
          </div>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            background: step >= 6 ? '#d1fae5' : '#e2e8f0',
            color: step >= 6 ? '#065f46' : '#475569',
            padding: '3px 10px',
            borderRadius: '10px'
          }}>
            {step >= 6 && subStep >= 3 ? 'Verified = 1 ✓' : (step >= 6 ? 'Substituting...' : `Step ${step}/7`)}
          </span>
        </div>
      </div>
    </div>
  )
}
