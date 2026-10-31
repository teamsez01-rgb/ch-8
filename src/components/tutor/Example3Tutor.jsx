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
  @keyframes e3DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e3FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
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
  
  @keyframes e3Typewriter {
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
  .e3-fade { animation: e3FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e3-draw { stroke-dasharray: 400; animation: e3DrawLine 0.75s ease-out both; }
  .e3-glow { animation: e3Glow 1.8s ease-in-out infinite; }
  .e3-pop  { animation: e3Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e3-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e3Typewriter 0.85s steps(42, end) both;
  }
  .e3-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e3-math-line,
  .e3-math-line *,
  .e3-math-line .katex,
  .e3-math-line .katex .text,
  .e3-math-line .katex-html,
  .e3-math-line .katex-base,
  .e3-math-line .math-formula-span,
  .e3-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e3-math-line .katex-html {
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
  .e3-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 3 (PURE VERTICAL STEPS) ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Construct Triangle',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Construct Right-Angled Triangle ACB',
    mathLines: [
      '\\text{Consider right-angled } \\triangle ACB \\text{ with } \\angle C = 90^\\circ',
      '\\text{Given acute angle : } \\angle ABC = \\theta',
      '\\mathbf{\\textcolor{#059669}{\\text{Opposite side to } \\theta = AC}}',
      '\\mathbf{\\textcolor{#0284c7}{\\text{Adjacent side to } \\theta = BC}}',
      '\\mathbf{\\textcolor{#ea580c}{\\text{Hypotenuse} = AB}}'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Given Values',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
    title: 'Identify Given Sides',
    mathLines: [
      '\\text{Given in question :}',
      '\\text{Hypotenuse } \\mathbf{\\textcolor{#ea580c}{AB = 29\\text{ units}}}',
      '\\text{Adjacent side } \\mathbf{\\textcolor{#0284c7}{BC = 21\\text{ units}}}',
      '\\text{We must find Opposite side } \\mathbf{\\textcolor{#059669}{AC}}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Pythagoras Theorem',
    badgeColor: '#5b21b6',
    badgeBg: '#ede9fe',
    title: 'Find Opposite Side AC using Pythagoras Theorem',
    mathLines: [
      '\\text{In right } \\triangle ACB\\text{, by Pythagoras Theorem :}',
      'AB^2 = AC^2 + BC^2',
      'AC^2 = AB^2 - BC^2',
      'AC^2 = (29)^2 - (21)^2',
      '\\text{Using identity } a^2 - b^2 = (a - b)(a + b) :',
      'AC^2 = (29 - 21)(29 + 21)',
      'AC^2 = 8 \\times 50',
      'AC^2 = 400',
      'AC = \\sqrt{400}',
      '\\mathbf{\\textcolor{#059669}{AC = 20\\text{ units}}}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Calculate Ratios',
    badgeColor: '#d97706',
    badgeBg: '#fef3c7',
    title: 'Calculate sin θ and cos θ',
    mathLines: [
      '\\sin\\theta = \\dfrac{\\text{Side opposite to } \\theta}{\\text{Hypotenuse}}',
      '\\sin\\theta = \\dfrac{AC}{AB}',
      '\\mathbf{\\textcolor{#059669}{\\sin\\theta = \\dfrac{20}{29}}}',
      '\\cos\\theta = \\dfrac{\\text{Side adjacent to } \\theta}{\\text{Hypotenuse}}',
      '\\cos\\theta = \\dfrac{BC}{AB}',
      '\\mathbf{\\textcolor{#0284c7}{\\cos\\theta = \\dfrac{21}{29}}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Part (i)',
    badgeColor: '#047857',
    badgeBg: '#d1fae5',
    title: 'Determine Value of cos²θ + sin²θ',
    mathLines: [
      '\\text{Part (i) : Evaluate } \\cos^2\\theta + \\sin^2\\theta',
      '\\cos^2\\theta + \\sin^2\\theta = \\left(\\dfrac{21}{29}\\right)^2 + \\left(\\dfrac{20}{29}\\right)^2',
      '= \\dfrac{21^2 + 20^2}{29^2}',
      '= \\dfrac{441 + 400}{841}',
      '= \\dfrac{841}{841}',
      '= 1',
      '\\mathbf{\\textcolor{#16a34a}{\\cos^2\\theta + \\sin^2\\theta = 1}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Part (ii)',
    badgeColor: '#be123c',
    badgeBg: '#ffe4e6',
    title: 'Determine Value of cos²θ - sin²θ',
    mathLines: [
      '\\text{Part (ii) : Evaluate } \\cos^2\\theta - \\sin^2\\theta',
      '\\cos^2\\theta - \\sin^2\\theta = \\left(\\dfrac{21}{29}\\right)^2 - \\left(\\dfrac{20}{29}\\right)^2',
      '= \\dfrac{21^2 - 20^2}{29^2}',
      '= \\dfrac{(21 + 20)(21 - 20)}{841}',
      '= \\dfrac{41 \\times 1}{841}',
      '\\mathbf{\\textcolor{#0284c7}{\\cos^2\\theta - \\sin^2\\theta = \\dfrac{41}{841}}}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Summary',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Summary of Final Answers',
    mathLines: [
      '\\text{In right } \\triangle ACB :',
      '\\mathbf{\\textcolor{#059669}{AC = 20\\text{ units}}} \\text{ (Opposite)}',
      '\\mathbf{\\textcolor{#0284c7}{BC = 21\\text{ units}}} \\text{ (Adjacent)}',
      '\\mathbf{\\textcolor{#ea580c}{AB = 29\\text{ units}}} \\text{ (Hypotenuse)}',
      '\\mathbf{\\text{(i) } \\textcolor{#16a34a}{\\cos^2\\theta + \\sin^2\\theta = 1}}',
      '\\mathbf{\\text{(ii) } \\textcolor{#0284c7}{\\cos^2\\theta - \\sin^2\\theta = \\dfrac{41}{841}}}',
      '\\mathbf{\\textcolor{#16a34a}{\\text{Both parts solved and verified! } \\checkmark}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS FOR RIGHT PANE ─────────── */
const STEP_DETAILS_EX3 = {
  1: {
    title: 'Construct Triangle ACB',
    summary: 'Right $\\triangle ACB$ at $C$, acute angle $\\angle ABC = \\theta$.',
    quiz: null
  },
  2: {
    title: 'Given Sides AB & BC',
    summary: 'Hypotenuse $AB = 29\\text{ units}$, adjacent base $BC = 21\\text{ units}$.',
    quiz: null
  },
  3: {
    title: 'Find Opposite Side AC',
    summary: 'Pythagoras: $AC = \\sqrt{29^2 - 21^2} = \\sqrt{400} = 20\\text{ units}$.',
    quiz: null
  },
  4: {
    title: 'Calculate sin θ & cos θ',
    summary: '$\\sin\\theta = \\dfrac{20}{29}$ and $\\cos\\theta = \\dfrac{21}{29}$.',
    quiz: null
  },
  5: {
    title: 'Part (i) : cos²θ + sin²θ',
    summary: '$\\cos^2\\theta + \\sin^2\\theta = \\dfrac{21^2 + 20^2}{29^2} = \\dfrac{841}{841} = 1$.',
    promptSummary: 'Evaluate: $\\cos^2\\theta + \\sin^2\\theta = \\left(\\dfrac{21}{29}\\right)^2 + \\left(\\dfrac{20}{29}\\right)^2$.',
    quiz: {
      question: 'What is the value of $\\cos^2\\theta + \\sin^2\\theta$ for any angle $\\theta$?',
      options: [
        {
          id: 'a',
          text: 'Always equal to 1 (Fundamental Identity)',
          correct: true,
          feedback: 'Correct! By Pythagoras theorem: $(BC/AB)^2 + (AC/AB)^2 = (BC^2 + AC^2)/AB^2 = 1$.'
        },
        {
          id: 'b',
          text: 'It depends on the side lengths of the triangle',
          correct: false,
          feedback: 'The identity $\\cos^2\\theta + \\sin^2\\theta = 1$ is universally true for all right triangles.'
        }
      ]
    }
  },
  6: {
    title: 'Part (ii) : cos²θ - sin²θ',
    summary: '$\\cos^2\\theta - \\sin^2\\theta = \\dfrac{21^2 - 20^2}{29^2} = \\dfrac{41}{841}$.',
    quiz: null
  },
  7: {
    title: 'Final Summary',
    summary: 'Both parts evaluated: $\\text{(i)} = 1$ and $\\text{(ii)} = \\dfrac{41}{841}$.',
    quiz: null
  }
}

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean CAD Geometry) ─────────── */
const Cx = 75, Cy = 210
const Ax = 75, Ay = 50
const Bx = 295, By = 210

const HYP_ANGLE = 36
const HypLabelX = 185
const HypLabelY = 120

const COLOR_ADJ = '#0284c7' // Blue (BC = 21)
const COLOR_OPP = '#059669' // Green (AC = 20)
const COLOR_HYP = '#ea580c' // Orange (AB = 29)

/* ─────────── STEP-SPECIFIC TRIANGLE DIAGRAM (PURE SVG, NO STATIC BLOCKS) ─────────── */
function AnimatedStepTriangle3({
  stepId,
  subStep = 3,
  isCurrent = true
}) {
  // On Step 1 sub-step 1: Only title is shown, no triangle drawn yet (matches Example 1 & 2)
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  const isBasic = stepId === 1
  const isGiven = stepId === 2
  const isPyth = stepId === 3
  const isRatios = stepId === 4
  const isPart1 = stepId === 5
  const isPart2 = stepId === 6
  const isSummary = stepId === 7

  const oppSolved = stepId >= 3 && (stepId > 3 || subStep >= 8)

  // Step-synchronized live side highlighting
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
    hlHyp = true
    hlAdj = true
  } else if (stepId === 3) {
    if (isCurrent && subStep <= 4) {
      hlHyp = true
      hlAdj = true
    } else {
      hlOpp = true
    }
  } else if (stepId === 4) {
    if (isCurrent && subStep <= 3) {
      hlOpp = true
      hlHyp = true
    } else {
      hlAdj = true
      hlHyp = true
    }
  } else if (stepId >= 5) {
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
        viewBox="0 0 380 250"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '260px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`triGrad3-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Cx},${Cy} ${Bx},${By} ${Ax},${Ay}`}
          fill={isSummary ? '#f0fdf4' : `url(#triGrad3-${stepId})`}
          className={isCurrent ? 'e3-fade' : ''}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Glow Effects on Highlighted Sides */}
        {hlAdj && isCurrent && (
          <line x1={Cx} y1={Cy} x2={Bx} y2={By} stroke={COLOR_ADJ} strokeWidth="12" strokeLinecap="round" className="e3-glow" />
        )}
        {hlOpp && isCurrent && (
          <line x1={Cx} y1={Cy} x2={Ax} y2={Ay} stroke={COLOR_OPP} strokeWidth="12" strokeLinecap="round" className="e3-glow" />
        )}
        {hlHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={COLOR_HYP} strokeWidth="12" strokeLinecap="round" className="e3-glow" />
        )}

        {/* Base BC (Adjacent side to θ) */}
        <line
          x1={Cx} y1={Cy} x2={Bx} y2={By}
          stroke={hlAdj ? COLOR_ADJ : (isBasic ? '#334155' : '#94a3b8')}
          strokeWidth={hlAdj ? 4.5 : 2.8}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Perpendicular AC (Opposite side to θ) */}
        <line
          x1={Cx} y1={Cy} x2={Ax} y2={Ay}
          stroke={oppSolved ? (hlOpp ? COLOR_OPP : '#94a3b8') : (hlOpp ? COLOR_OPP : '#94a3b8')}
          strokeWidth={hlOpp ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={oppSolved ? 'none' : '6 4'}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Hypotenuse AB */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={hlHyp ? COLOR_HYP : (isBasic ? '#334155' : '#94a3b8')}
          strokeWidth={hlHyp ? 4.5 : 2.8}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Right Angle Symbol at C (90°) */}
        <rect
          x={Cx} y={Cy - 18}
          width="18" height="18"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="2"
        />

        {/* Vertex Circles (Solid CAD-style, zero jerking) */}
        <circle cx={Cx} cy={Cy} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Bx} cy={By} r="5.5" fill={isSummary ? '#16a34a' : '#0284c7'} stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Ax} cy={Ay} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />

        {/* Vertex Labels */}
        <text x={Cx - 22} y={Cy + 22} fill="#0f172a" fontSize="15" fontWeight="700" fontFamily="Inter">C (90°)</text>
        <text x={Bx + 14} y={By + 6} fill={isSummary ? '#16a34a' : '#0f172a'} fontSize="17.5" fontWeight="700" fontFamily="Inter">B (θ)</text>
        <text x={Ax - 22} y={Ay + 6} fill="#0f172a" fontSize="17.5" fontWeight="700" fontFamily="Inter">A</text>

        {/* Angle θ Arc at Vertex B */}
        <path
          d="M 258 210 A 37 37 0 0 1 265 187"
          fill="none"
          stroke="#d97706"
          strokeWidth="2.8"
        />
        <text
          x={Bx - 44}
          y={By - 12}
          fill="#d97706"
          fontSize="15"
          fontWeight="700"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          θ
        </text>

        {/* Base BC Label */}
        <text
          x={(Cx + Bx) / 2 + 10}
          y={Cy + 26}
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
            ? (subStep >= 4 ? 'BC (adjacent side)' : 'Side BC')
            : 'BC = 21 (adj)'}
        </text>

        {/* Perpendicular AC Label */}
        <text
          x={Cx - 20}
          y={(Ay + Cy) / 2}
          fill={hlOpp ? COLOR_OPP : '#475569'}
          fontSize="14.5"
          fontWeight="600"
          textAnchor="end"
          dominantBaseline="middle"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          {isBasic
            ? (subStep >= 3 ? 'AC (opposite side)' : 'Side AC')
            : (oppSolved ? 'AC = 20 (opp)' : 'AC = ? (opp)')}
        </text>

        {/* Hypotenuse AB Label */}
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
            ? (subStep >= 5 ? 'AB (hypotenuse)' : 'Side AB')
            : 'AB = 29 (hyp)'}
        </text>

        {/* Celebratory Green Pulsing Rings in final step */}
        {isSummary && (
          <>
            <circle
              cx={Bx}
              cy={By}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e3PulseRing 1.5s ease-out infinite' }}
            />
            <circle
              cx={Ax}
              cy={Ay}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e3PulseRing 1.5s ease-out infinite 0.25s' }}
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
      className="e3-math-line"
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
        className={isTyping ? 'e3-typewriter' : ''}
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
export default function Example3Tutor({
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

  // Scroll to last step on mount if starting at end
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

  // Smoothly scroll the newly revealed step or line into view
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

  // Auto-scroll right pane smoothly to active step
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

  // Single click = Next sub-step, Double click = Previous sub-step
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
      // Completed last step! Trigger celebration confetti
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

  // Keyboard navigation: Left / Right arrow keys
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
                    className={isCurrent ? 'e3-fade' : ''}
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
                      <div className={isCurrent && subStep === 2 ? 'e3-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedStepTriangle3
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
                              className="e3-math-line"
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
            Example 3 :
          </span>
          <MathText text={'Consider $\\triangle ACB$, right-angled at $C$, in which $AB = 29\\text{ units}$, $BC = 21\\text{ units}$ and $\\angle ABC = \\theta$. Determine the values of (i) $\\cos^2\\theta + \\sin^2\\theta$, (ii) $\\cos^2\\theta - \\sin^2\\theta$.'} />
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
              const details = STEP_DETAILS_EX3[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e3-fade' : ''}
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
                              ? 'Understand requirement: Construct right $\\triangle ACB$ with right angle at $C$.'
                              : (subStep === 2
                                  ? 'Draw right $\\triangle ACB$ with acute angle $\\angle ABC = \\theta$.'
                                  : (subStep === 3
                                      ? 'Identify Side $AC$: Side directly opposite to acute angle $\\theta$.'
                                      : (subStep === 4
                                          ? 'Identify Side $BC$: Side adjacent/base to acute angle $\\theta$.'
                                          : 'Identify Hypotenuse $AB$: Longest side opposite to $90^\\circ$.'
                                        )
                                    )
                                )
                            )
                          : (stepNum === 2 && isCurrent)
                            ? (subStep === 1
                                ? 'Identify given dimensions from the problem statement.'
                                : (subStep === 2
                                    ? 'Given: Hypotenuse $AB = 29\\text{ units}$.'
                                    : (subStep === 3
                                        ? 'Given: Adjacent side $BC = 21\\text{ units}$.'
                                        : 'Goal: Determine unknown opposite side $AC$ using Pythagoras theorem.'
                                      )
                                  )
                              )
                          : (stepNum === 3 && isCurrent)
                            ? (subStep <= 2
                                ? 'Apply Pythagoras Theorem: $AB^2 = AC^2 + BC^2$.'
                                : (subStep === 3
                                    ? 'Rearrange for unknown side: $AC^2 = AB^2 - BC^2$.'
                                    : (subStep === 4
                                        ? 'Substitute values: $AC^2 = 29^2 - 21^2$.'
                                        : (subStep <= 6
                                            ? 'Apply identity: $a^2 - b^2 = (a-b)(a+b)$.'
                                            : (subStep <= 8
                                                ? 'Calculate product: $8 \\times 50 = 400$.'
                                                : 'Take square root: $AC = \\sqrt{400} = 20\\text{ units}$.'
                                              )
                                          )
                                      )
                                  )
                              )
                          : (stepNum === 4 && isCurrent)
                            ? (subStep <= 3
                                ? 'Calculate sine ratio: $\\sin\\theta = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}} = \\dfrac{20}{29}$.'
                                : 'Calculate cosine ratio: $\\cos\\theta = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\dfrac{21}{29}$.'
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
                            className="e3-fade"
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
