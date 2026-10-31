import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e11DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e11FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e11Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.65; }
  }
  @keyframes e11Pop {
    0%   { transform: scale(0.65); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e11PulseRing {
    0%   { r: 6; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 24; opacity: 0; stroke-width: 0.5; }
  }
  @keyframes e11FloatBadge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }

  .e11-fade { animation: e11FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e11-draw { stroke-dasharray: 400; animation: e11DrawLine 0.75s ease-out both; }
  .e11-glow { animation: e11Glow 1.8s ease-in-out infinite; }
  .e11-pop  { animation: e11Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e11-float { animation: e11FloatBadge 2.2s ease-in-out infinite; }

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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 11 ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Start with LHS',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'Start with the Left-Hand Side (LHS)',
    callout: 'Target : Prove (cot A - cos A)/(cot A + cos A) = (cosec A - 1)/(cosec A + 1)',
    mathLines: [
      '\\text{To Prove : } \\dfrac{\\cot A - \\cos A}{\\cot A + \\cos A} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}',
      '\\text{Consider right-angled } \\triangle ABC \\text{ with acute angle } \\angle A \\text{ and } \\angle B = 90^\\circ',
      '\\text{LHS} = \\dfrac{\\cot A - \\cos A}{\\cot A + \\cos A}',
      '\\text{Strategy : Convert } \\cot A \\text{ to } \\sin A \\text{ and } \\cos A \\text{ to target } \\operatorname{cosec} A = \\dfrac{1}{\\sin A}'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Quotient Identity',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Replace cot A with cos A / sin A',
    callout: 'cot A = cos A ÷ sin A (Cotangent is Cosine ÷ Sine)',
    mathLines: [
      '\\text{Recall the quotient identity : } \\cot A = \\dfrac{\\cos A}{\\sin A}',
      '\\text{Substitute } \\cot A = \\dfrac{\\cos A}{\\sin A} \\text{ into both numerator and denominator :}',
      '\\text{LHS} = \\dfrac{\\dfrac{\\cos A}{\\sin A} - \\cos A}{\\dfrac{\\cos A}{\\sin A} + \\cos A}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Common Factor',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Extract Common Factor cos A',
    callout: 'Factor out cos A from both Numerator and Denominator',
    mathLines: [
      '\\text{In the numerator, factor out } \\cos A : \\dfrac{\\cos A}{\\sin A} - \\cos A = \\cos A \\left(\\dfrac{1}{\\sin A} - 1\\right)',
      '\\text{In the denominator, factor out } \\cos A : \\dfrac{\\cos A}{\\sin A} + \\cos A = \\cos A \\left(\\dfrac{1}{\\sin A} + 1\\right)',
      '\\text{LHS} = \\dfrac{\\cos A \\left(\\dfrac{1}{\\sin A} - 1\\right)}{\\cos A \\left(\\dfrac{1}{\\sin A} + 1\\right)}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Cancellation',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
    title: 'Cancel the Common Factor cos A',
    callout: 'Cancel cos A ÷ cos A = 1 (valid for cos A ≠ 0)',
    mathLines: [
      '\\text{Divide numerator and denominator by common factor } \\cos A \\quad (\\text{for } \\cos A \\neq 0) :',
      '__CANCELLATION_LINE_EX11__',
      '\\text{LHS} = \\dfrac{\\dfrac{1}{\\sin A} - 1}{\\dfrac{1}{\\sin A} + 1}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Reciprocal Identity',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Use Reciprocal Identity 1 / sin A = cosec A',
    callout: '1 ÷ sin A = cosec A (Hypotenuse ÷ Opposite)',
    mathLines: [
      '\\text{Recall reciprocal identity : } \\dfrac{1}{\\sin A} = \\operatorname{cosec} A',
      '\\text{Substitute } \\operatorname{cosec} A \\text{ into both numerator and denominator :}',
      '\\text{LHS} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Final Identity Proved',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Match the RHS & State Conclusion',
    callout: 'LHS = RHS = (cosec A - 1) ÷ (cosec A + 1) (Hence Proved!)',
    mathLines: [
      '\\text{Compare with given Right-Hand Side : } \\text{RHS} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}',
      '\\text{LHS} = \\text{RHS}',
      '\\mathbf{\\therefore \\dfrac{\\cot A - \\cos A}{\\cot A + \\cos A} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}} \\quad (\\text{Identity Proved Successfully!})'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Deep Conceptual Insight',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Alternative View & 30° Numerical Verification',
    callout: 'Geometric Connection: (1 - sin A)/(1 + sin A) = (AC - BC)/(AC + BC)',
    mathLines: [
      '\\text{Alternative View : Multiply numerator and denominator by } \\sin A :',
      '\\dfrac{\\left(\\dfrac{1}{\\sin A} - 1\\right)\\sin A}{\\left(\\dfrac{1}{\\sin A} + 1\\right)\\sin A} = \\dfrac{1 - \\sin A}{1 + \\sin A} = \\dfrac{AC - BC}{AC + BC} \\quad (\\text{Geometric Ratio})',
      '\\text{Numerical Check at } A = 30^\\circ : \\text{LHS} = \\dfrac{\\sqrt{3} - \\frac{\\sqrt{3}}{2}}{\\sqrt{3} + \\frac{\\sqrt{3}}{2}} = \\dfrac{1}{3}, \\quad \\text{RHS} = \\dfrac{2 - 1}{2 + 1} = \\dfrac{1}{3} \\quad \\checkmark'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS & CHECKPOINTS ─────────── */
const STEP_DETAILS_EX11 = {
  1: {
    title: 'Start with LHS Expression',
    promptSummary: 'State the target identity: $\\dfrac{\\cot A - \\cos A}{\\cot A + \\cos A} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$. Our strategy is converting $\\cot A$ into basic sine and cosine ratios.',
    summary: 'Prove $\\dfrac{\\cot A - \\cos A}{\\cot A + \\cos A} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$. The golden rule of trigonometric proofs is expressing non-basic ratios like $\\cot A$ in terms of basic ratios $\\sin A$ and $\\cos A$.',
    quiz: null
  },
  2: {
    title: 'Apply Quotient Identity cot A = cos A / sin A',
    promptSummary: 'Apply the quotient identity for $\\cot A$ in terms of $\\sin A$ and $\\cos A$ in both numerator and denominator.',
    summary: 'Substitute $\\cot A = \\dfrac{\\cos A}{\\sin A}$ into both numerator and denominator. This creates complex fractions sharing $\\cos A$ in their numerators.',
    quiz: {
      question: 'What is $\\cot A$ expressed in terms of $\\sin A$ and $\\cos A$?',
      options: [
        { id: 'a', text: '$\\cot A = \\dfrac{\\cos A}{\\sin A}$', correct: true, feedback: 'Correct! Cotangent is cosine divided by sine (Adjacent / Opposite).' },
        { id: 'b', text: '$\\cot A = \\dfrac{\\sin A}{\\cos A}$', correct: false, feedback: 'That is tangent (tan A). Cotangent is its reciprocal: cos A / sin A.' }
      ]
    }
  },
  3: {
    title: 'Extract Common Factor cos A',
    promptSummary: 'Inspect both terms in the numerator and denominator. Identify and factor out the common trigonometric factor.',
    summary: 'In numerator: $\\dfrac{\\cos A}{\\sin A} - \\cos A = \\cos A\\left(\\dfrac{1}{\\sin A} - 1\\right)$. In denominator: $\\dfrac{\\cos A}{\\sin A} + \\cos A = \\cos A\\left(\\dfrac{1}{\\sin A} + 1\\right)$.',
    quiz: {
      question: 'What is the common algebraic factor in $\\dfrac{\\cos A}{\\sin A} - \\cos A$?',
      options: [
        { id: 'a', text: '$\\cos A$', correct: true, feedback: 'Spot on! Factoring out cos A leaves (1/sin A - 1).' },
        { id: 'b', text: '$\\sin A$', correct: false, feedback: 'sin A is only in the denominator of the first term; cos A is present in both terms.' }
      ]
    }
  },
  4: {
    title: 'Cancel Common Factor cos A',
    promptSummary: 'Divide both numerator and denominator by the non-zero common factor $\\cos A$ to simplify the expression.',
    summary: 'Divide numerator and denominator by $\\cos A$. Since $\\cos A \\neq 0$ for acute angles where $\\cot A$ is defined, dividing by $\\cos A$ leaves $\\dfrac{\\frac{1}{\\sin A} - 1}{\\frac{1}{\\sin A} + 1}$.',
    quiz: {
      question: 'Why is cancelling $\\cos A$ mathematically valid here?',
      options: [
        { id: 'a', text: 'Dividing numerator & denominator by the same non-zero quantity $\\cos A \\neq 0$ leaves the value unchanged.', correct: true, feedback: 'Brilliant! Non-zero factors cancel cleanly via fraction equivalence.' },
        { id: 'b', text: 'Any factor can always be cancelled even if it is zero.', correct: false, feedback: 'Division by zero is undefined; cancellation strictly requires the factor to be non-zero.' }
      ]
    }
  },
  5: {
    title: 'Use Reciprocal Identity 1 / sin A = cosec A',
    promptSummary: 'Apply the reciprocal identity for $\\dfrac{1}{\\sin A}$ to express the fraction with cosecant.',
    summary: 'Substitute $\\dfrac{1}{\\sin A} = \\operatorname{cosec} A$ into both numerator and denominator to get $\\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$.',
    quiz: {
      question: 'What is the reciprocal trigonometric ratio $\\dfrac{1}{\\sin A}$ equal to?',
      options: [
        { id: 'a', text: '$\\operatorname{cosec} A$', correct: true, feedback: 'Exactly! Cosecant is the reciprocal of sine: 1 / sin A = cosec A.' },
        { id: 'b', text: '$\\sec A$', correct: false, feedback: 'sec A is the reciprocal of cosine: 1 / cos A.' }
      ]
    }
  },
  6: {
    title: 'Final Identity Established (LHS = RHS)',
    promptSummary: 'Compare the simplified Left-Hand Side with the target Right-Hand Side.',
    summary: 'The simplified LHS $\\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$ is identical to the RHS. Hence Proved!',
    quiz: {
      question: 'Does the simplified LHS match the original RHS?',
      options: [
        { id: 'a', text: 'Yes, $\\text{LHS} = \\text{RHS} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$', correct: true, feedback: 'Perfect! The proof is complete and fully verified.' },
        { id: 'b', text: 'No, further squaring is required.', correct: false, feedback: 'No further steps are required; both expressions match exactly.' }
      ]
    }
  },
  7: {
    title: 'Alternative Form & Numerical Check at 30°',
    promptSummary: 'Check the identity numerically at standard angle $A = 30^\\circ$, where $\\cot 30^\\circ = \\sqrt{3}$ and $\\operatorname{cosec} 30^\\circ = 2$.',
    summary: 'Multiplying by $\\sin A$ gives $\\dfrac{1 - \\sin A}{1 + \\sin A} = \\dfrac{AC - BC}{AC + BC}$. At $A = 30^\\circ$, both LHS and RHS equal $\\dfrac{1}{3}$.',
    quiz: {
      question: 'At $A = 30^\\circ$ where $\\cot 30^\\circ = \\sqrt{3}$ and $\\operatorname{cosec} 30^\\circ = 2$, what is the value of $\\dfrac{\\operatorname{cosec} 30^\\circ - 1}{\\operatorname{cosec} 30^\\circ + 1}$?',
      options: [
        { id: 'a', text: '$\\dfrac{2 - 1}{2 + 1} = \\dfrac{1}{3}$', correct: true, feedback: 'Correct! This confirms the identity numerically and geometrically!' },
        { id: 'b', text: '$\\dfrac{1}{2}$', correct: false, feedback: '(2 - 1)/(2 + 1) = 1/3, not 1/2.' }
      ]
    }
  }
}

/* ─────────── SPECIALIZED CANCELLATION COMPONENT (STEP 4) ─────────── */
function AnimatedCancellationLine11() {
  return (
    <div
      className="e11-fade"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        margin: '0.6rem 0',
        fontSize: '1.42rem',
        fontWeight: 700,
        color: '#0f172a'
      }}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Numerator with cancelled cos A */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
            <span style={{ color: '#0284c7', fontFamily: 'KaTeX_Math, serif', fontStyle: 'italic' }}>cos A</span>
            <div style={{
              position: 'absolute',
              left: '-3px',
              right: '-3px',
              top: '50%',
              height: '3px',
              background: '#ef4444',
              transform: 'rotate(-16deg)',
              borderRadius: '2px',
              boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
            }} />
          </div>
          <span>(1/sin A − 1)</span>
        </div>

        <div style={{ width: '190px', height: '2px', background: '#0f172a', margin: '3px 0' }} />

        {/* Denominator with cancelled cos A */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
            <span style={{ color: '#0284c7', fontFamily: 'KaTeX_Math, serif', fontStyle: 'italic' }}>cos A</span>
            <div style={{
              position: 'absolute',
              left: '-3px',
              right: '-3px',
              top: '50%',
              height: '3px',
              background: '#ef4444',
              transform: 'rotate(-16deg)',
              borderRadius: '2px',
              boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
            }} />
          </div>
          <span>(1/sin A + 1)</span>
        </div>
      </div>

      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>=</span>

      <span style={{
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#0284c7'
      }}>
        <MathText text={'$\\dfrac{\\frac{1}{\\sin A} - 1}{\\frac{1}{\\sin A} + 1}$'} />
      </span>

      <span style={{
        fontSize: '0.9rem',
        color: '#059669',
        fontWeight: 800,
        marginLeft: '6px',
        background: '#ecfdf5',
        padding: '3px 10px',
        borderRadius: '20px',
        border: '1px solid #a7f3d0'
      }}>
        cos A cancelled ✓
      </span>
    </div>
  )
}

/* ─────────── SVG TRIANGLE COORDINATES (Spacious & Clean, Just like Example 1) ─────────── */
const Ax = 65, Ay = 185
const Bx = 250, By = 185
const Cx = 250, Cy = 40
const HYP_ANGLE = -38
const HypLabelX = 138
const HypLabelY = 110

const COLOR_ADJ = '#0284c7' // Blue: Base AB (Adjacent to A)
const COLOR_OPP = '#059669' // Green: Perpendicular BC (Opposite to A)
const COLOR_HYP = '#d97706' // Amber: Hypotenuse AC
const COLOR_FINAL = '#10b981' // Emerald Green for final step
const COLOR_MUTED = '#94a3b8'

/* ─────────── ANIMATED STEP TRIANGLE SVG (EXAMPLE 11) ─────────── */
function AnimatedStepTriangle11({
  stepId,
  subStep = 1,
  isCurrent = true,
  callout = ''
}) {
  const isInitial = stepId === 1
  const isQuotient = stepId === 2
  const isCommon = stepId === 3
  const isCancel = stepId === 4
  const isReciprocal = stepId === 5
  const isFinal = stepId === 6
  const isDeep = stepId === 7

  const highlightAdj = isQuotient || isCommon || isCancel || isFinal || isDeep
  const highlightOpp = isQuotient || isReciprocal || isFinal || isDeep
  const highlightHyp = isReciprocal || isFinal || isDeep

  let calloutText = callout
  let badgeBg = '#e0f2fe'
  let badgeColor = '#0369a1'

  if (isInitial) {
    calloutText = subStep === 1 ? 'Right △ABC with ∠A' : 'Target: Prove LHS = RHS'
    badgeBg = '#d1fae5'
    badgeColor = '#065f46'
  } else if (isQuotient) {
    calloutText = 'cot A = cos A ÷ sin A = AB ÷ BC'
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (isCommon) {
    calloutText = 'Extract Common Factor cos A = AB ÷ AC'
    badgeBg = '#ede9fe'
    badgeColor = '#7c3aed'
  } else if (isCancel) {
    calloutText = 'Cancel Common Factor cos A (valid for cos A ≠ 0)'
    badgeBg = '#fff7ed'
    badgeColor = '#ea580c'
  } else if (isReciprocal) {
    calloutText = '1 ÷ sin A = cosec A = AC ÷ BC'
    badgeBg = '#cffafe'
    badgeColor = '#0891b2'
  } else if (isFinal) {
    calloutText = 'LHS = RHS = (cosec A - 1) ÷ (cosec A + 1) (Proven!)'
    badgeBg = '#dcfce7'
    badgeColor = '#15803d'
  } else if (isDeep) {
    calloutText = 'Numerical Check at A = 30° : LHS = RHS = 1/3 ✓'
    badgeBg = '#dcfce7'
    badgeColor = '#16a34a'
  }

  // Dynamic Side Labels for Example 11
  let adjLabel = 'AB (adjacent side)'
  let oppLabel = 'BC (opposite side)'
  let hypLabel = 'AC (hypotenuse)'

  if (isQuotient) {
    adjLabel = 'AB (cos A numerator)'
    oppLabel = 'BC (sin A denominator)'
    hypLabel = 'AC (hypotenuse)'
  } else if (isCommon) {
    adjLabel = 'AB (common factor cos A)'
    oppLabel = 'BC (sin A denominator)'
    hypLabel = 'AC (hypotenuse)'
  } else if (isCancel) {
    adjLabel = 'Cancelled (cos A ÷ cos A = 1)'
    oppLabel = 'BC (sin A term)'
    hypLabel = 'AC (hypotenuse)'
  } else if (isReciprocal) {
    adjLabel = 'AB (adjacent side)'
    oppLabel = 'BC (Opposite = cosec A den)'
    hypLabel = 'AC (Hypotenuse = cosec A num)'
  } else if (isFinal) {
    adjLabel = 'LHS = RHS ✓'
    oppLabel = 'cosec A + 1 (den)'
    hypLabel = 'cosec A - 1 (num)'
  } else if (isDeep) {
    adjLabel = 'AB = √3 k (cot 30° = √3)'
    oppLabel = 'BC = 1k (sin 30° = 1/2)'
    hypLabel = 'AC = 2k (cosec 30° = 2)'
  }

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
      {/* Spacious, Beautiful SVG Triangle - Directly on canvas, ZERO card wrappers */}
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
          <linearGradient id={`triGrad-ex11-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isFinal || isDeep ? 'rgba(16, 185, 129, 0.12)' : (isReciprocal ? 'rgba(8, 145, 178, 0.12)' : 'rgba(2, 132, 199, 0.09)')} />
            <stop offset="100%" stopColor={isFinal || isDeep ? 'rgba(5, 150, 105, 0.03)' : (isReciprocal ? 'rgba(6, 182, 212, 0.02)' : 'rgba(14, 165, 233, 0.02)')} />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={isFinal || isDeep ? '#f0fdf4' : `url(#triGrad-ex11-${stepId})`}
          className={isCurrent ? 'e11-fade' : ''}
        />

        {/* Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line
            x1={Ax} y1={Ay} x2={Bx} y2={By}
            stroke={isFinal || isDeep ? COLOR_FINAL : (isCommon ? '#7c3aed' : COLOR_ADJ)}
            strokeWidth="14" strokeLinecap="round" className="e11-glow"
          />
        )}
        {highlightOpp && isCurrent && (
          <line
            x1={Bx} y1={By} x2={Cx} y2={Cy}
            stroke={isFinal || isDeep ? COLOR_FINAL : COLOR_OPP}
            strokeWidth="14" strokeLinecap="round" className="e11-glow"
          />
        )}
        {highlightHyp && isCurrent && (
          <line
            x1={Ax} y1={Ay} x2={Cx} y2={Cy}
            stroke={isFinal || isDeep ? COLOR_FINAL : COLOR_HYP}
            strokeWidth="14" strokeLinecap="round" className="e11-glow"
          />
        )}

        {/* Base AB (Adjacent side) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightAdj ? (isFinal || isDeep ? COLOR_FINAL : (isCommon ? '#7c3aed' : COLOR_ADJ)) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e11-draw' : ''}
        />

        {/* Perpendicular BC (Opposite side) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? (isFinal || isDeep ? COLOR_FINAL : COLOR_OPP) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e11-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={highlightHyp ? (isFinal || isDeep ? COLOR_FINAL : COLOR_HYP) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightHyp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e11-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on active sides */}
        {highlightAdj && isCurrent && (
          <circle r="4" fill={isFinal || isDeep ? COLOR_FINAL : (isCommon ? '#7c3aed' : COLOR_ADJ)}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Bx} ${By}`} />
          </circle>
        )}
        {highlightOpp && isCurrent && (
          <circle r="4" fill={isFinal || isDeep ? COLOR_FINAL : COLOR_OPP}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Bx} ${By} L${Cx} ${Cy}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4" fill={isFinal || isDeep ? COLOR_FINAL : COLOR_HYP}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Cx} ${Cy}`} />
          </circle>
        )}

        {/* Right Angle Symbol at B */}
        <rect
          x={Bx - 16} y={By - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke={isFinal || isDeep ? COLOR_FINAL : '#0284c7'}
          strokeWidth="1.8"
          className={isCurrent ? 'e11-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Ax} cy={Ay} r="5" fill={isFinal || isDeep ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e11-pop' : ''} />
        <circle cx={Bx} cy={By} r="5" fill={isFinal || isDeep ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e11-pop' : ''} />
        <circle cx={Cx} cy={Cy} r="5" fill={isFinal || isDeep ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e11-pop' : ''} />

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
          className={isCurrent ? 'e11-pop' : ''}
        />
        <text x={Ax + 36} y={Ay - 8} fill="#d97706" fontSize="13" fontWeight="800" fontFamily="Inter">∠A</text>

        {/* Side AB Label (Adjacent) */}
        <text
          x={(Ax + Bx) / 2} y={Ay + 24}
          fill={highlightAdj ? (isFinal || isDeep ? COLOR_FINAL : (isCommon ? '#7c3aed' : COLOR_ADJ)) : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
        >
          {adjLabel}
        </text>

        {/* Side BC Label (Opposite) */}
        <text
          x={Bx + 12} y={(By + Cy) / 2}
          fill={highlightOpp ? (isFinal || isDeep ? COLOR_FINAL : COLOR_OPP) : '#475569'}
          fontSize="13" fontWeight="700" dominantBaseline="middle" fontFamily="Inter"
        >
          {oppLabel}
        </text>

        {/* Side AC Label (Hypotenuse) */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={highlightHyp ? (isFinal || isDeep ? COLOR_FINAL : COLOR_HYP) : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
          transform={`rotate(${HYP_ANGLE}, ${HypLabelX}, ${HypLabelY})`}
          stroke="#ffffff" strokeWidth="3" paintOrder="stroke"
        >
          {hypLabel}
        </text>
      </svg>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example11Tutor({
  onNextExample,
  onPrevExample,
  hasPrev = true,
  hasNext = true,
  initialAtEnd = false
}) {
  const total = STEPS.length
  const [step, setStep] = useState(initialAtEnd ? total : 1)
  const [subStep, setSubStep] = useState(initialAtEnd ? STEPS[total - 1].mathLines.length : 1)

  const clickTimer = useRef(null)
  const scrollContainerRef = useRef(null)
  const rightScrollRef = useRef(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const hasFiredConfetti = useRef(false)

  const currentStepObj = step > 0 ? (STEPS[step - 1] || STEPS[0]) : null
  const currentTotalLines = currentStepObj ? currentStepObj.mathLines.length : 0

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
    if (step === total && subStep === currentTotalLines && !hasFiredConfetti.current) {
      hasFiredConfetti.current = true
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#059669', '#0284c7', '#d97706', '#7c3aed']
      })
    }
  }, [step, subStep, total, currentTotalLines])

  // Forward navigation advances line by line, then moves to next step
  const goNextStep = () => {
    if (step === 0) {
      setStep(1)
      setSubStep(1)
      return
    }
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
    if (step === 0) return
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevTotalLines = STEPS[step - 2].mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalLines)
    } else {
      setStep(0)
      setSubStep(0)
    }
  }

  // Reset to initial step
  const resetToStart = () => {
    setStep(1)
    setSubStep(1)
    setSelectedOptions({})
  }

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

  // Auto-scroll left pane smoothly to new step or newly revealed line
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

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

  // Auto-scroll right pane smoothly to active step
  useEffect(() => {
    const container = rightScrollRef.current
    if (!container) return

    const timer = setTimeout(() => {
      const activeRightStep = container.querySelector(`[data-right-step="${step}"]`)
      if (activeRightStep) {
        activeRightStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 80)

    return () => clearTimeout(timer)
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
        flexDirection: 'column',
        height: 'calc(100vh - 106px)',
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        background: '#ffffff',
        position: 'relative'
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Main Split Body: Left Workspace & Right Timeline */}
      <div style={{
        display: 'flex',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden'
      }}>
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
              {STEPS.slice(0, step).map((s, idx) => {
                const isCurrent = idx === step - 1
                const visibleLines = isCurrent ? s.mathLines.slice(0, subStep) : s.mathLines

                return (
                  <div
                    key={s.id}
                    data-step={s.id}
                    className={isCurrent ? 'e11-fade' : ''}
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

                    {/* Step Diagram (Prominent Animated SVG Triangle directly on canvas, like Example 1) */}
                    <AnimatedStepTriangle11
                      stepId={s.id}
                      subStep={isCurrent ? subStep : s.mathLines.length}
                      isCurrent={isCurrent}
                      callout={s.callout}
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
                      {visibleLines.map((line, lIdx) => {
                        if (line === '__CANCELLATION_LINE_EX11__') {
                          return <AnimatedCancellationLine11 key={lIdx} />
                        }

                        return (
                          <div
                            key={lIdx}
                            data-line={lIdx}
                            className="e11-fade"
                            style={{
                              fontSize: isCurrent ? '1.42rem' : '1.22rem',
                              color: '#0f172a',
                              fontWeight: isCurrent ? 600 : 500,
                              lineHeight: 1.85,
                              textAlign: 'center',
                              scrollMarginBottom: '3.5rem'
                            }}
                          >
                            <MathText text={line.includes('$') ? line : `$${line}$`} />
                          </div>
                        )
                      })}
                    </div>
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
              Example 11 :
            </span>
            <MathText text={'Prove that $\\dfrac{\\cot A - \\cos A}{\\cot A + \\cos A} = \\dfrac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$.'} />
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
              const details = STEP_DETAILS_EX11[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e11-fade' : ''}
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

            {/* COMPLETION CARD AT END OF TIMELINE */}
            {isCompletedAll && (
              <div
                className="e11-fade"
                data-noclick="true"
                style={{
                  marginTop: '1.2rem',
                  padding: '1.4rem 1.6rem',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                  border: '1.5px solid #86efac',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <CheckCircle2 size={22} color="#16a34a" />
                  <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#15803d' }}>
                    Identity Proved Successfully!
                  </div>
                </div>
                <div style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '1.2rem', lineHeight: 1.5 }}>
                  The LHS has been simplified step by step and is identical to RHS.
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={resetToStart}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: '#ffffff',
                      color: '#475569',
                      border: '1.5px solid #cbd5e1',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>Solve Again</span>
                  </button>
                  {hasNext && onNextExample && (
                    <button
                      onClick={onNextExample}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '10px',
                        background: '#16a34a',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Next Example</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
