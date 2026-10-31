import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react'
import { motion } from 'framer-motion'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS & STYLING ─────────── */
const KEYFRAMES = `
  @keyframes e8DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e8FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e8Glow {
    0%, 100% { opacity: 0.2; }
    50%      { opacity: 0.65; }
  }
  @keyframes e8Pop {
    0%   { transform: scale(0.7); opacity: 0; }
    70%  { transform: scale(1.06); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e8PulseRing {
    0%   { r: 7; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 24; opacity: 0; stroke-width: 0.5; }
  }
  @keyframes e8Typewriter {
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

  .e8-fade { animation: e8FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e8-draw { stroke-dasharray: 400; animation: e8DrawLine 0.75s ease-out both; }
  .e8-glow { animation: e8Glow 1.8s ease-in-out infinite; }
  .e8-pop  { animation: e8Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e8-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e8Typewriter 0.85s steps(42, end) both;
  }
  .e8-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e8-math-line,
  .e8-math-line *,
  .e8-math-line .katex,
  .e8-math-line .katex .text,
  .e8-math-line .katex-html,
  .e8-math-line .katex-base,
  .e8-math-line .math-formula-span,
  .e8-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e8-math-line .katex-html {
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
  .e8-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS (STRICTLY VERTICAL) ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Given Data',
    badgeBg: '#d1fae5',
    title: 'Given Equations & Angle Constraints',
    mathLines: [
      '\\text{Given Equation 1 : } \\sin (A - B) = \\dfrac{1}{2}',
      '\\text{Given Equation 2 : } \\cos (A + B) = \\dfrac{1}{2}',
      '\\text{Given Constraint 1 : } 0^\\circ < A + B \\le 90^\\circ \\text{ (Acute sum)}',
      '\\text{Given Constraint 2 : } A > B \\text{ (Positive angle difference)}',
      '\\text{Target : Determine values of acute angles } A \\text{ and } B'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Equation (1)',
    badgeBg: '#e0f2fe',
    title: 'Use sin 30° = 1/2 to Form Equation (1)',
    mathLines: [
      '\\text{We are given : } \\sin (A - B) = \\dfrac{1}{2}',
      '\\text{From standard values table : } \\sin 30^\\circ = \\dfrac{1}{2}',
      '\\sin (A - B) = \\sin 30^\\circ',
      '\\text{Equating the acute angles :}',
      '\\mathbf{\\textcolor{#0284c7}{A - B = 30^\\circ}} \\quad \\text{— (1)}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Equation (2)',
    badgeBg: '#ede9fe',
    title: 'Use cos 60° = 1/2 to Form Equation (2)',
    mathLines: [
      '\\text{We are given : } \\cos (A + B) = \\dfrac{1}{2}',
      '\\text{From standard values table : } \\cos 60^\\circ = \\dfrac{1}{2}',
      '\\cos (A + B) = \\cos 60^\\circ',
      '\\text{Equating the acute angles :}',
      '\\mathbf{\\textcolor{#7c3aed}{A + B = 60^\\circ}} \\quad \\text{— (2)}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Solve for A',
    badgeBg: '#fff7ed',
    title: 'Add Equations (1) and (2) to Find A',
    mathLines: [
      '\\text{Adding equation (1) and equation (2) to eliminate } B :',
      '(A - B) + (A + B) = 30^\\circ + 60^\\circ',
      '__CANCELLATION_LINE_EX8__',
      '2A = 90^\\circ',
      'A = \\dfrac{90^\\circ}{2}',
      '\\mathbf{\\textcolor{#0284c7}{A = 45^\\circ}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Solve for B',
    badgeBg: '#cffafe',
    title: 'Substitute A = 45° into Equation (2) to Find B',
    mathLines: [
      '\\text{Substitute } A = 45^\\circ \\text{ into equation (2) } (A + B = 60^\\circ) :',
      '45^\\circ + B = 60^\\circ',
      'B = 60^\\circ - 45^\\circ',
      '\\mathbf{\\textcolor{#059669}{B = 15^\\circ}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Verification',
    badgeBg: '#d1fae5',
    title: 'Verify All Constraints & Given Values',
    mathLines: [
      '\\text{Check Condition 1 : } A > B',
      '45^\\circ > 15^\\circ \\quad \\text{(Satisfied!)}',
      '\\text{Check Condition 2 : } 0^\\circ < A + B \\le 90^\\circ',
      'A + B = 45^\\circ + 15^\\circ = 60^\\circ \\le 90^\\circ \\quad \\text{(Satisfied!)}',
      '\\text{Check Sine : } \\sin(45^\\circ - 15^\\circ) = \\sin 30^\\circ = \\dfrac{1}{2} \\quad \\text{(Verified!)}',
      '\\text{Check Cosine : } \\cos(45^\\circ + 15^\\circ) = \\cos 60^\\circ = \\dfrac{1}{2} \\quad \\text{(Verified!)}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Summary',
    badgeBg: '#dcfce7',
    title: 'Final Results & Complementary Angles Insights',
    mathLines: [
      '\\mathbf{\\textcolor{#059669}{\\text{Final Answer : } A = 45^\\circ \\quad \\text{and} \\quad B = 15^\\circ}}',
      '\\text{Key Insight : Why is } \\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2} ?',
      '\\text{Because } 30^\\circ + 60^\\circ = 90^\\circ \\text{ (Complementary Angles)}',
      '\\sin(90^\\circ - \\theta) = \\cos \\theta \\implies \\sin 30^\\circ = \\cos 60^\\circ'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS & INTERACTIVE QUIZZES ─────────── */
const STEP_DETAILS_EX8 = {
  1: {
    title: 'Given Equations & Angle Constraints',
    summary: 'We are given $\\sin(A - B) = \\dfrac{1}{2}$, $\\cos(A + B) = \\dfrac{1}{2}$, with constraints $0^\\circ < A + B \\le 90^\\circ$ and $A > B$.',
    promptSummary: 'Given trigonometric equations: $\\sin(A - B) = \\dfrac{1}{2}$ and $\\cos(A + B) = \\dfrac{1}{2}$, with constraints $0^\\circ < A + B \\le 90^\\circ$ and $A > B$.',
    quiz: null
  },
  2: {
    title: 'Use sin 30° = 1/2 to Form Equation (1)',
    summary: 'Since $\\sin(A - B) = \\dfrac{1}{2}$ and $\\sin 30^\\circ = \\dfrac{1}{2}$, equating acute angles yields equation (1): $A - B = 30^\\circ$.',
    promptSummary: 'We are given $\\sin(A - B) = \\dfrac{1}{2}$. Use standard trigonometric table values to evaluate acute angle $(A - B)$.',
    quiz: {
      question: 'Since $\\sin(A - B) = \\dfrac{1}{2}$, what is the value of acute angle $(A - B)$?',
      options: [
        { id: 'a', text: '$A - B = 30^\\circ$ (Because $\\sin 30^\\circ = \\dfrac{1}{2}$)', correct: true, feedback: 'Correct! From standard angle values, $\\sin 30^\\circ = \\dfrac{1}{2}$.' },
        { id: 'b', text: '$A - B = 60^\\circ$', correct: false, feedback: '$\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$, not $\\dfrac{1}{2}$.' }
      ]
    }
  },
  3: {
    title: 'Use cos 60° = 1/2 to Form Equation (2)',
    summary: 'Since $\\cos(A + B) = \\dfrac{1}{2}$ and $\\cos 60^\\circ = \\dfrac{1}{2}$, equating acute angles yields equation (2): $A + B = 60^\\circ$.',
    promptSummary: 'We are given $\\cos(A + B) = \\dfrac{1}{2}$. Use standard trigonometric table values to evaluate acute angle $(A + B)$.',
    quiz: {
      question: 'Since $\\cos(A + B) = \\dfrac{1}{2}$, what is the value of acute angle $(A + B)$?',
      options: [
        { id: 'a', text: '$A + B = 60^\\circ$ (Because $\\cos 60^\\circ = \\dfrac{1}{2}$)', correct: true, feedback: 'Spot on! From standard angle values, $\\cos 60^\\circ = \\dfrac{1}{2}$.' },
        { id: 'b', text: '$A + B = 30^\\circ$', correct: false, feedback: '$\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$, whereas $\\cos 60^\\circ = \\dfrac{1}{2}$.' }
      ]
    }
  },
  4: {
    title: 'Add Equations (1) and (2) to Find A',
    summary: 'Adding $(A - B) + (A + B) = 30^\\circ + 60^\\circ$ eliminates $-B$ and $+B$, yielding $2A = 90^\\circ \\implies A = 45^\\circ$.',
    promptSummary: 'We have two linear equations: (1) $A - B = 30^\\circ$ and (2) $A + B = 60^\\circ$. Add both equations to eliminate $B$ and solve for $A$.',
    quiz: {
      question: 'Adding $(A - B) + (A + B) = 30^\\circ + 60^\\circ$ results in $2A = 90^\\circ$. What is the value of $A$?',
      options: [
        { id: 'a', text: '$A = \\dfrac{90^\\circ}{2} = 45^\\circ$', correct: true, feedback: 'Excellent! Dividing both sides by 2 yields $A = 45^\\circ$.' },
        { id: 'b', text: '$A = 60^\\circ$', correct: false, feedback: '$90^\\circ \\div 2 = 45^\\circ$, not $60^\\circ$.' }
      ]
    }
  },
  5: {
    title: 'Substitute A = 45° into Equation (2) to Find B',
    summary: 'Substituting $A = 45^\\circ$ into $A + B = 60^\\circ$ gives $45^\\circ + B = 60^\\circ \\implies B = 15^\\circ$.',
    promptSummary: 'Substitute the calculated value $A = 45^\\circ$ into equation (2) $A + B = 60^\\circ$ to find angle $B$.',
    quiz: {
      question: 'If $A = 45^\\circ$ and $A + B = 60^\\circ$, what is the measure of angle $B$?',
      options: [
        { id: 'a', text: '$B = 60^\\circ - 45^\\circ = 15^\\circ$', correct: true, feedback: 'Correct! Subtracting 45° from 60° gives $B = 15^\\circ$.' },
        { id: 'b', text: '$B = 30^\\circ$', correct: false, feedback: '$45^\\circ + 30^\\circ = 75^\\circ \\ne 60^\\circ$. The answer is $15^\\circ$.' }
      ]
    }
  },
  6: {
    title: 'Verify All Constraints & Given Values',
    summary: 'Verification: $45^\\circ > 15^\\circ$ (Satisfied), $0^\\circ < 45^\\circ + 15^\\circ = 60^\\circ \\le 90^\\circ$ (Satisfied), $\\sin(30^\\circ) = \\dfrac{1}{2}$, and $\\cos(60^\\circ) = \\dfrac{1}{2}$.',
    promptSummary: 'Check if the calculated angles $A = 45^\\circ$ and $B = 15^\\circ$ satisfy all conditions: $A > B$ and $0^\\circ < A + B \\le 90^\\circ$.',
    quiz: {
      question: 'Do the values $A = 45^\\circ$ and $B = 15^\\circ$ satisfy the constraint $A > B$ and $0^\\circ < A + B \\le 90^\\circ$?',
      options: [
        { id: 'a', text: 'Yes, both conditions are fully satisfied ($45^\\circ > 15^\\circ$ and $60^\\circ \\le 90^\\circ$)', correct: true, feedback: 'Spot on! Both conditions are fully and cleanly validated.' },
        { id: 'b', text: 'No, they violate the constraint', correct: false, feedback: 'Both conditions are strictly satisfied.' }
      ]
    }
  },
  7: {
    title: 'Final Results & Complementary Angles Insights',
    summary: 'Final Answer: $A = 45^\\circ$ and $B = 15^\\circ$. Key Insight: $\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$ because $30^\\circ$ and $60^\\circ$ are complementary angles ($30^\\circ + 60^\\circ = 90^\\circ$).',
    promptSummary: 'Final result: $A = 45^\\circ$ and $B = 15^\\circ$. Observe why $\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$ using complementary angles.',
    quiz: {
      question: 'Why are $\\sin 30^\\circ$ and $\\cos 60^\\circ$ equal to the same value $\\dfrac{1}{2}$?',
      options: [
        { id: 'a', text: 'Because $30^\\circ$ and $60^\\circ$ are complementary angles ($30^\\circ + 60^\\circ = 90^\\circ$)', correct: true, feedback: 'Brilliant! In general, $\\sin \\theta = \\cos(90^\\circ - \\theta)$.' },
        { id: 'b', text: 'Because sine and cosine are always identical', correct: false, feedback: 'They are only equal for complementary angles.' }
      ]
    }
  }
}

/* ─────────── ANIMATED CANCELLATION LINE FOR STEP 4 ─────────── */
function AnimatedCancellationLine8({ isCurrent }) {
  return (
    <div
      className="e8-fade e8-math-line"
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
      <span>(A</span>

      {/* Cancelled -B */}
      <div style={{ position: 'relative', display: 'inline-block', padding: '0 3px' }}>
        <span style={{ color: '#ea580c' }}>- B</span>
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

      <span>) + (A</span>

      {/* Cancelled +B */}
      <div style={{ position: 'relative', display: 'inline-block', padding: '0 3px' }}>
        <span style={{ color: '#ea580c' }}>+ B</span>
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

      <span>) = 30° + 60°</span>
    </div>
  )
}

/* ─────────── ANIMATED DUAL-ANGLE PROTRACTOR & RAY VISUALIZER (EXAMPLE 8) ─────────── */
function AnimatedAngleVisualizer8({
  stepId,
  subStep = 3,
  isCurrent = true
}) {
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  const isDiffActive = stepId === 2 || stepId === 4 || stepId === 6 || stepId === 7
  const isSumActive = stepId === 3 || stepId === 4 || stepId === 6 || stepId === 7
  const isAActive = stepId >= 4
  const isBActive = stepId >= 5

  // Center of protractor canvas
  const Ox = 230, Oy = 205
  const R = 165

  // Exact coordinates for angular rays
  // 0° (Base line)
  const x0 = Ox + R, y0 = Oy
  // 15° (B = 15°)
  const x15 = Ox + R * Math.cos(15 * Math.PI / 180)
  const y15 = Oy - R * Math.sin(15 * Math.PI / 180)
  // 30° (A - B = 30°)
  const x30 = Ox + R * Math.cos(30 * Math.PI / 180)
  const y30 = Oy - R * Math.sin(30 * Math.PI / 180)
  // 45° (A = 45°)
  const x45 = Ox + R * Math.cos(45 * Math.PI / 180)
  const y45 = Oy - R * Math.sin(45 * Math.PI / 180)
  // 60° (A + B = 60°)
  const x60 = Ox + R * Math.cos(60 * Math.PI / 180)
  const y60 = Oy - R * Math.sin(60 * Math.PI / 180)
  // 90°
  const x90 = Ox, y90 = Oy - R

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      margin: '0.4rem 0 1.0rem'
    }}>
      <svg
        viewBox="0 0 460 250"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '270px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`angleGrad8-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Protractor Quarter Arc (0° to 90°) */}
        <path
          d={`M ${Ox} ${Oy} L ${x0} ${y0} A ${R} ${R} 0 0 0 ${x90} ${y90} Z`}
          fill={`url(#angleGrad8-${stepId})`}
          stroke="#cbd5e1"
          strokeWidth="1.5"
          className={isCurrent ? 'e8-fade' : ''}
        />

        {/* Shaded Sector for (A - B = 30°) */}
        {isDiffActive && (
          <path
            d={`M ${Ox} ${Oy} L ${x0} ${y0} A ${R} ${R} 0 0 0 ${x30} ${y30} Z`}
            fill="rgba(2, 132, 199, 0.12)"
            stroke="none"
            className={isCurrent ? 'e8-fade' : ''}
          />
        )}

        {/* Shaded Sector for (A + B = 60°) */}
        {isSumActive && (
          <path
            d={`M ${Ox} ${Oy} L ${x0} ${y0} A ${R} ${R} 0 0 0 ${x60} ${y60} Z`}
            fill="rgba(124, 58, 237, 0.08)"
            stroke="none"
            className={isCurrent ? 'e8-fade' : ''}
          />
        )}

        {/* Glow Effects on Active Rays */}
        {isDiffActive && isCurrent && (
          <line x1={Ox} y1={Oy} x2={x30} y2={y30} stroke="#0284c7" strokeWidth="12" strokeLinecap="round" className="e8-glow" />
        )}
        {isSumActive && isCurrent && (
          <line x1={Ox} y1={Oy} x2={x60} y2={y60} stroke="#7c3aed" strokeWidth="12" strokeLinecap="round" className="e8-glow" />
        )}
        {isAActive && isCurrent && (
          <line x1={Ox} y1={Oy} x2={x45} y2={y45} stroke="#059669" strokeWidth="14" strokeLinecap="round" className="e8-glow" />
        )}
        {isBActive && isCurrent && (
          <line x1={Ox} y1={Oy} x2={x15} y2={y15} stroke="#ea580c" strokeWidth="12" strokeLinecap="round" className="e8-glow" />
        )}

        {/* Base Line (0°) */}
        <line
          x1={Ox} y1={Oy} x2={x0 + 16} y2={y0}
          stroke="#334155"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 90° Normal Ray */}
        <line
          x1={Ox} y1={Oy} x2={x90} y2={y90 - 12}
          stroke="#64748b"
          strokeWidth="2.2"
          strokeDasharray="4 4"
        />

        {/* 15° Ray (Angle B = 15°) */}
        <line
          x1={Ox} y1={Oy} x2={x15} y2={y15}
          stroke={isBActive ? '#ea580c' : '#cbd5e1'}
          strokeWidth={isBActive ? 4 : 2}
          strokeLinecap="round"
          className={isCurrent ? 'e8-draw' : ''}
        />

        {/* 30° Ray (A - B = 30°) */}
        <line
          x1={Ox} y1={Oy} x2={x30} y2={y30}
          stroke={isDiffActive ? '#0284c7' : '#94a3b8'}
          strokeWidth={isDiffActive ? 4.5 : 2.2}
          strokeLinecap="round"
          className={isCurrent ? 'e8-draw' : ''}
        />

        {/* 45° Ray (Angle A = 45°) */}
        <line
          x1={Ox} y1={Oy} x2={x45} y2={y45}
          stroke={isAActive ? '#059669' : '#cbd5e1'}
          strokeWidth={isAActive ? 4.5 : 2}
          strokeLinecap="round"
          className={isCurrent ? 'e8-draw' : ''}
        />

        {/* 60° Ray (A + B = 60°) */}
        <line
          x1={Ox} y1={Oy} x2={x60} y2={y60}
          stroke={isSumActive ? '#7c3aed' : '#94a3b8'}
          strokeWidth={isSumActive ? 4.5 : 2.2}
          strokeLinecap="round"
          className={isCurrent ? 'e8-draw' : ''}
        />

        {/* Ray Head Dots & Labels */}
        {/* 0° Base Label */}
        <text x={x0 + 20} y={y0 + 5} fill="#475569" fontSize="13" fontWeight="700" fontFamily='"Inter", sans-serif'>
          0°
        </text>

        {/* 15° Label (B = 15°) */}
        {isBActive && (
          <g className={isCurrent ? 'e8-pop' : ''}>
            <circle cx={x15} cy={y15} r="4.5" fill="#ea580c" />
            <text x={x15 + 10} y={y15 + 4} fill="#ea580c" fontSize="13" fontWeight="800" fontFamily='"Inter", sans-serif'>
              B = 15°
            </text>
          </g>
        )}

        {/* 30° Label (A - B = 30°) */}
        <circle cx={x30} cy={y30} r="4.5" fill={isDiffActive ? '#0284c7' : '#94a3b8'} />
        <text
          x={x30 + 10}
          y={y30 - 2}
          fill={isDiffActive ? '#0284c7' : '#64748b'}
          fontSize="13"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
        >
          {isDiffActive ? 'A - B = 30°' : '30°'}
        </text>

        {/* 45° Label (A = 45°) */}
        {isAActive && (
          <g className={isCurrent ? 'e8-pop' : ''}>
            <circle cx={x45} cy={y45} r="5" fill="#059669" />
            <text x={x45 + 10} y={y45 - 6} fill="#059669" fontSize="14" fontWeight="800" fontFamily='"Inter", sans-serif'>
              A = 45°
            </text>
          </g>
        )}

        {/* 60° Label (A + B = 60°) */}
        <circle cx={x60} cy={y60} r="4.5" fill={isSumActive ? '#7c3aed' : '#94a3b8'} />
        <text
          x={x60 + 6}
          y={y60 - 10}
          fill={isSumActive ? '#7c3aed' : '#64748b'}
          fontSize="13"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
        >
          {isSumActive ? 'A + B = 60°' : '60°'}
        </text>

        {/* 90° Label */}
        <text x={x90} y={y90 - 18} textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700" fontFamily='"Inter", sans-serif'>
          90°
        </text>

        {/* Origin O */}
        <circle cx={Ox} cy={Oy} r="6" fill="#0284c7" />
        <text x={Ox - 18} y={Oy + 18} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily='"Inter", sans-serif'>
          O
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
      className="e8-math-line"
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
        className={isTyping ? 'e8-typewriter' : ''}
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
export default function Example8Tutor({
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
    } else if (hasNext && onNextExample) {
      onNextExample()
    }
  }

  const goPrevStep = () => {
    if (step === 0) return
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevTotalSubSteps = 2 + STEPS[step - 2].mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalSubSteps)
    } else if (hasPrev && onPrevExample) {
      onPrevExample()
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.closest('input, textarea')) return
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

  const handleOptionSelect = (stepId, optId, isCorrect) => {
    setSelectedOptions(prev => ({ ...prev, [stepId]: optId }))
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#059669', '#0284c7', '#7c3aed', '#10b981']
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
        colors: ['#059669', '#0284c7', '#7c3aed', '#ea580c']
      })
    }
  }, [step, subStep, total, currentTotalSubSteps])

  return (
    <div
      className="main-content"
      onClick={handleContainerClick}
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
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
                    className={isCurrent ? 'e8-fade' : ''}
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

                    {/* Step Diagram */}
                    {showDiagram && (
                      <div className={isCurrent && subStep === 2 ? 'e8-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedAngleVisualizer8
                          stepId={s.id}
                          subStep={isCurrent ? subStep : (2 + s.mathLines.length)}
                          isCurrent={isCurrent}
                        />
                      </div>
                    )}

                    {/* Mathematical Solution Lines (Pure Vertical Layout) */}
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

                          if (line === '__CANCELLATION_LINE_EX8__') {
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
                                <AnimatedCancellationLine8 isCurrent={isCurrent} />
                              </div>
                            )
                          }

                          return (
                            <div
                              key={lIdx}
                              data-latest-line={isLatest ? "true" : undefined}
                              className="e8-math-line"
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
            Example 8 :
          </span>
          <MathText text={'If $\\sin (A - B) = \\dfrac{1}{2}$, $\\cos (A + B) = \\dfrac{1}{2}$, $0^\\circ < A + B \\le 90^\\circ$, $A > B$, find $A$ and $B$.'} />
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
              const details = STEP_DETAILS_EX8[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e8-fade' : ''}
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
