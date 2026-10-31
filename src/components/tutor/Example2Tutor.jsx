import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Check, CheckCircle2, XCircle } from 'lucide-react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e2FadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes e2GlowPulse {
    0%, 100% { opacity: 0.25; stroke-width: 6; }
    50%      { opacity: 0.85; stroke-width: 10; }
  }
  @keyframes e2PulseRing {
    0%   { r: 8; opacity: 0.95; stroke-width: 3; }
    100% { r: 28; opacity: 0; stroke-width: 0.5; }
  }
  @keyframes e2DashFlow {
    to { stroke-dashoffset: -28; }
  }
  @keyframes e2Typewriter {
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

  .e2-fade { animation: e2FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e2-glow { animation: e2GlowPulse 1.6s ease-in-out infinite; }
  .e2-typewriter {
    display: inline-block;
    white-space: nowrap;
    animation: e2Typewriter 0.85s steps(42, end) both;
  }

  .e2-math-line {
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
  }
  .e2-math-line,
  .e2-math-line *,
  .e2-math-line .katex,
  .e2-math-line .katex .text,
  .e2-math-line .katex-html,
  .e2-math-line .katex-base,
  .e2-math-line .math-formula-span,
  .e2-math-line .math-rendered-text {
    white-space: nowrap !important;
    word-break: keep-all !important;
    overflow-wrap: normal !important;
    text-wrap: nowrap !important;
    flex-wrap: nowrap !important;
  }
  .e2-math-line .katex-html {
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
  .e2-math-line .katex {
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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 2 (COLORFUL & PURE VERTICAL) ─────────── */
const STEPS = [
  {
    id: 1,
    badge: 'Step 1 : Two Triangles',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Consider Two Right Triangles ACB and PRQ',
    mathLines: [
      '\\text{Let us consider two right triangles } \\mathbf{\\textcolor{#0284c7}{\\triangle ACB}} \\text{ and } \\mathbf{\\textcolor{#ea580c}{\\triangle PRQ}}',
      '\\text{Right-angled at } \\mathbf{\\textcolor{#0284c7}{C}} \\text{ and } \\mathbf{\\textcolor{#ea580c}{R}} \\text{ respectively } (\\angle C = \\angle R = 90^\\circ)',
      '\\text{Given in question : } \\mathbf{\\textcolor{#d97706}{\\sin B = \\sin Q}}'
    ]
  },
  {
    id: 2,
    badge: 'Step 2 : Express Sine',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Define and Equate sin B and sin Q',
    mathLines: [
      '\\sin B = \\dfrac{\\text{Side opposite to } \\angle B}{\\text{Hypotenuse}}',
      '\\text{Side opposite to } \\angle B~=~\\mathbf{\\textcolor{#059669}{AC}}',
      '\\text{Hypotenuse}~=~\\mathbf{\\textcolor{#ea580c}{AB}}',
      '\\mathbf{\\textcolor{#0284c7}{\\sin B}} = \\dfrac{\\mathbf{\\textcolor{#059669}{AC}}}{\\mathbf{\\textcolor{#ea580c}{AB}}}',
      '\\sin Q = \\dfrac{\\text{Side opposite to } \\angle Q}{\\text{Hypotenuse}}',
      '\\text{Side opposite to } \\angle Q~=~\\mathbf{\\textcolor{#059669}{PR}}',
      '\\text{Hypotenuse}~=~\\mathbf{\\textcolor{#ea580c}{PQ}}',
      '\\mathbf{\\textcolor{#ea580c}{\\sin Q}} = \\dfrac{\\mathbf{\\textcolor{#059669}{PR}}}{\\mathbf{\\textcolor{#ea580c}{PQ}}}',
      '\\text{Given in question : } \\mathbf{\\textcolor{#d97706}{\\sin B = \\sin Q}}',
      '\\dfrac{\\mathbf{\\textcolor{#059669}{AC}}}{\\mathbf{\\textcolor{#ea580c}{AB}}} = \\dfrac{\\mathbf{\\textcolor{#059669}{PR}}}{\\mathbf{\\textcolor{#ea580c}{PQ}}}'
    ]
  },
  {
    id: 3,
    badge: 'Step 3 : Constant k',
    badgeColor: '#d97706',
    badgeBg: '#fef3c7',
    title: 'Rearrange to Relate Corresponding Sides',
    mathLines: [
      '\\dfrac{\\mathbf{\\textcolor{#059669}{AC}}}{\\mathbf{\\textcolor{#ea580c}{AB}}} = \\dfrac{\\mathbf{\\textcolor{#059669}{PR}}}{\\mathbf{\\textcolor{#ea580c}{PQ}}}',
      '\\text{Cross-swap } \\mathbf{\\textcolor{#ea580c}{AB}} \\longleftrightarrow \\mathbf{\\textcolor{#059669}{PR}} \\text{ (Alternendo Rule) :}',
      '\\dfrac{\\mathbf{\\textcolor{#059669}{AC}}}{\\mathbf{\\textcolor{#059669}{PR}}} = \\dfrac{\\mathbf{\\textcolor{#ea580c}{AB}}}{\\mathbf{\\textcolor{#ea580c}{PQ}}}',
      '\\text{Let } \\dfrac{\\mathbf{\\textcolor{#059669}{AC}}}{\\mathbf{\\textcolor{#059669}{PR}}} = \\dfrac{\\mathbf{\\textcolor{#ea580c}{AB}}}{\\mathbf{\\textcolor{#ea580c}{PQ}}} = \\mathbf{\\textcolor{#2563eb}{k}} \\quad \\text{— (1)}',
      '\\mathbf{\\textcolor{#059669}{AC = k \\cdot PR}}',
      '\\mathbf{\\textcolor{#ea580c}{AB = k \\cdot PQ}}'
    ]
  },
  {
    id: 4,
    badge: 'Step 4 : Pythagoras',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Find Base Sides BC and QR using Pythagoras',
    mathLines: [
      '\\text{In right } \\triangle ACB\\text{, by Pythagoras Theorem :}',
      '\\mathbf{\\textcolor{#ea580c}{AB^2}} = \\mathbf{\\textcolor{#059669}{AC^2}} + \\mathbf{\\textcolor{#0284c7}{BC^2}}',
      '\\mathbf{\\textcolor{#0284c7}{BC^2}} = \\mathbf{\\textcolor{#ea580c}{AB^2}} - \\mathbf{\\textcolor{#059669}{AC^2}}',
      '\\mathbf{\\textcolor{#0284c7}{BC = \\sqrt{AB^2 - AC^2}}}',
      '\\text{Similarly, in right } \\triangle PRQ\\text{, by Pythagoras :}',
      '\\mathbf{\\textcolor{#ea580c}{PQ^2}} = \\mathbf{\\textcolor{#059669}{PR^2}} + \\mathbf{\\textcolor{#0284c7}{QR^2}}',
      '\\mathbf{\\textcolor{#0284c7}{QR^2}} = \\mathbf{\\textcolor{#ea580c}{PQ^2}} - \\mathbf{\\textcolor{#059669}{PR^2}}',
      '\\mathbf{\\textcolor{#0284c7}{QR = \\sqrt{PQ^2 - PR^2}}}'
    ]
  },
  {
    id: 5,
    badge: 'Step 5 : Base Ratio',
    badgeColor: '#2563eb',
    badgeBg: '#dbeafe',
    title: 'Find the Ratio of the Base Sides (BC and QR)',
    mathLines: [
      '\\dfrac{\\mathbf{\\textcolor{#0284c7}{BC}}}{\\mathbf{\\textcolor{#0284c7}{QR}}} = \\dfrac{\\sqrt{\\mathbf{\\textcolor{#ea580c}{AB^2}} - \\mathbf{\\textcolor{#059669}{AC^2}}}}{\\sqrt{\\mathbf{\\textcolor{#ea580c}{PQ^2}} - \\mathbf{\\textcolor{#059669}{PR^2}}}}',
      '\\text{Substitute } \\mathbf{\\textcolor{#ea580c}{AB = k \\cdot PQ}} \\text{ and } \\mathbf{\\textcolor{#059669}{AC = k \\cdot PR}} :',
      '\\dfrac{\\mathbf{\\textcolor{#0284c7}{BC}}}{\\mathbf{\\textcolor{#0284c7}{QR}}} = \\dfrac{\\sqrt{(\\mathbf{\\textcolor{#2563eb}{k}} \\cdot PQ)^2 - (\\mathbf{\\textcolor{#2563eb}{k}} \\cdot PR)^2}}{\\sqrt{PQ^2 - PR^2}}',
      '\\dfrac{\\mathbf{\\textcolor{#0284c7}{BC}}}{\\mathbf{\\textcolor{#0284c7}{QR}}} = \\dfrac{\\sqrt{\\mathbf{\\textcolor{#2563eb}{k^2}} (PQ^2 - PR^2)}}{\\sqrt{PQ^2 - PR^2}}',
      '__CANCELLATION_LINE__',
      '\\mathbf{\\textcolor{#2563eb}{\\dfrac{BC}{QR} = k}} \\quad \\text{— (2)}'
    ]
  },
  {
    id: 6,
    badge: 'Step 6 : SSS Similarity',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Triangles ACB and PRQ are Similar',
    mathLines: [
      '\\text{From equation (1) and (2), we get :}',
      '\\dfrac{\\mathbf{\\textcolor{#059669}{AC}}}{\\mathbf{\\textcolor{#059669}{PR}}} = \\dfrac{\\mathbf{\\textcolor{#ea580c}{AB}}}{\\mathbf{\\textcolor{#ea580c}{PQ}}} = \\dfrac{\\mathbf{\\textcolor{#0284c7}{BC}}}{\\mathbf{\\textcolor{#0284c7}{QR}}} = \\mathbf{\\textcolor{#2563eb}{k}}',
      '\\text{All three pairs of corresponding sides are in the same ratio } \\mathbf{\\textcolor{#2563eb}{k}}',
      '\\text{Therefore, by SSS Similarity Criterion (Theorem 6.4) :}',
      '\\mathbf{\\textcolor{#0891b2}{\\triangle ACB \\sim \\triangle PRQ}}'
    ]
  },
  {
    id: 7,
    badge: 'Step 7 : Hence Proved',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Corresponding Angles are Equal (∠B = ∠Q)',
    mathLines: [
      '\\text{Corresponding angles of similar triangles are equal :}',
      '\\mathbf{\\textcolor{#16a34a}{\\angle B = \\angle Q}}',
      '\\mathbf{\\textcolor{#16a34a}{\\text{Hence Proved. } \\checkmark}}'
    ]
  }
]

/* ─────────── STEP-BY-STEP CONCISE DETAILS FOR RIGHT PANE ─────────── */
const STEP_DETAILS_EX2 = {
  1: {
    title: 'Two Right Triangles',
    summary: 'Right $\\triangle ACB$ (at $C$) and $\\triangle PRQ$ (at $R$) with $\\sin B = \\sin Q$.',
    quiz: null
  },
  2: {
    title: 'Equate sin B = sin Q',
    summary: '$\\sin B = \\dfrac{AC}{AB}$ and $\\sin Q = \\dfrac{PR}{PQ} \\implies \\dfrac{AC}{AB} = \\dfrac{PR}{PQ}$.',
    quiz: null
  },
  3: {
    title: 'Relate Sides with k',
    summary: 'Cross-swap: $\\dfrac{AC}{PR} = \\dfrac{AB}{PQ} = k \\implies AC = k \\cdot PR, \\, AB = k \\cdot PQ$.',
    promptSummary: 'Given $\\sin B = \\sin Q \\implies \\dfrac{AC}{AB} = \\dfrac{PR}{PQ}$.',
    quiz: {
      question: 'Why do we cross-swap $AB$ and $PR$?',
      options: [
        {
          id: 'a',
          text: 'To relate corresponding sides: $\\dfrac{AC}{PR} = \\dfrac{AB}{PQ} = k$',
          correct: true,
          feedback: 'Correct! This compares opposites to opposites and hypotenuses to hypotenuses.'
        },
        {
          id: 'b',
          text: 'To make all side lengths equal to 1',
          correct: false,
          feedback: 'The common ratio is constant $k$, not necessarily 1.'
        }
      ]
    }
  },
  4: {
    title: 'Pythagoras on Bases',
    summary: 'Pythagoras: $BC = \\sqrt{AB^2 - AC^2}$ and $QR = \\sqrt{PQ^2 - PR^2}$.',
    quiz: null
  },
  5: {
    title: 'Base Ratio = k',
    summary: '$\\dfrac{BC}{QR} = \\dfrac{\\sqrt{k^2(PQ^2 - PR^2)}}{\\sqrt{PQ^2 - PR^2}} = k$.',
    quiz: null
  },
  6: {
    title: 'SSS Similarity',
    summary: '$\\dfrac{AC}{PR} = \\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = k \\implies \\triangle ACB \\sim \\triangle PRQ$.',
    promptSummary: 'Ratio of all 3 sides: $\\dfrac{AC}{PR} = \\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = k$.',
    quiz: {
      question: 'When all 3 pairs of sides are proportional ($= k$):',
      options: [
        {
          id: 'a',
          text: '$\\triangle ACB \\sim \\triangle PRQ$ by SSS Similarity Criterion',
          correct: true,
          feedback: 'Spot on! By Theorem 6.4 (SSS Similarity), both triangles are similar.'
        },
        {
          id: 'b',
          text: 'Triangles are congruent by RHS rule',
          correct: false,
          feedback: 'Sides are proportional by scaling factor $k$, which means similarity.'
        }
      ]
    }
  },
  7: {
    title: '∠B = ∠Q Proved',
    summary: 'Corresponding angles of similar triangles: $\\mathbf{\\angle B = \\angle Q}$.',
    quiz: null
  }
}

/* ─────────── STEP-SPECIFIC TWO TRIANGLES DIAGRAM (LARGE, DYNAMIC, ANIMATED) ─────────── */
function StepTrianglesDiagram({ stepId, subStep = 3, isCurrent = true }) {
  // On Step 1 sub-step 1: Only title is shown, no triangle drawn yet (matches Example 1)
  if (stepId === 1 && isCurrent && subStep === 1) {
    return null
  }

  // Triangle 1: ACB (Right angled at C) - Large & Spacious
  const C1 = { x: 75, y: 220 }
  const B1 = { x: 280, y: 220 }
  const A1 = { x: 75, y: 65 }

  // Triangle 2: PRQ (Right angled at R) - Large & Spacious
  const R2 = { x: 415, y: 220 }
  const Q2 = { x: 650, y: 220 }
  const P2 = { x: 415, y: 42 }

  const COLOR_OPP = '#059669' // Emerald Green
  const COLOR_HYP = '#ea580c' // Amber Orange
  const COLOR_ADJ = '#0284c7' // Electric Blue

  const isSine = stepId === 2
  const isConstantK = stepId === 3
  const isPyth = stepId === 4
  const isRatio = stepId === 5
  const isSimilar = stepId === 6
  const isProved = stepId === 7

  // Dynamic Opacity and Highlight Focus based on subStep (Step-by-step sync like Example 1)
  let tri1Opacity = 1
  let tri2Opacity = 1
  let hlOpp1 = false, hlHyp1 = false, hlAdj1 = false
  let hlOpp2 = false, hlHyp2 = false, hlAdj2 = false

  if (stepId === 1) {
    tri1Opacity = 1
    tri2Opacity = 1
  } else if (isSine) {
    if (subStep <= 2) {
      tri1Opacity = 1
      tri2Opacity = 1
    } else if (subStep === 3) {
      // Line 1: sin B = Opposite / Hypotenuse (Clean triangle, no glow yet, exact match to Example 1 Image 2!)
      tri1Opacity = 1
      tri2Opacity = 0.35
    } else if (subStep === 4) {
      // Line 2: Side opposite to ∠B = AC (Only AC lights up with green glow!)
      tri1Opacity = 1
      tri2Opacity = 0.35
      hlOpp1 = true
    } else if (subStep === 5) {
      // Line 3: Hypotenuse = AB (Only AB lights up with orange glow!)
      tri1Opacity = 1
      tri2Opacity = 0.35
      hlHyp1 = true
    } else if (subStep === 6) {
      // Line 4: sin B = AC / AB (Both AC and AB light up together!)
      tri1Opacity = 1
      tri2Opacity = 0.35
      hlOpp1 = true
      hlHyp1 = true
    } else if (subStep === 7) {
      // Line 5: sin Q = Opposite / Hypotenuse (Focus shifts to Triangle 2, clean lines)
      tri1Opacity = 0.28
      tri2Opacity = 1
    } else if (subStep === 8) {
      // Line 6: Side opposite to ∠Q = PR (Only PR lights up with green glow!)
      tri1Opacity = 0.28
      tri2Opacity = 1
      hlOpp2 = true
    } else if (subStep === 9) {
      // Line 7: Hypotenuse = PQ (Only PQ lights up with orange glow!)
      tri1Opacity = 0.28
      tri2Opacity = 1
      hlHyp2 = true
    } else if (subStep === 10) {
      // Line 8: sin Q = PR / PQ (Both PR and PQ light up together!)
      tri1Opacity = 0.28
      tri2Opacity = 1
      hlOpp2 = true
      hlHyp2 = true
    } else {
      // Line 9 & 10: Given sin B = sin Q => AC / AB = PR / PQ (Both triangles active & compared)
      tri1Opacity = 1
      tri2Opacity = 1
      hlOpp1 = true
      hlHyp1 = true
      hlOpp2 = true
      hlHyp2 = true
    }
  } else if (isConstantK) {
    tri1Opacity = 1
    tri2Opacity = 1
    hlOpp1 = true
    hlHyp1 = true
    hlOpp2 = true
    hlHyp2 = true
  } else if (isPyth) {
    if (subStep <= 5) {
      // Focus on Triangle 1 base BC
      tri1Opacity = 1
      tri2Opacity = 0.28
      hlAdj1 = true
      hlHyp1 = true
      hlOpp1 = true
    } else {
      // Focus on Triangle 2 base QR
      tri1Opacity = 0.28
      tri2Opacity = 1
      hlAdj2 = true
      hlHyp2 = true
      hlOpp2 = true
    }
  } else if (isRatio) {
    tri1Opacity = 1
    tri2Opacity = 1
    hlAdj1 = true
    hlAdj2 = true
  } else if (isSimilar || isProved) {
    tri1Opacity = 1
    tri2Opacity = 1
    hlOpp1 = true
    hlHyp1 = true
    hlAdj1 = true
    hlOpp2 = true
    hlHyp2 = true
    hlAdj2 = true
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '720px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      margin: '0.6rem 0 1.2rem'
    }}>
      <svg
        viewBox="0 0 710 286"
        style={{ width: '100%', maxWidth: '700px', height: 'auto', overflow: 'visible', display: 'block' }}
      >
        <defs>
          <linearGradient id="triGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(2, 132, 199, 0.08)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.02)" />
          </linearGradient>
          <linearGradient id="triGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(234, 88, 12, 0.08)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.02)" />
          </linearGradient>
          <linearGradient id="simGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.12)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.06)" />
          </linearGradient>
        </defs>

        {/* ─── TRIANGLE 1: ACB ─── */}
        <g style={{ opacity: tri1Opacity, transition: 'opacity 0.4s ease' }}>
          <polygon
            points={`${C1.x},${C1.y} ${B1.x},${B1.y} ${A1.x},${A1.y}`}
            fill={isProved ? '#f0fdf4' : (isSimilar ? 'url(#simGrad)' : 'url(#triGrad1)')}
            stroke="none"
            style={{ transition: 'fill 0.4s ease' }}
          />

          {/* Base line CB (Adjacent to B) */}
          <line
            x1={C1.x} y1={C1.y} x2={B1.x} y2={B1.y}
            stroke={hlAdj1 ? COLOR_ADJ : '#cbd5e1'}
            strokeWidth={hlAdj1 ? 4.5 : 2.8}
            strokeLinecap="round"
          />
          {hlAdj1 && (
            <line
              x1={C1.x} y1={C1.y} x2={B1.x} y2={B1.y}
              stroke={COLOR_ADJ}
              strokeWidth={10}
              strokeLinecap="round"
              className="e2-glow"
            />
          )}

          {/* Vertical line CA (Opposite to B) */}
          <line
            x1={C1.x} y1={C1.y} x2={A1.x} y2={A1.y}
            stroke={hlOpp1 ? COLOR_OPP : '#cbd5e1'}
            strokeWidth={hlOpp1 ? 4.5 : 2.8}
            strokeLinecap="round"
          />
          {hlOpp1 && (
            <line
              x1={C1.x} y1={C1.y} x2={A1.x} y2={A1.y}
              stroke={COLOR_OPP}
              strokeWidth={10}
              strokeLinecap="round"
              className="e2-glow"
            />
          )}

          {/* Hypotenuse line AB */}
          <line
            x1={A1.x} y1={A1.y} x2={B1.x} y2={B1.y}
            stroke={hlHyp1 ? COLOR_HYP : '#cbd5e1'}
            strokeWidth={hlHyp1 ? 4.5 : 2.8}
            strokeLinecap="round"
          />
          {hlHyp1 && (
            <line
              x1={A1.x} y1={A1.y} x2={B1.x} y2={B1.y}
              stroke={COLOR_HYP}
              strokeWidth={10}
              strokeLinecap="round"
              className="e2-glow"
            />
          )}

          {/* Right angle mark at C1 (90°) */}
          <rect
            x={C1.x}
            y={C1.y - 18}
            width={18}
            height={18}
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="2"
          />

          {/* Angle B arc in Triangle ACB - Spacious & Clear */}
          <path
            d="M 238 220 A 42 42 0 0 1 246.5 194.7"
            fill="none"
            stroke={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#d97706')}
            strokeWidth={isProved ? 3.5 : 2.8}
          />
          <text
            x={218}
            y={201}
            fill={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#d97706')}
            fontSize="16"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            ∠B
          </text>

          {/* Vertex Circles for ACB (Solid CAD-style, zero jerking) */}
          <circle cx={A1.x} cy={A1.y} r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
          <circle cx={C1.x} cy={C1.y} r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
          <circle cx={B1.x} cy={B1.y} r="6" fill={isProved ? '#16a34a' : '#0284c7'} stroke="#ffffff" strokeWidth="2" />

          {/* Vertex Labels for ACB */}
          <text x={A1.x - 24} y={A1.y + 4} fill="#0f172a" fontSize="19" fontWeight="900" fontFamily="Inter">A</text>
          <text x={C1.x - 26} y={C1.y + 26} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">C (90°)</text>
          <text x={B1.x + 14} y={B1.y + 6} fill={isProved ? '#16a34a' : '#0f172a'} fontSize="19" fontWeight="900" fontFamily="Inter">B</text>

          {/* Side Labels for ACB */}
          <text
            x={C1.x - 22}
            y={(C1.y + A1.y) / 2}
            fill={hlOpp1 ? COLOR_OPP : '#475569'}
            fontSize="15"
            fontWeight="800"
            textAnchor="end"
            dominantBaseline="middle"
            fontFamily="Inter"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            AC (opp)
          </text>
          <text
            x={(C1.x + B1.x) / 2}
            y={C1.y + 26}
            fill={hlAdj1 ? COLOR_ADJ : '#475569'}
            fontSize="15"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="Inter"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            BC (adj)
          </text>
          <text
            x={177.5}
            y={126}
            fill={hlHyp1 ? COLOR_HYP : '#475569'}
            fontSize="15"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="Inter"
            transform="rotate(-37, 177.5, 126)"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            AB (hyp)
          </text>
        </g>

        {/* ─── TRIANGLE 2: PRQ ─── */}
        <g style={{ opacity: tri2Opacity, transition: 'opacity 0.4s ease' }}>
          <polygon
            points={`${R2.x},${R2.y} ${Q2.x},${Q2.y} ${P2.x},${P2.y}`}
            fill={isProved ? '#f0fdf4' : (isSimilar ? 'url(#simGrad)' : 'url(#triGrad2)')}
            stroke="none"
            style={{ transition: 'fill 0.4s ease' }}
          />

          {/* Base line RQ (Adjacent to Q) */}
          <line
            x1={R2.x} y1={R2.y} x2={Q2.x} y2={Q2.y}
            stroke={hlAdj2 ? COLOR_ADJ : '#cbd5e1'}
            strokeWidth={hlAdj2 ? 4.5 : 2.8}
            strokeLinecap="round"
          />
          {hlAdj2 && (
            <line
              x1={R2.x} y1={R2.y} x2={Q2.x} y2={Q2.y}
              stroke={COLOR_ADJ}
              strokeWidth={10}
              strokeLinecap="round"
              className="e2-glow"
            />
          )}

          {/* Vertical line RP (Opposite to Q) */}
          <line
            x1={R2.x} y1={R2.y} x2={P2.x} y2={P2.y}
            stroke={hlOpp2 ? COLOR_OPP : '#cbd5e1'}
            strokeWidth={hlOpp2 ? 4.5 : 2.8}
            strokeLinecap="round"
          />
          {hlOpp2 && (
            <line
              x1={R2.x} y1={R2.y} x2={P2.x} y2={P2.y}
              stroke={COLOR_OPP}
              strokeWidth={10}
              strokeLinecap="round"
              className="e2-glow"
            />
          )}

          {/* Hypotenuse line PQ */}
          <line
            x1={P2.x} y1={P2.y} x2={Q2.x} y2={Q2.y}
            stroke={hlHyp2 ? COLOR_HYP : '#cbd5e1'}
            strokeWidth={hlHyp2 ? 4.5 : 2.8}
            strokeLinecap="round"
          />
          {hlHyp2 && (
            <line
              x1={P2.x} y1={P2.y} x2={Q2.x} y2={Q2.y}
              stroke={COLOR_HYP}
              strokeWidth={10}
              strokeLinecap="round"
              className="e2-glow"
            />
          )}

          {/* Right angle mark at R2 (90°) */}
          <rect
            x={R2.x}
            y={R2.y - 18}
            width={18}
            height={18}
            fill="#ffffff"
            stroke="#ea580c"
            strokeWidth="2"
          />

          {/* Angle Q arc in Triangle PRQ - Spacious & Clear */}
          <path
            d="M 606 220 A 44 44 0 0 1 615 193.5"
            fill="none"
            stroke={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#d97706')}
            strokeWidth={isProved ? 3.5 : 2.8}
          />
          <text
            x={585}
            y={201}
            fill={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#d97706')}
            fontSize="16"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            ∠Q
          </text>

          {/* Vertex Circles for PRQ (Solid CAD-style, zero jerking) */}
          <circle cx={P2.x} cy={P2.y} r="6" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
          <circle cx={R2.x} cy={R2.y} r="6" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
          <circle cx={Q2.x} cy={Q2.y} r="6" fill={isProved ? '#16a34a' : '#ea580c'} stroke="#ffffff" strokeWidth="2" />

          {/* Vertex Labels for PRQ */}
          <text x={P2.x - 24} y={P2.y + 4} fill="#0f172a" fontSize="19" fontWeight="900" fontFamily="Inter">P</text>
          <text x={R2.x - 26} y={R2.y + 26} fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="Inter">R (90°)</text>
          <text x={Q2.x + 14} y={Q2.y + 6} fill={isProved ? '#16a34a' : '#0f172a'} fontSize="19" fontWeight="900" fontFamily="Inter">Q</text>

          {/* Side Labels for PRQ */}
          <text
            x={R2.x - 22}
            y={(R2.y + P2.y) / 2}
            fill={hlOpp2 ? COLOR_OPP : '#475569'}
            fontSize="15"
            fontWeight="800"
            textAnchor="end"
            dominantBaseline="middle"
            fontFamily="Inter"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            PR (opp)
          </text>
          <text
            x={(R2.x + Q2.x) / 2}
            y={R2.y + 26}
            fill={hlAdj2 ? COLOR_ADJ : '#475569'}
            fontSize="15"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="Inter"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            QR (adj)
          </text>
          <text
            x={532.5}
            y={116}
            fill={hlHyp2 ? COLOR_HYP : '#475569'}
            fontSize="15"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="Inter"
            transform="rotate(-37, 532.5, 116)"
            stroke="#ffffff"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            PQ (hyp)
          </text>
        </g>

        {/* Pulsing Green Rings on angles B and Q in Step 7 */}
        {isProved && (
          <>
            <circle
              cx={B1.x}
              cy={B1.y}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e2PulseRing 1.5s ease-out infinite' }}
            />
            <circle
              cx={Q2.x}
              cy={Q2.y}
              r="10"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e2PulseRing 1.5s ease-out infinite 0.25s' }}
            />
          </>
        )}

        {/* Step 3: Connecting dashed ratio indicators between paired sides */}
        {stepId === 3 && (
          <>
            {/* Connecting dashed arc between AC and PR (Opposites) */}
            <path
              d="M 75 90 Q 245 20 415 70"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              style={{ animation: 'e2DashFlow 1.2s linear infinite' }}
            />
            {/* Textbook vertical stacked fraction badge */}
            <rect
              x={203}
              y={10}
              width="84"
              height="44"
              rx="10"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="1.8"
            />
            <text x={231} y={25} textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="900" fontFamily="Inter">AC</text>
            <line x1={216} y1={29} x2={246} y2={29} stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            <text x={231} y={44} textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="900" fontFamily="Inter">PR</text>
            <text x={266} y={36} textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="900" fontFamily="Inter">= k</text>

            {/* Connecting dashed arc between AB and PQ (Hypotenuses) */}
            <path
              d="M 177.5 160 Q 355 285 532.5 150"
              fill="none"
              stroke="#ea580c"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              style={{ animation: 'e2DashFlow 1.2s linear infinite' }}
            />
            {/* Textbook vertical stacked fraction badge */}
            <rect
              x={313}
              y={234}
              width="84"
              height="44"
              rx="10"
              fill="#fff7ed"
              stroke="#f97316"
              strokeWidth="1.8"
            />
            <text x={341} y={249} textAnchor="middle" fill="#c2410c" fontSize="13" fontWeight="900" fontFamily="Inter">AB</text>
            <line x1={326} y1={253} x2={356} y2={253} stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
            <text x={341} y={268} textAnchor="middle" fill="#c2410c" fontSize="13" fontWeight="900" fontFamily="Inter">PQ</text>
            <text x={376} y={260} textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="900" fontFamily="Inter">= k</text>
          </>
        )}

        {/* Step 5: Connecting dashed ratio indicator between base BC and base QR */}
        {stepId === 5 && (
          <>
            <path
              d="M 177.5 220 Q 355 272 532.5 220"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              style={{ animation: 'e2DashFlow 1.2s linear infinite' }}
            />
            {/* Textbook vertical stacked fraction badge */}
            <rect
              x={313}
              y={225}
              width="84"
              height="44"
              rx="10"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="1.8"
            />
            <text x={341} y={240} textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="900" fontFamily="Inter">BC</text>
            <line x1={326} y1={244} x2={356} y2={244} stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <text x={341} y={259} textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="900" fontFamily="Inter">QR</text>
            <text x={376} y={251} textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="900" fontFamily="Inter">= k</text>
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
      className="e2-math-line"
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
        className={isTyping ? 'e2-typewriter' : ''}
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
export default function Example2Tutor({ onNextExample, onPrevExample, hasPrev = true, hasNext = true, initialAtEnd = false }) {
  const total = STEPS.length
  const lastStepObj = STEPS[total - 1]
  const lastStepTotalSubSteps = 2 + lastStepObj.mathLines.length

  const [step, setStep] = useState(initialAtEnd ? total : 0)
  const [subStep, setSubStep] = useState(initialAtEnd ? lastStepTotalSubSteps : 0)
  const [selectedOptions, setSelectedOptions] = useState({})

  const scrollContainerRef = useRef(null)
  const rightScrollRef = useRef(null)
  const clickTimer = useRef(null)
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
          } else {
            container.scrollTop = container.scrollHeight
          }
        }
        const rightContainer = rightScrollRef.current
        if (rightContainer) {
          const rightStep = rightContainer.querySelector(`[data-right-step="${total}"]`)
          if (rightStep) {
            rightStep.scrollIntoView({ behavior: 'auto', block: 'nearest' })
          }
        }
      }, 90)
    }
  }, [initialAtEnd, total])

  // Auto-scroll left pane smoothly to new step or newly revealed line
  useEffect(() => {
    if (step === 0 || !scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const stepEl = container.querySelector(`[data-step="${step}"]`)
    if (!stepEl) return

    if (subStep <= 2) {
      setTimeout(() => {
        stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    } else {
      const latestLine = stepEl.querySelector('[data-latest-line="true"]')
      if (latestLine) {
        setTimeout(() => {
          latestLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 50)
      }
    }
  }, [step, subStep])

  // Auto-scroll right pane smoothly to active step
  useEffect(() => {
    if (step === 0 || !rightScrollRef.current) return
    const el = rightScrollRef.current.querySelector(`[data-right-step="${step}"]`)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 70)
    }
  }, [step])

  // Celebratory confetti ONLY at the very end of Step 7 (Hence Proved)
  useEffect(() => {
    if (step === total && subStep >= currentTotalSubSteps && !hasFiredConfetti.current && !initialAtEnd) {
      hasFiredConfetti.current = true
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      })
    }
    if (step < total) {
      hasFiredConfetti.current = false
    }
  }, [step, subStep, total, currentTotalSubSteps, initialAtEnd])

  // Single click progresses one micro-step at a time; when complete, goes to next step
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
    if (step === 1 && subStep <= 1) {
      if (hasPrev && onPrevExample) {
        onPrevExample()
      } else {
        setStep(0)
        setSubStep(0)
      }
      return
    }
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevStepObj = STEPS[step - 2]
      const prevTotalSubSteps = 2 + prevStepObj.mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalSubSteps)
    } else {
      if (hasPrev && onPrevExample) {
        onPrevExample()
      } else {
        setStep(0)
        setSubStep(0)
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
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
          PART 1 (LEFT PANE): PROGRESSIVE STEP-BY-STEP WORKSPACE (SCROLLS NATURALLY)
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
                    className={isCurrent ? 'e2-fade' : ''}
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

                    {/* Step Diagram (Draws on subStep 2+, large CAD geometry with dynamic focus) */}
                    {showDiagram && (
                      <div className={isCurrent && subStep === 2 ? 'e2-fade' : ''} style={{ width: '100%' }}>
                        <StepTrianglesDiagram
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

                          if (line === '__CANCELLATION_LINE__') {
                            return (
                              <div
                                key={lIdx}
                                data-latest-line={isLatest ? "true" : undefined}
                                className="e2-math-line"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '12px',
                                  whiteSpace: 'nowrap',
                                  fontFamily: '"Inter", sans-serif',
                                  color: '#0f172a',
                                  fontSize: '1.42rem',
                                  fontWeight: 600,
                                  scrollMarginBottom: '2.5rem'
                                }}
                              >
                                <MathText text={'$\\dfrac{\\mathbf{\\textcolor{#0284c7}{BC}}}{\\mathbf{\\textcolor{#0284c7}{QR}}} = $'} />
                                <div style={{
                                  display: 'inline-flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  verticalAlign: 'middle',
                                  gap: '2px',
                                  margin: '0 4px'
                                }}>
                                  {/* Numerator with k and canceled radical */}
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    borderBottom: '2.5px solid #0f172a',
                                    paddingBottom: '4px',
                                    position: 'relative'
                                  }}>
                                    <span style={{ fontSize: '1.55rem', fontWeight: 900, color: '#2563eb' }}>k</span>
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                      <MathText text={'$\\sqrt{PQ^2 - PR^2}$'} />
                                      <div style={{
                                        position: 'absolute',
                                        left: '-4px',
                                        right: '-4px',
                                        top: '50%',
                                        height: '3px',
                                        background: '#ef4444',
                                        transform: 'rotate(-10deg)',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                                      }} />
                                    </div>
                                  </div>

                                  {/* Denominator with canceled radical */}
                                  <div style={{ paddingTop: '4px', position: 'relative', display: 'inline-block' }}>
                                    <MathText text={'$\\sqrt{PQ^2 - PR^2}$'} />
                                    <div style={{
                                      position: 'absolute',
                                      left: '-4px',
                                      right: '-4px',
                                      top: '50%',
                                      height: '3px',
                                      background: '#ef4444',
                                      transform: 'rotate(-10deg)',
                                      borderRadius: '2px',
                                      boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                                    }} />
                                  </div>
                                </div>
                              </div>
                            )
                          }

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
            Example 2 :
          </span>
          <MathText text={'If $\\angle B$ and $\\angle Q$ are acute angles such that $\\sin B = \\sin Q$, then prove that $\\angle B = \\angle Q$.'} />
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
              const details = STEP_DETAILS_EX2[stepNum] || { title: s.title, summary: '', quiz: null }
              const quiz = details.quiz
              const userChoice = selectedOptions[stepNum]
              const selectedOpt = quiz?.options.find(o => o.id === userChoice)

              return (
                <div
                  key={`right-step-${stepNum}`}
                  data-right-step={stepNum}
                  className={isCurrent ? 'e2-fade' : ''}
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

                    {/* 1-Line Crisp & Essential Mathematical Summary */}
                    <div style={{
                      fontSize: '1.02rem',
                      color: '#334155',
                      lineHeight: 1.65
                    }}>
                      <MathText text={
                        (stepNum === 1 && isCurrent)
                          ? (subStep === 1
                              ? 'Understand requirement: Consider two right-angled triangles $\\triangle ACB$ and $\\triangle PRQ$.'
                              : (subStep === 2
                                  ? 'Draw right $\\triangle ACB$ (at $C$) and $\\triangle PRQ$ (at $R$) with acute angles $\\angle B$ and $\\angle Q$.'
                                  : (subStep === 3
                                      ? 'Identify right angles: $\\angle C = 90^\\circ$ and $\\angle R = 90^\\circ$.'
                                      : 'Given in question: $\\sin B = \\sin Q$.'
                                    )
                                )
                            )
                          : (stepNum === 2 && isCurrent)
                            ? (subStep <= 2
                                ? 'Define sine ratios for acute angles $\\angle B$ and $\\angle Q$.'
                                : (subStep === 3
                                    ? 'In $\\triangle ACB$: $\\sin B = \\dfrac{\\text{Side opposite to } \\angle B}{\\text{Hypotenuse}}$.'
                                    : (subStep === 4
                                        ? 'Identify Side $AC$: Side directly opposite to acute angle $\\angle B$.'
                                        : (subStep === 5
                                            ? 'Identify Hypotenuse $AB$: Side opposite to right angle $90^\\circ$.'
                                            : (subStep === 6
                                                ? 'Substitute sides for $\\triangle ACB$: $\\sin B = \\dfrac{AC}{AB}$.'
                                                : (subStep === 7
                                                    ? 'In $\\triangle PRQ$: $\\sin Q = \\dfrac{\\text{Side opposite to } \\angle Q}{\\text{Hypotenuse}}$.'
                                                    : (subStep === 8
                                                        ? 'Identify Side $PR$: Side directly opposite to acute angle $\\angle Q$.'
                                                        : (subStep === 9
                                                            ? 'Identify Hypotenuse $PQ$: Side opposite to right angle $90^\\circ$.'
                                                            : (subStep === 10
                                                                ? 'Substitute sides for $\\triangle PRQ$: $\\sin Q = \\dfrac{PR}{PQ}$.'
                                                                : 'Equate given ratios: $\\sin B = \\sin Q \\implies \\dfrac{AC}{AB} = \\dfrac{PR}{PQ}$.'
                                                              )
                                                          )
                                                      )
                                                  )
                                              )
                                          )
                                      )
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
                                key={opt.id}
                                whileHover={{ scale: 1.015, x: 2 }}
                                whileTap={{ scale: 0.985 }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedOptions(prev => ({ ...prev, [stepNum]: opt.id }))
                                }}
                                style={{
                                  padding: '0.6rem 0.85rem',
                                  borderRadius: '8px',
                                  border: `1.5px solid ${btnBorder}`,
                                  background: btnBg,
                                  color: btnColor,
                                  fontSize: '0.86rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  textAlign: 'left',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: isChosen ? (isCorrect ? '#10b981' : '#f43f5e') : '#e2e8f0',
                                    color: '#ffffff',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 800
                                  }}>
                                    {opt.id.toUpperCase()}
                                  </span>
                                  <MathText text={opt.text} />
                                </span>

                                {isChosen && (
                                  isCorrect ? (
                                    <CheckCircle2 size={16} color="#10b981" />
                                  ) : (
                                    <XCircle size={16} color="#f43f5e" />
                                  )
                                )}
                              </motion.button>
                            )
                          })}
                        </div>

                        {userChoice && selectedOpt && (
                          <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: selectedOpt.correct ? '#065f46' : '#9f1239',
                            background: selectedOpt.correct ? '#f0fdf4' : '#fff1f2',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '6px',
                            border: `1px solid ${selectedOpt.correct ? '#bbf7d0' : '#fecdd3'}`
                          }}>
                            {selectedOpt.feedback}
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
