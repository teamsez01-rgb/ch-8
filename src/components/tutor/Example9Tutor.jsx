import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Check, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e9DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e9FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e9Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.55; }
  }
  @keyframes e9Pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e9Typewriter {
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

  .e9-fade { animation: e9FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e9-draw { stroke-dasharray: 400; animation: e9DrawLine 0.75s ease-out both; }
  .e9-glow { animation: e9Glow 1.8s ease-in-out infinite; }
  .e9-pop  { animation: e9Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e9-typewriter {
    display: inline-block;
    max-width: 100%;
    animation: e9Typewriter 0.85s steps(42, end) both;
  }
  .e9-math-line {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    max-width: 100% !important;
  }
  .e9-math-line,
  .e9-math-line *,
  .e9-math-line .katex,
  .e9-math-line .katex .text,
  .e9-math-line .katex-html,
  .e9-math-line .katex-base,
  .e9-math-line .math-formula-span,
  .e9-math-line .math-rendered-text {
    overflow-wrap: normal !important;
  }
  .e9-math-line .katex-html {
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
  .e9-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 9 ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Problem Goal',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Understand the Goal : Express Ratios in terms of sin A',
    callout: 'Express cos A, tan A and sec A using ONLY sin A',
    mathLines: [
      '\\text{Target : Express } \\mathbf{\\textcolor{#0284c7}{\\cos A}}, \\; \\mathbf{\\textcolor{#7c3aed}{\\tan A}}, \\; \\mathbf{\\textcolor{#ea580c}{\\sec A}} \\text{ using } \\mathbf{\\textcolor{#059669}{\\sin A}}',
      '\\text{Identity : } \\mathbf{\\textcolor{#0284c7}{\\cos^2 A}} + \\mathbf{\\textcolor{#059669}{\\sin^2 A}} = \\mathbf{\\textcolor{#d97706}{1}}',
      '\\text{Right } \\triangle ABC : \\; \\mathbf{\\textcolor{#d97706}{\\text{Hyp } AC = 1}}, \\; \\mathbf{\\textcolor{#059669}{\\text{Opp } BC = \\sin A}}'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Express cos A',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Use cos² A + sin² A = 1 to Solve for cos A',
    callout: 'cos² A = 1 - sin² A  ⟹  cos A = √(1 - sin² A)',
    mathLines: [
      '\\text{Identity : } \\mathbf{\\textcolor{#0284c7}{\\cos^2 A}} + \\mathbf{\\textcolor{#059669}{\\sin^2 A}} = \\mathbf{\\textcolor{#d97706}{1}}',
      '\\mathbf{\\textcolor{#0284c7}{\\cos^2 A}} = \\mathbf{\\textcolor{#d97706}{1}} - \\mathbf{\\textcolor{#059669}{\\sin^2 A}}',
      '\\text{Taking square root } (\\mathbf{\\textcolor{#0284c7}{\\cos A > 0}}) :',
      '\\mathbf{\\textcolor{#0284c7}{\\cos A = \\sqrt{1 - \\sin^2 A}}} \\quad \\mathbf{\\textcolor{#0369a1}{\\text{— (1)}}}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Express tan A',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Use tan A = sin A / cos A to Express tan A',
    callout: 'tan A = sin A ÷ cos A  ⟹  tan A = sin A ÷ √(1 - sin² A)',
    mathLines: [
      '\\text{Quotient Relation : } \\mathbf{\\textcolor{#7c3aed}{\\tan A}} = \\dfrac{\\mathbf{\\textcolor{#059669}{\\sin A}}}{\\mathbf{\\textcolor{#0284c7}{\\cos A}}}',
      '\\text{Substitute } \\mathbf{\\textcolor{#0284c7}{\\cos A}} \\text{ from (1) :}',
      '\\mathbf{\\textcolor{#7c3aed}{\\tan A = \\dfrac{\\mathbf{\\textcolor{#059669}{\\sin A}}}{\\mathbf{\\textcolor{#0284c7}{\\sqrt{1 - \\sin^2 A}}}}}} \\quad \\mathbf{\\textcolor{#6d28d9}{\\text{— (2)}}}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Express sec A',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
    title: 'Use sec A = 1 / cos A to Express sec A',
    callout: 'sec A = 1 ÷ cos A  ⟹  sec A = 1 ÷ √(1 - sin² A)',
    mathLines: [
      '\\text{Reciprocal Relation : } \\mathbf{\\textcolor{#ea580c}{\\sec A}} = \\dfrac{\\mathbf{\\textcolor{#d97706}{1}}}{\\mathbf{\\textcolor{#0284c7}{\\cos A}}}',
      '\\text{Substitute } \\mathbf{\\textcolor{#0284c7}{\\cos A}} \\text{ from (1) :}',
      '\\mathbf{\\textcolor{#ea580c}{\\sec A = \\dfrac{\\mathbf{\\textcolor{#d97706}{1}}}{\\mathbf{\\textcolor{#0284c7}{\\sqrt{1 - \\sin^2 A}}}}}} \\quad \\mathbf{\\textcolor{#c2410c}{\\text{— (3)}}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Triangle Proof',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Verify Geometrically via Unit Right Triangle',
    callout: 'Hyp = 1, Opp = sin A  ⟹  Adj = √(1 - sin² A)',
    mathLines: [
      '\\text{Right } \\triangle ABC \\text{ with } \\angle B = 90^\\circ, \\; \\mathbf{\\textcolor{#d97706}{AC = 1}}',
      '\\text{Opposite Side : } \\mathbf{\\textcolor{#059669}{BC = \\sin A}}',
      '\\text{By Pythagoras : } \\mathbf{\\textcolor{#0284c7}{AB^2}} = \\mathbf{\\textcolor{#d97706}{AC^2}} - \\mathbf{\\textcolor{#059669}{BC^2}}',
      '\\mathbf{\\textcolor{#0284c7}{AB}} = \\sqrt{\\mathbf{\\textcolor{#d97706}{1^2}} - (\\mathbf{\\textcolor{#059669}{\\sin A}})^2} = \\mathbf{\\textcolor{#0284c7}{\\sqrt{1 - \\sin^2 A}}}',
      '\\mathbf{\\textcolor{#059669}{\\text{All 3 ratios confirmed geometrically!}}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Numerical Check',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Test Expressions with Angle A = 30° (sin 30° = 1/2)',
    callout: 'Test A = 30° : √(1 - (1/2)²) = √(3/4) = √3/2 = cos 30°',
    mathLines: [
      '\\text{Check at } \\mathbf{\\textcolor{#7c3aed}{A = 30^\\circ}} \\; \\left(\\mathbf{\\textcolor{#059669}{\\sin 30^\\circ = \\dfrac{1}{2}}}\\right) :',
      '\\mathbf{\\textcolor{#0284c7}{\\cos 30^\\circ}} = \\sqrt{1 - (1/2)^2} = \\mathbf{\\textcolor{#0284c7}{\\dfrac{\\sqrt{3}}{2}}} \\quad \\mathbf{\\textcolor{#059669}{\\text{✓}}}',
      '\\mathbf{\\textcolor{#7c3aed}{\\tan 30^\\circ}} = \\dfrac{1/2}{\\sqrt{3}/2} = \\mathbf{\\textcolor{#7c3aed}{\\dfrac{1}{\\sqrt{3}}}} \\quad \\mathbf{\\textcolor{#059669}{\\text{✓}}}',
      '\\mathbf{\\textcolor{#ea580c}{\\sec 30^\\circ}} = \\dfrac{1}{\\sqrt{3}/2} = \\mathbf{\\textcolor{#ea580c}{\\dfrac{2}{\\sqrt{3}}}} \\quad \\mathbf{\\textcolor{#059669}{\\text{✓}}}',
      '\\mathbf{\\textcolor{#059669}{\\text{Formulas 100\\% verified and correct!}}}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Summary',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Final Results Summary Box',
    callout: 'All 3 Ratios in terms of sin A (Solved ✓)',
    mathLines: [
      '\\mathbf{\\textcolor{#0284c7}{\\cos A = \\sqrt{1 - \\sin^2 A}}} \\quad \\mathbf{\\textcolor{#0369a1}{\\text{[Cosine]}}}',
      '\\mathbf{\\textcolor{#7c3aed}{\\tan A = \\dfrac{\\mathbf{\\textcolor{#059669}{\\sin A}}}{\\mathbf{\\textcolor{#0284c7}{\\sqrt{1 - \\sin^2 A}}}}}} \\quad \\mathbf{\\textcolor{#6d28d9}{\\text{[Tangent]}}}',
      '\\mathbf{\\textcolor{#ea580c}{\\sec A = \\dfrac{\\mathbf{\\textcolor{#d97706}{1}}}{\\mathbf{\\textcolor{#0284c7}{\\sqrt{1 - \\sin^2 A}}}}}} \\quad \\mathbf{\\textcolor{#c2410c}{\\text{[Secant]}}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS & CHECKPOINTS ─────────── */
const STEP_DETAILS_EX9 = {
  1: {
    title: 'Goal: Express Three Ratios Using sin A Only',
    promptSummary: 'Goal: Express the trigonometric ratios $\\cos A$, $\\tan A$ and $\\sec A$ purely in terms of $\\sin A$.',
    summary: 'We need to write $\\cos A$, $\\tan A$ and $\\sec A$ purely as functions of $\\sin A$ using trigonometric identities.',
    quiz: null
  },
  2: {
    title: 'Solve for cos A using cos² A + sin² A = 1',
    promptSummary: 'Apply the fundamental Pythagorean identity $\\cos^2 A + \\sin^2 A = 1$ to solve for $\\cos A$ in terms of $\\sin A$.',
    summary: 'From $\\cos^2 A + \\sin^2 A = 1$, transposing $\\sin^2 A$ and taking square root gives $\\cos A = \\sqrt{1 - \\sin^2 A}$.',
    quiz: {
      question: 'Starting from $\\cos^2 A + \\sin^2 A = 1$, what is $\\cos A$ in terms of $\\sin A$?',
      options: [
        { id: 'a', text: '$\\cos A = \\sqrt{1 - \\sin^2 A}$', correct: true, feedback: 'Correct! Transposing $\\sin^2 A$ and taking the positive square root gives $\\sqrt{1 - \\sin^2 A}$.' },
        { id: 'b', text: '$\\cos A = 1 - \\sin A$', correct: false, feedback: 'Careful! $\\sqrt{1 - \\sin^2 A} \\ne 1 - \\sin A$. The square root cannot be distributed over subtraction.' }
      ]
    }
  },
  3: {
    title: 'Express tan A using Quotient Relation',
    promptSummary: 'Recall the quotient relation $\\tan A = \\dfrac{\\sin A}{\\cos A}$. Substitute our expression for $\\cos A$ to write $\\tan A$ solely with $\\sin A$.',
    summary: 'Using $\\tan A = \\dfrac{\\sin A}{\\cos A}$ and substituting $\\cos A = \\sqrt{1 - \\sin^2 A}$, we get $\\tan A = \\dfrac{\\sin A}{\\sqrt{1 - \\sin^2 A}}$.',
    quiz: {
      question: 'Since $\\tan A = \\dfrac{\\sin A}{\\cos A}$, what is $\\tan A$ after substituting $\\cos A = \\sqrt{1 - \\sin^2 A}$?',
      options: [
        { id: 'a', text: '$\\tan A = \\dfrac{\\sin A}{\\sqrt{1 - \\sin^2 A}}$', correct: true, feedback: 'Spot on! Replacing $\\cos A$ in the denominator expresses $\\tan A$ solely in $\\sin A$.' },
        { id: 'b', text: '$\\tan A = \\dfrac{\\sqrt{1 - \\sin^2 A}}{\\sin A}$', correct: false, feedback: 'That is $\\cot A$ (the reciprocal), not $\\tan A$.' }
      ]
    }
  },
  4: {
    title: 'Express sec A using Reciprocal Relation',
    promptSummary: 'Recall the reciprocal relation between cosine and secant: $\\sec A = \\dfrac{1}{\\cos A}$. Express $\\sec A$ using only $\\sin A$.',
    summary: 'Since $\\sec A = \\dfrac{1}{\\cos A}$, substituting $\\cos A = \\sqrt{1 - \\sin^2 A}$ yields $\\sec A = \\dfrac{1}{\\sqrt{1 - \\sin^2 A}}$.',
    quiz: {
      question: 'Since $\\sec A$ is the reciprocal of $\\cos A$, what is $\\sec A$ in terms of $\\sin A$?',
      options: [
        { id: 'a', text: '$\\sec A = \\dfrac{1}{\\sqrt{1 - \\sin^2 A}}$', correct: true, feedback: 'Excellent! Reciprocal of $\\cos A$ gives $\\dfrac{1}{\\sqrt{1 - \\sin^2 A}}$.' },
        { id: 'b', text: '$\\sec A = \\dfrac{1}{1 - \\sin A}$', correct: false, feedback: '$\\cos A$ is $\\sqrt{1 - \\sin^2 A}$, not $1 - \\sin A$.' }
      ]
    }
  },
  5: {
    title: 'Geometric Model with Unit Hypotenuse',
    promptSummary: 'Construct a right triangle with Hypotenuse $= 1$ and Opposite side $= \\sin A$. Apply Pythagoras theorem to determine the Adjacent base.',
    summary: 'In right $\\triangle ABC$ with $\\text{Hyp} = 1$ and $\\text{Opp} = \\sin A$, Pythagoras theorem gives $\\text{Adj} = \\sqrt{1 - \\sin^2 A}$.',
    quiz: {
      question: 'In a right triangle with Hypotenuse $= 1$ and Opposite $= \\sin A$, what is the Adjacent base by Pythagoras?',
      options: [
        { id: 'a', text: '$\\text{Base} = \\sqrt{1^2 - (\\sin A)^2} = \\sqrt{1 - \\sin^2 A}$', correct: true, feedback: 'Brilliant! The third side directly confirms the algebraic derivation.' },
        { id: 'b', text: '$\\text{Base} = 1 + \\sin A$', correct: false, feedback: 'By Pythagoras: $\\text{Base}^2 = \\text{Hyp}^2 - \\text{Opp}^2$, not addition.' }
      ]
    }
  },
  6: {
    title: 'Numerical Verification at A = 30°',
    promptSummary: 'Test our derived expression $\\sqrt{1 - \\sin^2 A}$ numerically for standard angle $A = 30^\\circ$, where $\\sin 30^\\circ = \\dfrac{1}{2}$.',
    summary: 'Substituting $\\sin 30^\\circ = \\dfrac{1}{2}$ gives $\\sqrt{1 - (1/4)} = \\dfrac{\\sqrt{3}}{2}$, which exactly equals $\\cos 30^\\circ$!',
    quiz: {
      question: 'For $A = 30^\\circ$ where $\\sin 30^\\circ = \\dfrac{1}{2}$, what does $\\sqrt{1 - \\sin^2 30^\\circ}$ equal?',
      options: [
        { id: 'a', text: '$\\sqrt{1 - \\dfrac{1}{4}} = \\dfrac{\\sqrt{3}}{2} = \\cos 30^\\circ$', correct: true, feedback: 'Correct! The formula perfectly reproduces the standard trigonometric value!' },
        { id: 'b', text: '$\\dfrac{1}{2}$', correct: false, feedback: '$\\sqrt{3/4} = \\sqrt{3}/2$, not $1/2$.' }
      ]
    }
  },
  7: {
    title: 'Final Summary: All Three Ratios Expressed',
    promptSummary: 'Final Summary: We have successfully expressed $\\cos A$, $\\tan A$ and $\\sec A$ purely in terms of $\\sin A$.',
    summary: 'Final Result: $\\cos A = \\sqrt{1 - \\sin^2 A}$, $\\tan A = \\dfrac{\\sin A}{\\sqrt{1 - \\sin^2 A}}$ and $\\sec A = \\dfrac{1}{\\sqrt{1 - \\sin^2 A}}$.',
    quiz: {
      question: 'Which fundamental identity forms the primary foundation for expressing $\\cos A$ in terms of $\\sin A$?',
      options: [
        { id: 'a', text: '$\\cos^2 A + \\sin^2 A = 1$', correct: true, feedback: 'Correct! This identity is the bedrock of all trigonometric conversions.' },
        { id: 'b', text: '$\\sec^2 A - \\tan^2 A = 1$', correct: false, feedback: '$\\cos^2 A + \\sin^2 A = 1$ is the direct identity relating cosine and sine.' }
      ]
    }
  }
}

/* ─────────── SVG TRIANGLE COORDINATES (Unit Hypotenuse Right Triangle) ─────────── */
const Ax = 90, Ay = 185
const Bx = 320, By = 185
const Cx = 320, Cy = 55

const HYP_ANGLE = 29.5
const HypLabelX = (Ax + Cx) / 2 - 14
const HypLabelY = (Ay + Cy) / 2 - 16

const COLOR_ADJ = '#0284c7' // Blue (Adjacent = √(1 - sin² A))
const COLOR_OPP = '#059669' // Green (Opposite = sin A)
const COLOR_HYP = '#ea580c' // Orange (Hypotenuse = 1)

/* ─────────── ANIMATED IDENTITY TRIANGLE SVG (EXAMPLE 9) ─────────── */
function AnimatedIdentityTriangle9({
  stepId,
  subStep = 3,
  isCurrent = true,
  callout = ''
}) {
  const isCosSolved = stepId >= 2
  const isTanSolved = stepId >= 3
  const isSecSolved = stepId >= 4

  const isCosActive = stepId === 2 || stepId === 7
  const isTanActive = stepId === 3 || stepId === 7
  const isSecActive = stepId === 4 || stepId === 7
  const isModelActive = stepId === 5
  const isCheckActive = stepId === 6
  const isSummary = stepId === 7

  // Substep dynamic highlights
  const highlightAdj =
    (stepId === 2 && (subStep >= 5 || !isCurrent)) ||
    (stepId === 3 && (subStep >= 4 || !isCurrent)) ||
    (stepId === 4 && (subStep >= 4 || !isCurrent)) ||
    (stepId === 5 && (subStep >= 5 || !isCurrent)) ||
    stepId === 6 ||
    stepId === 7

  const highlightOpp =
    (stepId === 3 && (subStep >= 4 || !isCurrent)) ||
    (stepId === 5 && (subStep >= 4 || !isCurrent)) ||
    stepId === 6 ||
    stepId === 7

  const highlightHyp =
    (stepId === 4 && (subStep >= 4 || !isCurrent)) ||
    (stepId === 5 && (subStep >= 3 || !isCurrent)) ||
    stepId === 6 ||
    stepId === 7

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      margin: '0.4rem 0 1.2rem'
    }}>
      <svg
        viewBox="-20 0 430 235"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '270px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`triGrad9-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={isSummary ? '#f0fdf4' : `url(#triGrad9-${stepId})`}
          className={isCurrent ? 'e9-fade' : ''}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Dynamic Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={COLOR_ADJ} strokeWidth="14" strokeLinecap="round" className="e9-glow" />
        )}
        {highlightOpp && isCurrent && (
          <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke={COLOR_OPP} strokeWidth="14" strokeLinecap="round" className="e9-glow" />
        )}
        {highlightHyp && isCurrent && (
          <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke={COLOR_HYP} strokeWidth="14" strokeLinecap="round" className="e9-glow" />
        )}

        {/* Base Leg AB (Adjacent = √(1 - sin² A) or Unknown in Step 1) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightAdj ? COLOR_ADJ : (stepId === 1 ? '#94a3b8' : '#334155')}
          strokeWidth={highlightAdj ? 4.5 : 2.8}
          strokeDasharray={stepId === 1 ? '6 4' : 'none'}
          strokeLinecap="round"
          className={isCurrent ? 'e9-draw' : ''}
        />

        {/* Perpendicular Leg BC (Opposite = sin A) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? COLOR_OPP : '#334155'}
          strokeWidth={highlightOpp ? 4.5 : 2.8}
          strokeLinecap="round"
          className={isCurrent ? 'e9-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AC (1) */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={highlightHyp ? COLOR_HYP : '#94a3b8'}
          strokeWidth={highlightHyp ? 4.5 : 2.8}
          strokeLinecap="round"
          className={isCurrent ? 'e9-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on active sides */}
        {highlightAdj && isCurrent && (
          <circle r="4.5" fill={COLOR_ADJ} style={{ filter: 'drop-shadow(0 0 4px #0284c7)' }}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Bx} ${By}`} />
          </circle>
        )}
        {highlightOpp && isCurrent && (
          <circle r="4.5" fill={COLOR_OPP} style={{ filter: 'drop-shadow(0 0 4px #059669)' }}>
            <animateMotion dur="1.9s" repeatCount="indefinite" path={`M${Bx} ${By} L${Cx} ${Cy}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4.5" fill={COLOR_HYP} style={{ filter: 'drop-shadow(0 0 4px #ea580c)' }}>
            <animateMotion dur="2.5s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Cx} ${Cy}`} />
          </circle>
        )}

        {/* Right Angle Symbol at B (90°) */}
        <rect
          x={Bx - 18}
          y={By - 18}
          width="18"
          height="18"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="2.2"
          className={isCurrent ? 'e9-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Ax} cy={Ay} r="5.5" fill="#ea580c" className={isCurrent ? 'e9-pop' : ''} />
        <circle cx={Bx} cy={By} r="5.5" fill="#0284c7" className={isCurrent ? 'e9-pop' : ''} />
        <circle cx={Cx} cy={Cy} r="5.5" fill="#059669" className={isCurrent ? 'e9-pop' : ''} />

        {/* Vertex Labels with crisp stroke halos */}
        <text
          x={Ax - 22}
          y={Ay + 6}
          fill="#0f172a"
          fontSize="16"
          fontWeight="900"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          A
        </text>
        <text
          x={Bx + 12}
          y={By + 6}
          fill="#0f172a"
          fontSize="15"
          fontWeight="900"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          B (90°)
        </text>
        <text
          x={Cx + 12}
          y={Cy + 4}
          fill="#0f172a"
          fontSize="16"
          fontWeight="900"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          C
        </text>

        {/* Angle A Arc */}
        <path
          d={`M ${Ax + 26} ${Ay} A 26 26 0 0 0 ${Ax + 22.6} ${Ay - 12.8}`}
          fill="none"
          stroke="#ea580c"
          strokeWidth="2.6"
          className={isCurrent ? 'e9-pop' : ''}
        />
        <text
          x={Ax + 48}
          y={Ay - 7}
          fill="#ea580c"
          fontSize="14"
          fontWeight="800"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="4"
          paintOrder="stroke fill"
        >
          ∠A
        </text>

        {/* Base AB Label (Adjacent = √(1 - sin² A) or ? in Step 1) */}
        <text
          x={(Ax + Bx) / 2}
          y={Ay + 26}
          fill={highlightAdj ? COLOR_ADJ : (stepId === 1 ? '#64748b' : '#475569')}
          fontSize="14"
          fontWeight="800"
          textAnchor="middle"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
          className={highlightAdj ? 'e9-pop' : ''}
        >
          {stepId === 1 ? 'Adjacent = ? (To be found)' : 'Adjacent = √(1 - sin² A)'}
        </text>

        {/* Vertical BC Label (Opposite = sin A) */}
        <text
          x={Bx + 14}
          y={(By + Cy) / 2}
          fill={highlightOpp ? COLOR_OPP : '#475569'}
          fontSize="14"
          fontWeight="800"
          dominantBaseline="middle"
          fontFamily="Inter"
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
          className={highlightOpp ? 'e9-pop' : ''}
        >
          Opp = sin A
        </text>

        {/* Hypotenuse AC Label (Hyp = 1) */}
        <text
          x={HypLabelX}
          y={HypLabelY}
          fill={highlightHyp ? COLOR_HYP : '#94a3b8'}
          fontSize="14.5"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Inter"
          transform={`rotate(-${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff"
          strokeWidth="4"
          paintOrder="stroke"
          className={highlightHyp ? 'e9-pop' : ''}
        >
          Hypotenuse = 1
        </text>
      </svg>

      {/* Interactive 3-Formula Showcase Cards */}
      <div
        className="e9-fade"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          width: '100%',
          maxWidth: '560px',
          marginTop: '0.4rem'
        }}
      >
        {/* Card 1: cos A */}
        <div style={{
          padding: '8px 10px',
          borderRadius: '10px',
          background: isCosSolved ? (isCosActive ? '#e0f2fe' : '#f0f9ff') : '#f8fafc',
          border: isCosSolved ? (isCosActive ? '2px solid #0284c7' : '1.5px solid #7dd3fc') : '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: isCosActive ? '0 4px 14px rgba(2, 132, 199, 0.25)' : 'none',
          transition: 'all 0.25s ease'
        }}>
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: isCosSolved ? '#0369a1' : '#94a3b8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}>
            Cosine {isCosSolved && <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>}
          </div>
          <div style={{ fontSize: '0.96rem', fontWeight: 700, color: isCosSolved ? '#0284c7' : '#94a3b8' }}>
            <MathText text={isCosSolved ? '$\\cos A = \\sqrt{1 - \\sin^2 A}$' : '$\\cos A = \\text{?}$'} />
          </div>
        </div>

        {/* Card 2: tan A */}
        <div style={{
          padding: '8px 10px',
          borderRadius: '10px',
          background: isTanSolved ? (isTanActive ? '#ede9fe' : '#f5f3ff') : '#f8fafc',
          border: isTanSolved ? (isTanActive ? '2px solid #7c3aed' : '1.5px solid #c4b5fd') : '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: isTanActive ? '0 4px 14px rgba(124, 58, 237, 0.25)' : 'none',
          transition: 'all 0.25s ease'
        }}>
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: isTanSolved ? '#5b21b6' : '#94a3b8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}>
            Tangent {isTanSolved && <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>}
          </div>
          <div style={{ fontSize: '0.96rem', fontWeight: 700, color: isTanSolved ? '#7c3aed' : '#94a3b8' }}>
            <MathText text={isTanSolved ? '$\\tan A = \\dfrac{\\sin A}{\\sqrt{1 - \\sin^2 A}}$' : '$\\tan A = \\text{?}$'} />
          </div>
        </div>

        {/* Card 3: sec A */}
        <div style={{
          padding: '8px 10px',
          borderRadius: '10px',
          background: isSecSolved ? (isSecActive ? '#fff7ed' : '#fffbeb') : '#f8fafc',
          border: isSecSolved ? (isSecActive ? '2px solid #ea580c' : '1.5px solid #fdba74') : '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: isSecActive ? '0 4px 14px rgba(234, 88, 12, 0.25)' : 'none',
          transition: 'all 0.25s ease'
        }}>
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: isSecSolved ? '#c2410c' : '#94a3b8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}>
            Secant {isSecSolved && <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>}
          </div>
          <div style={{ fontSize: '0.96rem', fontWeight: 700, color: isSecSolved ? '#ea580c' : '#94a3b8' }}>
            <MathText text={isSecSolved ? '$\\sec A = \\dfrac{1}{\\sqrt{1 - \\sin^2 A}}$' : '$\\sec A = \\text{?}$'} />
          </div>
        </div>
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
  }, [isLatest, isCurrent, text])

  return (
    <div
      className={isTyping ? 'e9-typewriter' : ''}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        overflow: 'visible',
        margin: 0,
        padding: 0
      }}
    >
      <div className="e9-math-line" style={{ maxWidth: '100%' }}>
        <MathText text={`$${text}$`} />
      </div>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example9Tutor({
  onNextExample,
  onPrevExample,
  hasPrev = true,
  hasNext = true,
  initialAtEnd = false
}) {
  const total = STEPS.length
  const [step, setStep] = useState(initialAtEnd ? total : 1)
  const [subStep, setSubStep] = useState(initialAtEnd ? (2 + STEPS[total - 1].mathLines.length) : 1)
  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)
  const rightScrollRef = useRef(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const hasFiredConfetti = useRef(false)

  const currentStepObj = step > 0 ? (STEPS[step - 1] || STEPS[0]) : null
  const currentTotalSubSteps = 2 + (currentStepObj ? currentStepObj.mathLines.length : 0)

  const handleOptionSelect = (stepId, optId, isCorrect) => {
    setSelectedOptions(prev => ({ ...prev, [stepId]: optId }))
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#059669', '#0284c7', '#d97706', '#10b981']
      })
    }
  }

  // Trigger celebration on final summary step completion
  useEffect(() => {
    if (step === total && subStep === currentTotalSubSteps && !hasFiredConfetti.current) {
      hasFiredConfetti.current = true
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#059669', '#0284c7', '#d97706', '#7c3aed']
      })
    }
    // Reset confetti trigger if user steps backwards to earlier steps
    if (step < total) {
      hasFiredConfetti.current = false
    }
  }, [step, subStep, total, currentTotalSubSteps])

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

  // Smoothly auto-scroll left pane to keep current step and revealed math lines in view
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

  // Smoothly auto-scroll right pane to active step
  useEffect(() => {
    if (step === 0 || !rightScrollRef.current) return
    const container = rightScrollRef.current
    const activeRightStep = container.querySelector(`[data-right-step="${step}"]`)
    if (activeRightStep) {
      setTimeout(() => {
        activeRightStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 50)
    }
  }, [step])

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
          PART 1 (LEFT PANE): PROGRESSIVE STEP-BY-STEP WORKSPACE
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="left-pane"
        style={{
          flex: 1.25,
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
            padding: '2.0rem 0.8rem 6rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
            scrollBehavior: 'smooth'
          }}
        >
          {step === 0 ? null : (
            <div style={{ width: '100%', maxWidth: '100%', margin: 0, padding: 0 }}>
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
                    className={isCurrent ? 'e9-fade' : ''}
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
                      scrollMarginBottom: '2.5rem',
                      width: '100%',
                      maxWidth: '100%',
                      margin: '0 0 2.8rem 0'
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

                    {/* Step Diagram */}
                    {showDiagram && (
                      <div className={isCurrent && subStep === 2 ? 'e9-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedIdentityTriangle9
                          stepId={s.id}
                          subStep={isCurrent ? subStep : (2 + s.mathLines.length)}
                          isCurrent={isCurrent}
                          callout={s.callout}
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
                        maxWidth: '100%',
                        margin: '1.05rem 0 0 0',
                        padding: 0
                      }}>
                        {visibleLines.map((line, lIdx) => {
                          const isLatest = isCurrent && lIdx === visibleLines.length - 1
                          return (
                            <div
                              key={lIdx}
                              data-latest-line={isLatest ? "true" : undefined}
                              style={{
                                fontSize: 'clamp(1.08rem, 1.38vw, 1.35rem)',
                                color: '#0f172a',
                                fontWeight: 600,
                                lineHeight: 1.95,
                                textAlign: 'center',
                                width: '100%',
                                maxWidth: '100%',
                                boxSizing: 'border-box',
                                letterSpacing: '0.01em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '0.15rem 0.5rem',
                                margin: 0,
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
          PART 2 (RIGHT PANE): PROGRESSIVE STEP-BY-STEP EXPLANATION & CHECKPOINTS
          ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={rightScrollRef}
        className="right-pane"
        style={{
          flex: 0.75,
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
            Example 9 :
          </span>
          <MathText text={'Express the ratios $\\cos A$, $\\tan A$ and $\\sec A$ in terms of $\\sin A$.'} />
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
              const details = STEP_DETAILS_EX9[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e9-fade' : ''}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    opacity: isCurrent ? 1 : 0.85,
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
                        fontSize: '1.08rem',
                        fontWeight: 800,
                        color: isCurrent ? '#0f172a' : '#334155',
                        letterSpacing: '-0.01em'
                      }}>
                        Step {stepNum} : {details.title}
                      </div>
                      {isCurrent && (
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          letterSpacing: '0.03em',
                          textTransform: 'uppercase'
                        }}>
                          Active
                        </span>
                      )}
                    </div>

                    {/* Step Explanation / Prompt Summary (Large, clear typography) */}
                    <div style={{
                      fontSize: '1.05rem',
                      lineHeight: '1.75',
                      color: isCurrent ? '#1e293b' : '#64748b',
                      fontWeight: isCurrent ? 500 : 400
                    }}>
                      <MathText text={isCurrent ? (details.promptSummary || details.summary) : details.summary} />
                    </div>

                    {/* Interactive Quiz / Concept Check (Shown ONLY on the ACTIVE CURRENT STEP!) */}
                    {isCurrent && quiz && (
                      <div
                        data-noclick="true"
                        style={{
                          marginTop: '0.75rem',
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '14px',
                          padding: '1.25rem 1.4rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.95rem',
                          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                        }}
                      >
                        {/* Header badge & question */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.55rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              background: '#e0f2fe',
                              color: '#0369a1',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase'
                            }}>
                              Quick Check
                            </span>
                          </div>
                          <div style={{
                            fontSize: '1.14rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            lineHeight: 1.65
                          }}>
                            <MathText text={quiz.question} />
                          </div>
                        </div>

                        {/* Options Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {quiz.options.map((opt) => {
                            const isChosen = userChoice === opt.id
                            const isRight = opt.correct

                            let bg = '#ffffff'
                            let borderColor = '#cbd5e1'
                            let textColor = '#1e293b'

                            if (isChosen) {
                              if (isRight) {
                                bg = '#ecfdf5'
                                borderColor = '#10b981'
                                textColor = '#065f46'
                              } else {
                                bg = '#fff1f2'
                                borderColor = '#f43f5e'
                                textColor = '#9f1239'
                              }
                            }

                            return (
                              <motion.button
                                whileHover={{ scale: 1.012, x: 2 }}
                                whileTap={{ scale: 0.988 }}
                                key={opt.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOptionSelect(stepNum, opt.id, opt.correct)
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '0.82rem 1.15rem',
                                  background: bg,
                                  border: `1.5px solid ${borderColor}`,
                                  borderRadius: '10px',
                                  fontSize: '1.08rem',
                                  fontWeight: isChosen ? 700 : 500,
                                  color: textColor,
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'all 0.15s ease',
                                  fontFamily: '"Inter", sans-serif'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: isChosen ? (isRight ? '#10b981' : '#f43f5e') : '#e2e8f0',
                                    color: isChosen ? '#ffffff' : '#64748b',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.88rem',
                                    fontWeight: 800,
                                    flexShrink: 0
                                  }}>
                                    {opt.id.toUpperCase()}
                                  </span>
                                  <span style={{ fontSize: '1.08rem', fontWeight: 600 }}>
                                    <MathText text={opt.text} />
                                  </span>
                                </div>

                                {isChosen && (
                                  <span>
                                    {isRight ? (
                                      <CheckCircle2 size={22} color="#10b981" />
                                    ) : (
                                      <XCircle size={22} color="#f43f5e" />
                                    )}
                                  </span>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>

                        {/* Instant Feedback Message with Reset */}
                        {selectedOpt && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                              padding: '0.8rem 1.1rem',
                              borderRadius: '8px',
                              background: selectedOpt.correct ? '#ecfdf5' : '#fffbeb',
                              border: selectedOpt.correct ? '1px solid #a7f3d0' : '1px solid #fef3c7',
                              fontSize: '1.0rem',
                              color: selectedOpt.correct ? '#065f46' : '#92400e',
                              lineHeight: 1.55,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '10px'
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
                                  padding: '4px 6px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  fontSize: '0.84rem',
                                  fontWeight: 700,
                                  textDecoration: 'underline',
                                  flexShrink: 0
                                }}
                              >
                                <RotateCcw size={14} />
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
                        gap: '8px',
                        fontSize: '0.94rem',
                        color: selectedOpt.correct ? '#059669' : '#64748b',
                        marginTop: '0.25rem',
                        background: selectedOpt.correct ? '#f0fdf4' : '#f8fafc',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        border: `1px solid ${selectedOpt.correct ? '#bbf7d0' : '#e2e8f0'}`
                      }}>
                        <CheckCircle2 size={16} color="#059669" />
                        <span>
                          <strong>Quick Check:</strong> <MathText text={selectedOpt.text} />
                        </span>
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
