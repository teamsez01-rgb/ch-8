import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Check, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e10DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e10FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e10Glow {
    0%, 100% { opacity: 0.2; }
    50%      { opacity: 0.65; }
  }
  @keyframes e10Pop {
    0%   { transform: scale(0.7); opacity: 0; }
    70%  { transform: scale(1.06); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e10PulseRing {
    0%   { r: 7; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 24; opacity: 0; stroke-width: 0.5; }
  }
  @keyframes e10FloatBadge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }

  .e10-fade { animation: e10FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e10-draw { stroke-dasharray: 400; animation: e10DrawLine 0.75s ease-out both; }
  .e10-glow { animation: e10Glow 1.8s ease-in-out infinite; }
  .e10-pop  { animation: e10Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e10-float { animation: e10FloatBadge 2.2s ease-in-out infinite; }

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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 10 ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Identify Goal',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'State the Identity & Golden Strategy (Convert to sin and cos)',
    callout: 'Target : Prove sec A (1 - sin A)(sec A + tan A) = 1',
    mathLines: [
      '\\text{To Prove : } \\sec A (1 - \\sin A)(\\sec A + \\tan A) = 1',
      '\\text{LHS} = \\sec A (1 - \\sin A)(\\sec A + \\tan A)',
      '\\text{Golden Strategy : Express non-basic ratios } (\\sec A, \\; \\tan A) \\text{ in terms of basic ratios } (\\sin A, \\; \\cos A)'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Express in sin & cos',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Substitute sec A = 1/cos A and tan A = sin A/cos A',
    callout: 'sec A = 1 ÷ cos A  &  tan A = sin A ÷ cos A',
    mathLines: [
      '\\text{Recall reciprocal and quotient relations : } \\sec A = \\dfrac{1}{\\cos A} \\quad \\text{and} \\quad \\tan A = \\dfrac{\\sin A}{\\cos A}',
      '\\text{Substitute these into LHS :}',
      '\\text{LHS} = \\left(\\dfrac{1}{\\cos A}\\right) (1 - \\sin A) \\left(\\dfrac{1}{\\cos A} + \\dfrac{\\sin A}{\\cos A}\\right)'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Common Denominator',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Combine Terms in the Third Factor',
    callout: '(1/cos A + sin A/cos A) = (1 + sin A)/cos A',
    mathLines: [
      '\\text{In the third factor, combine terms over common denominator } \\cos A :',
      '\\dfrac{1}{\\cos A} + \\dfrac{\\sin A}{\\cos A} = \\dfrac{1 + \\sin A}{\\cos A}',
      '\\text{Rewriting the full expression : } \\text{LHS} = \\left(\\dfrac{1 - \\sin A}{\\cos A}\\right) \\left(\\dfrac{1 + \\sin A}{\\cos A}\\right)'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Algebraic Product',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
    title: 'Multiply Numerators : (1 - sin A)(1 + sin A) = 1 - sin² A',
    callout: '(1 - sin A)(1 + sin A) = 1² - sin² A = 1 - sin² A',
    mathLines: [
      '\\text{Using algebraic identity } (x - y)(x + y) = x^2 - y^2 :',
      '(1 - \\sin A)(1 + \\sin A) = 1^2 - \\sin^2 A = 1 - \\sin^2 A',
      '\\text{Denominator product : } \\cos A \\times \\cos A = \\cos^2 A',
      '\\text{LHS} = \\dfrac{1 - \\sin^2 A}{\\cos^2 A}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Identity Substitution',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Use cos² A + sin² A = 1 ⟹ 1 - sin² A = cos² A',
    callout: 'Pythagorean Identity : 1 - sin² A = cos² A',
    mathLines: [
      '\\text{By the fundamental trigonometric identity : } \\cos^2 A + \\sin^2 A = 1',
      '\\text{Rearranging gives : } 1 - \\sin^2 A = \\cos^2 A',
      '\\text{Substitute } \\cos^2 A \\text{ into the numerator :}',
      '\\text{LHS} = \\dfrac{\\cos^2 A}{\\cos^2 A}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Final Cancellation',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Cancel cos² A / cos² A = 1 = RHS',
    callout: 'cos² A ÷ cos² A = 1 = RHS (Proven!)',
    mathLines: [
      '\\text{Divide numerator and denominator by } \\cos^2 A :',
      '__CANCELLATION_LINE_EX10__',
      '\\text{LHS} = 1',
      '\\mathbf{\\text{LHS} = \\text{RHS} = 1} \\quad (\\text{Hence Proved!})'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Method 2 & Summary',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Alternative Method 2 : (sec A - tan A)(sec A + tan A) = 1',
    callout: 'sec² A - tan² A = 1 (Direct 2-Line Proof!)',
    mathLines: [
      '\\text{Alternative Method 2 (Direct Expansion) :}',
      '\\sec A (1 - \\sin A) = \\sec A - \\sec A \\sin A = \\sec A - \\left(\\dfrac{1}{\\cos A}\\right)\\sin A = \\sec A - \\tan A',
      '\\text{Therefore : } (\\sec A - \\tan A)(\\sec A + \\tan A) = \\sec^2 A - \\tan^2 A',
      '\\text{Since } 1 + \\tan^2 A = \\sec^2 A \\implies \\mathbf{\\sec^2 A - \\tan^2 A = 1} \\quad (\\text{Verified in 2 lines!})'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS & CHECKPOINTS ─────────── */
const STEP_DETAILS_EX10 = {
  1: {
    title: 'Identify Goal: Prove Expression Equals 1',
    promptSummary: 'State the identity to prove: $\\sec A (1 - \\sin A)(\\sec A + \\tan A) = 1$. The golden rule is converting non-basic ratios to sine and cosine.',
    summary: 'Prove $\\sec A (1 - \\sin A)(\\sec A + \\tan A) = 1$ by converting all trigonometric ratios into basic sine and cosine terms.',
    quiz: null
  },
  2: {
    title: 'Convert Non-Basic Ratios to sin and cos',
    promptSummary: 'Convert the non-basic ratios $\\sec A$ and $\\tan A$ into their equivalent $\\sin A$ and $\\cos A$ representations.',
    summary: 'Substitute $\\sec A = \\dfrac{1}{\\cos A}$ and $\\tan A = \\dfrac{\\sin A}{\\cos A}$ into the expression.',
    quiz: {
      question: 'What are $\\sec A$ and $\\tan A$ expressed in terms of $\\sin A$ and $\\cos A$?',
      options: [
        { id: 'a', text: '$\\sec A = \\dfrac{1}{\\cos A}$ and $\\tan A = \\dfrac{\\sin A}{\\cos A}$', correct: true, feedback: 'Correct! Converting to basic ratios makes algebraic simplification direct.' },
        { id: 'b', text: '$\\sec A = \\dfrac{1}{\\sin A}$ and $\\tan A = \\dfrac{\\cos A}{\\sin A}$', correct: false, feedback: 'Reciprocal of cosine is secant, and sine over cosine is tangent.' }
      ]
    }
  },
  3: {
    title: 'Combine Third Factor over cos A',
    promptSummary: 'In the third factor $\\left(\\dfrac{1}{\\cos A} + \\dfrac{\\sin A}{\\cos A}\\right)$, combine both terms over their common denominator $\\cos A$.',
    summary: 'Combine the terms inside the second bracket over their common denominator $\\cos A$ to get $\\dfrac{1 + \\sin A}{\\cos A}$.',
    quiz: {
      question: 'Combining $\\dfrac{1}{\\cos A} + \\dfrac{\\sin A}{\\cos A}$ over the common denominator gives:',
      options: [
        { id: 'a', text: '$\\dfrac{1 + \\sin A}{\\cos A}$', correct: true, feedback: 'Spot on! Common denominator $\\cos A$ allows numerators to add directly.' },
        { id: 'b', text: '$\\dfrac{1 + \\sin A}{\\cos^2 A}$', correct: false, feedback: 'When adding fractions with equal denominators, the denominator remains unchanged.' }
      ]
    }
  },
  4: {
    title: 'Multiply Numerators: Difference of Squares',
    promptSummary: 'Multiply the numerators $(1 - \\sin A)(1 + \\sin A)$ using the difference of squares identity $(x - y)(x + y) = x^2 - y^2$.',
    summary: 'Multiply the numerators using difference of squares $(1 - \\sin A)(1 + \\sin A) = 1 - \\sin^2 A$, and multiply denominators to get $\\cos^2 A$.',
    quiz: {
      question: 'Expanding $(1 - \\sin A)(1 + \\sin A)$ using $(x - y)(x + y) = x^2 - y^2$ gives:',
      options: [
        { id: 'a', text: '$1 - \\sin^2 A$', correct: true, feedback: 'Excellent! Product of sum and difference yields difference of squares: $1^2 - \\sin^2 A$.' },
        { id: 'b', text: '$1 + \\sin^2 A$', correct: false, feedback: '$(x - y)(x + y) = x^2 - y^2$, so the middle terms cancel out leaving a minus sign.' }
      ]
    }
  },
  5: {
    title: 'Replace 1 - sin² A with cos² A',
    promptSummary: 'Apply the fundamental Pythagorean identity $\\cos^2 A + \\sin^2 A = 1$ to replace the numerator $(1 - \\sin^2 A)$.',
    summary: 'Apply the Pythagorean identity $\\cos^2 A + \\sin^2 A = 1$ to replace the numerator $1 - \\sin^2 A$ with $\\cos^2 A$.',
    quiz: {
      question: 'From the Pythagorean identity $\\cos^2 A + \\sin^2 A = 1$, what does $1 - \\sin^2 A$ equal?',
      options: [
        { id: 'a', text: '$\\cos^2 A$', correct: true, feedback: 'Brilliant! Transposing $\\sin^2 A$ leaves $\\cos^2 A$ on the other side.' },
        { id: 'b', text: '$\\sin^2 A$', correct: false, feedback: '$1 - \\sin^2 A$ equals $\\cos^2 A$, not $\\sin^2 A$.' }
      ]
    }
  },
  6: {
    title: 'Cancel cos² A to Reach 1 = RHS',
    promptSummary: 'Evaluate the quotient $\\dfrac{\\cos^2 A}{\\cos^2 A}$ by dividing out the common factor.',
    summary: 'Divide out the common factor $\\cos^2 A$ from numerator and denominator, leaving $1 = \\text{RHS}$. Hence proved!',
    quiz: {
      question: 'What does $\\dfrac{\\cos^2 A}{\\cos^2 A}$ simplify to?',
      options: [
        { id: 'a', text: '$1$ (Matches RHS!)', correct: true, feedback: 'Correct! Any non-zero expression divided by itself equals 1.' },
        { id: 'b', text: '$0$', correct: false, feedback: 'Division by itself equals 1, not 0.' }
      ]
    }
  },
  7: {
    title: 'Method 2 (sec² A - tan² A = 1) Insight',
    promptSummary: 'Alternative Method 2: Multiply $\\sec A(1 - \\sin A) = \\sec A - \\tan A$, then use difference of squares $(\\sec A - \\tan A)(\\sec A + \\tan A)$.',
    summary: 'Method 2: $\\sec A(1 - \\sin A) = \\sec A - \\tan A$. Then $(\\sec A - \\tan A)(\\sec A + \\tan A) = \\sec^2 A - \\tan^2 A = 1$. Proved in 2 lines!',
    quiz: {
      question: 'In Method 2, which standard identity directly gives $\\sec^2 A - \\tan^2 A$?',
      options: [
        { id: 'a', text: '$\\sec^2 A - \\tan^2 A = 1$ (From $1 + \\tan^2 A = \\sec^2 A$)', correct: true, feedback: 'Brilliant! Difference of squares immediately gives 1.' },
        { id: 'b', text: '$\\cos^2 A - \\sin^2 A = 1$', correct: false, feedback: 'Method 2 utilizes the secant-tangent identity directly.' }
      ]
    }
  }
}

/* ─────────── SPECIALIZED CANCELLATION COMPONENT (STEP 6) ─────────── */
function AnimatedCancellationLine10() {
  return (
    <div
      className="e10-fade"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        margin: '0.6rem 0',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#0f172a'
      }}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Numerator Cancelled cos² A */}
        <div style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
          <span style={{ color: '#0284c7', fontFamily: 'KaTeX_Math, serif', fontStyle: 'italic' }}>cos² A</span>
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

        <div style={{ width: '60px', height: '2px', background: '#0f172a', margin: '3px 0' }} />

        {/* Denominator Cancelled cos² A */}
        <div style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
          <span style={{ color: '#0284c7', fontFamily: 'KaTeX_Math, serif', fontStyle: 'italic' }}>cos² A</span>
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
      </div>

      <span style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a' }}>=</span>

      <span style={{
        fontSize: '1.8rem',
        fontWeight: 900,
        color: '#16a34a'
      }}>
        1
      </span>

      <span style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#0f172a',
        marginLeft: '4px'
      }}>
        = RHS
      </span>

      <span style={{
        fontSize: '0.92rem',
        color: '#059669',
        fontWeight: 800,
        marginLeft: '8px',
        background: '#ecfdf5',
        padding: '3px 12px',
        borderRadius: '20px',
        border: '1px solid #a7f3d0'
      }}>
        ✓ Proven
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

/* ─────────── ANIMATED STEP TRIANGLE SVG (EXAMPLE 10) ─────────── */
function AnimatedStepTriangle10({
  stepId,
  subStep = 1,
  isCurrent = true,
  callout = ''
}) {
  const isInitial = stepId === 1
  const isConvert = stepId === 2
  const isCombine = stepId === 3
  const isProduct = stepId === 4
  const isPyth = stepId === 5
  const isCancelled = stepId === 6
  const isMethod2 = stepId === 7

  const highlightAdj = isConvert || isCombine || isPyth || isCancelled || isMethod2
  const highlightOpp = isConvert || isProduct || isCancelled || isMethod2
  const highlightHyp = isConvert || isProduct || isPyth || isCancelled || isMethod2

  let calloutText = callout
  let badgeBg = '#e0f2fe'
  let badgeColor = '#0369a1'

  if (isInitial) {
    calloutText = subStep === 1 ? 'Right △ABC with ∠A' : 'Target: Prove sec A(1 - sin A)(sec A + tan A) = 1'
    badgeBg = '#d1fae5'
    badgeColor = '#065f46'
  } else if (isConvert) {
    calloutText = 'sec A = 1 ÷ cos A  &  tan A = sin A ÷ cos A'
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (isCombine) {
    calloutText = 'Common Denominator: cos A (Adjacent Side AB)'
    badgeBg = '#ede9fe'
    badgeColor = '#7c3aed'
  } else if (isProduct) {
    calloutText = '(1 - sin A)(1 + sin A) = 1 - sin² A  [AC² - BC²]'
    badgeBg = '#fff7ed'
    badgeColor = '#ea580c'
  } else if (isPyth) {
    calloutText = 'Pythagoras: AC² - BC² = AB²  ⟹  1 - sin² A = cos² A'
    badgeBg = '#cffafe'
    badgeColor = '#0891b2'
  } else if (isCancelled) {
    calloutText = 'cos² A ÷ cos² A = 1 = RHS (Hence Proved!)'
    badgeBg = '#dcfce7'
    badgeColor = '#15803d'
  } else if (isMethod2) {
    calloutText = 'Identity : 1 + tan² A = sec² A  ⟹  sec² A - tan² A = 1'
    badgeBg = '#dcfce7'
    badgeColor = '#16a34a'
  }

  // Side Labels dynamically linked to Example 10's algebraic identity
  let adjLabel = 'AB (adjacent side)'
  let oppLabel = 'BC (opposite side)'
  let hypLabel = 'AC (hypotenuse)'

  if (isConvert) {
    adjLabel = 'AB (cos A = AB/AC)'
    oppLabel = 'BC (sin A = BC/AC)'
    hypLabel = 'AC (sec A = AC/AB)'
  } else if (isCombine) {
    adjLabel = 'AB (common denominator cos A)'
    oppLabel = 'BC (sin A numerator)'
    hypLabel = 'AC (hypotenuse)'
  } else if (isProduct) {
    adjLabel = 'AB² (cos² A denominator)'
    oppLabel = 'BC² (sin² A)'
    hypLabel = 'AC² (difference of squares)'
  } else if (isPyth) {
    adjLabel = 'AB² = AC² - BC² (cos² A)'
    oppLabel = 'BC (opposite side)'
    hypLabel = 'AC (hypotenuse)'
  } else if (isCancelled) {
    adjLabel = 'AB² (cos² A denominator)'
    oppLabel = 'Cancelled ✓'
    hypLabel = 'AB² (cos² A numerator)'
  } else if (isMethod2) {
    adjLabel = 'AB (adjacent = 1)'
    oppLabel = 'BC = tan A (opp/adj)'
    hypLabel = 'AC = sec A (hyp/adj)'
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
          <linearGradient id={`triGrad-ex10-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isCancelled || isMethod2 ? 'rgba(16, 185, 129, 0.12)' : (isPyth ? 'rgba(8, 145, 178, 0.12)' : 'rgba(2, 132, 199, 0.09)')} />
            <stop offset="100%" stopColor={isCancelled || isMethod2 ? 'rgba(5, 150, 105, 0.03)' : (isPyth ? 'rgba(6, 182, 212, 0.02)' : 'rgba(14, 165, 233, 0.02)')} />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={isCancelled || isMethod2 ? '#f0fdf4' : `url(#triGrad-ex10-${stepId})`}
          className={isCurrent ? 'e10-fade' : ''}
        />

        {/* Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line
            x1={Ax} y1={Ay} x2={Bx} y2={By}
            stroke={isCancelled || isMethod2 ? COLOR_FINAL : (isPyth ? '#0891b2' : COLOR_ADJ)}
            strokeWidth="14" strokeLinecap="round" className="e10-glow"
          />
        )}
        {highlightOpp && isCurrent && (
          <line
            x1={Bx} y1={By} x2={Cx} y2={Cy}
            stroke={isCancelled || isMethod2 ? COLOR_FINAL : COLOR_OPP}
            strokeWidth="14" strokeLinecap="round" className="e10-glow"
          />
        )}
        {highlightHyp && isCurrent && (
          <line
            x1={Ax} y1={Ay} x2={Cx} y2={Cy}
            stroke={isCancelled || isMethod2 ? COLOR_FINAL : COLOR_HYP}
            strokeWidth="14" strokeLinecap="round" className="e10-glow"
          />
        )}

        {/* Base AB (Adjacent side) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightAdj ? (isCancelled || isMethod2 ? COLOR_FINAL : (isPyth ? '#0891b2' : COLOR_ADJ)) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e10-draw' : ''}
        />

        {/* Perpendicular BC (Opposite side) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? (isCancelled || isMethod2 ? COLOR_FINAL : COLOR_OPP) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e10-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={highlightHyp ? (isCancelled || isMethod2 ? COLOR_FINAL : COLOR_HYP) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightHyp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e10-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on active sides */}
        {highlightAdj && isCurrent && (
          <circle r="4" fill={isCancelled || isMethod2 ? COLOR_FINAL : (isPyth ? '#0891b2' : COLOR_ADJ)}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Bx} ${By}`} />
          </circle>
        )}
        {highlightOpp && isCurrent && (
          <circle r="4" fill={isCancelled || isMethod2 ? COLOR_FINAL : COLOR_OPP}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Bx} ${By} L${Cx} ${Cy}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4" fill={isCancelled || isMethod2 ? COLOR_FINAL : COLOR_HYP}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Cx} ${Cy}`} />
          </circle>
        )}

        {/* Right Angle Symbol at B */}
        <rect
          x={Bx - 16} y={By - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke={isCancelled || isMethod2 ? COLOR_FINAL : '#0284c7'}
          strokeWidth="1.8"
          className={isCurrent ? 'e10-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Ax} cy={Ay} r="5" fill={isCancelled || isMethod2 ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e10-pop' : ''} />
        <circle cx={Bx} cy={By} r="5" fill={isCancelled || isMethod2 ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e10-pop' : ''} />
        <circle cx={Cx} cy={Cy} r="5" fill={isCancelled || isMethod2 ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e10-pop' : ''} />

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
          className={isCurrent ? 'e10-pop' : ''}
        />
        <text x={Ax + 36} y={Ay - 8} fill="#d97706" fontSize="13" fontWeight="800" fontFamily="Inter">∠A</text>

        {/* Side AB Label (Adjacent) */}
        <text
          x={(Ax + Bx) / 2} y={Ay + 24}
          fill={highlightAdj ? (isCancelled || isMethod2 ? COLOR_FINAL : (isPyth ? '#0891b2' : COLOR_ADJ)) : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
        >
          {adjLabel}
        </text>

        {/* Side BC Label (Opposite) */}
        <text
          x={Bx + 12} y={(By + Cy) / 2}
          fill={highlightOpp ? (isCancelled || isMethod2 ? COLOR_FINAL : COLOR_OPP) : '#475569'}
          fontSize="13" fontWeight="700" dominantBaseline="middle" fontFamily="Inter"
        >
          {oppLabel}
        </text>

        {/* Side AC Label (Hypotenuse) */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={highlightHyp ? (isCancelled || isMethod2 ? COLOR_FINAL : COLOR_HYP) : '#475569'}
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
export default function Example10Tutor({
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

  // Advance to next line / step
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

  // Go back to previous line / step
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
                  className={isCurrent ? 'e10-fade' : ''}
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
                  <AnimatedStepTriangle10
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
                      if (line === '__CANCELLATION_LINE_EX10__') {
                        return <AnimatedCancellationLine10 key={lIdx} />
                      }

                      return (
                        <div
                          key={lIdx}
                          data-line={lIdx}
                          className="e10-fade"
                          style={{
                            fontSize: isCurrent ? '1.38rem' : '1.22rem',
                            color: '#0f172a',
                            fontWeight: isCurrent ? 600 : 500,
                            lineHeight: 1.85,
                            textAlign: 'center',
                            scrollMarginBottom: '3.5rem',
                            maxWidth: '100%',
                            padding: '0 0.8rem',
                            overflowWrap: 'break-word',
                            wordBreak: 'normal'
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
            Example 10 :
          </span>
          <MathText text={'Prove that $\\sec A (1 - \\sin A)(\\sec A + \\tan A) = 1$.'} />
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
            const details = STEP_DETAILS_EX10[stepNum] || { title: s.title, summary: '', quiz: null }
            const quiz = details.quiz
            const userChoice = selectedOptions[stepNum]
            const selectedOpt = quiz?.options.find(o => o.id === userChoice)

            return (
              <div
                key={`right-step-${stepNum}`}
                data-right-step={stepNum}
                className={isCurrent ? 'e10-fade' : ''}
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

