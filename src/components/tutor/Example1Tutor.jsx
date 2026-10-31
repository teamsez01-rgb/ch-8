import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e1DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e1FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
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
  
  @keyframes e1Typewriter {
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
  .e1-fade { animation: e1FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e1-draw { stroke-dasharray: 400; animation: e1DrawLine 0.75s ease-out both; }
  .e1-glow { animation: e1Glow 1.8s ease-in-out infinite; }
  .e1-pop  { animation: e1Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e1-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e1Typewriter 0.85s steps(42, end) both;
  }
  .e1-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e1-math-line,
  .e1-math-line *,
  .e1-math-line .katex,
  .e1-math-line .katex .text,
  .e1-math-line .katex-html,
  .e1-math-line .katex-base,
  .e1-math-line .math-formula-span,
  .e1-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e1-math-line .katex-html {
    display: inline-flex !important;
    flex-wrap: nowrap !important;
    align-items: baseline !important;
    white-space: nowrap !important;
  }

  .left-pane,
  .left-pane *,
  .right-pane,
  .right-pane * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  }
  .left-pane .katex,
  .right-pane .katex,
  .e1-math-line .katex {
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
      '\\text{Consider right-angled } \\triangle ABC \\text{ with right angle at } B \\ (\\angle B = 90^\\circ)',
      '\\mathbf{\\textcolor{#059669}{\\text{Side } BC \\text{ is Opposite}}} \\text{ (side opposite to acute } \\angle A)',
      '\\mathbf{\\textcolor{#0284c7}{\\text{Side } AB \\text{ is Adjacent}}} \\text{ (side adjacent to acute } \\angle A)',
      '\\mathbf{\\textcolor{#d97706}{\\text{Side } AC \\text{ is Hypotenuse}}} \\text{ (longest side, opposite to } 90^\\circ)'
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
      '\\tan A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Side adjacent to } \\angle A}',
      '\\text{Side opposite to } \\angle A~=~\\mathbf{\\textcolor{#059669}{BC}}',
      '\\text{Side adjacent to } \\angle A~=~\\mathbf{\\textcolor{#0284c7}{AB}}',
      '\\tan A = \\dfrac{\\mathbf{\\textcolor{#059669}{BC}}}{\\mathbf{\\textcolor{#0284c7}{AB}}}',
      '\\text{Given in Question : } \\tan A = \\dfrac{4}{3}',
      '\\dfrac{\\mathbf{\\textcolor{#059669}{BC}}}{\\mathbf{\\textcolor{#0284c7}{AB}}} = \\dfrac{4}{3}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Side Lengths with k',
    badgeColor: '#92400e',
    badgeBg: '#fef3c7',
    title: 'Assign Side Lengths with Constant k',
    diagramType: 'assignK',
    mathLines: [
      '\\dfrac{\\mathbf{\\textcolor{#059669}{BC}}}{\\mathbf{\\textcolor{#0284c7}{AB}}} = \\dfrac{4}{3}',
      '\\text{Let } k > 0 \\text{ be a positive proportionality constant}',
      '\\mathbf{\\textcolor{#059669}{BC = 4k}}',
      '\\mathbf{\\textcolor{#0284c7}{AB = 3k}}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Pythagoras Theorem',
    badgeColor: '#5b21b6',
    badgeBg: '#ede9fe',
    title: 'Find Missing Hypotenuse AC (Pythagoras)',
    diagramType: 'pythagoras',
    mathLines: [
      '\\text{By Pythagoras Theorem in right } \\triangle ABC :',
      '\\mathbf{\\textcolor{#d97706}{AC^2}} = \\mathbf{\\textcolor{#0284c7}{AB^2}} + \\mathbf{\\textcolor{#059669}{BC^2}}',
      '\\mathbf{\\textcolor{#d97706}{AC^2}} = (3k)^2 + (4k)^2',
      '\\mathbf{\\textcolor{#d97706}{AC^2}} = 9k^2 + 16k^2',
      '\\mathbf{\\textcolor{#d97706}{AC^2}} = 25k^2',
      '\\mathbf{\\textcolor{#d97706}{AC}} = \\sqrt{25k^2}',
      '\\mathbf{\\textcolor{#d97706}{AC = 5k}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'sin A',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
    title: 'Calculate sin A',
    diagramType: 'ratio',
    ratioName: 'sin',
    mathLines: [
      '\\sin A = \\dfrac{\\text{Side opposite to } \\angle A}{\\text{Hypotenuse}}',
      '\\text{Side opposite to } \\angle A~=~\\mathbf{\\textcolor{#059669}{BC}}',
      '\\text{Hypotenuse}~=~\\mathbf{\\textcolor{#d97706}{AC}}',
      '\\sin A = \\dfrac{\\mathbf{\\textcolor{#059669}{BC}}}{\\mathbf{\\textcolor{#d97706}{AC}}}',
      '\\sin A = \\dfrac{4k}{5k}',
      '\\mathbf{\\textcolor{#0284c7}{\\sin A = \\dfrac{4}{5}}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'cos A',
    badgeColor: '#047857',
    badgeBg: '#d1fae5',
    title: 'Calculate cos A',
    diagramType: 'ratio',
    ratioName: 'cos',
    mathLines: [
      '\\cos A = \\dfrac{\\text{Side adjacent to } \\angle A}{\\text{Hypotenuse}}',
      '\\text{Side adjacent to } \\angle A~=~\\mathbf{\\textcolor{#0284c7}{AB}}',
      '\\text{Hypotenuse}~=~\\mathbf{\\textcolor{#d97706}{AC}}',
      '\\cos A = \\dfrac{\\mathbf{\\textcolor{#0284c7}{AB}}}{\\mathbf{\\textcolor{#d97706}{AC}}}',
      '\\cos A = \\dfrac{3k}{5k}',
      '\\mathbf{\\textcolor{#047857}{\\cos A = \\dfrac{3}{5}}}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'cot A',
    badgeColor: '#9d174d',
    badgeBg: '#fce7f3',
    title: 'Calculate cot A (Reciprocal of tan A)',
    diagramType: 'ratio',
    ratioName: 'cot',
    mathLines: [
      '\\cot A = \\dfrac{\\text{Side adjacent to } \\angle A}{\\text{Side opposite to } \\angle A}',
      '\\text{Side adjacent to } \\angle A~=~\\mathbf{\\textcolor{#0284c7}{AB}}',
      '\\text{Side opposite to } \\angle A~=~\\mathbf{\\textcolor{#059669}{BC}}',
      '\\cot A = \\dfrac{\\mathbf{\\textcolor{#0284c7}{AB}}}{\\mathbf{\\textcolor{#059669}{BC}}}',
      '\\cot A = \\dfrac{3k}{4k}',
      '\\mathbf{\\textcolor{#9d174d}{\\cot A = \\dfrac{3}{4}}}'
    ]
  },
  {
    id: 8,
    label: 'Step 8',
    badge: 'cosec A',
    badgeColor: '#6d28d9',
    badgeBg: '#ede9fe',
    title: 'Calculate cosec A (Reciprocal of sin A)',
    diagramType: 'ratio',
    ratioName: 'cosec',
    mathLines: [
      '\\operatorname{cosec} A = \\dfrac{\\text{Hypotenuse}}{\\text{Side opposite to } \\angle A}',
      '\\text{Hypotenuse}~=~\\mathbf{\\textcolor{#d97706}{AC}}',
      '\\text{Side opposite to } \\angle A~=~\\mathbf{\\textcolor{#059669}{BC}}',
      '\\operatorname{cosec} A = \\dfrac{\\mathbf{\\textcolor{#d97706}{AC}}}{\\mathbf{\\textcolor{#059669}{BC}}}',
      '\\operatorname{cosec} A = \\dfrac{5k}{4k}',
      '\\mathbf{\\textcolor{#6d28d9}{\\operatorname{cosec} A = \\dfrac{5}{4}}}'
    ]
  },
  {
    id: 9,
    label: 'Step 9',
    badge: 'sec A',
    badgeColor: '#be123c',
    badgeBg: '#ffe4e6',
    title: 'Calculate sec A (Reciprocal of cos A)',
    diagramType: 'ratio',
    ratioName: 'sec',
    mathLines: [
      '\\sec A = \\dfrac{\\text{Hypotenuse}}{\\text{Side adjacent to } \\angle A}',
      '\\text{Hypotenuse}~=~\\mathbf{\\textcolor{#d97706}{AC}}',
      '\\text{Side adjacent to } \\angle A~=~\\mathbf{\\textcolor{#0284c7}{AB}}',
      '\\sec A = \\dfrac{\\mathbf{\\textcolor{#d97706}{AC}}}{\\mathbf{\\textcolor{#0284c7}{AB}}}',
      '\\sec A = \\dfrac{5k}{3k}',
      '\\mathbf{\\textcolor{#be123c}{\\sec A = \\dfrac{5}{3}}}'
    ]
  },
  {
    id: 10,
    label: 'Step 10',
    badge: 'All 6 Ratios',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
    title: 'Summary of All 6 Trigonometric Ratios',
    diagramType: 'summary',
    mathLines: [
      '\\mathbf{\\textcolor{#0284c7}{\\sin A = \\dfrac{4}{5}}} \\qquad \\longleftrightarrow \\qquad \\mathbf{\\textcolor{#6d28d9}{\\operatorname{cosec} A = \\dfrac{5}{4}}}',
      '\\mathbf{\\textcolor{#047857}{\\cos A = \\dfrac{3}{5}}} \\qquad \\longleftrightarrow \\qquad \\mathbf{\\textcolor{#be123c}{\\sec A = \\dfrac{5}{3}}}',
      '\\mathbf{\\textcolor{#0369a1}{\\tan A = \\dfrac{4}{3}}} \\qquad \\longleftrightarrow \\qquad \\mathbf{\\textcolor{#9d174d}{\\cot A = \\dfrac{3}{4}}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS FOR EXAMPLE 1 ─────────── */
const STEP_DETAILS_EX1 = {
  1: {
    title: 'Draw Right Triangle ABC',
    summary: 'Draw right $\\triangle ABC$ at $B$, with acute angle $\\angle A$.',
    quiz: null
  },
  2: {
    title: 'Given tan A = 4/3',
    summary: '$\\tan A = \\dfrac{\\text{Opposite}}{\\text{Adjacent}} = \\dfrac{BC}{AB} = \\dfrac{4}{3}$.',
    quiz: null
  },
  3: {
    title: 'Assign Sides with k',
    summary: 'Let $BC = 4k$ and $AB = 3k$ (where $k > 0$).',
    promptSummary: 'Given ratio: $\\tan A = \\dfrac{BC}{AB} = \\dfrac{4}{3}$.',
    quiz: {
      question: 'Why do we introduce constant $k$?',
      options: [
        { id: 'a', text: '$\\dfrac{4}{3}$ is a ratio, so lengths are multiples $4k$ and $3k$', correct: true, feedback: 'Correct! Ratios represent relative proportions.' },
        { id: 'b', text: 'Sides must be exactly 4 cm and 3 cm only', correct: false, feedback: 'Triangles with sides 8, 6 also have ratio 4/3.' }
      ]
    }
  },
  4: {
    title: 'Find Hypotenuse AC (Pythagoras)',
    summary: 'Pythagoras: $AC = \\sqrt{(3k)^2 + (4k)^2} = 5k$.',
    promptSummary: 'Apply Pythagoras Theorem: $AC = \\sqrt{AB^2 + BC^2}$.',
    quiz: {
      question: 'Applying Pythagoras theorem, what is $AC$?',
      options: [
        { id: 'a', text: '$AC = 5k$', correct: true, feedback: 'Spot on! Forms standard $(3, 4, 5)$ triplet.' },
        { id: 'b', text: '$AC = 7k$', correct: false, feedback: '$\\sqrt{9k^2 + 16k^2} = 5k$, not $3k + 4k$.' }
      ]
    }
  },
  5: {
    title: 'Find sin A',
    summary: '$\\sin A = \\dfrac{BC}{AC} = \\dfrac{4k}{5k} = \\dfrac{4}{5}$.',
    quiz: null
  },
  6: {
    title: 'Find cos A',
    summary: '$\\cos A = \\dfrac{AB}{AC} = \\dfrac{3k}{5k} = \\dfrac{3}{5}$.',
    quiz: null
  },
  7: {
    title: 'Find cot A',
    summary: 'Reciprocal of $\\tan A$: $\\cot A = \\dfrac{1}{\\tan A} = \\dfrac{3}{4}$.',
    promptSummary: 'Reciprocal relation: $\\cot A = \\dfrac{1}{\\tan A}$.',
    quiz: {
      question: 'Since $\\tan A = \\dfrac{4}{3}$, what is $\\cot A$?',
      options: [
        { id: 'a', text: '$\\cot A = \\dfrac{3}{4}$', correct: true, feedback: 'Correct! Reciprocal of $4/3$ is $3/4$.' },
        { id: 'b', text: '$\\cot A = \\dfrac{4}{5}$', correct: false, feedback: 'Reciprocal of $4/3$ is $3/4$.' }
      ]
    }
  },
  8: {
    title: 'Find cosec A',
    summary: 'Reciprocal of $\\sin A$: $\\operatorname{cosec} A = \\dfrac{1}{\\sin A} = \\dfrac{5}{4}$.',
    quiz: null
  },
  9: {
    title: 'Find sec A',
    summary: 'Reciprocal of $\\cos A$: $\\sec A = \\dfrac{1}{\\cos A} = \\dfrac{5}{3}$.',
    quiz: null
  },
  10: {
    title: 'All Ratios Solved',
    summary: 'All 5 remaining ratios for $\\angle A$ are determined and verified.',
    quiz: null
  }
}

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
  // On Step 1 sub-step 1: Only title is shown, no triangle drawn yet
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

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
  const hypSolved = stepId >= 4 && (stepId > 4 || subStep >= 9)

  const highlightOpp =
    (isBasic && subStep >= 4) ||
    (isGiven && (subStep === 4 || subStep >= 6)) ||
    isAssignK ||
    (isPyth && subStep >= 4) ||
    (isSin && (subStep === 4 || subStep >= 6)) ||
    (isCot && (subStep === 5 || subStep >= 6)) ||
    (isCosec && (subStep === 5 || subStep >= 6)) ||
    (isSummary && subStep >= 3)

  const highlightAdj =
    (isBasic && subStep >= 5) ||
    (isGiven && (subStep === 5 || subStep >= 6)) ||
    isAssignK ||
    (isPyth && subStep >= 4) ||
    (isCos && (subStep === 4 || subStep >= 6)) ||
    (isCot && (subStep === 4 || subStep >= 6)) ||
    (isSec && (subStep === 5 || subStep >= 6)) ||
    (isSummary && subStep >= 3)

  const highlightHyp =
    (isBasic && subStep >= 6) ||
    (isPyth && subStep >= 4) ||
    (isSin && (subStep === 5 || subStep >= 6)) ||
    (isCos && (subStep === 5 || subStep >= 6)) ||
    (isCosec && (subStep === 4 || subStep >= 6)) ||
    (isSec && (subStep === 4 || subStep >= 6)) ||
    (isSummary && subStep >= 3)

  const isRatioStep = isSin || isCos || isCot || isCosec || isSec

  let adjOpacity = 1
  let oppOpacity = 1
  let hypOpacity = 1

  if (isRatioStep) {
    if (subStep <= 3) {
      adjOpacity = 1
      oppOpacity = 1
      hypOpacity = 1
    } else if (subStep === 4 || subStep === 5) {
      adjOpacity = highlightAdj ? 1 : 0.35
      oppOpacity = highlightOpp ? 1 : 0.35
      hypOpacity = highlightHyp ? 1 : 0.35
    } else {
      adjOpacity = highlightAdj ? 1 : 0.22
      oppOpacity = highlightOpp ? 1 : 0.22
      hypOpacity = highlightHyp ? 1 : 0.22
    }
  } else if (isGiven) {
    if (subStep <= 3) {
      adjOpacity = 1
      oppOpacity = 1
      hypOpacity = 1
    } else if (subStep === 4 || subStep === 5) {
      adjOpacity = highlightAdj ? 1 : 0.35
      oppOpacity = highlightOpp ? 1 : 0.35
      hypOpacity = 1
    } else {
      adjOpacity = 1
      oppOpacity = 1
      hypOpacity = 1
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      margin: '0.2rem 0 0.8rem'
    }}>
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
          stroke={highlightAdj ? COLOR_ADJ : (isBasic ? '#334155' : '#475569')}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          opacity={adjOpacity}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Perpendicular BC (Opposite) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? COLOR_OPP : (isBasic ? '#334155' : '#475569')}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          opacity={oppOpacity}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={hypSolved ? (highlightHyp ? COLOR_HYP : '#475569') : (highlightHyp ? COLOR_HYP : '#94a3b8')}
          strokeWidth={highlightHyp && hypSolved ? 4 : 2.6}
          strokeLinecap="round"
          strokeDasharray={hypSolved ? 'none' : '6 4'}
          opacity={hypOpacity}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Right Angle Symbol at B */}
        <rect
          x={Bx - 16} y={By - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="1.8"
        />

        {/* Vertex Dots - Clean, stable & beautifully anchored (Zero jerk/jump) */}
        <circle cx={Ax} cy={Ay} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Bx} cy={By} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={Cx} cy={Cy} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />

        {/* Vertex Labels */}
        <text x={Ax - 22} y={Ay + 6} fill="#0f172a" fontSize="17.5" fontWeight="900" fontFamily="Inter">A</text>
        <text x={Bx + 10} y={By + 6} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">B (90°)</text>
        <text x={Cx + 10} y={Cy + 6} fill="#0f172a" fontSize="17.5" fontWeight="900" fontFamily="Inter">C</text>

        {/* Angle A Arc */}
        <path
          d={`M${Ax + 28} ${Ay} A28 28 0 0 0 ${Ax + 28 * Math.cos(0.66)} ${Ay - 28 * Math.sin(0.66)}`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.4"
        />
        <text x={Ax + 36} y={Ay - 8} fill="#d97706" fontSize="14.5" fontWeight="800" fontFamily="Inter">∠A</text>

        {/* Side AB Label */}
        <text
          x={(Ax + Bx) / 2} y={Ay + 25}
          fill={highlightAdj ? COLOR_ADJ : '#0f172a'}
          fontSize="14.5" fontWeight="800" textAnchor="middle" fontFamily="Inter"
          opacity={adjOpacity}
          style={{ transition: 'all 0.3s ease' }}
        >
          {isBasic
            ? (subStep >= 5 ? 'AB (adjacent side)' : 'Side AB')
            : (stepId > 3 || (isAssignK && subStep >= 6)
                ? 'AB = 3k (adj)'
                : (isGiven ? (subStep >= 5 ? 'AB (adjacent side)' : 'Side AB') : 'AB (adjacent side)'))}
        </text>

        {/* Side BC Label */}
        <text
          x={Bx + 12} y={(By + Cy) / 2}
          fill={highlightOpp ? COLOR_OPP : '#0f172a'}
          fontSize="14.5" fontWeight="800" dominantBaseline="middle" fontFamily="Inter"
          opacity={oppOpacity}
          style={{ transition: 'all 0.3s ease' }}
        >
          {isBasic
            ? (subStep >= 4 ? 'BC (opposite side)' : 'Side BC')
            : (stepId > 3 || (isAssignK && subStep >= 5)
                ? 'BC = 4k (opp)'
                : (isGiven ? (subStep >= 4 ? 'BC (opposite side)' : 'Side BC') : 'BC (opposite side)'))}
        </text>

        {/* Side AC Label */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={hypSolved ? (highlightHyp ? COLOR_HYP : '#0f172a') : (isBasic && subStep >= 6 ? COLOR_HYP : '#64748b')}
          fontSize="14.5" fontWeight="800" textAnchor="middle" fontFamily="Inter"
          transform={`rotate(${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff" strokeWidth="3" paintOrder="stroke"
          opacity={hypOpacity}
          style={{ transition: 'all 0.3s ease' }}
        >
          {isBasic
            ? (subStep >= 6 ? 'AC (hypotenuse)' : 'Side AC')
            : (hypSolved ? 'AC = 5k (hyp)' : 'AC = ? (hyp)')}
        </text>
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
      className="e1-math-line"
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
        className={isTyping ? 'e1-typewriter' : ''}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontFamily: '"Inter", sans-serif',
          color: '#0f172a'
        }}
      >
        <MathText
          text={`$${text}$`}
          style={{ whiteSpace: 'nowrap', display: 'inline-block', fontFamily: '"Inter", sans-serif', color: '#0f172a' }}
        />
      </div>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example1Tutor({ onNextExample, onPrevExample, hasPrev = true, hasNext = true, initialAtEnd = false }) {
  const total = STEPS.length
  const lastStepObj = STEPS[total - 1]
  const lastStepTotalSubSteps = 2 + lastStepObj.mathLines.length

  const [step, setStep] = useState(initialAtEnd ? total : 0)
  const [subStep, setSubStep] = useState(initialAtEnd ? lastStepTotalSubSteps : 0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)
  const rightScrollContainerRef = useRef(null)
  const hasFiredConfetti = useRef(false)

  const currentStepObj = step > 0 ? (STEPS[step - 1] || STEPS[0]) : null
  const currentTotalSubSteps = currentStepObj ? (2 + currentStepObj.mathLines.length) : 0

  // Scroll to Step 10 (or bottom) immediately if starting at end
  useEffect(() => {
    if (initialAtEnd) {
      setTimeout(() => {
        const container = scrollContainerRef.current
        if (container) {
          const step10 = container.querySelector(`[data-step="10"]`)
          if (step10) {
            step10.scrollIntoView({ behavior: 'auto', block: 'start' })
          } else {
            container.scrollTop = container.scrollHeight
          }
        }
        const rightContainer = rightScrollContainerRef.current
        if (rightContainer) {
          const rightStep10 = rightContainer.querySelector(`[data-right-step="10"]`)
          if (rightStep10) {
            rightStep10.scrollIntoView({ behavior: 'auto', block: 'nearest' })
          }
        }
      }, 90)
    }
  }, [initialAtEnd])

  // Auto-scroll the active step card into view on the right pane
  useEffect(() => {
    if (step === 0 || !rightScrollContainerRef.current) return
    const el = rightScrollContainerRef.current.querySelector(`[data-right-step="${step}"]`)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 70)
    }
  }, [step])

  // Fire celebratory confetti ONLY when the very last sub-step of the final step (Step 10) is fully completed!
  useEffect(() => {
    if (step === total && subStep >= currentTotalSubSteps && !hasFiredConfetti.current && !initialAtEnd) {
      hasFiredConfetti.current = true
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      })
    }
    // Reset confetti trigger if user steps backwards to earlier steps
    if (step < total) {
      hasFiredConfetti.current = false
    }
  }, [step, subStep, total, currentTotalSubSteps, initialAtEnd])

  // Single click progresses one micro-step at a time; when sub-steps complete, goes to next step!
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
    } else if (hasNext && onNextExample) {
      onNextExample()
    }
  }

  // Backwards navigation steps back one micro-step at a time
  const goPrevStep = () => {
    if (step === 0) {
      if (hasPrev && onPrevExample) {
        onPrevExample()
      }
      return
    }
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step === 1 && subStep === 1) {
      setStep(0)
      setSubStep(0)
    } else if (step > 1) {
      const prevStepNum = step - 1
      const prevTotalSubSteps = 2 + STEPS[prevStepNum - 1].mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalSubSteps)
    }
  }

  // Keyboard navigation: Left / Right arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && step === 0)) {
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

  // Smoothly auto-scroll so the current step and any newly revealed math lines are always visible
  useEffect(() => {
    if (step === 0 || !scrollContainerRef.current) return
    const container = scrollContainerRef.current

    if (subStep <= 2) {
      const el = container.querySelector(`[data-step="${step}"]`)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
    } else {
      const latestLine = container.querySelector(`[data-latest-line="true"]`)
      if (latestLine) {
        setTimeout(() => {
          latestLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 50)
      }
    }
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
            <div style={{ width: '100%', maxWidth: '820px' }}>
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
                    className={isCurrent ? 'e1-fade' : ''}
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

                    {/* Step Diagram (Big, Prominent, Live Motion Animations) */}
                    {showDiagram && (
                      <div className={isCurrent && subStep === 2 ? 'e1-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedStepTriangle
                          stepId={s.id}
                          subStep={isCurrent ? subStep : (2 + s.mathLines.length)}
                          ratioName={s.ratioName}
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
                              style={{
                                fontSize: '1.42rem',
                                color: '#0f172a',
                                fontWeight: 600,
                                lineHeight: 1.95,
                                textAlign: 'center',
                                width: '100%',
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.01em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '0.15rem 0',
                                scrollMarginBottom: '2.5rem',
                                fontFamily: '"Inter", sans-serif'
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
          PART 2 (RIGHT PANE): PROGRESSIVE STEP-BY-STEP EXPLANATION
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={rightScrollContainerRef}
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
            Example 1 :
          </span>
          <MathText text={'Given $\\tan A = \\dfrac{4}{3}$, find the other trigonometric ratios of the angle A.'} />
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
            const details = STEP_DETAILS_EX1[stepNum] || { title: s.title, summary: '', quiz: null }
            const quiz = details.quiz
            const userChoice = selectedOptions[stepNum]
            const selectedOpt = quiz?.options.find(o => o.id === userChoice)

            return (
              <motion.div
                key={`right-step-${stepNum}`}
                data-right-step={stepNum}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: isCurrent ? 1 : 0.85, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  gap: '1rem',
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
                  <motion.div
                    animate={{
                      scale: isCurrent ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
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
                      boxShadow: isCurrent ? '0 0 0 3px rgba(2, 132, 199, 0.18)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    ) : stepNum}
                  </motion.div>
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

                {/* Step Body */}
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
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          background: '#f0f9ff',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}
                      >
                        Active
                      </motion.span>
                    )}
                  </div>

                  {/* 1-2 Line Concise Mathematical Summary */}
                  <div style={{
                    fontSize: '1.02rem',
                    color: '#334155',
                    lineHeight: 1.65
                  }}>
                    <MathText text={
                      (stepNum === 1 && isCurrent)
                        ? (subStep === 1
                            ? 'Understand requirement: Construct right-angled triangle $\\triangle ABC$.'
                            : (subStep === 2
                                ? 'Draw right $\\triangle ABC$ with right angle at $B$ ($\\angle B = 90^\\circ$).'
                                : (subStep === 3
                                    ? 'Identify Side $BC$: Side directly opposite to acute angle $\\angle A$.'
                                    : (subStep === 4
                                        ? 'Identify Side $AB$: Side adjacent/base to acute angle $\\angle A$.'
                                        : 'Identify Side $AC$: Hypotenuse (longest side opposite to $90^\\circ$).'
                                      )
                                  )
                              )
                          )
                        : (isCurrent && quiz && !userChoice && details.promptSummary
                            ? details.promptSummary
                            : details.summary)
                    } />
                  </div>

                  {/* Optional Interactive Student Checkpoint Quiz (Non-blocking, no outer card box) */}
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
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          padding: '2px 7px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase'
                        }}>
                          Quick Check
                        </span>
                        <MathText text={quiz.question} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {quiz.options.map((opt) => {
                          const isChosen = userChoice === opt.id
                          const isCorrect = opt.correct

                          let btnBg = '#ffffff'
                          let btnBorder = '#cbd5e1'
                          let btnColor = '#1e293b'

                          if (isChosen) {
                            if (isCorrect) {
                              btnBg = '#ecfdf5'
                              btnBorder = '#10b981'
                              btnColor = '#065f46'
                            } else {
                              btnBg = '#fff1f2'
                              btnBorder = '#f43f5e'
                              btnColor = '#9f1239'
                            }
                          }

                          return (
                            <motion.button
                              whileHover={{ scale: 1.015, x: 2 }}
                              whileTap={{ scale: 0.985 }}
                              key={opt.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedOptions(prev => ({ ...prev, [stepNum]: opt.id }))
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.55rem 0.85rem',
                                borderRadius: '8px',
                                border: `1.5px solid ${btnBorder}`,
                                background: btnBg,
                                color: btnColor,
                                cursor: 'pointer',
                                fontSize: '0.88rem',
                                fontWeight: isChosen ? 700 : 500,
                                textAlign: 'left',
                                fontFamily: 'Inter',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
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
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* Feedback */}
                      {selectedOpt && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            padding: '0.55rem 0.85rem',
                            borderRadius: '8px',
                            background: selectedOpt.correct ? '#ecfdf5' : '#fffbeb',
                            border: selectedOpt.correct ? '1px solid #a7f3d0' : '1px solid #fef3c7',
                            fontSize: '0.88rem',
                            color: selectedOpt.correct ? '#065f46' : '#92400e',
                            lineHeight: 1.45,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px'
                          }}
                        >
                          <div>
                            <strong>{selectedOpt.correct ? 'Correct:' : 'Note:'}</strong>{' '}
                            <MathText text={selectedOpt.feedback} />
                          </div>

                          {!selectedOpt.correct && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedOptions(prev => {
                                  const updated = { ...prev }
                                  delete updated[stepNum]
                                  return updated
                                })
                              }}
                              title="Try Again"
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: '#b45309',
                                padding: '2px 4px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                textDecoration: 'underline',
                                flexShrink: 0
                              }}
                            >
                              <RotateCcw size={11} />
                              Reset
                            </button>
                          )}
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* If a previous step had a quiz that was answered, show clean completed insight */}
                  {isCompleted && quiz && selectedOpt && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.88rem',
                      color: selectedOpt.correct ? '#059669' : '#64748b',
                      marginTop: '0.2rem'
                    }}>
                      <CheckCircle2 size={14} color="#059669" />
                      <span>
                        <strong>Answer:</strong> <MathText text={selectedOpt.text} />
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
      </div>
    </div>
  )
}

