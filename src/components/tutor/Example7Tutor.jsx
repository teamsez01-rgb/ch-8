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
  @keyframes e7DrawLine {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes e7FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e7Glow {
    0%, 100% { opacity: 0.18; }
    50%      { opacity: 0.65; }
  }
  @keyframes e7Pop {
    0%   { transform: scale(0.65); opacity: 0; }
    70%  { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e7PulseRing {
    0%, 100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.35); }
    50%      { box-shadow: 0 0 0 7px rgba(2, 132, 199, 0); }
  }
  @keyframes e7Typewriter {
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

  .e7-fade { animation: e7FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e7-draw { stroke-dasharray: 400; animation: e7DrawLine 0.75s ease-out both; }
  .e7-glow { animation: e7Glow 1.8s ease-in-out infinite; }
  .e7-pop  { animation: e7Pop 0.4s cubic-bezier(.16,1,.3,1) both; }
  .e7-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e7Typewriter 0.85s steps(42, end) both;
  }
  .e7-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e7-math-line,
  .e7-math-line *,
  .e7-math-line .katex,
  .e7-math-line .katex .text,
  .e7-math-line .katex-html,
  .e7-math-line .katex-base,
  .e7-math-line .math-formula-span,
  .e7-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e7-math-line .katex-html {
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
  .e7-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS (RICH COLORFUL VERTICAL DERIVATIONS) ─────────── */
const STEPS = [
  {
    id: 1,
    label: 'Step 1',
    badge: 'Step 1 : Given Data',
    badgeBg: '#d1fae5',
    title: 'Draw Right Triangle PQR with ∠Q = 90°',
    mathLines: [
      '\\text{Consider right-angled } \\triangle PQR \\text{ with right angle at } Q \\ (\\angle Q = 90^\\circ)',
      '\\mathbf{\\textcolor{#059669}{\\text{Given Side } PQ = 3\\text{ cm}}} \\text{ (Opposite to } \\angle PRQ)',
      '\\mathbf{\\textcolor{#d97706}{\\text{Given Hypotenuse } PR = 6\\text{ cm}}} \\text{ (Opposite to } 90^\\circ)',
      '\\text{Target : Determine acute angles } \\angle PRQ \\text{ and } \\angle QPR'
    ]
  },
  {
    id: 2,
    label: 'Step 2',
    badge: 'Step 2 : Ratio for ∠PRQ',
    badgeBg: '#e0f2fe',
    title: 'Set Up Sine Ratio for Angle PRQ',
    mathLines: [
      '\\text{With reference to acute angle } \\angle PRQ :',
      '\\mathbf{\\textcolor{#059669}{\\text{Side opposite to } \\angle PRQ = PQ = 3\\text{ cm}}}',
      '\\mathbf{\\textcolor{#d97706}{\\text{Hypotenuse} = PR = 6\\text{ cm}}}',
      '\\sin (\\angle PRQ) = \\dfrac{\\text{Side opposite to } \\angle PRQ}{\\text{Hypotenuse}}',
      '\\sin (\\angle PRQ) = \\dfrac{\\mathbf{\\textcolor{#059669}{PQ}}}{\\mathbf{\\textcolor{#d97706}{PR}}}',
      '\\sin (\\angle PRQ) = \\dfrac{\\mathbf{\\textcolor{#059669}{3}}}{\\mathbf{\\textcolor{#d97706}{6}}}',
      '\\mathbf{\\textcolor{#0284c7}{\\sin (\\angle PRQ) = \\dfrac{1}{2}}}'
    ]
  },
  {
    id: 3,
    label: 'Step 3',
    badge: 'Step 3 : Solve ∠PRQ',
    badgeBg: '#ede9fe',
    title: 'Determine Measure of Angle PRQ = 30°',
    mathLines: [
      '\\sin (\\angle PRQ) = \\dfrac{1}{2}',
      '\\text{From standard values table : } \\mathbf{\\textcolor{#059669}{\\sin 30^\\circ = \\dfrac{1}{2}}}',
      '\\sin (\\angle PRQ) = \\sin 30^\\circ',
      '\\mathbf{\\textcolor{#059669}{\\angle PRQ = 30^\\circ}}'
    ]
  },
  {
    id: 4,
    label: 'Step 4',
    badge: 'Step 4 : Angle Sum',
    badgeBg: '#fff7ed',
    title: 'Calculate ∠QPR using Triangle Angle Sum',
    mathLines: [
      '\\text{In } \\triangle PQR, \\text{ the sum of all three angles is } 180^\\circ :',
      '\\angle QPR + \\angle PRQ + \\angle PQR = 180^\\circ',
      '\\angle QPR + \\mathbf{\\textcolor{#059669}{30^\\circ}} + \\mathbf{\\textcolor{#0284c7}{90^\\circ}} = 180^\\circ',
      '\\angle QPR + 120^\\circ = 180^\\circ',
      '\\angle QPR = 180^\\circ - 120^\\circ',
      '\\mathbf{\\textcolor{#7c3aed}{\\angle QPR = 60^\\circ}}'
    ]
  },
  {
    id: 5,
    label: 'Step 5',
    badge: 'Step 5 : Cosine Method',
    badgeBg: '#cffafe',
    title: 'Verify ∠QPR using Cosine Ratio',
    mathLines: [
      '\\text{Alternative Method : with reference to } \\angle QPR :',
      '\\mathbf{\\textcolor{#059669}{\\text{Side adjacent to } \\angle QPR = PQ = 3\\text{ cm}}}',
      '\\mathbf{\\textcolor{#d97706}{\\text{Hypotenuse} = PR = 6\\text{ cm}}}',
      '\\cos (\\angle QPR) = \\dfrac{\\text{Side adjacent to } \\angle QPR}{\\text{Hypotenuse}}',
      '\\cos (\\angle QPR) = \\dfrac{\\mathbf{\\textcolor{#059669}{PQ}}}{\\mathbf{\\textcolor{#d97706}{PR}}}',
      '\\cos (\\angle QPR) = \\dfrac{\\mathbf{\\textcolor{#059669}{3}}}{\\mathbf{\\textcolor{#d97706}{6}}}',
      '\\cos (\\angle QPR) = \\dfrac{1}{2}',
      '\\text{Since } \\mathbf{\\textcolor{#7c3aed}{\\cos 60^\\circ = \\dfrac{1}{2}}} :',
      '\\mathbf{\\textcolor{#7c3aed}{\\angle QPR = 60^\\circ \\quad \\text{(Confirmed!)}}}'
    ]
  },
  {
    id: 6,
    label: 'Step 6',
    badge: 'Step 6 : Side QR',
    badgeBg: '#d1fae5',
    title: 'Calculate Base Side QR using Pythagoras Theorem',
    mathLines: [
      '\\text{In right } \\triangle PQR, \\text{ by Pythagoras Theorem :}',
      '\\mathbf{\\textcolor{#d97706}{PR^2}} = \\mathbf{\\textcolor{#059669}{PQ^2}} + \\mathbf{\\textcolor{#0284c7}{QR^2}}',
      '\\mathbf{\\textcolor{#0284c7}{QR^2}} = \\mathbf{\\textcolor{#d97706}{PR^2}} - \\mathbf{\\textcolor{#059669}{PQ^2}}',
      '\\mathbf{\\textcolor{#0284c7}{QR}} = \\sqrt{\\mathbf{\\textcolor{#d97706}{PR^2}} - \\mathbf{\\textcolor{#059669}{PQ^2}}}',
      '\\mathbf{\\textcolor{#0284c7}{QR}} = \\sqrt{\\mathbf{\\textcolor{#d97706}{6^2}} - \\mathbf{\\textcolor{#059669}{3^2}}}',
      '\\mathbf{\\textcolor{#0284c7}{QR}} = \\sqrt{36 - 9}',
      '\\mathbf{\\textcolor{#0284c7}{QR}} = \\sqrt{27}',
      '\\mathbf{\\textcolor{#0284c7}{QR = 3\\sqrt{3}\\text{ cm}}}'
    ]
  },
  {
    id: 7,
    label: 'Step 7',
    badge: 'Step 7 : Summary',
    badgeBg: '#dcfce7',
    title: 'Final Results & 30°-60°-90° Triangle Insights',
    mathLines: [
      '\\mathbf{\\textcolor{#059669}{\\text{Final Answer : } \\angle PRQ = 30^\\circ \\quad \\text{and} \\quad \\angle QPR = 60^\\circ}}',
      '\\text{Key Geometric Insight for } 30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ \\text{ Triangle :}',
      '\\text{The side opposite to } 30^\\circ \\text{ is always half the hypotenuse :}',
      '\\mathbf{\\textcolor{#059669}{PQ = \\dfrac{1}{2} \\times PR = \\dfrac{1}{2} \\times 6 = 3\\text{ cm}}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP DYNAMIC SUBSTEP EXPLANATIONS & QUIZZES ─────────── */
const STEP_DETAILS_EX7 = {
  1: {
    title: 'Draw Right Triangle PQR with ∠Q = 90°',
    promptSummary: 'Construct right $\\triangle PQR$ with $\\angle Q = 90^\\circ$. We are given $PQ = 3\\text{ cm}$ and Hypotenuse $PR = 6\\text{ cm}$.',
    summary: 'Construct right $\\triangle PQR$ with $\\angle Q = 90^\\circ$. We are given $PQ = 3\\text{ cm}$ and Hypotenuse $PR = 6\\text{ cm}$.',
    quiz: null
  },
  2: {
    title: 'Set Up Sine Ratio for Angle PRQ',
    promptSummary: 'For acute angle $\\angle PRQ$, side $PQ = 3\\text{ cm}$ is Opposite and side $PR = 6\\text{ cm}$ is Hypotenuse. Set up the sine ratio.',
    summary: 'For $\\angle PRQ$, $PQ$ is Opposite and $PR$ is Hypotenuse: $\\sin(\\angle PRQ) = \\dfrac{PQ}{PR} = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
    quiz: {
      question: 'For angle $\\angle PRQ$, side $PQ = 3\\text{ cm}$ is opposite and $PR = 6\\text{ cm}$ is Hypotenuse. What is $\\sin(\\angle PRQ)$?',
      options: [
        { id: 'a', text: '$\\sin(\\angle PRQ) = \\dfrac{3}{6} = \\dfrac{1}{2}$', correct: true, feedback: 'Correct! Sine is Opposite divided by Hypotenuse.' },
        { id: 'b', text: '$\\sin(\\angle PRQ) = \\dfrac{6}{3} = 2$', correct: false, feedback: 'Hypotenuse always belongs in the denominator.' }
      ]
    }
  },
  3: {
    title: 'Determine Measure of Angle PRQ = 30°',
    promptSummary: 'We have calculated $\\sin(\\angle PRQ) = \\dfrac{1}{2}$. Match with the standard trigonometric table values to find acute angle $\\angle PRQ$.',
    summary: 'From standard trigonometric values table, $\\sin 30^\\circ = \\dfrac{1}{2}$. Since $\\sin(\\angle PRQ) = \\dfrac{1}{2}$, we get $\\angle PRQ = 30^\\circ$.',
    quiz: {
      question: 'Since $\\sin(\\angle PRQ) = \\dfrac{1}{2}$, what is the measure of acute angle $\\angle PRQ$?',
      options: [
        { id: 'a', text: '$\\angle PRQ = 30^\\circ$', correct: true, feedback: 'Spot on! From standard angle values, $\\sin 30^\\circ = \\dfrac{1}{2}$.' },
        { id: 'b', text: '$\\angle PRQ = 45^\\circ$', correct: false, feedback: '$\\sin 45^\\circ = \\dfrac{1}{\\sqrt{2}}$, while $\\sin 30^\\circ = \\dfrac{1}{2}$.' }
      ]
    }
  },
  4: {
    title: 'Calculate ∠QPR using Triangle Angle Sum',
    promptSummary: 'In right $\\triangle PQR$, we know $\\angle Q = 90^\\circ$ and $\\angle PRQ = 30^\\circ$. Apply the triangle angle sum property ($180^\\circ$) to calculate $\\angle QPR$.',
    summary: 'The interior angle sum of $\\triangle PQR$ is $180^\\circ$. Therefore, $\\angle QPR = 180^\\circ - (90^\\circ + 30^\\circ) = 60^\\circ$.',
    quiz: {
      question: 'In right $\\triangle PQR$ where $\\angle Q = 90^\\circ$ and $\\angle PRQ = 30^\\circ$, what is $\\angle QPR$?',
      options: [
        { id: 'a', text: '$\\angle QPR = 180^\\circ - 120^\\circ = 60^\\circ$', correct: true, feedback: 'Excellent! The two acute angles in a right triangle are complementary ($30^\\circ + 60^\\circ = 90^\\circ$).' },
        { id: 'b', text: '$\\angle QPR = 45^\\circ$', correct: false, feedback: '$90^\\circ + 30^\\circ + 45^\\circ = 165^\\circ \\ne 180^\\circ$. The answer is $60^\\circ$.' }
      ]
    }
  },
  5: {
    title: 'Verify ∠QPR using Cosine Ratio',
    promptSummary: 'Alternative verification: with reference to acute angle $\\angle QPR$, side $PQ = 3\\text{ cm}$ is Adjacent and $PR = 6\\text{ cm}$ is Hypotenuse. Evaluate the cosine ratio.',
    summary: 'With respect to $\\angle QPR$, $PQ = 3\\text{ cm}$ is adjacent and $PR = 6\\text{ cm}$ is Hypotenuse: $\\cos(\\angle QPR) = \\dfrac{3}{6} = \\dfrac{1}{2} \\implies \\angle QPR = 60^\\circ$.',
    quiz: {
      question: 'For angle $\\angle QPR$, side $PQ = 3\\text{ cm}$ is adjacent. What is $\\cos(\\angle QPR)$?',
      options: [
        { id: 'a', text: '$\\cos(\\angle QPR) = \\dfrac{PQ}{PR} = \\dfrac{3}{6} = \\dfrac{1}{2}$', correct: true, feedback: 'Correct! Cosine is Adjacent divided by Hypotenuse, and $\\cos 60^\\circ = \\dfrac{1}{2}$.' },
        { id: 'b', text: '$\\cos(\\angle QPR) = \\dfrac{6}{3} = 2$', correct: false, feedback: 'Cosine cannot exceed 1. Hypotenuse is in the denominator.' }
      ]
    }
  },
  6: {
    title: 'Find Base Side QR using Pythagoras Theorem',
    promptSummary: 'In right $\\triangle PQR$, hypotenuse $PR = 6\\text{ cm}$ and perpendicular side $PQ = 3\\text{ cm}$. Apply Pythagoras Theorem $PR^2 = PQ^2 + QR^2$ to determine base side $QR$.',
    summary: 'Using $PR^2 = PQ^2 + QR^2$, we calculate $QR = \\sqrt{6^2 - 3^2} = \\sqrt{27} = 3\\sqrt{3}\\text{ cm}$.',
    quiz: {
      question: 'What is the length of base side $QR$ calculated using Pythagoras Theorem?',
      options: [
        { id: 'a', text: '$QR = \\sqrt{6^2 - 3^2} = \\sqrt{27} = 3\\sqrt{3}\\text{ cm}$', correct: true, feedback: 'Spot on! $36 - 9 = 27$ and $\\sqrt{27} = 3\\sqrt{3}$.' },
        { id: 'b', text: '$QR = \\sqrt{6^2 + 3^2} = \\sqrt{45}\\text{ cm}$', correct: false, feedback: 'Hypotenuse squared is subtracted when solving for a leg: $PR^2 - PQ^2$.' }
      ]
    }
  },
  7: {
    title: 'Final Results & 30°-60°-90° Triangle Insights',
    promptSummary: 'Final Answer: $\\angle PRQ = 30^\\circ$ and $\\angle QPR = 60^\\circ$. Observe the geometric relation between side $PQ = 3\\text{ cm}$ opposite $30^\\circ$ and Hypotenuse $PR = 6\\text{ cm}$.',
    summary: 'Final Answer: $\\angle PRQ = 30^\\circ$ and $\\angle QPR = 60^\\circ$. Key insight: in any $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle, the side opposite $30^\\circ$ is always half the Hypotenuse ($3\\text{ cm} = \\frac{1}{2} \\times 6\\text{ cm}$).',
    quiz: {
      question: 'In any $30^\\circ$-$60^\\circ$-$90^\\circ$ right triangle, what is the ratio of the side opposite $30^\\circ$ to the Hypotenuse?',
      options: [
        { id: 'a', text: 'It is always exactly half $\\left(\\dfrac{1}{2}\\right)$ the Hypotenuse', correct: true, feedback: 'Brilliant! Because $\\sin 30^\\circ = \\dfrac{1}{2}$, this ratio holds universally!' },
        { id: 'b', text: 'It is equal to the Hypotenuse', correct: false, feedback: 'The hypotenuse is always the strictly longest side.' }
      ]
    }
  }
}

/* ─────────── DYNAMIC SVG RIGHT TRIANGLE DIAGRAM (EXAMPLE 7 WITH MOTION) ─────────── */
function AnimatedStepTriangle7({
  stepId,
  subStep = 3,
  isCurrent = true
}) {
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  const isBasic = stepId === 1
  const isRatioR = stepId === 2
  const isSolveR = stepId === 3
  const isAngleSum = stepId === 4
  const isCosP = stepId === 5
  const isSideQR = stepId === 6
  const isSummary = stepId === 7

  const rSolved = stepId >= 3
  const pSolved = stepId >= 4
  const qrSolved = stepId >= 6

  // Coordinates for Right Triangle PQR (Q = 90° at bottom-left)
  // True 30°-60°-90° geometry with ample padding on all 4 sides
  const Qx = 115, Qy = 175
  const Rx = 340, Ry = 175
  const Px = 115, Py = 45

  // Side highlights based on step & subStep
  const highlightOpp =
    (isBasic && (subStep >= 4 || !isCurrent)) ||
    (isRatioR && (subStep >= 4 || !isCurrent)) ||
    isSolveR ||
    (isCosP && (subStep >= 4 || !isCurrent)) ||
    (isSideQR && (subStep >= 4 || !isCurrent)) ||
    isSummary

  const highlightAdj =
    (isSideQR && (subStep >= 5 || !isCurrent)) ||
    (isCosP && (subStep >= 4 || !isCurrent)) ||
    isSummary

  const highlightHyp =
    (isBasic && (subStep >= 5 || !isCurrent)) ||
    (isRatioR && (subStep >= 5 || !isCurrent)) ||
    isSolveR ||
    (isCosP && (subStep >= 5 || !isCurrent)) ||
    (isSideQR && (subStep >= 4 || !isCurrent)) ||
    isSummary

  const COLOR_OPP = '#059669' // Emerald Green for PQ (3 cm)
  const COLOR_ADJ = '#0284c7' // Sky Blue for QR (3√3 cm)
  const COLOR_HYP = '#d97706' // Amber / Orange for PR (6 cm)
  const COLOR_MUTED = '#94a3b8'

  // Dynamic opacities
  let oppOpacity = 1
  let adjOpacity = 1
  let hypOpacity = 1

  if (isRatioR) {
    if (subStep <= 3) {
      oppOpacity = 1
      hypOpacity = 1
      adjOpacity = 0.25
    } else if (subStep === 4) {
      oppOpacity = 1
      hypOpacity = 0.35
      adjOpacity = 0.2
    } else if (subStep >= 5) {
      oppOpacity = 1
      hypOpacity = 1
      adjOpacity = 0.2
    }
  } else if (isCosP) {
    if (subStep <= 3) {
      oppOpacity = 1
      hypOpacity = 1
      adjOpacity = 0.25
    } else if (subStep === 4) {
      oppOpacity = 1
      hypOpacity = 0.35
      adjOpacity = 0.2
    } else if (subStep >= 5) {
      oppOpacity = 1
      hypOpacity = 1
      adjOpacity = 0.2
    }
  } else if (isAngleSum) {
    oppOpacity = 0.45
    hypOpacity = 0.45
    adjOpacity = 0.35
  }

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
        viewBox="0 0 420 230"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: '270px',
          display: 'block',
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`triGrad7-${stepId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
        </defs>

        {/* Triangle Shaded Area */}
        <polygon
          points={`${Qx},${Qy} ${Rx},${Ry} ${Px},${Py}`}
          fill={isSummary ? '#f0fdf4' : `url(#triGrad7-${stepId})`}
          className={isCurrent ? 'e7-fade' : ''}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Dynamic Glow Effects on Active Sides */}
        {highlightOpp && isCurrent && (
          <line x1={Qx} y1={Qy} x2={Px} y2={Py} stroke={COLOR_OPP} strokeWidth="14" strokeLinecap="round" className="e7-glow" />
        )}
        {highlightAdj && isCurrent && (
          <line x1={Qx} y1={Qy} x2={Rx} y2={Ry} stroke={COLOR_ADJ} strokeWidth="14" strokeLinecap="round" className="e7-glow" />
        )}
        {highlightHyp && isCurrent && (
          <line x1={Px} y1={Py} x2={Rx} y2={Ry} stroke={COLOR_HYP} strokeWidth="14" strokeLinecap="round" className="e7-glow" />
        )}

        {/* Motion Particles on Active Highlighted Sides */}
        {highlightOpp && isCurrent && (
          <circle r="4.5" fill={COLOR_OPP} style={{ filter: 'drop-shadow(0 0 4px #059669)' }}>
            <animateMotion dur="2.0s" repeatCount="indefinite" path={`M${Qx} ${Qy} L${Px} ${Py}`} />
          </circle>
        )}
        {highlightAdj && isCurrent && (
          <circle r="4.5" fill={COLOR_ADJ} style={{ filter: 'drop-shadow(0 0 4px #0284c7)' }}>
            <animateMotion dur="2.4s" repeatCount="indefinite" path={`M${Qx} ${Qy} L${Rx} ${Ry}`} />
          </circle>
        )}
        {highlightHyp && isCurrent && (
          <circle r="4.5" fill={COLOR_HYP} style={{ filter: 'drop-shadow(0 0 4px #d97706)' }}>
            <animateMotion dur="2.6s" repeatCount="indefinite" path={`M${Px} ${Py} L${Rx} ${Ry}`} />
          </circle>
        )}

        {/* Vertical Leg PQ (3 cm) */}
        <line
          x1={Qx} y1={Qy} x2={Px} y2={Py}
          stroke={highlightOpp ? COLOR_OPP : '#334155'}
          strokeWidth={highlightOpp ? 4.5 : 2.8}
          strokeLinecap="round"
          opacity={oppOpacity}
          className={isCurrent ? 'e7-draw' : ''}
        />

        {/* Base Leg QR (3√3 cm) */}
        <line
          x1={Qx} y1={Qy} x2={Rx} y2={Ry}
          stroke={highlightAdj ? COLOR_ADJ : (qrSolved ? COLOR_ADJ : COLOR_MUTED)}
          strokeWidth={highlightAdj ? 4.5 : 2.8}
          strokeLinecap="round"
          strokeDasharray={qrSolved ? 'none' : '6 4'}
          opacity={adjOpacity}
          className={isCurrent ? 'e7-draw' : ''}
          style={{ animationDelay: '0.12s' }}
        />

        {/* Hypotenuse PR (6 cm) */}
        <line
          x1={Px} y1={Py} x2={Rx} y2={Ry}
          stroke={highlightHyp ? COLOR_HYP : COLOR_MUTED}
          strokeWidth={highlightHyp ? 4.5 : 2.8}
          strokeLinecap="round"
          opacity={hypOpacity}
          className={isCurrent ? 'e7-draw' : ''}
          style={{ animationDelay: '0.24s' }}
        />

        {/* Right Angle Symbol at Q (90°) */}
        <path
          d={`M ${Qx} ${Qy - 18} L ${Qx + 18} ${Qy - 18} L ${Qx + 18} ${Qy}`}
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.2"
        />

        {/* Active Angle Glow Effects */}
        {(isRatioR || isSolveR) && isCurrent && (
          <path
            d="M 302 175 A 38 38 0 0 1 307.1 156"
            fill="none"
            stroke="#059669"
            strokeWidth="10"
            strokeLinecap="round"
            className="e7-glow"
          />
        )}
        {(isAngleSum || isCosP) && isCurrent && (
          <path
            d="M 115 83 A 38 38 0 0 0 134 78"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="10"
            strokeLinecap="round"
            className="e7-glow"
          />
        )}

        {/* Angle Sector & Arc at R (∠PRQ = 30°) */}
        <path
          d={`M ${Rx} ${Ry} L 302 175 A 38 38 0 0 1 307.1 156 Z`}
          fill={rSolved ? 'rgba(5, 150, 105, 0.12)' : 'rgba(234, 88, 12, 0.08)'}
          stroke="none"
        />
        <path
          d="M 302 175 A 38 38 0 0 1 307.1 156"
          fill="none"
          stroke={rSolved ? '#059669' : '#ea580c'}
          strokeWidth={rSolved ? '3' : '2.2'}
          strokeLinecap="round"
          className={rSolved ? 'e7-pop' : ''}
        />

        {/* Angle Sector & Arc at P (∠QPR = 60°) */}
        <path
          d={`M ${Px} ${Py} L 115 83 A 38 38 0 0 0 134 78 Z`}
          fill={pSolved ? 'rgba(124, 58, 237, 0.12)' : 'rgba(148, 163, 184, 0.08)'}
          stroke="none"
        />
        <path
          d="M 115 83 A 38 38 0 0 0 134 78"
          fill="none"
          stroke={pSolved ? '#7c3aed' : '#94a3b8'}
          strokeWidth={pSolved ? '3' : '2.2'}
          strokeLinecap="round"
          className={pSolved ? 'e7-pop' : ''}
        />

        {/* Angle Labels (Positioned with 34px clearance from arc and crisp white halo so text NEVER touches arcs) */}
        <text
          x={268}
          y={163}
          textAnchor="middle"
          fill={rSolved ? '#059669' : '#ea580c'}
          fontSize="15"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
          stroke="#ffffff"
          strokeWidth="4"
          paintOrder="stroke fill"
          className={rSolved ? 'e7-pop' : ''}
        >
          {rSolved ? '30°' : '∠R'}
        </text>

        <text
          x={144}
          y={100}
          textAnchor="middle"
          fill={pSolved ? '#7c3aed' : '#64748b'}
          fontSize="15"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
          stroke="#ffffff"
          strokeWidth="4"
          paintOrder="stroke fill"
          className={pSolved ? 'e7-pop' : ''}
        >
          {pSolved ? '60°' : '∠P'}
        </text>

        {/* Vertices Dots & Labels */}
        {/* Vertex Q */}
        <circle cx={Qx} cy={Qy} r="5.5" fill="#0284c7" />
        <text
          x={Qx - 16}
          y={Qy + 22}
          fill="#0f172a"
          fontSize="15"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
        >
          Q (90°)
        </text>

        {/* Vertex R */}
        <circle cx={Rx} cy={Ry} r="5.5" fill="#ea580c" />
        <text
          x={Rx + 12}
          y={Ry + 5}
          fill="#0f172a"
          fontSize="15"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
        >
          R
        </text>

        {/* Vertex P */}
        <circle cx={Px} cy={Py} r="5.5" fill="#0284c7" />
        <text
          x={Px - 20}
          y={Py - 4}
          fill="#0f172a"
          fontSize="15"
          fontWeight="800"
          fontFamily='"Inter", sans-serif'
        >
          P
        </text>

        {/* Side Labels */}
        {/* PQ Label - Ample left margin, never clipped */}
        <text
          x={Qx - 14}
          y={(Qy + Py) / 2 + 4}
          textAnchor="end"
          fill={COLOR_OPP}
          fontSize="14"
          fontWeight="700"
          fontFamily='"Inter", sans-serif'
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          PQ = 3 cm
        </text>

        {/* PR Hypotenuse Label */}
        <text
          x={(Px + Rx) / 2 + 16}
          y={(Py + Ry) / 2 - 10}
          fill={COLOR_HYP}
          fontSize="14"
          fontWeight="700"
          fontFamily='"Inter", sans-serif'
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
        >
          PR = 6 cm (hyp)
        </text>

        {/* QR Base Label */}
        <text
          x={(Qx + Rx) / 2}
          y={Qy + 24}
          textAnchor="middle"
          fill={qrSolved ? COLOR_ADJ : COLOR_MUTED}
          fontSize="14"
          fontWeight="700"
          fontFamily='"Inter", sans-serif'
          stroke="#ffffff"
          strokeWidth="3.5"
          paintOrder="stroke fill"
          className={qrSolved ? 'e7-pop' : ''}
        >
          {qrSolved ? 'QR = 3√3 cm' : 'QR = ?'}
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
      className="e7-math-line"
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
        className={isTyping ? 'e7-typewriter' : ''}
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
export default function Example7Tutor({
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
                    className={isCurrent ? 'e7-fade' : ''}
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
                      <div className={isCurrent && subStep === 2 ? 'e7-fade' : ''} style={{ width: '100%' }}>
                        <AnimatedStepTriangle7
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

                          return (
                            <div
                              key={lIdx}
                              data-latest-line={isLatest ? "true" : undefined}
                              className="e7-math-line"
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
            Example 7 :
          </span>
          <MathText text={'In $\\Delta PQR$, right-angled at $Q$, $PQ = 3\\text{ cm}$ and $PR = 6\\text{ cm}$. Determine $\\angle QPR$ and $\\angle PRQ$.'} />
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
              const details = STEP_DETAILS_EX7[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)
              const stepDescription = isCurrent ? (details.promptSummary || details.summary) : details.summary

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e7-fade' : ''}
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
                      fontSize: '1.02rem',
                      lineHeight: '1.7',
                      color: isCurrent ? '#1e293b' : '#64748b',
                      fontWeight: isCurrent ? 500 : 400
                    }}>
                      <MathText text={stepDescription} />
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
