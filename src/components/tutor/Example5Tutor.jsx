import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS & INTER REGULAR TYPOGRAPHY ─────────── */
const KEYFRAMES = `
  @keyframes e5DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e5FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e5Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e5PulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.35); }
    50%      { box-shadow: 0 0 0 7px rgba(2, 132, 199, 0); }
  }
  @keyframes e5Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e5StrikeThrough {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes e5Typewriter {
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
  .e5-fade { animation: e5FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e5-draw { stroke-dasharray: 400; animation: e5DrawLine 0.75s ease-out both; }
  .e5-glow { animation: e5Glow 1.8s ease-in-out infinite; }
  .e5-pop  { animation: e5Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e5-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e5Typewriter 0.85s steps(42, end) both;
  }
  .e5-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e5-math-line,
  .e5-math-line *,
  .e5-math-line .katex,
  .e5-math-line .katex .text,
  .e5-math-line .katex-html,
  .e5-math-line .katex-base,
  .e5-math-line .math-formula-span,
  .e5-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e5-math-line .katex-html {
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
  .e5-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 5 (PURE VERTICAL STEPS) ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Given Triangle',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Draw Right Triangle OPQ (∠P = 90°)',
    mathLines: [
      '\\text{Consider right-angled } \\triangle OPQ \\text{ with } \\angle P = 90^\\circ',
      '\\text{Given in question : } OP = 7\\text{ cm}',
      '\\text{Given in question : } OQ - PQ = 1\\text{ cm}',
      '\\mathbf{\\textcolor{#059669}{\\text{Side opposite to } \\angle Q = OP = 7\\text{ cm}}}',
      '\\mathbf{\\textcolor{#0284c7}{\\text{Side adjacent to } \\angle Q = PQ}}',
      '\\mathbf{\\textcolor{#ea580c}{\\text{Hypotenuse} = OQ}}'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Express Hypotenuse',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Express Hypotenuse OQ in terms of Base PQ',
    mathLines: [
      '\\text{We are given :}',
      'OQ - PQ = 1\\text{ cm}',
      '\\text{Transposing } PQ \\text{ to the right side :}',
      'OQ = 1 + PQ',
      '\\mathbf{\\textcolor{#ea580c}{OQ = 1 + PQ}} \\quad \\text{— (1)}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Pythagoras Theorem',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Apply Pythagoras Theorem in △OPQ',
    mathLines: [
      '\\text{In right } \\triangle OPQ\\text{, by Pythagoras Theorem :}',
      'OQ^2 = OP^2 + PQ^2',
      '\\text{Substitute } OQ = 1 + PQ \\text{ from (1) and } OP = 7 :',
      '(1 + PQ)^2 = 7^2 + PQ^2',
      '(1 + PQ)^2 = 49 + PQ^2'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Algebraic Cancellation',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
    title: 'Expand Identity & Cancel PQ² on Both Sides',
    mathLines: [
      '\\text{Using identity } (a + b)^2 = a^2 + 2ab + b^2 :',
      '(1 + PQ)^2 = 1^2 + 2(1)(PQ) + PQ^2',
      '(1 + PQ)^2 = 1 + 2PQ + PQ^2',
      '\\text{Substitute this expansion into the equation :}',
      '1 + 2PQ + PQ^2 = 49 + PQ^2',
      '__CANCELLATION_LINE_EX5__',
      '\\mathbf{\\textcolor{#0284c7}{1 + 2PQ = 49}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Solve Sides',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Solve for Base PQ and Hypotenuse OQ',
    mathLines: [
      '1 + 2PQ = 49',
      '2PQ = 49 - 1',
      '2PQ = 48',
      'PQ = \\dfrac{48}{2}',
      '\\mathbf{\\textcolor{#0284c7}{PQ = 24\\text{ cm}}}',
      '\\text{From equation (1) : } OQ = 1 + PQ',
      'OQ = 1 + 24',
      '\\mathbf{\\textcolor{#ea580c}{OQ = 25\\text{ cm}}}',
      '\\text{All three sides are known :}',
      '\\mathbf{\\textcolor{#059669}{OP = 7\\text{ cm}}}, \\quad \\mathbf{\\textcolor{#0284c7}{PQ = 24\\text{ cm}}}, \\quad \\mathbf{\\textcolor{#ea580c}{OQ = 25\\text{ cm}}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Find sin Q',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Calculate sin Q (Opposite ÷ Hypotenuse)',
    mathLines: [
      '\\sin Q = \\dfrac{\\text{Side opposite to } \\angle Q}{\\text{Hypotenuse}}',
      '\\sin Q = \\dfrac{OP}{OQ}',
      '\\sin Q = \\dfrac{7}{25}',
      '\\mathbf{\\textcolor{#059669}{\\sin Q = \\dfrac{7}{25}}}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Find cos Q & Summary',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Calculate cos Q and Final Result',
    mathLines: [
      '\\cos Q = \\dfrac{\\text{Side adjacent to } \\angle Q}{\\text{Hypotenuse}}',
      '\\cos Q = \\dfrac{PQ}{OQ}',
      '\\cos Q = \\dfrac{24}{25}',
      '\\mathbf{\\textcolor{#0284c7}{\\cos Q = \\dfrac{24}{25}}}',
      '\\mathbf{\\textcolor{#16a34a}{\\text{Final Answer :}}}',
      '\\mathbf{\\textcolor{#059669}{\\sin Q = \\dfrac{7}{25}}}',
      '\\mathbf{\\textcolor{#0284c7}{\\cos Q = \\dfrac{24}{25}}}',
      '\\mathbf{\\textcolor{#16a34a}{\\text{Solved Successfully! } \\checkmark}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS FOR RIGHT PANE ─────────── */
const STEP_DETAILS_EX5 = {
  1: {
    title: 'Identify Given Values in Right △OPQ',
    summary: 'Construct right $\\triangle OPQ$ at $P$ ($90^\\circ$) with $OP = 7\\text{ cm}$ and $OQ - PQ = 1\\text{ cm}$.',
    quiz: null
  },
  2: {
    title: 'Express Hypotenuse OQ in terms of PQ',
    summary: 'Rearrange $OQ - PQ = 1\\text{ cm}$ to express the hypotenuse: $OQ = 1 + PQ$.',
    quiz: null
  },
  3: {
    title: 'Apply Pythagoras Theorem',
    summary: 'Pythagoras: $OQ^2 = OP^2 + PQ^2$. Substitute $OQ = 1 + PQ$ and $OP = 7\\text{ cm}$.',
    quiz: null
  },
  4: {
    title: 'Expand Identity & Cancel PQ²',
    summary: 'Expand $(1 + PQ)^2 = 1 + 2PQ + PQ^2$. $PQ^2$ cancels from both sides, giving $1 + 2PQ = 49$.',
    promptSummary: 'Substitute into equation: $1 + 2PQ + PQ^2 = 49 + PQ^2$. Notice $PQ^2$ appears on both sides.',
    quiz: {
      question: 'After expanding $(1 + PQ)^2 = 49 + PQ^2$, which term cancels from both sides?',
      options: [
        {
          id: 'a',
          text: '$PQ^2$ cancels out leaving $1 + 2PQ = 49$',
          correct: true,
          feedback: 'Correct! Subtracting $PQ^2$ from both sides eliminates the quadratic term completely!'
        },
        {
          id: 'b',
          text: '$2PQ$ cancels out',
          correct: false,
          feedback: '$2PQ$ is only present on the left side, so it cannot cancel.'
        }
      ]
    }
  },
  5: {
    title: 'Solve for Base PQ and Hypotenuse OQ',
    summary: '$2PQ = 48 \\implies PQ = 24\\text{ cm}$, giving $OQ = 1 + 24 = 25\\text{ cm}$ (forms 7-24-25 triplet).',
    quiz: null
  },
  6: {
    title: 'Find sin Q',
    summary: '$\\sin Q = \\dfrac{OP}{OQ} = \\dfrac{7}{25}$.',
    quiz: null
  },
  7: {
    title: 'Find cos Q and Final Result',
    summary: '$\\cos Q = \\dfrac{PQ}{OQ} = \\dfrac{24}{25}$. Both trigonometric ratios are evaluated.',
    quiz: null
  }
}

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean CAD Geometry) ─────────── */
const Px = 90, Py = 195
const Qx = 310, Qy = 195
const Ox = 90, Oy = 45

const HYP_ANGLE = 34
const HypLabelX = (Ox + Qx) / 2 + 10
const HypLabelY = (Oy + Qy) / 2 - 12

const COLOR_OPP = '#059669' // Green (OP = 7 cm)
const COLOR_ADJ = '#0284c7' // Blue (PQ = 24 cm)
const COLOR_HYP = '#ea580c' // Orange (OQ = 25 cm)

/* ─────────── STEP-SPECIFIC TRIANGLE DIAGRAM (PURE SVG, NO STATIC BLOCKS) ─────────── */
function AnimatedStepTriangle5({
  stepId,
  subStep = 3,
  isCurrent = true
}) {
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  const isBasic = stepId === 1
  const isExpressHyp = stepId === 2
  const isPyth = stepId === 3
  const isCancel = stepId === 4
  const isSolved = stepId >= 5
  const isSinQ = stepId === 6
  const isCosQ = stepId === 7

  let hlOpp = false
  let hlAdj = false
  let hlHyp = false

  if (stepId === 1) {
    if (isCurrent) {
      if (subStep === 4) hlOpp = true
      else if (subStep === 5) hlAdj = true
      else if (subStep >= 6) hlHyp = true
    }
  } else if (stepId === 2) {
    hlAdj = true
    hlHyp = true
  } else if (stepId === 3) {
    hlOpp = true
    hlAdj = true
    hlHyp = true
  } else if (stepId === 4) {
    hlOpp = true
    hlAdj = true
    hlHyp = true
  } else if (stepId === 5) {
    if (isCurrent && subStep <= 5) {
      hlAdj = true
    } else {
      hlHyp = true
      hlAdj = true
      hlOpp = true
    }
  } else if (stepId === 6) {
    hlOpp = true
    hlHyp = true
  } else if (stepId === 7) {
    hlAdj = true
    hlHyp = true
    hlOpp = true
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
          <linearGradient id={`triGrad5-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Px},${Py} ${Qx},${Qy} ${Ox},${Oy}`}
          fill={isCosQ ? '#f0fdf4' : `url(#triGrad5-${stepId})`}
          className={isCurrent ? 'e5-fade' : ''}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Glow Effects on Highlighted Sides */}
        {hlOpp && isCurrent && (
          <line x1={Px} y1={Py} x2={Ox} y2={Oy} stroke={COLOR_OPP} strokeWidth="12" strokeLinecap="round" className="e5-glow" />
        )}
        {hlAdj && isCurrent && (
          <line x1={Px} y1={Py} x2={Qx} y2={Qy} stroke={COLOR_ADJ} strokeWidth="12" strokeLinecap="round" className="e5-glow" />
        )}
        {hlHyp && isCurrent && (
          <line x1={Ox} y1={Oy} x2={Qx} y2={Qy} stroke={COLOR_HYP} strokeWidth="12" strokeLinecap="round" className="e5-glow" />
        )}

        {/* Vertical Leg OP (Opposite side to Q = 7 cm) */}
        <line
          x1={Px} y1={Py} x2={Ox} y2={Oy}
          stroke={hlOpp ? COLOR_OPP : '#334155'}
          strokeWidth={hlOpp ? 4.5 : 2.8}
          strokeLinecap="round"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Base Leg PQ (Adjacent side to Q) */}
        <line
          x1={Px} y1={Py} x2={Qx} y2={Qy}
          stroke={hlAdj ? COLOR_ADJ : (isSolved ? COLOR_ADJ : '#94a3b8')}
          strokeWidth={hlAdj ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={isSolved ? 'none' : (stepId < 5 ? '6 4' : 'none')}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Hypotenuse OQ */}
        <line
          x1={Ox} y1={Oy} x2={Qx} y2={Qy}
          stroke={hlHyp ? COLOR_HYP : (isSolved ? COLOR_HYP : '#94a3b8')}
          strokeWidth={hlHyp ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={isSolved ? 'none' : (stepId < 5 ? '6 4' : 'none')}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Right Angle Symbol at P (90°) */}
        <rect
          x={Px}
          y={Py - 18}
          width="18"
          height="18"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="2"
        />

        {/* Vertex Circles (Solid CAD-style, zero jerking) */}
        <circle cx={Px} cy={Py} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Qx} cy={Qy} r="5.5" fill={isCosQ ? '#16a34a' : '#0284c7'} stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Ox} cy={Oy} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />

        {/* Vertex Labels */}
        <text x={Px - 24} y={Py + 6} fill="#0f172a" fontSize="15" fontWeight="700" fontFamily="Inter">P (90°)</text>
        <text x={Qx + 14} y={Qy + 6} fill={isCosQ ? '#16a34a' : '#0f172a'} fontSize="17.5" fontWeight="700" fontFamily="Inter">Q</text>
        <text x={Ox - 24} y={Oy + 6} fill="#0f172a" fontSize="17.5" fontWeight="700" fontFamily="Inter">O</text>

        {/* Angle Q Arc at Vertex Q */}
        <path
          d="M 275 195 A 35 35 0 0 1 285 178"
          fill="none"
          stroke="#d97706"
          strokeWidth="2.8"
        />
        <text
          x={Qx - 42}
          y={Qy - 10}
          fill="#d97706"
          fontSize="15"
          fontWeight="700"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          ∠Q
        </text>

        {/* Vertical Leg OP Label (Opposite to Q) */}
        <text
          x={Px - 16}
          y={(Py + Oy) / 2}
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
            ? (subStep >= 4 ? 'OP = 7 cm (opp)' : 'Side OP')
            : 'OP = 7 cm (opp)'}
        </text>

        {/* Base Leg PQ Label (Adjacent to Q) */}
        <text
          x={(Px + Qx) / 2}
          y={Py + 26}
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
            ? (subStep >= 5 ? 'PQ (adjacent side)' : 'Side PQ')
            : (isSolved ? 'PQ = 24 cm (adj)' : (stepId >= 2 ? 'PQ (adjacent)' : 'PQ (adj)'))}
        </text>

        {/* Hypotenuse OQ Label */}
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
            ? (subStep >= 6 ? 'OQ (hypotenuse)' : 'Side OQ')
            : (isSolved ? 'OQ = 25 cm (hyp)' : (stepId >= 2 ? 'OQ = 1 + PQ (hyp)' : 'OQ (hyp)'))}
        </text>

        {/* Celebratory Green Pulsing Rings in final step */}
        {isCosQ && (
          <>
            <circle
              cx={Qx}
              cy={Qy}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e5PulseRing 1.5s ease-out infinite' }}
            />
            <circle
              cx={Ox}
              cy={Oy}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e5PulseRing 1.5s ease-out infinite 0.25s' }}
            />
          </>
        )}
      </svg>
    </div>
  )
}

/* ─────────── CLEAN INLINE CANCELLATION COMPONENT (STEP 4) ─────────── */
function AnimatedCancellationLine5({ isCurrent }) {
  return (
    <div
      className="e5-fade e5-math-line"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '0.15rem 0',
        fontSize: '1.42rem',
        fontWeight: 500,
        color: '#0f172a',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      <span>1 + 2PQ +</span>

      {/* Left Cancelled PQ² */}
      <div style={{ position: 'relative', display: 'inline-block', padding: '0 3px' }}>
        <span style={{ color: '#ea580c' }}>PQ²</span>
        <div style={{
          position: 'absolute',
          left: '-2px',
          right: '-2px',
          top: '50%',
          height: '2.5px',
          background: '#ef4444',
          transform: 'rotate(-15deg)',
          borderRadius: '2px',
          boxShadow: '0 0 6px rgba(239, 68, 68, 0.6)'
        }} />
      </div>

      <span style={{ margin: '0 4px' }}>=</span>

      <span>49 +</span>

      {/* Right Cancelled PQ² */}
      <div style={{ position: 'relative', display: 'inline-block', padding: '0 3px' }}>
        <span style={{ color: '#ea580c' }}>PQ²</span>
        <div style={{
          position: 'absolute',
          left: '-2px',
          right: '-2px',
          top: '50%',
          height: '2.5px',
          background: '#ef4444',
          transform: 'rotate(-15deg)',
          borderRadius: '2px',
          boxShadow: '0 0 6px rgba(239, 68, 68, 0.6)'
        }} />
      </div>
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
      className="e5-math-line"
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
        className={isTyping ? 'e5-typewriter' : ''}
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
export default function Example5Tutor({
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
                    className={isCurrent ? 'e5-fade' : ''}
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
                      <div className={isCurrent && subStep === 2 ? 'e5-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedStepTriangle5
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

                          if (line === '__CANCELLATION_LINE_EX5__') {
                            return (
                              <div
                                key={lIdx}
                                data-latest-line={isLatest ? "true" : undefined}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  width: '100%',
                                  scrollMarginBottom: '2.5rem'
                                }}
                              >
                                <AnimatedCancellationLine5 isCurrent={isCurrent} />
                              </div>
                            )
                          }

                          return (
                            <div
                              key={lIdx}
                              data-latest-line={isLatest ? "true" : undefined}
                              className="e5-math-line"
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
            Example 5 :
          </span>
          <MathText text={'In $\\Delta OPQ$, right-angled at $P$, $OP = 7\\text{ cm}$ and $OQ - PQ = 1\\text{ cm}$. Determine the values of $\\sin Q$ and $\\cos Q$.'} />
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
              const details = STEP_DETAILS_EX5[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e5-fade' : ''}
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
                              ? 'Understand requirement: Construct right $\\triangle OPQ$ with right angle at $P$.'
                              : (subStep === 2
                                  ? 'Given in question: $OP = 7\\text{ cm}$.'
                                  : (subStep === 3
                                      ? 'Given in question: $OQ - PQ = 1\\text{ cm}$.'
                                      : (subStep === 4
                                          ? 'Identify Opposite side $OP$: Directly opposite to acute angle $\\angle Q$.'
                                          : (subStep === 5
                                              ? 'Identify Adjacent side $PQ$: Base side adjacent to $\\angle Q$.'
                                              : 'Identify Hypotenuse $OQ$: Longest side opposite to $90^\\circ$.'
                                            )
                                        )
                                    )
                                )
                            )
                          : (stepNum === 2 && isCurrent)
                            ? (subStep === 1
                                ? 'Start with given equation: $OQ - PQ = 1\\text{ cm}$.'
                                : (subStep <= 3
                                    ? 'Transpose $-PQ$ to right side: changes sign to $+PQ$.'
                                    : 'Express hypotenuse in terms of base: $OQ = 1 + PQ$.'
                                  )
                              )
                          : (stepNum === 3 && isCurrent)
                            ? (subStep <= 2
                                ? 'Apply Pythagoras Theorem: $OQ^2 = OP^2 + PQ^2$.'
                                : (subStep === 3
                                    ? 'Substitute $OQ = 1 + PQ$ and $OP = 7\\text{ cm}$.'
                                    : 'Form algebraic equation: $(1 + PQ)^2 = 7^2 + PQ^2 = 49 + PQ^2$.'
                                  )
                              )
                          : (stepNum === 4 && isCurrent)
                            ? (subStep <= 2
                                ? 'State identity: $(a + b)^2 = a^2 + 2ab + b^2$.'
                                : (subStep === 3
                                    ? 'Expand: $(1 + PQ)^2 = 1^2 + 2(1)(PQ) + PQ^2 = 1 + 2PQ + PQ^2$.'
                                    : (subStep <= 5
                                        ? 'Substitute expansion into equation: $1 + 2PQ + PQ^2 = 49 + PQ^2$.'
                                        : (subStep === 6
                                            ? 'Notice $PQ^2$ cancels from both sides cleanly!'
                                            : 'Resulting linear equation: $1 + 2PQ = 49$.'
                                          )
                                      )
                                  )
                              )
                          : (stepNum === 5 && isCurrent)
                            ? (subStep <= 4
                                ? 'Solve for base: $2PQ = 49 - 1 = 48 \\implies PQ = 24\\text{ cm}$.'
                                : (subStep <= 8
                                    ? 'Calculate hypotenuse: $OQ = 1 + 24 = 25\\text{ cm}$.'
                                    : 'All 3 sides solved: forms standard Pythagorean triplet 7, 24, 25.'
                                  )
                              )
                          : (stepNum === 6 && isCurrent)
                            ? (subStep <= 2
                                ? 'Apply definition: $\\sin Q = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}} = \\dfrac{OP}{OQ}$.'
                                : 'Calculate sine value: $\\sin Q = \\dfrac{7}{25}$.'
                              )
                          : (stepNum === 7 && isCurrent)
                            ? (subStep <= 2
                                ? 'Apply definition: $\\cos Q = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\dfrac{PQ}{OQ}$.'
                                : (subStep <= 4
                                    ? 'Calculate cosine value: $\\cos Q = \\dfrac{24}{25}$.'
                                    : 'Both required ratios $\\sin Q = \\dfrac{7}{25}$ and $\\cos Q = \\dfrac{24}{25}$ are solved!'
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
                            className="e5-fade"
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
