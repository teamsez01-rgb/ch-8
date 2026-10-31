import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Check,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS & INTER REGULAR TYPOGRAPHY ─────────── */
const KEYFRAMES = `
  @keyframes e4DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e4FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e4Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e4PulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.35); }
    50%      { box-shadow: 0 0 0 7px rgba(2, 132, 199, 0); }
  }
  @keyframes e4Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e4Typewriter {
    0% {
      clip-path: inset(0 100% 0 0);
      opacity: 0.2;
    }
    10% {
      opacity: 1;
    }
    100% {
      clip-path: inset(0 0 0 0);
      opacity: 1;
    }
  }
  .e4-fade { animation: e4FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e4-draw { stroke-dasharray: 400; animation: e4DrawLine 0.75s ease-out both; }
  .e4-glow { animation: e4Glow 1.8s ease-in-out infinite; }
  .e4-pop  { animation: e4Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e4-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e4Typewriter 0.85s steps(42, end) both;
  }
  .e4-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e4-math-line,
  .e4-math-line *,
  .e4-math-line .katex,
  .e4-math-line .katex .text,
  .e4-math-line .katex-html,
  .e4-math-line .katex-base,
  .e4-math-line .math-formula-span,
  .e4-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e4-math-line .katex-html {
    display: inline-flex !important;
    flex-wrap: nowrap !important;
    align-items: baseline !important;
    white-space: nowrap !important;
  }

  /* Consistent Inter Regular Typography */
  .left-pane,
  .left-pane *,
  .right-pane,
  .right-pane * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  }
  .left-pane .katex,
  .right-pane .katex,
  .e4-math-line .katex {
    color: #0f172a !important;
    font-weight: 500;
  }
  .left-pane .katex .text,
  .right-pane .katex .text {
    font-family: 'Inter', sans-serif !important;
    font-weight: 400 !important;
    color: #0f172a !important;
  }

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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 4 (PURE VERTICAL STEPS) ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Triangle ABC',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Draw Right Triangle ABC (∠B = 90°)',
    mathLines: [
      '\\text{Consider right-angled } \\triangle ABC \\text{ with } \\angle B = 90^\\circ',
      '\\mathbf{\\textcolor{#059669}{\\text{Side } BC \\text{ is Opposite}}} \\text{ (side opposite to acute } \\angle A)',
      '\\mathbf{\\textcolor{#0284c7}{\\text{Side } AB \\text{ is Adjacent}}} \\text{ (side adjacent to acute } \\angle A)',
      '\\mathbf{\\textcolor{#ea580c}{\\text{Side } AC \\text{ is Hypotenuse}}} \\text{ (longest side, opposite to } 90^\\circ)'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Given Ratio',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
    title: 'Understand Given tan A = 1',
    mathLines: [
      '\\tan A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Side adjacent to } \\angle A}',
      '\\tan A = \\dfrac{BC}{AB}',
      '\\text{Given in question : } \\tan A = 1',
      '\\dfrac{BC}{AB} = 1',
      '\\mathbf{\\textcolor{#059669}{BC = AB}}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Equal Sides (k)',
    badgeColor: '#92400e',
    badgeBg: '#fef3c7',
    title: 'Assign Equal Sides AB = BC = k',
    mathLines: [
      '\\text{Since } BC = AB,',
      '\\text{Let } AB = BC = k \\quad (\\text{where } k > 0)',
      '\\mathbf{\\textcolor{#0284c7}{AB = k}}',
      '\\mathbf{\\textcolor{#059669}{BC = k}}',
      '\\triangle ABC \\text{ is an isosceles right-angled triangle}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Pythagoras',
    badgeColor: '#5b21b6',
    badgeBg: '#ede9fe',
    title: 'Find Hypotenuse AC using Pythagoras',
    mathLines: [
      '\\text{In right } \\triangle ABC\\text{, by Pythagoras Theorem :}',
      'AC^2 = AB^2 + BC^2',
      'AC^2 = k^2 + k^2',
      'AC^2 = 2k^2',
      'AC = \\sqrt{2k^2}',
      '\\mathbf{\\textcolor{#ea580c}{AC = \\sqrt{2}k}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : sin A & cos A',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Calculate Ratios sin A and cos A',
    mathLines: [
      '\\sin A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Hypotenuse}}',
      '\\sin A = \\dfrac{BC}{AC}',
      '\\sin A = \\dfrac{k}{\\sqrt{2}k}',
      '\\mathbf{\\textcolor{#059669}{\\sin A = \\dfrac{1}{\\sqrt{2}}}}',
      '\\cos A = \\dfrac{\\text{Side adjacent to } \\angle A}{\\text{Hypotenuse}}',
      '\\cos A = \\dfrac{AB}{AC}',
      '\\cos A = \\dfrac{k}{\\sqrt{2}k}',
      '\\mathbf{\\textcolor{#0284c7}{\\cos A = \\dfrac{1}{\\sqrt{2}}}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Evaluate LHS',
    badgeColor: '#047857',
    badgeBg: '#d1fae5',
    title: 'Evaluate LHS = 2 sin A cos A',
    mathLines: [
      '\\text{LHS} = 2 \\sin A \\cos A',
      '\\text{Substitute } \\sin A = \\dfrac{1}{\\sqrt{2}} \\text{ and } \\cos A = \\dfrac{1}{\\sqrt{2}} :',
      '\\text{LHS} = 2 \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right) \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right)',
      '= 2 \\times \\left(\\dfrac{1}{2}\\right)',
      '= 1',
      '\\mathbf{\\text{LHS} = \\text{RHS} = 1}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Verified',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Hence Verified : 2 sin A cos A = 1',
    mathLines: [
      '\\text{Since } \\text{LHS} = \\text{RHS} = 1,',
      '\\mathbf{\\textcolor{#16a34a}{2 \\sin A \\cos A = 1}}',
      '\\mathbf{\\textcolor{#16a34a}{\\text{Hence Verified. } \\checkmark}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS FOR RIGHT PANE ─────────── */
const STEP_DETAILS_EX4 = {
  1: {
    title: 'Construct Triangle ABC',
    summary: 'Right $\\triangle ABC$ at $B$, with acute angle $\\angle A$.',
    quiz: null
  },
  2: {
    title: 'Understand Given tan A = 1',
    summary: 'Using $\\tan A = \\dfrac{BC}{AB} = 1$, we deduce both legs are equal: $BC = AB$.',
    quiz: null
  },
  3: {
    title: 'Assign Equal Sides AB = BC = k',
    summary: 'Let $AB = BC = k$ (where $k > 0$). Forms an isosceles right triangle.',
    quiz: null
  },
  4: {
    title: 'Find Hypotenuse AC',
    summary: 'Pythagoras: $AC = \\sqrt{k^2 + k^2} = \\sqrt{2k^2} = \\sqrt{2}k$.',
    promptSummary: 'Apply Pythagoras Theorem: $AC^2 = AB^2 + BC^2 = k^2 + k^2 = 2k^2$.',
    quiz: {
      question: 'Taking the positive square root of $AC^2 = 2k^2$, what is the length of hypotenuse $AC$?',
      options: [
        {
          id: 'a',
          text: '$AC = \\sqrt{2}k$',
          correct: true,
          feedback: 'Correct! Taking the square root gives $\\sqrt{2k^2} = \\sqrt{2}k$.'
        },
        {
          id: 'b',
          text: '$AC = 2k$',
          correct: false,
          feedback: 'Note: $\\sqrt{2}$ is an irrational number, not 2.'
        }
      ]
    }
  },
  5: {
    title: 'Calculate sin A and cos A',
    summary: '$\\sin A = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}$ and $\\cos A = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}$.',
    quiz: null
  },
  6: {
    title: 'Evaluate LHS = 2 sin A cos A',
    summary: '$\\text{LHS} = 2 \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right) \\times \\left(\\dfrac{1}{\\sqrt{2}}\\right) = 2 \\times \\dfrac{1}{2} = 1 = \\text{RHS}$.',
    quiz: null
  },
  7: {
    title: 'Verification Complete',
    summary: '$\\text{LHS} = \\text{RHS} = 1$. The identity $2 \\sin A \\cos A = 1$ is verified.',
    quiz: null
  }
}

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean CAD Geometry) ─────────── */
const Ax = 75, Ay = 195
const Bx = 235, By = 195
const Cx = 235, Cy = 35

const HYP_ANGLE = -45
const HypLabelX = 146
const HypLabelY = 108

const COLOR_ADJ = '#0284c7' // Blue (AB = k)
const COLOR_OPP = '#059669' // Green (BC = k)
const COLOR_HYP = '#ea580c' // Orange (AC = √2 k)

/* ─────────── STEP-SPECIFIC TRIANGLE DIAGRAM (PURE SVG, NO STATIC BLOCKS) ─────────── */
function AnimatedStepTriangle4({
  stepId,
  subStep = 3,
  isCurrent = true
}) {
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  const isBasic = stepId === 1
  const isGiven = stepId === 2
  const isAssignK = stepId === 3
  const isPyth = stepId === 4
  const isRatios = stepId === 5
  const isVerify = stepId === 6
  const isSummary = stepId === 7

  const hasK = stepId >= 3
  const hypSolved = stepId >= 4 && (stepId > 4 || subStep >= 5)

  let hlOpp = false
  let hlAdj = false
  let hlHyp = false

  if (stepId === 1) {
    if (isCurrent) {
      if (subStep === 3) hlOpp = true
      else if (subStep === 4) hlAdj = true
      else if (subStep >= 5) hlHyp = true
    }
  } else if (stepId === 2) {
    hlOpp = true
    hlAdj = true
  } else if (stepId === 3) {
    hlOpp = true
    hlAdj = true
  } else if (stepId === 4) {
    if (isCurrent && subStep <= 3) {
      hlAdj = true
      hlOpp = true
    } else {
      hlHyp = true
    }
  } else if (stepId === 5) {
    if (isCurrent && subStep <= 4) {
      hlOpp = true
      hlHyp = true
    } else {
      hlAdj = true
      hlHyp = true
    }
  } else if (stepId >= 6) {
    hlOpp = true
    hlAdj = true
    hlHyp = true
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      margin: '0.4rem 0 1.2rem'
    }}>
      <svg
        viewBox="0 0 380 230"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '260px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`triGrad4-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={isSummary ? '#f0fdf4' : `url(#triGrad4-${stepId})`}
          className={isCurrent ? 'e4-fade' : ''}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Glow Effects on Highlighted Sides */}
        {hlAdj && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={COLOR_ADJ} strokeWidth="12" strokeLinecap="round" className="e4-glow" />
        )}
        {hlOpp && isCurrent && (
          <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={COLOR_OPP} strokeWidth="12" strokeLinecap="round" className="e4-glow" />
        )}
        {hlHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke={COLOR_HYP} strokeWidth="12" strokeLinecap="round" className="e4-glow" />
        )}

        {/* Base AB (Adjacent side to A) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={hlAdj ? COLOR_ADJ : (isBasic ? '#334155' : '#94a3b8')}
          strokeWidth={hlAdj ? 4.5 : 2.8}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Perpendicular BC (Opposite side to A) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={hlOpp ? COLOR_OPP : (isBasic ? '#334155' : '#94a3b8')}
          strokeWidth={hlOpp ? 4.5 : 2.8}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={hypSolved ? (hlHyp ? COLOR_HYP : '#94a3b8') : (hlHyp ? COLOR_HYP : '#94a3b8')}
          strokeWidth={hlHyp ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={hypSolved ? 'none' : (stepId < 4 ? '6 4' : 'none')}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Right Angle Symbol at B (90°) */}
        <rect
          x={Bx - 18} y={By - 18}
          width="18" height="18"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="2"
        />

        {/* Vertex Circles (Solid CAD-style, zero jerking) */}
        <circle cx={Ax} cy={Ay} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Bx} cy={By} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Cx} cy={Cy} r="5.5" fill={isSummary ? '#16a34a' : '#0284c7'} stroke="#ffffff" strokeWidth="1.5" />

        {/* Vertex Labels */}
        <text x={Ax - 24} y={Ay + 6} fill="#0f172a" fontSize="17.5" fontWeight="700" fontFamily="Inter">A</text>
        <text x={Bx + 12} y={By + 6} fill="#0f172a" fontSize="15" fontWeight="700" fontFamily="Inter">B (90°)</text>
        <text x={Cx + 12} y={Cy + 6} fill={isSummary ? '#16a34a' : '#0f172a'} fontSize="17.5" fontWeight="700" fontFamily="Inter">C</text>

        {/* Angle A Arc at Vertex A */}
        <path
          d="M 110 195 A 35 35 0 0 0 100 170"
          fill="none"
          stroke="#d97706"
          strokeWidth="2.8"
        />
        <text
          x={Ax + 38}
          y={Ay - 10}
          fill="#d97706"
          fontSize="15"
          fontWeight="700"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          ∠A
        </text>

        {/* Base AB Label */}
        <text
          x={(Ax + Bx) / 2}
          y={Ay + 26}
          fill={hlAdj ? COLOR_ADJ : '#475569'}
          fontSize="14.5"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          {isBasic
            ? (subStep >= 4 ? 'AB (adjacent side)' : 'Side AB')
            : (hasK ? 'AB = k (adj)' : 'AB (adjacent side)')}
        </text>

        {/* Perpendicular BC Label */}
        <text
          x={Bx + 16}
          y={(By + Cy) / 2}
          fill={hlOpp ? COLOR_OPP : '#475569'}
          fontSize="14.5"
          fontWeight="600"
          dominantBaseline="middle"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          {isBasic
            ? (subStep >= 3 ? 'BC (opposite side)' : 'Side BC')
            : (hasK ? 'BC = k (opp)' : 'BC (opposite side)')}
        </text>

        {/* Hypotenuse AC Label */}
        <text
          x={HypLabelX}
          y={HypLabelY}
          fill={hlHyp ? COLOR_HYP : '#475569'}
          fontSize="14.5"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="Inter"
          transform={`rotate(${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          {isBasic
            ? (subStep >= 5 ? 'AC (hypotenuse)' : 'Side AC')
            : (hypSolved ? 'AC = √2 k (hyp)' : 'AC = ? (hyp)')}
        </text>

        {/* Celebratory Green Pulsing Rings in final step */}
        {isSummary && (
          <>
            <circle
              cx={Cx}
              cy={Cy}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e4PulseRing 1.5s ease-out infinite' }}
            />
            <circle
              cx={Ax}
              cy={Ay}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e4PulseRing 1.5s ease-out infinite 0.25s' }}
            />
          </>
        )}
      </svg>
    </div>
  )
}

/* ─────────── TYPEWRITER ANIMATED MATH LINE ─────────── */
function TypewriterMathLine({ text, isLatest = false, isCurrent = true }) {
  const [isTyping, setIsTyping] = useState(isLatest && isCurrent)

  useEffect(() => {
    if (isLatest && isCurrent) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 850)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [text, isLatest, isCurrent])

  return (
    <div
      className="e4-math-line"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        overflow: 'visible',
        padding: '0.15rem 0',
        fontFamily: '"Inter", sans-serif',
        color: '#0f172a'
      }}
    >
      <div
        className={isTyping ? 'e4-typewriter' : ''}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          overflow: 'visible',
          fontFamily: '"Inter", sans-serif',
          color: '#0f172a'
        }}
      >
        <span
          className="math-rendered-text"
          style={{ whiteSpace: 'nowrap', display: 'inline-block', fontFamily: '"Inter", sans-serif', color: '#0f172a' }}
        >
          <MathText text={`$${text}$`} />
        </span>
      </div>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example4Tutor({
  onNextExample,
  onPrevExample,
  hasPrev = true,
  hasNext = true,
  initialAtEnd = false
}) {
  const total = STEPS.length
  const [step, setStep] = useState(initialAtEnd ? total : 0)
  const lastStepTotalLines = STEPS[total - 1].mathLines.length
  const [subStep, setSubStep] = useState(initialAtEnd ? (2 + lastStepTotalLines) : 0)
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)
  const rightScrollRef = useRef(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const hasFiredConfetti = useRef(false)

  const currentStepObj = step > 0 ? (STEPS[step - 1] || STEPS[0]) : null
  const currentTotalSubSteps = currentStepObj ? (2 + currentStepObj.mathLines.length) : 0

  useEffect(() => {
    if (initialAtEnd) {
      setTimeout(() => {
        const container = scrollContainerRef.current
        if (container) {
          const stepEl = container.querySelector(`[data-step="${total}"]`)
          if (stepEl) {
            stepEl.scrollIntoView({ behavior: 'auto', block: 'start' })
          }
        }
      }, 80)
    }
  }, [initialAtEnd, total])

  useEffect(() => {
    if (step === 0 || !scrollContainerRef.current) return
    const container = scrollContainerRef.current

    const timer = setTimeout(() => {
      const stepEl = container.querySelector(`[data-step="${step}"]`)
      if (stepEl) {
        if (subStep <= 2) {
          stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          const latestLine = stepEl.querySelector('[data-latest-line="true"]')
          if (latestLine) {
            latestLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        }
      }
    }, 70)

    return () => clearTimeout(timer)
  }, [step, subStep])

  useEffect(() => {
    if (step === 0 || !rightScrollRef.current) return
    const container = rightScrollRef.current

    const timer = setTimeout(() => {
      const activeRightStep = container.querySelector(`[data-right-step="${step}"]`)
      if (activeRightStep) {
        activeRightStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 80)

    return () => clearTimeout(timer)
  }, [step])

  const goNextStep = () => {
    if (step === 0) {
      setStep(1)
      setSubStep(1)
      return
    }

    if (subStep < currentTotalSubSteps) {
      setSubStep(s => s + 1)
    } else if (step < total) {
      setStep(s => s + 1)
      setSubStep(1)
    } else if (step === total && subStep >= currentTotalSubSteps) {
      if (!hasFiredConfetti.current) {
        hasFiredConfetti.current = true
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
      if (hasNext && onNextExample) {
        onNextExample()
      }
    }
  }

  const goPrevStep = () => {
    if (step === 0) return

    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevStepObj = STEPS[step - 2]
      const prevTotalSubSteps = 2 + prevStepObj.mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalSubSteps)
    } else {
      setStep(0)
      setSubStep(0)
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.closest('input, textarea, select')) return
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

  const handleContainerClick = (e) => {
    if (e.target.closest('button, a, input, select, [data-noclick]')) return

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
    }, 280)
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
          position: 'relative',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {/* Scrollable Progressive Steps Workspace */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2.5rem 1.8rem 6rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            scrollBehavior: 'smooth'
          }}
        >
          {step === 0 ? null : (
            <div style={{ width: '100%', maxWidth: '780px' }}>
              {STEPS.slice(0, step).map((s, idx) => {
                const isCurrent = idx === step - 1
                const showDiagram = !isCurrent || subStep >= 2
                const visibleLines = isCurrent
                  ? s.mathLines.slice(0, Math.max(0, subStep - 2))
                  : s.mathLines

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
                      marginBottom: '2.8rem',
                      paddingBottom: '0.8rem',
                      borderBottom: 'none',
                      opacity: 1,
                      transition: 'opacity 0.3s ease',
                      scrollMarginTop: '1.2rem',
                      scrollMarginBottom: '2.5rem'
                    }}
                  >
                    {/* Step Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.9rem'
                    }}>
                      <span style={{
                        fontSize: '1.58rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        letterSpacing: '-0.02em',
                        fontFamily: '"Inter", sans-serif'
                      }}>
                        {s.title}
                      </span>
                    </div>

                    {/* Step Diagram (Draws on subStep 2+, large clean CAD geometry) */}
                    {showDiagram && (
                      <div className={isCurrent && subStep === 2 ? 'e4-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedStepTriangle4
                          stepId={s.id}
                          subStep={isCurrent ? subStep : (2 + s.mathLines.length)}
                          isCurrent={isCurrent}
                        />
                      </div>
                    )}

                    {/* Mathematical Solution Lines (Unfolds line by line with Typewriter effect!) */}
                    {visibleLines.length > 0 && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.25rem',
                        marginTop: '1.05rem',
                        width: '100%',
                        maxWidth: '100%'
                      }}>
                        {visibleLines.map((line, lIdx) => {
                          const isLatest = isCurrent && lIdx === visibleLines.length - 1

                          return (
                            <div
                              key={lIdx}
                              data-latest-line={isLatest ? "true" : undefined}
                              className="e4-math-line"
                              style={{
                                fontSize: '1.42rem',
                                color: '#0f172a',
                                fontWeight: 500,
                                lineHeight: 1.85,
                                textAlign: 'center',
                                scrollMarginBottom: '2.5rem'
                              }}
                            >
                              <TypewriterMathLine
                                text={line}
                                isLatest={isLatest}
                                isCurrent={isCurrent}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PART 2 (RIGHT PANE): PROGRESSIVE STEP-BY-STEP EXPLANATION (CONCISE & PROPER)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={rightScrollRef}
        className="right-pane"
        style={{
          flex: 0.95,
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
            Example 4 :
          </span>
          <MathText text={'In a right triangle $ABC$, right-angled at $B$, if $\\tan A = 1$, then verify that $2 \\sin A \\cos A = 1$.'} />
        </div>

        {/* Subtle Horizontal Divider */}
        <div style={{ borderBottom: '1px solid #f1f5f9', margin: '0.1rem 0' }} />

        {/* PROGRESSIVE TIMELINE OF ALL STEPS */}
        {step === 0 ? null : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {STEPS.slice(0, step).map((s, idx) => {
              const stepNum = s.id
              const isCurrent = stepNum === step
              const isCompleted = stepNum < step
              const details = STEP_DETAILS_EX4[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e4-fade' : ''}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    opacity: 1,
                    transition: 'opacity 0.25s ease',
                    scrollMarginTop: '1.5rem',
                    scrollMarginBottom: '3rem'
                  }}
                >
                  {/* Step Marker */}
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
                        background: '#e2e8f0',
                        marginTop: '4px'
                      }} />
                    )}
                  </div>

                  {/* Step Content */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    paddingTop: '2px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        fontSize: '1.04rem',
                        fontWeight: 800,
                        color: isCurrent ? '#0f172a' : '#334155',
                        letterSpacing: '-0.01em'
                      }}>
                        Step {stepNum} : {details.title}
                      </div>
                      {isCurrent && (
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          background: '#f0f9ff',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}>
                          Active
                        </span>
                      )}
                    </div>

                    {/* Step-by-Step Live Dynamic Guidance */}
                    <div style={{
                      fontSize: '1.02rem',
                      color: '#334155',
                      lineHeight: 1.65
                    }}>
                      <MathText text={
                        (stepNum === 1 && isCurrent)
                          ? (subStep === 1
                              ? 'Understand requirement: Construct right $\\triangle ABC$ with right angle at $B$.'
                              : (subStep === 2
                                  ? 'Draw right $\\triangle ABC$ with acute angle $\\angle A$.'
                                  : (subStep === 3
                                      ? 'Identify Opposite side $BC$: Side directly opposite to $\\angle A$.'
                                      : (subStep === 4
                                          ? 'Identify Adjacent side $AB$: Side adjacent to $\\angle A$.'
                                          : 'Identify Hypotenuse $AC$: Longest side opposite to $90^\\circ$.'
                                        )
                                    )
                                )
                            )
                          : (stepNum === 2 && isCurrent)
                            ? (subStep === 1
                                ? 'State definition of tangent ratio: $\\tan A = \\dfrac{\\text{Opposite}}{\\text{Adjacent}}$.'
                                : (subStep === 2
                                    ? 'Substitute side names: $\\tan A = \\dfrac{BC}{AB}$.'
                                    : (subStep === 3
                                        ? 'Given condition: $\\tan A = 1$.'
                                        : (subStep === 4
                                            ? 'Equate ratio to 1: $\\dfrac{BC}{AB} = 1$.'
                                            : 'Deduce that both legs are equal: $BC = AB$!'
                                          )
                                      )
                                  )
                              )
                          : (stepNum === 3 && isCurrent)
                            ? (subStep === 1
                                ? 'Since $BC = AB$, equate them to common constant $k$.'
                                : (subStep <= 4
                                    ? 'Assign lengths: $AB = k$ and $BC = k$ (where $k > 0$).'
                                    : 'Insight: $\\triangle ABC$ is an isosceles right triangle with $\\angle A = 45^\\circ$.'
                                  )
                              )
                          : (stepNum === 4 && isCurrent)
                            ? (subStep <= 2
                                ? 'Apply Pythagoras Theorem: $AC^2 = AB^2 + BC^2$.'
                                : (subStep === 3
                                    ? 'Substitute $AB = k$ and $BC = k$: $AC^2 = k^2 + k^2$.'
                                    : (subStep <= 5
                                        ? 'Simplify: $AC^2 = 2k^2 \\implies AC = \\sqrt{2k^2}$.'
                                        : 'Hypotenuse length is solved: $AC = \\sqrt{2}k$.'
                                      )
                                  )
                              )
                          : (stepNum === 5 && isCurrent)
                            ? (subStep <= 4
                                ? 'Calculate sine ratio: $\\sin A = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}} = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}$.'
                                : 'Calculate cosine ratio: $\\cos A = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\dfrac{k}{\\sqrt{2}k} = \\dfrac{1}{\\sqrt{2}}$.'
                              )
                          : (stepNum === 6 && isCurrent)
                            ? (subStep <= 2
                                ? 'Substitute into LHS: $\\text{LHS} = 2 \\sin A \\cos A = 2 \\left(\\dfrac{1}{\\sqrt{2}}\\right) \\left(\\dfrac{1}{\\sqrt{2}}\\right)$.'
                                : (subStep <= 4
                                    ? 'Multiply terms: $\\sqrt{2} \\times \\sqrt{2} = 2$, so $2 \\times \\dfrac{1}{2} = 1$.'
                                    : 'Conclusion: $\\text{LHS} = 1 = \\text{RHS}$. Verified!'
                                  )
                              )
                          : (isCurrent && quiz && !userChoice && details.promptSummary)
                            ? details.promptSummary
                            : details.summary
                      } />
                    </div>

                    {/* Interactive Quick Check Quiz (Non-blocking, no outer card box) */}
                    {quiz && isCurrent && (
                      <div
                        data-noclick="true"
                        style={{
                          marginTop: '0.45rem',
                          padding: '0',
                          background: 'transparent',
                          border: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.65rem'
                        }}
                      >
                        <div style={{
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: '#0284c7',
                            background: '#e0f2fe',
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>
                            Quick Check
                          </span>
                          <MathText text={quiz.question} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {quiz.options.map(opt => {
                            const isSelected = userChoice === opt.id
                            let bg = '#ffffff'
                            let border = '#cbd5e1'
                            let textCol = '#334155'
                            let badgeBg = '#f1f5f9'
                            let badgeCol = '#475569'

                            if (isSelected) {
                              if (opt.correct) {
                                bg = '#f0fdf4'
                                border = '#22c55e'
                                textCol = '#15803d'
                                badgeBg = '#dcfce7'
                                badgeCol = '#16a34a'
                              } else {
                                bg = '#fef2f2'
                                border = '#ef4444'
                                textCol = '#b91c1c'
                                badgeBg = '#fee2e2'
                                badgeCol = '#dc2626'
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedOptions(prev => ({ ...prev, [stepNum]: opt.id }))
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '0.6rem 0.9rem',
                                  borderRadius: '8px',
                                  border: `1.5px solid ${border}`,
                                  background: bg,
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'all 0.15s ease',
                                  fontFamily: '"Inter", sans-serif',
                                  outline: 'none'
                                }}
                              >
                                <span style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  background: badgeBg,
                                  color: badgeCol,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  flexShrink: 0
                                }}>
                                  {opt.id.toUpperCase()}
                                </span>
                                <span style={{
                                  fontSize: '0.92rem',
                                  fontWeight: isSelected ? 700 : 500,
                                  color: textCol,
                                  flex: 1
                                }}>
                                  <MathText text={opt.text} />
                                </span>
                                {isSelected && (
                                  opt.correct
                                    ? <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                                    : <XCircle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
                                )}
                              </button>
                            )
                          })}
                        </div>

                        {selectedOpt && (
                          <div
                            className="e4-fade"
                            style={{
                              padding: '0.5rem 0.8rem',
                              borderRadius: '6px',
                              background: selectedOpt.correct ? '#f0fdf4' : '#fef2f2',
                              border: `1px solid ${selectedOpt.correct ? '#bbf7d0' : '#fecaca'}`,
                              fontSize: '0.85rem',
                              color: selectedOpt.correct ? '#166534' : '#991b1b',
                              lineHeight: 1.5
                            }}
                          >
                            <MathText text={selectedOpt.feedback} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
