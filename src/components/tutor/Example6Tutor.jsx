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
  @keyframes e6DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e6FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e6Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e6PulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.35); }
    50%      { box-shadow: 0 0 0 7px rgba(2, 132, 199, 0); }
  }
  @keyframes e6Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e6Typewriter {
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
  .e6-fade { animation: e6FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e6-draw { stroke-dasharray: 400; animation: e6DrawLine 0.75s ease-out both; }
  .e6-glow { animation: e6Glow 1.8s ease-in-out infinite; }
  .e6-pop  { animation: e6Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e6-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e6Typewriter 0.85s steps(42, end) both;
  }
  .e6-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e6-math-line,
  .e6-math-line *,
  .e6-math-line .katex,
  .e6-math-line .katex .text,
  .e6-math-line .katex-html,
  .e6-math-line .katex-base,
  .e6-math-line .math-formula-span,
  .e6-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e6-math-line .katex-html {
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
  .e6-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 6 (PURE VERTICAL STEPS) ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Given Triangle',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Draw Right Triangle ABC (∠B = 90°, ∠ACB = 30°)',
    mathLines: [
      '\\text{Consider right-angled } \\triangle ABC \\text{ with } \\angle B = 90^\\circ',
      '\\text{Given acute reference angle : } \\angle ACB = 30^\\circ',
      '\\text{Given in question : } AB = 5\\text{ cm}',
      '\\mathbf{\\textcolor{#059669}{\\text{Side opposite to } 30^\\circ = AB = 5\\text{ cm}}}',
      '\\mathbf{\\textcolor{#0284c7}{\\text{Side adjacent to } 30^\\circ = BC}}',
      '\\mathbf{\\textcolor{#ea580c}{\\text{Hypotenuse} = AC}}'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Ratio for BC',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Choose Trigonometric Ratio for Base BC',
    mathLines: [
      '\\text{To find adjacent side } BC, \\text{ choose tangent ratio :}',
      '\\tan C = \\dfrac{\\text{Side opposite to } \\angle C}{\\text{Side adjacent to } \\angle C}',
      '\\tan C = \\dfrac{AB}{BC}',
      '\\text{Substitute } \\angle C = 30^\\circ \\text{ and } AB = 5\\text{ cm} :',
      '\\tan 30^\\circ = \\dfrac{5}{BC}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Solve for BC',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Substitute tan 30° and Solve for BC',
    mathLines: [
      '\\text{From trigonometric table : } \\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}',
      '\\dfrac{1}{\\sqrt{3}} = \\dfrac{5}{BC}',
      '\\text{Cross-multiplying both sides :}',
      'BC \\times 1 = 5 \\times \\sqrt{3}',
      '\\mathbf{\\textcolor{#0284c7}{BC = 5\\sqrt{3}\\text{ cm}}}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Ratio for AC',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
    title: 'Choose Trigonometric Ratio for Hypotenuse AC',
    mathLines: [
      '\\text{To find hypotenuse } AC, \\text{ choose sine ratio :}',
      '\\sin C = \\dfrac{\\text{Side opposite to } \\angle C}{\\text{Hypotenuse}}',
      '\\sin C = \\dfrac{AB}{AC}',
      '\\text{Substitute } \\angle C = 30^\\circ \\text{ and } AB = 5\\text{ cm} :',
      '\\sin 30^\\circ = \\dfrac{5}{AC}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Solve for AC',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Substitute sin 30° and Solve for AC',
    mathLines: [
      '\\text{From trigonometric table : } \\sin 30^\\circ = \\dfrac{1}{2}',
      '\\dfrac{1}{2} = \\dfrac{5}{AC}',
      '\\text{Cross-multiplying both sides :}',
      'AC = 5 \\times 2',
      '\\mathbf{\\textcolor{#ea580c}{AC = 10\\text{ cm}}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Verification',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Verify Results via Pythagoras Theorem',
    mathLines: [
      '\\text{Verify results using Pythagoras Theorem in right } \\triangle ABC :',
      'AC^2 = AB^2 + BC^2',
      'AC^2 = 5^2 + (5\\sqrt{3})^2',
      'AC^2 = 25 + (25 \\times 3)',
      'AC^2 = 25 + 75',
      'AC^2 = 100',
      'AC = \\sqrt{100}',
      '\\mathbf{\\textcolor{#16a34a}{AC = 10\\text{ cm}}} \\quad (\\text{Matches perfectly!})'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Summary',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Summary & 30°-60°-90° Triangle Property',
    mathLines: [
      '\\text{All side lengths determined :}',
      '\\mathbf{\\textcolor{#059669}{AB = 5\\text{ cm}}} \\text{ (Opposite side)}',
      '\\mathbf{\\textcolor{#0284c7}{BC = 5\\sqrt{3}\\text{ cm}}} \\text{ (Adjacent side)}',
      '\\mathbf{\\textcolor{#ea580c}{AC = 10\\text{ cm}}} \\text{ (Hypotenuse)}',
      '\\text{Special Property of } 30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ \\text{ Triangles :}',
      '\\text{Sides ratio is } 1 : \\sqrt{3} : 2 \\implies 5 : 5\\sqrt{3} : 10',
      '\\mathbf{\\textcolor{#16a34a}{\\text{Both lengths solved and verified! } \\checkmark}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS FOR RIGHT PANE ─────────── */
const STEP_DETAILS_EX6 = {
  1: {
    title: 'Identify Given Values in Right △ABC',
    summary: 'Right $\\triangle ABC$ at $B$ ($90^\\circ$) with acute angle $\\angle ACB = 30^\\circ$ and $AB = 5\\text{ cm}$.',
    quiz: null
  },
  2: {
    title: 'Choose Ratio for Base BC',
    summary: 'Tangent connects known opposite side $AB$ with adjacent side $BC$: $\\tan 30^\\circ = \\dfrac{5}{BC}$.',
    quiz: {
      question: 'Which trigonometric ratio connects the known opposite side ($AB$) and unknown adjacent side ($BC$)?',
      options: [
        {
          id: 'a',
          text: '$\\tan C = \\dfrac{\\text{Opposite}}{\\text{Adjacent}} = \\dfrac{AB}{BC}$',
          correct: true,
          feedback: 'Correct! Tangent relates the opposite and adjacent legs of the right triangle.'
        },
        {
          id: 'b',
          text: '$\\cos C = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\dfrac{BC}{AC}$',
          correct: false,
          feedback: 'Cosine involves hypotenuse $AC$, which is also unknown right now.'
        }
      ]
    }
  },
  3: {
    title: 'Solve for Base BC',
    summary: 'Substitute $\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$: $\\dfrac{1}{\\sqrt{3}} = \\dfrac{5}{BC} \\implies BC = 5\\sqrt{3}\\text{ cm}$.',
    quiz: {
      question: 'What is the standard trigonometric value of $\\tan 30^\\circ$?',
      options: [
        {
          id: 'a',
          text: '$\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$',
          correct: true,
          feedback: 'Spot on! From the standard trigonometric ratio table, $\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$.'
        },
        {
          id: 'b',
          text: '$\\tan 30^\\circ = \\sqrt{3}$',
          correct: false,
          feedback: '$\\sqrt{3}$ is the value of $\\tan 60^\\circ$, whereas $\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$.'
        }
      ]
    }
  },
  4: {
    title: 'Choose Ratio for Hypotenuse AC',
    summary: 'Sine connects known opposite side $AB$ with hypotenuse $AC$: $\\sin 30^\\circ = \\dfrac{5}{AC}$.',
    quiz: {
      question: 'Which trigonometric ratio connects the known opposite side ($AB$) and unknown hypotenuse ($AC$)?',
      options: [
        {
          id: 'a',
          text: '$\\sin C = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}} = \\dfrac{AB}{AC}$',
          correct: true,
          feedback: 'Correct! Sine connects the opposite leg directly to the hypotenuse.'
        },
        {
          id: 'b',
          text: '$\\cot C = \\dfrac{\\text{Adjacent}}{\\text{Opposite}}$',
          correct: false,
          feedback: 'Cotangent relates adjacent and opposite sides, not the hypotenuse.'
        }
      ]
    }
  },
  5: {
    title: 'Solve for Hypotenuse AC',
    summary: 'Substitute $\\sin 30^\\circ = \\dfrac{1}{2}$: $\\dfrac{1}{2} = \\dfrac{5}{AC} \\implies AC = 5 \\times 2 = 10\\text{ cm}$.',
    quiz: null
  },
  6: {
    title: 'Verify Results via Pythagoras',
    summary: 'Pythagoras check: $AC = \\sqrt{5^2 + (5\\sqrt{3})^2} = \\sqrt{25 + 75} = \\sqrt{100} = 10\\text{ cm}$. Matches!',
    quiz: null
  },
  7: {
    title: 'Summary & 30°-60°-90° Property',
    summary: '$BC = 5\\sqrt{3}\\text{ cm}$ and $AC = 10\\text{ cm}$. Sides follow the $1 : \\sqrt{3} : 2$ ratio.',
    quiz: null
  }
}

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean True 30° Geometry) ─────────── */
// Right angle at B(90, 195)
// Base vertex C(330, 195) -> BC = 240 px
// Top vertex A(90, 56)    -> AB = 139 px (tan 30° ≈ 0.577, 139/240 ≈ 0.579)
const Bx = 90, By = 195
const Cx = 330, Cy = 195
const Ax = 90, Ay = 56

const HYP_ANGLE = 30
const HypLabelX = (Ax + Cx) / 2 + 12
const HypLabelY = (Ay + Cy) / 2 - 14

const COLOR_OPP = '#059669' // Green (AB = 5 cm)
const COLOR_ADJ = '#0284c7' // Blue (BC = 5√3 cm)
const COLOR_HYP = '#ea580c' // Orange (AC = 10 cm)

/* ─────────── STEP-SPECIFIC TRIANGLE DIAGRAM (PURE SVG, NO STATIC BLOCKS) ─────────── */
function AnimatedStepTriangle6({
  stepId,
  subStep = 3,
  isCurrent = true
}) {
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  const isBasic = stepId === 1
  const isRatioBC = stepId === 2
  const isSolveBC = stepId === 3
  const isRatioAC = stepId === 4
  const isSolveAC = stepId === 5
  const isVerify = stepId === 6
  const isSummary = stepId === 7

  const bcSolved = stepId >= 3
  const acSolved = stepId >= 5

  let hlOpp = false
  let hlAdj = false
  let hlHyp = false

  if (stepId === 1) {
    if (isCurrent) {
      if (subStep === 4) hlOpp = true
      else if (subStep === 5) hlAdj = true
      else if (subStep >= 6) hlHyp = true
    }
  } else if (stepId === 2 || stepId === 3) {
    hlOpp = true
    hlAdj = true
  } else if (stepId === 4 || stepId === 5) {
    hlOpp = true
    hlHyp = true
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
        viewBox="0 0 390 230"
        style={{
          width: '100%',
          maxWidth: '530px',
          height: '260px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`triGrad6-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Bx},${By} ${Cx},${Cy} ${Ax},${Ay}`}
          fill={isSummary ? '#f0fdf4' : `url(#triGrad6-${stepId})`}
          className={isCurrent ? 'e6-fade' : ''}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Glow Effects on Highlighted Sides */}
        {hlOpp && isCurrent && (
          <line x1={Bx} y1={By} x2={Ax} y2={Ay} stroke={COLOR_OPP} strokeWidth="12" strokeLinecap="round" className="e6-glow" />
        )}
        {hlAdj && isCurrent && (
          <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={COLOR_ADJ} strokeWidth="12" strokeLinecap="round" className="e6-glow" />
        )}
        {hlHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke={COLOR_HYP} strokeWidth="12" strokeLinecap="round" className="e6-glow" />
        )}

        {/* Vertical Leg AB (Opposite side = 5 cm) */}
        <line
          x1={Bx} y1={By} x2={Ax} y2={Ay}
          stroke={hlOpp ? COLOR_OPP : '#334155'}
          strokeWidth={hlOpp ? 4.5 : 2.8}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Base Leg BC (Adjacent side = 5√3 cm) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={hlAdj ? COLOR_ADJ : (bcSolved ? COLOR_ADJ : '#94a3b8')}
          strokeWidth={hlAdj ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={bcSolved ? 'none' : (stepId < 3 ? '6 4' : 'none')}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Hypotenuse AC (10 cm) */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={hlHyp ? COLOR_HYP : (acSolved ? COLOR_HYP : '#94a3b8')}
          strokeWidth={hlHyp ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={acSolved ? 'none' : (stepId < 5 ? '6 4' : 'none')}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Right Angle Symbol at B (90°) */}
        <rect
          x={Bx}
          y={By - 18}
          width="18"
          height="18"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="2"
        />

        {/* Vertex Circles (Solid CAD-style, zero jerking) */}
        <circle cx={Bx} cy={By} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Cx} cy={Cy} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Ax} cy={Ay} r="5.5" fill={isSummary ? '#16a34a' : '#0284c7'} stroke="#ffffff" strokeWidth="1.5" />

        {/* Vertex Labels */}
        <text x={Bx - 24} y={By + 6} fill="#0f172a" fontSize="15" fontWeight="700" fontFamily="Inter">B (90°)</text>
        <text x={Cx + 14} y={Cy + 6} fill="#0f172a" fontSize="17.5" fontWeight="700" fontFamily="Inter">C</text>
        <text x={Ax - 24} y={Ay + 6} fill={isSummary ? '#16a34a' : '#0f172a'} fontSize="17.5" fontWeight="700" fontFamily="Inter">A</text>

        {/* Angle C Arc (30°) */}
        <path
          d={`M ${Cx - 44} ${Cy} A 44 44 0 0 1 ${Cx - 36} ${Cy - 22}`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.8"
        />
        <text
          x={Cx - 54}
          y={Cy - 10}
          fill="#d97706"
          fontSize="15"
          fontWeight="700"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          30°
        </text>

        {/* Vertical Leg AB Label (Opposite to C) */}
        <text
          x={Bx - 16}
          y={(By + Ay) / 2}
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
            ? (subStep >= 4 ? 'AB = 5 cm (opp)' : 'Side AB')
            : 'AB = 5 cm (opp)'}
        </text>

        {/* Base Leg BC Label (Adjacent to C) */}
        <text
          x={(Bx + Cx) / 2}
          y={By + 26}
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
            ? (subStep >= 5 ? 'BC (adjacent side)' : 'Side BC')
            : (bcSolved ? 'BC = 5√3 cm (adj)' : 'BC = ? (adj)')}
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
          transform={`rotate(-${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          {isBasic
            ? (subStep >= 6 ? 'AC (hypotenuse)' : 'Side AC')
            : (acSolved ? 'AC = 10 cm (hyp)' : 'AC = ? (hyp)')}
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
              style={{ animation: 'e6PulseRing 1.5s ease-out infinite' }}
            />
            <circle
              cx={Ax}
              cy={Ay}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e6PulseRing 1.5s ease-out infinite 0.25s' }}
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
      className="e6-math-line"
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
        className={isTyping ? 'e6-typewriter' : ''}
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
export default function Example6Tutor({
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
                    className={isCurrent ? 'e6-fade' : ''}
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
                      <div className={isCurrent && subStep === 2 ? 'e6-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedStepTriangle6
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
                              className="e6-math-line"
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
            Example 6 :
          </span>
          <MathText text={'In $\\Delta ABC$, right-angled at $B$, $AB = 5\\text{ cm}$ and $\\angle ACB = 30^\\circ$. Determine the lengths of the sides $BC$ and $AC$.'} />
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
              const details = STEP_DETAILS_EX6[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e6-fade' : ''}
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
                                  ? 'Given reference angle: $\\angle ACB = 30^\\circ$.'
                                  : (subStep === 3
                                      ? 'Given side length: $AB = 5\\text{ cm}$.'
                                      : (subStep === 4
                                          ? 'Identify Opposite side $AB = 5\\text{ cm}$ (opposite to $30^\\circ$).'
                                          : (subStep === 5
                                              ? 'Identify Adjacent side $BC$ (adjacent to $30^\\circ$).'
                                              : 'Identify Hypotenuse $AC$ (longest side opposite to $90^\\circ$).'
                                            )
                                        )
                                    )
                                )
                            )
                          : (stepNum === 2 && isCurrent)
                            ? (subStep === 1
                                ? 'Choose ratio relating known opposite ($AB$) and unknown adjacent ($BC$).'
                                : (subStep <= 3
                                    ? 'Definition of tangent: $\\tan C = \\dfrac{AB}{BC}$.'
                                    : 'Substitute known values: $\\tan 30^\\circ = \\dfrac{5}{BC}$.'
                                  )
                              )
                          : (stepNum === 3 && isCurrent)
                            ? (subStep === 1
                                ? 'Recall standard value: $\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$.'
                                : (subStep <= 3
                                    ? 'Set equation: $\\dfrac{1}{\\sqrt{3}} = \\dfrac{5}{BC}$ and cross-multiply.'
                                    : 'Solve for base length: $BC = 5\\sqrt{3}\\text{ cm}$.'
                                  )
                              )
                          : (stepNum === 4 && isCurrent)
                            ? (subStep === 1
                                ? 'Choose ratio relating known opposite ($AB$) and unknown hypotenuse ($AC$).'
                                : (subStep <= 3
                                    ? 'Definition of sine: $\\sin C = \\dfrac{AB}{AC}$.'
                                    : 'Substitute known values: $\\sin 30^\\circ = \\dfrac{5}{AC}$.'
                                  )
                              )
                          : (stepNum === 5 && isCurrent)
                            ? (subStep === 1
                                ? 'Recall standard value: $\\sin 30^\\circ = \\dfrac{1}{2}$.'
                                : (subStep <= 3
                                    ? 'Set equation: $\\dfrac{1}{2} = \\dfrac{5}{AC}$ and cross-multiply.'
                                    : 'Solve for hypotenuse length: $AC = 5 \\times 2 = 10\\text{ cm}$.'
                                  )
                              )
                          : (stepNum === 6 && isCurrent)
                            ? (subStep <= 2
                                ? 'Cross-check with Pythagoras Theorem: $AC^2 = AB^2 + BC^2$.'
                                : (subStep <= 5
                                    ? 'Calculate sum of squares: $5^2 + (5\\sqrt{3})^2 = 25 + 75 = 100$.'
                                    : 'Take square root: $AC = \\sqrt{100} = 10\\text{ cm}$. Matches perfectly!'
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
                            className="e6-fade"
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
