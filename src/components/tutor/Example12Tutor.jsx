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
  @keyframes e12DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e12FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e12Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.65; }
  }
  @keyframes e12Pop {
    0%   { transform: scale(0.65); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e12PulseRing {
    0%   { r: 6; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 24; opacity: 0; stroke-width: 0.5; }
  }
  @keyframes e12FloatBadge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }

  .e12-fade { animation: e12FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e12-draw { stroke-dasharray: 400; animation: e12DrawLine 0.75s ease-out both; }
  .e12-glow { animation: e12Glow 1.8s ease-in-out infinite; }
  .e12-pop  { animation: e12Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e12-float { animation: e12FloatBadge 2.2s ease-in-out infinite; }

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

/* ─────────── 8 NCERT MATHEMATICAL STEPS FOR EXAMPLE 12 ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Start with LHS',
    badgeColor: '#065f46',
    badgeBg: '#d1fae5',
    title: 'State the Given Identity & Analyze LHS',
    callout: 'Target : Prove LHS = 1 / (sec θ - tan θ) using sec² θ = 1 + tan² θ',
    mathLines: [
      'To Prove : $\\dfrac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\dfrac{1}{\\sec \\theta - \\tan \\theta}$',
      'Given Identity to Apply : $\\sec^2 \\theta = 1 + \\tan^2 \\theta \\implies \\sec^2 \\theta - \\tan^2 \\theta = 1$',
      '$\\text{LHS} = \\dfrac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1}$'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Convert to sec & tan',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Divide Numerator and Denominator by cos θ',
    callout: 'Divide every term by cos θ to produce tan θ and sec θ',
    mathLines: [
      'Divide numerator and denominator by $\\cos \\theta$ :',
      '$\\text{LHS} = \\dfrac{\\dfrac{\\sin \\theta}{\\cos \\theta} - \\dfrac{\\cos \\theta}{\\cos \\theta} + \\dfrac{1}{\\cos \\theta}}{\\dfrac{\\sin \\theta}{\\cos \\theta} + \\dfrac{\\cos \\theta}{\\cos \\theta} - \\dfrac{1}{\\cos \\theta}}$',
      'Using basic relations : $\\dfrac{\\sin \\theta}{\\cos \\theta} = \\tan \\theta, \\quad \\dfrac{\\cos \\theta}{\\cos \\theta} = 1, \\quad \\dfrac{1}{\\cos \\theta} = \\sec \\theta$',
      '$\\text{LHS} = \\dfrac{\\tan \\theta - 1 + \\sec \\theta}{\\tan \\theta + 1 - \\sec \\theta}$'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Rearrange Terms',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Rearrange Terms in Numerator and Denominator',
    callout: 'Group (tan θ + sec θ) - 1 in Numerator & (tan θ - sec θ) + 1 in Denominator',
    mathLines: [
      'Group terms together in the numerator : $(\\tan \\theta + \\sec \\theta) - 1$',
      'Group terms together in the denominator : $(\\tan \\theta - \\sec \\theta) + 1$',
      '$\\text{LHS} = \\dfrac{(\\tan \\theta + \\sec \\theta) - 1}{(\\tan \\theta - \\sec \\theta) + 1}$'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Conjugate Multiplication',
    badgeColor: '#ea580c',
    badgeBg: '#fff7ed',
    title: 'Multiply Numerator and Denominator by (tan θ - sec θ)',
    callout: 'Multiply num & den by (tan θ - sec θ) to trigger difference of squares',
    mathLines: [
      'Multiply both numerator and denominator by $(\\tan \\theta - \\sec \\theta)$ :',
      '$\\text{LHS} = \\dfrac{\\{(\\tan \\theta + \\sec \\theta) - 1\\}(\\tan \\theta - \\sec \\theta)}{\\{(\\tan \\theta - \\sec \\theta) + 1\\}(\\tan \\theta - \\sec \\theta)}$'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Difference of Squares',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Apply Identity : (tan θ + sec θ)(tan θ - sec θ) = tan² θ - sec² θ = -1',
    callout: 'tan² θ - sec² θ = -1 (since sec² θ = 1 + tan² θ)',
    mathLines: [
      'Expand numerator : $(\\tan \\theta + \\sec \\theta)(\\tan \\theta - \\sec \\theta) = \\tan^2 \\theta - \\sec^2 \\theta$',
      'From identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta \\implies \\tan^2 \\theta - \\sec^2 \\theta = -1$',
      'Numerator becomes : $(-1) - (\\tan \\theta - \\sec \\theta) = -1 - \\tan \\theta + \\sec \\theta = -(\\tan \\theta - \\sec \\theta + 1)$',
      '$\\text{LHS} = \\dfrac{-(\\tan \\theta - \\sec \\theta + 1)}{\\{\\tan \\theta - \\sec \\theta + 1\\}(\\tan \\theta - \\sec \\theta)}$'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Bracket Cancellation',
    badgeColor: '#d97706',
    badgeBg: '#fef3c7',
    title: 'Cancel Common Factor (tan θ - sec θ + 1)',
    callout: 'Cancel identical polynomial (tan θ - sec θ + 1) in num & den',
    mathLines: [
      'Divide numerator and denominator by the identical common bracket $(\\tan \\theta - \\sec \\theta + 1)$ :',
      '__CANCELLATION_LINE_EX12__',
      '$\\text{LHS} = \\dfrac{-1}{\\tan \\theta - \\sec \\theta}$'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Match RHS',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Absorb Negative Sign in Denominator : 1 / (sec θ - tan θ)',
    callout: '-1 ÷ (tan θ - sec θ) = 1 ÷ (sec θ - tan θ) = RHS (Hence Proved!)',
    mathLines: [
      'Absorb the minus sign into the denominator : $-(\\tan \\theta - \\sec \\theta) = \\sec \\theta - \\tan \\theta$',
      '$\\text{LHS} = \\dfrac{1}{\\sec \\theta - \\tan \\theta}$',
      '$\\text{LHS} = \\text{RHS}$',
      '$\\mathbf{\\therefore \\dfrac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\dfrac{1}{\\sec \\theta - \\tan \\theta}} \\quad (\\text{Identity Proved Successfully!})$'
    ]
  },
  {
    id: 8,
    label: 'Step 8',
    badge: 'Step 8 : Method 2 & 30° Check',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Alternative Method 2 (Replace 1 in Numerator) & 30° Numerical Verification',
    callout: 'Board Shortcut: Replace 1 = sec² θ - tan² θ in Numerator & Check at 30°',
    mathLines: [
      'Alternative Method 2 (Classic Board Exam Shortcut) :',
      'Replace $1$ in numerator with $(\\sec^2 \\theta - \\tan^2 \\theta) = (\\sec \\theta - \\tan \\theta)(\\sec \\theta + \\tan \\theta)$',
      'Numerator : $(\\sec \\theta + \\tan \\theta)[1 - (\\sec \\theta - \\tan \\theta)] = (\\sec \\theta + \\tan \\theta)(1 - \\sec \\theta + \\tan \\theta)$',
      'Denominator cancels directly, leaving $\\sec \\theta + \\tan \\theta = \\dfrac{1}{\\sec \\theta - \\tan \\theta} \\quad (\\text{Solved in 3 lines!})$',
      'Numerical Check at $\\theta = 30^\\circ : \\text{LHS} = \\dfrac{\\frac{1}{2} - \\frac{\\sqrt{3}}{2} + 1}{\\frac{1}{2} + \\frac{\\sqrt{3}}{2} - 1} = \\sqrt{3}, \\quad \\text{RHS} = \\dfrac{1}{\\frac{2}{\\sqrt{3}} - \\frac{1}{\\sqrt{3}}} = \\sqrt{3} \\quad \\checkmark$'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS & CHECKPOINTS ─────────── */
const STEP_DETAILS_EX12 = {
  1: {
    title: 'State Identity & Target Formulation',
    promptSummary: 'State the identity to prove: $\\dfrac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\dfrac{1}{\\sec \\theta - \\tan \\theta}$ using identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta$.',
    summary: 'Prove $\\dfrac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\dfrac{1}{\\sec \\theta - \\tan \\theta}$ using identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta$.',
    quiz: null
  },
  2: {
    title: 'Divide Numerator and Denominator by cos θ',
    promptSummary: 'Divide all terms in both numerator and denominator by $\\cos \\theta$ to introduce $\\tan \\theta$ and $\\sec \\theta$.',
    summary: 'Dividing all terms by $\\cos \\theta$ turns $\\sin \\theta / \\cos \\theta$ into $\\tan \\theta$, $\\cos \\theta / \\cos \\theta$ into $1$, and $1 / \\cos \\theta$ into $\\sec \\theta$. Expression becomes $\\dfrac{\\tan \\theta - 1 + \\sec \\theta}{\\tan \\theta + 1 - \\sec \\theta}$.',
    quiz: {
      question: 'Why do we divide both numerator and denominator by $\\cos \\theta$?',
      options: [
        { id: 'a', text: 'Because $\\sin \\theta / \\cos \\theta = \\tan \\theta$ and $1 / \\cos \\theta = \\sec \\theta$, introducing the required ratios directly.', correct: true, feedback: 'Correct! This directly transforms sine/cosine into secant and tangent.' },
        { id: 'b', text: 'Because dividing by $\\cos \\theta$ always eliminates all trigonometric ratios.', correct: false, feedback: 'Dividing by cos θ creates tan θ and sec θ, which are needed in the target identity.' }
      ]
    }
  },
  3: {
    title: 'Rearrange Terms in Numerator and Denominator',
    promptSummary: 'Group positive terms together in the numerator as $(\\tan \\theta + \\sec \\theta) - 1$ to prepare for algebraic manipulation.',
    summary: 'Group the numerator as $(\\tan \\theta + \\sec \\theta) - 1$ and denominator as $(\\tan \\theta - \\sec \\theta) + 1$ to prepare for algebraic conjugation.',
    quiz: {
      question: 'How are terms grouped in the numerator?',
      options: [
        { id: 'a', text: '$(\\tan \\theta + \\sec \\theta) - 1$', correct: true, feedback: 'Spot on! Grouping positive terms allows us to apply difference of squares next.' },
        { id: 'b', text: '$(\\tan \\theta - 1) + \\sec \\theta$', correct: false, feedback: 'Grouping (tan θ + sec θ) together is key to pairing with (tan θ - sec θ).' }
      ]
    }
  },
  4: {
    title: 'Multiply Numerator and Denominator by (tan θ - sec θ)',
    promptSummary: 'Multiply both numerator and denominator by $(\\tan \\theta - \\sec \\theta)$ to trigger a difference of squares in the numerator.',
    summary: 'Multiplying both by $(\\tan \\theta - \\sec \\theta)$ sets up a difference of squares $(\\tan \\theta + \\sec \\theta)(\\tan \\theta - \\sec \\theta) = \\tan^2 \\theta - \\sec^2 \\theta$.',
    quiz: {
      question: 'Why do we multiply by $(\\tan \\theta - \\sec \\theta)$?',
      options: [
        { id: 'a', text: 'To produce difference of squares $(\\tan^2 \\theta - \\sec^2 \\theta)$ in the numerator, which equals $-1$.', correct: true, feedback: 'Brilliant! It creates tan² θ - sec² θ, simplifying the top half.' },
        { id: 'b', text: 'To cancel out the denominator completely in one step.', correct: false, feedback: 'It sets up algebraic simplification in the numerator, not immediate cancellation.' }
      ]
    }
  },
  5: {
    title: 'Apply tan² θ - sec² θ = -1 in Numerator',
    promptSummary: 'From the given identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta$, evaluate the expression $(\\tan^2 \\theta - \\sec^2 \\theta)$.',
    summary: 'Since $\\sec^2 \\theta = 1 + \\tan^2 \\theta$, we have $\\tan^2 \\theta - \\sec^2 \\theta = -1$. The numerator becomes $-1 - (\\tan \\theta - \\sec \\theta) = -(\\tan \\theta - \\sec \\theta + 1)$.',
    quiz: {
      question: 'From the identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta$, what does $\\tan^2 \\theta - \\sec^2 \\theta$ equal?',
      options: [
        { id: 'a', text: '$-1$', correct: true, feedback: 'Exactly! Rearranging 1 + tan² θ = sec² θ gives tan² θ - sec² θ = -1.' },
        { id: 'b', text: '$+1$', correct: false, feedback: 'sec² θ - tan² θ = +1, so tan² θ - sec² θ = -1.' }
      ]
    }
  },
  6: {
    title: 'Cancel Common Bracket (tan θ - sec θ + 1)',
    promptSummary: 'Identify and cancel the common polynomial bracket from both numerator and denominator.',
    summary: 'The bracket $(\\tan \\theta - \\sec \\theta + 1)$ appears in both numerator and denominator! Dividing it out leaves $\\dfrac{-1}{\\tan \\theta - \\sec \\theta}$.',
    quiz: {
      question: 'Which common polynomial factor cancels from numerator and denominator?',
      options: [
        { id: 'a', text: '$(\\tan \\theta - \\sec \\theta + 1)$', correct: true, feedback: 'Correct! The entire polynomial bracket cancels out cleanly.' },
        { id: 'b', text: '$(\\tan \\theta + \\sec \\theta)$', correct: false, feedback: 'The matching bracket in both numerator and denominator is (tan θ - sec θ + 1).' }
      ]
    }
  },
  7: {
    title: 'Absorb Negative Sign: Complete Proof',
    promptSummary: 'Absorb the negative sign into the denominator to match the target Right-Hand Side.',
    summary: 'Multiplying denominator by $-1$ transforms $-(\\tan \\theta - \\sec \\theta)$ into $\\sec \\theta - \\tan \\theta$. Expression becomes $\\dfrac{1}{\\sec \\theta - \\tan \\theta} = \\text{RHS}$.',
    quiz: {
      question: 'What does $\\dfrac{-1}{\\tan \\theta - \\sec \\theta}$ simplify to when the negative sign is absorbed?',
      options: [
        { id: 'a', text: '$\\dfrac{1}{\\sec \\theta - \\tan \\theta}$', correct: true, feedback: 'Perfect! -1 / (tan θ - sec θ) = 1 / (sec θ - tan θ) = RHS!' },
        { id: 'b', text: '$\\dfrac{1}{\\tan \\theta - \\sec \\theta}$', correct: false, feedback: 'Distributing the minus sign flips (tan θ - sec θ) to (sec θ - tan θ).' }
      ]
    }
  },
  8: {
    title: 'Alternative Method 2 & Numerical Check at 30°',
    promptSummary: 'Alternative Method 2: Replace $1$ in the numerator with $(\\sec^2 \\theta - \\tan^2 \\theta)$, and verify numerically at $\\theta = 30^\\circ$.',
    summary: 'In numerator, replace $1 = \\sec^2 \\theta - \\tan^2 \\theta = (\\sec \\theta - \\tan \\theta)(\\sec \\theta + \\tan \\theta)$. Factoring cancels the denominator directly! At $\\theta = 30^\\circ$, $\\text{LHS} = \\text{RHS} = \\sqrt{3}$.',
    quiz: {
      question: 'At $\\theta = 30^\\circ$, what is the numerical value of both LHS and RHS?',
      options: [
        { id: 'a', text: '$\\sqrt{3}$', correct: true, feedback: 'Correct! 1 / (2/√3 - 1/√3) = 1 / (1/√3) = √3. Verified!' },
        { id: 'b', text: '$1 / \\sqrt{3}$', correct: false, feedback: '1 / (1/√3) = √3, not 1/√3.' }
      ]
    }
  }
}

/* ─────────── SPECIALIZED BRACKET CANCELLATION COMPONENT (STEP 6) ─────────── */
function AnimatedCancellationLine12() {
  return (
    <div
      className="e12-fade"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        margin: '0.6rem 0',
        fontSize: '1.38rem',
        fontWeight: 700,
        color: '#0f172a'
      }}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Numerator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>−</span>
          <div style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
            <span style={{ color: '#0284c7' }}>(tan θ − sec θ + 1)</span>
            <div style={{
              position: 'absolute',
              left: '-3px',
              right: '-3px',
              top: '50%',
              height: '3px',
              background: '#ef4444',
              transform: 'rotate(-6deg)',
              borderRadius: '2px',
              boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
            }} />
          </div>
        </div>

        <div style={{ width: '290px', height: '2px', background: '#0f172a', margin: '4px 0' }} />

        {/* Denominator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
            <span style={{ color: '#0284c7' }}>(tan θ − sec θ + 1)</span>
            <div style={{
              position: 'absolute',
              left: '-3px',
              right: '-3px',
              top: '50%',
              height: '3px',
              background: '#ef4444',
              transform: 'rotate(-6deg)',
              borderRadius: '2px',
              boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
            }} />
          </div>
          <span>(tan θ − sec θ)</span>
        </div>
      </div>

      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>=</span>

      <span style={{
        fontSize: '1.32rem',
        fontWeight: 700,
        color: '#0284c7'
      }}>
        <MathText text={'$\\dfrac{-1}{\\tan \\theta - \\sec \\theta}$'} />
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
        Common bracket cancelled ✓
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

const COLOR_ADJ = '#0284c7' // Blue: Base AB (Adjacent to θ)
const COLOR_OPP = '#059669' // Green: Perpendicular BC (Opposite to θ)
const COLOR_HYP = '#d97706' // Amber: Hypotenuse AC
const COLOR_FINAL = '#10b981' // Emerald Green for final step
const COLOR_MUTED = '#94a3b8'

/* ─────────── ANIMATED STEP TRIANGLE SVG (EXAMPLE 12) ─────────── */
function AnimatedStepTriangle12({
  stepId,
  subStep = 1,
  isCurrent = true,
  callout = ''
}) {
  const isInitial = stepId === 1
  const isDivide = stepId === 2
  const isGroup = stepId === 3
  const isConjugate = stepId === 4
  const isIdentity = stepId === 5
  const isCancel = stepId === 6
  const isRHS = stepId === 7
  const isDeep = stepId === 8

  const highlightAdj = isDivide || isGroup || isConjugate || isIdentity || isCancel || isRHS || isDeep
  const highlightOpp = isDivide || isIdentity || isRHS || isDeep
  const highlightHyp = isIdentity || isRHS || isDeep

  let calloutText = callout
  let badgeBg = '#e0f2fe'
  let badgeColor = '#0369a1'

  if (isInitial) {
    calloutText = subStep === 1 ? 'Right △ABC with acute angle θ' : 'Target : Prove LHS = 1 / (sec θ - tan θ)'
    badgeBg = '#d1fae5'
    badgeColor = '#065f46'
  } else if (isDivide) {
    calloutText = 'Divide by cos θ : sin θ / cos θ = tan θ & 1 / cos θ = sec θ'
    badgeBg = '#e0f2fe'
    badgeColor = '#0369a1'
  } else if (isGroup) {
    calloutText = 'Group : (tan θ + sec θ) - 1 in Num & (tan θ - sec θ) + 1 in Den'
    badgeBg = '#ede9fe'
    badgeColor = '#7c3aed'
  } else if (isConjugate) {
    calloutText = 'Multiply num & den by (tan θ - sec θ)'
    badgeBg = '#fff7ed'
    badgeColor = '#ea580c'
  } else if (isIdentity) {
    calloutText = 'tan² θ - sec² θ = -1 (from sec² θ = 1 + tan² θ)'
    badgeBg = '#cffafe'
    badgeColor = '#0891b2'
  } else if (isCancel) {
    calloutText = 'Cancel identical bracket (tan θ - sec θ + 1) in num & den'
    badgeBg = '#fef3c7'
    badgeColor = '#d97706'
  } else if (isRHS) {
    calloutText = '-1 / (tan θ - sec θ) = 1 / (sec θ - tan θ) = RHS (Proven!)'
    badgeBg = '#dcfce7'
    badgeColor = '#15803d'
  } else if (isDeep) {
    calloutText = 'Numerical Check at θ = 30° : LHS = RHS = √3 ✓'
    badgeBg = '#dcfce7'
    badgeColor = '#16a34a'
  }

  // Dynamic Side Labels for Example 12
  let adjLabel = 'AB (adjacent to θ)'
  let oppLabel = 'BC (opposite to θ)'
  let hypLabel = 'AC (hypotenuse)'

  if (isDivide) {
    adjLabel = 'AB (cos θ divider)'
    oppLabel = 'BC (sin θ = opp)'
    hypLabel = 'AC (hypotenuse)'
  } else if (isGroup) {
    adjLabel = 'AB (base for sec & tan)'
    oppLabel = 'BC (tan θ = BC/AB)'
    hypLabel = 'AC (sec θ = AC/AB)'
  } else if (isConjugate) {
    adjLabel = 'AB (common denominator)'
    oppLabel = 'BC (tan θ component)'
    hypLabel = 'AC (sec θ component)'
  } else if (isIdentity) {
    adjLabel = 'AB² (base²)'
    oppLabel = 'BC² - AC² = -AB²'
    hypLabel = 'AC² (sec² θ)'
  } else if (isCancel) {
    adjLabel = 'AB (tan θ - sec θ)'
    oppLabel = 'Cancelled bracket ✓'
    hypLabel = 'AC (hypotenuse)'
  } else if (isRHS) {
    adjLabel = 'LHS = RHS ✓'
    oppLabel = 'BC = tan θ'
    hypLabel = 'AC = sec θ'
  } else if (isDeep) {
    adjLabel = 'AB = √3 k (cos 30° = √3/2)'
    oppLabel = 'BC = 1k (sin 30° = 1/2)'
    hypLabel = 'AC = 2k (sec 30° = 2/√3)'
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
          <linearGradient id={`triGrad-ex12-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isRHS || isDeep ? 'rgba(16, 185, 129, 0.12)' : (isIdentity ? 'rgba(8, 145, 178, 0.12)' : 'rgba(2, 132, 199, 0.09)')} />
            <stop offset="100%" stopColor={isRHS || isDeep ? 'rgba(5, 150, 105, 0.03)' : (isIdentity ? 'rgba(6, 182, 212, 0.02)' : 'rgba(14, 165, 233, 0.02)')} />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill={isRHS || isDeep ? '#f0fdf4' : `url(#triGrad-ex12-${stepId})`}
          className={isCurrent ? 'e12-fade' : ''}
        />

        {/* Glow Effects on Highlighted Sides */}
        {highlightAdj && isCurrent && (
          <line
            x1={Ax} y1={Ay} x2={Bx} y2={By}
            stroke={isRHS || isDeep ? COLOR_FINAL : (isGroup ? '#7c3aed' : COLOR_ADJ)}
            strokeWidth="14" strokeLinecap="round" className="e12-glow"
          />
        )}
        {highlightOpp && isCurrent && (
          <line
            x1={Bx} y1={By} x2={Cx} y2={Cy}
            stroke={isRHS || isDeep ? COLOR_FINAL : COLOR_OPP}
            strokeWidth="14" strokeLinecap="round" className="e12-glow"
          />
        )}
        {highlightHyp && isCurrent && (
          <line
            x1={Ax} y1={Ay} x2={Cx} y2={Cy}
            stroke={isRHS || isDeep ? COLOR_FINAL : COLOR_HYP}
            strokeWidth="14" strokeLinecap="round" className="e12-glow"
          />
        )}

        {/* Base AB (Adjacent side) */}
        <line
          x1={Ax} y1={Ay} x2={Bx} y2={By}
          stroke={highlightAdj ? (isRHS || isDeep ? COLOR_FINAL : (isGroup ? '#7c3aed' : COLOR_ADJ)) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e12-draw' : ''}
        />

        {/* Perpendicular BC (Opposite side) */}
        <line
          x1={Bx} y1={By} x2={Cx} y2={Cy}
          stroke={highlightOpp ? (isRHS || isDeep ? COLOR_FINAL : COLOR_OPP) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightOpp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e12-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse AC */}
        <line
          x1={Ax} y1={Ay} x2={Cx} y2={Cy}
          stroke={highlightHyp ? (isRHS || isDeep ? COLOR_FINAL : COLOR_HYP) : (isInitial ? '#334155' : COLOR_MUTED)}
          strokeWidth={highlightHyp ? 4 : 2.6}
          strokeLinecap="round"
          className={isCurrent ? 'e12-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Animated Particles flowing on active sides */}
        {highlightAdj && isCurrent && (
          <circle r="4" fill={isRHS || isDeep ? COLOR_FINAL : (isGroup ? '#7c3aed' : COLOR_ADJ)}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Bx} ${By}`} />
          </circle>
        )}
        {highlightOpp && isCurrent && (
          <circle r="4" fill={isRHS || isDeep ? COLOR_FINAL : COLOR_OPP}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${Bx} ${By} L${Cx} ${Cy}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4" fill={isRHS || isDeep ? COLOR_FINAL : COLOR_HYP}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${Ax} ${Ay} L${Cx} ${Cy}`} />
          </circle>
        )}

        {/* Right Angle Symbol at B */}
        <rect
          x={Bx - 16} y={By - 16}
          width="16" height="16"
          fill="#ffffff"
          stroke={isRHS || isDeep ? COLOR_FINAL : '#0284c7'}
          strokeWidth="1.8"
          className={isCurrent ? 'e12-pop' : ''}
        />

        {/* Vertex Dots */}
        <circle cx={Ax} cy={Ay} r="5" fill={isRHS || isDeep ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e12-pop' : ''} />
        <circle cx={Bx} cy={By} r="5" fill={isRHS || isDeep ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e12-pop' : ''} />
        <circle cx={Cx} cy={Cy} r="5" fill={isRHS || isDeep ? COLOR_FINAL : '#0284c7'} className={isCurrent ? 'e12-pop' : ''} />

        {/* Vertex Labels */}
        <text x={Ax - 20} y={Ay + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">A</text>
        <text x={Bx + 10} y={By + 6} fill="#0f172a" fontSize="13.5" fontWeight="800" fontFamily="Inter">B (90°)</text>
        <text x={Cx + 10} y={Cy + 6} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">C</text>

        {/* Angle θ Arc */}
        <path
          d={`M${Ax + 28} ${Ay} A28 28 0 0 0 ${Ax + 28 * Math.cos(0.66)} ${Ay - 28 * Math.sin(0.66)}`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.2"
          className={isCurrent ? 'e12-pop' : ''}
        />
        <text x={Ax + 36} y={Ay - 8} fill="#d97706" fontSize="13" fontWeight="800" fontFamily="Inter">θ</text>

        {/* Side AB Label (Adjacent) */}
        <text
          x={(Ax + Bx) / 2} y={Ay + 24}
          fill={highlightAdj ? (isRHS || isDeep ? COLOR_FINAL : (isGroup ? '#7c3aed' : COLOR_ADJ)) : '#475569'}
          fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter"
        >
          {adjLabel}
        </text>

        {/* Side BC Label (Opposite) */}
        <text
          x={Bx + 12} y={(By + Cy) / 2}
          fill={highlightOpp ? (isRHS || isDeep ? COLOR_FINAL : COLOR_OPP) : '#475569'}
          fontSize="13" fontWeight="700" dominantBaseline="middle" fontFamily="Inter"
        >
          {oppLabel}
        </text>

        {/* Side AC Label (Hypotenuse) */}
        <text
          x={HypLabelX} y={HypLabelY}
          fill={highlightHyp ? (isRHS || isDeep ? COLOR_FINAL : COLOR_HYP) : '#475569'}
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
export default function Example12Tutor({
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
                    className={isCurrent ? 'e12-fade' : ''}
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
                    <AnimatedStepTriangle12
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
                        if (line === '__CANCELLATION_LINE_EX12__') {
                          return <AnimatedCancellationLine12 key={lIdx} />
                        }

                        return (
                          <div
                            key={lIdx}
                            data-line={lIdx}
                            className="e12-fade"
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
              Example 12 :
            </span>
            <MathText text={'Prove that $\\dfrac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\dfrac{1}{\\sec \\theta - \\tan \\theta}$, using identity $\\sec^2 \\theta = 1 + \\tan^2 \\theta$.'} />
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
              const details = STEP_DETAILS_EX12[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e12-fade' : ''}
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

            {/* COMPLETION CARD AT END OF TIMELINE */}
            {isCompletedAll && (
              <div
                className="e12-fade"
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
                  The LHS has been transformed using $\sec^2 \theta = 1 + \tan^2 \theta$ and matches RHS.
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
        </div>
      </div>
  )
}

