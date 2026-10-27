import React, { useEffect, useRef, useState } from 'react'
import MathText from '../common/MathText'

/* ─────────── KEYFRAME ANIMATIONS ─────────── */
const KEYFRAMES = `
  @keyframes e2FadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes e2GlowPulse {
    0%, 100% { opacity: 0.35; stroke-width: 5; }
    50%      { opacity: 0.85; stroke-width: 8; }
  }
  @keyframes e2PulseRing {
    0%   { r: 7; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 24; opacity: 0; stroke-width: 0.5; }
  }
  @keyframes e2Pop {
    0%   { transform: scale(0.9); opacity: 0; }
    70%  { transform: scale(1.04); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes e2FloatBadge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }

  .e2-fade { animation: e2FadeUp 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e2-pop  { animation: e2Pop 0.35s cubic-bezier(.16,1,.3,1) both; }
  .e2-glow { animation: e2GlowPulse 1.6s ease-in-out infinite; }
  .e2-float { animation: e2FloatBadge 2.2s ease-in-out infinite; }

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

/* ─────────── 7 NCERT MATHEMATICAL STEPS FOR EXAMPLE 2 ─────────── */
const STEPS = [
  {
    id: 1,
    badge: 'Step 1 : Two Triangles',
    badgeColor: '#059669',
    badgeBg: '#d1fae5',
    title: 'Consider Two Right Triangles ACB and PRQ',
    callout: 'Right-angled △ACB and △PRQ (∠C = 90°, ∠R = 90°)',
    mathLines: [
      '\\text{Let us consider two right triangles } \\triangle ACB \\text{ and } \\triangle PRQ',
      '\\text{Right-angled at } C \\text{ and } R \\text{ respectively, where } \\sin B = \\sin Q.'
    ]
  },
  {
    id: 2,
    badge: 'Step 2 : Express Sine',
    badgeColor: '#0284c7',
    badgeBg: '#e0f2fe',
    title: 'Define and Equate sin B and sin Q',
    callout: 'sin B = AC ÷ AB  and  sin Q = PR ÷ PQ',
    mathLines: [
      '\\sin B = \\dfrac{\\text{Side opposite to } \\angle B}{\\text{Hypotenuse}} = \\dfrac{AC}{AB}',
      '\\sin Q = \\dfrac{\\text{Side opposite to } \\angle Q}{\\text{Hypotenuse}} = \\dfrac{PR}{PQ}',
      '\\text{Given : } \\sin B = \\sin Q \\implies \\dfrac{AC}{AB} = \\dfrac{PR}{PQ}'
    ]
  },
  {
    id: 3,
    badge: 'Step 3 : Constant k',
    badgeColor: '#d97706',
    badgeBg: '#fef3c7',
    title: 'Rearrange to Relate Corresponding Sides',
    callout: 'Cross Swap : AC ÷ PR = AB ÷ PQ = k',
    mathLines: [
      '\\dfrac{AC}{AB} = \\dfrac{PR}{PQ} \\implies \\dfrac{AC}{PR} = \\dfrac{AB}{PQ}',
      '\\text{Let } \\dfrac{AC}{PR} = \\dfrac{AB}{PQ} = k \\quad \\text{— (1)}',
      '\\text{Therefore, } AC = k \\cdot PR \\quad \\text{and} \\quad AB = k \\cdot PQ'
    ]
  },
  {
    id: 4,
    badge: 'Step 4 : Pythagoras',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    title: 'Find Base Sides BC and QR using Pythagoras',
    callout: 'Pythagoras on Bases : BC = √(AB² - AC²), QR = √(PQ² - PR²)',
    mathLines: [
      '\\text{By Pythagoras Theorem in right } \\triangle ACB : AB^2 = AC^2 + BC^2 \\implies BC = \\sqrt{AB^2 - AC^2}',
      '\\text{By Pythagoras Theorem in right } \\triangle PRQ : PQ^2 = PR^2 + QR^2 \\implies QR = \\sqrt{PQ^2 - PR^2}'
    ]
  },
  {
    id: 5,
    badge: 'Step 5 : Ratio BC / QR',
    badgeColor: '#2563eb',
    badgeBg: '#dbeafe',
    title: 'Find the Ratio of the Third Sides BC / QR',
    callout: 'Radicals Cancel Out ⟹ BC ÷ QR = k',
    mathLines: [
      '\\dfrac{BC}{QR} = \\dfrac{\\sqrt{AB^2 - AC^2}}{\\sqrt{PQ^2 - PR^2}}',
      '\\dfrac{BC}{QR} = \\dfrac{\\sqrt{(k \\cdot PQ)^2 - (k \\cdot PR)^2}}{\\sqrt{PQ^2 - PR^2}} = \\dfrac{\\sqrt{k^2(PQ^2 - PR^2)}}{\\sqrt{PQ^2 - PR^2}}',
      '__CANCELLATION_LINE__',
      '\\text{So, } \\dfrac{BC}{QR} = k \\quad \\text{— (2)}'
    ]
  },
  {
    id: 6,
    badge: 'Step 6 : SSS Similarity',
    badgeColor: '#0891b2',
    badgeBg: '#cffafe',
    title: 'Triangles ACB and PRQ are Similar',
    callout: 'All 3 Side Ratios = k ⟹ △ACB ~ △PRQ (SSS Similarity)',
    mathLines: [
      '\\text{From (1) and (2), we have : } \\dfrac{AC}{PR} = \\dfrac{AB}{PQ} = \\dfrac{BC}{QR} = k',
      '\\text{By Theorem 6.4 (SSS Similarity Criterion) :}',
      '\\mathbf{\\triangle ACB \\sim \\triangle PRQ}'
    ]
  },
  {
    id: 7,
    badge: 'Step 7 : Hence Proved',
    badgeColor: '#16a34a',
    badgeBg: '#dcfce7',
    title: 'Corresponding Angles are Equal (∠B = ∠Q)',
    callout: 'Corresponding Angles Equal ⟹ ∠B = ∠Q (Hence Proved)',
    mathLines: [
      '\\text{Since corresponding angles of similar triangles are equal :}',
      '\\mathbf{\\angle B = \\angle Q} \\quad (\\text{Hence Proved})'
    ]
  }
]

/* ─────────── STEP-SPECIFIC TWO TRIANGLES DIAGRAM (SCROLLS WITH STEP) ─────────── */
function StepTrianglesDiagram({ stepId, callout }) {
  // Triangle 1: ACB
  const C1 = { x: 65, y: 160 }
  const B1 = { x: 205, y: 160 }
  const A1 = { x: 65, y: 50 }

  // Triangle 2: PRQ
  const R2 = { x: 315, y: 160 }
  const Q2 = { x: 475, y: 160 }
  const P2 = { x: 315, y: 35 }

  const COLOR_OPP = '#059669' // Emerald Green
  const COLOR_HYP = '#ea580c' // Amber Orange
  const COLOR_ADJ = '#0284c7' // Electric Blue

  const hlOpp = stepId === 2 || stepId === 3 || stepId === 6 || stepId === 7
  const hlHyp = stepId === 2 || stepId === 3 || stepId === 6 || stepId === 7
  const hlAdj = stepId === 4 || stepId === 5 || stepId === 6 || stepId === 7
  const isSimilar = stepId === 6
  const isProved = stepId === 7

  return (
    <div style={{
      width: '100%',
      maxWidth: '560px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      margin: '0.4rem 0 0.8rem'
    }}>
      {/* Step Callout Pill */}
      {callout && (
        <div
          className="e2-float"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 16px',
            borderRadius: '20px',
            background: isProved ? '#dcfce7' : (stepId >= 4 ? '#e0f2fe' : '#fef3c7'),
            color: isProved ? '#15803d' : (stepId >= 4 ? '#0369a1' : '#b45309'),
            border: `1.5px solid ${isProved ? '#86efac' : (stepId >= 4 ? '#7dd3fc' : '#fde047')}`,
            fontSize: '0.84rem',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isProved ? '#16a34a' : (stepId >= 4 ? '#0284c7' : '#ea580c')
          }} />
          {callout}
        </div>
      )}

      {/* SVG Canvas - Flat on Canvas, Zero Card Wrapper */}
      <svg
        viewBox="0 0 540 195"
        style={{ width: '100%', maxWidth: '520px', height: 'auto', overflow: 'visible', display: 'block' }}
      >
        {/* ─── TRIANGLE 1: ACB ─── */}
        <polygon
          points={`${C1.x},${C1.y} ${B1.x},${B1.y} ${A1.x},${A1.y}`}
          fill={isProved ? '#f0fdf4' : (isSimilar ? '#f0f9ff' : '#f8fafc')}
          stroke="none"
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Base line CB */}
        <line
          x1={C1.x} y1={C1.y} x2={B1.x} y2={B1.y}
          stroke={hlAdj ? COLOR_ADJ : '#cbd5e1'}
          strokeWidth={hlAdj ? 4 : 2.5}
          strokeLinecap="round"
        />
        {hlAdj && (
          <line
            x1={C1.x} y1={C1.y} x2={B1.x} y2={B1.y}
            stroke={COLOR_ADJ}
            strokeWidth={8}
            strokeLinecap="round"
            className="e2-glow"
          />
        )}

        {/* Vertical line CA (Opposite to B) */}
        <line
          x1={C1.x} y1={C1.y} x2={A1.x} y2={A1.y}
          stroke={hlOpp ? COLOR_OPP : '#cbd5e1'}
          strokeWidth={hlOpp ? 4 : 2.5}
          strokeLinecap="round"
        />
        {hlOpp && (
          <line
            x1={C1.x} y1={C1.y} x2={A1.x} y2={A1.y}
            stroke={COLOR_OPP}
            strokeWidth={8}
            strokeLinecap="round"
            className="e2-glow"
          />
        )}

        {/* Hypotenuse line AB */}
        <line
          x1={A1.x} y1={A1.y} x2={B1.x} y2={B1.y}
          stroke={hlHyp ? COLOR_HYP : '#cbd5e1'}
          strokeWidth={hlHyp ? 4 : 2.5}
          strokeLinecap="round"
        />
        {hlHyp && (
          <line
            x1={A1.x} y1={A1.y} x2={B1.x} y2={B1.y}
            stroke={COLOR_HYP}
            strokeWidth={8}
            strokeLinecap="round"
            className="e2-glow"
          />
        )}

        {/* Right angle mark at C1 (90°) */}
        <rect
          x={C1.x}
          y={C1.y - 15}
          width={15}
          height={15}
          fill="none"
          stroke="#0284c7"
          strokeWidth="2"
        />

        {/* Angle B arc in Triangle ACB */}
        <path
          d={`M ${B1.x - 26} ${B1.y} A 26 26 0 0 1 ${B1.x - 18} ${B1.y - 18}`}
          fill="none"
          stroke={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#64748b')}
          strokeWidth={isProved ? 3.5 : 2.5}
        />
        <text
          x={B1.x - 34}
          y={B1.y - 8}
          fill={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#64748b')}
          fontSize="12.5"
          fontWeight="800"
          fontFamily="Inter"
        >
          ∠B
        </text>

        {/* Vertex Circles for ACB */}
        <circle cx={A1.x} cy={A1.y} r="5" fill="#0284c7" />
        <circle cx={C1.x} cy={C1.y} r="5" fill="#0284c7" />
        <circle cx={B1.x} cy={B1.y} r="5" fill={isProved ? '#16a34a' : '#0284c7'} />

        {/* Vertex Labels for ACB */}
        <text x={A1.x - 14} y={A1.y - 4} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">A</text>
        <text x={C1.x - 18} y={C1.y + 6} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">C</text>
        <text x={B1.x + 12} y={B1.y + 5} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">B</text>

        {/* Side Labels for ACB */}
        <text x={C1.x - 18} y={(C1.y + A1.y) / 2} fill={hlOpp ? COLOR_OPP : '#64748b'} fontSize="13" fontWeight="700" textAnchor="end" fontFamily="Inter">
          AC
        </text>
        <text x={(C1.x + B1.x) / 2} y={C1.y + 18} fill={hlAdj ? COLOR_ADJ : '#64748b'} fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter">
          BC
        </text>
        <text x={(A1.x + B1.x) / 2 + 10} y={(A1.y + B1.y) / 2 - 8} fill={hlHyp ? COLOR_HYP : '#64748b'} fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter">
          AB
        </text>

        {/* ─── TRIANGLE 2: PRQ ─── */}
        <polygon
          points={`${R2.x},${R2.y} ${Q2.x},${Q2.y} ${P2.x},${P2.y}`}
          fill={isProved ? '#f0fdf4' : (isSimilar ? '#f0f9ff' : '#f8fafc')}
          stroke="none"
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Base line RQ */}
        <line
          x1={R2.x} y1={R2.y} x2={Q2.x} y2={Q2.y}
          stroke={hlAdj ? COLOR_ADJ : '#cbd5e1'}
          strokeWidth={hlAdj ? 4 : 2.5}
          strokeLinecap="round"
        />
        {hlAdj && (
          <line
            x1={R2.x} y1={R2.y} x2={Q2.x} y2={Q2.y}
            stroke={COLOR_ADJ}
            strokeWidth={8}
            strokeLinecap="round"
            className="e2-glow"
          />
        )}

        {/* Vertical line RP (Opposite to Q) */}
        <line
          x1={R2.x} y1={R2.y} x2={P2.x} y2={P2.y}
          stroke={hlOpp ? COLOR_OPP : '#cbd5e1'}
          strokeWidth={hlOpp ? 4 : 2.5}
          strokeLinecap="round"
        />
        {hlOpp && (
          <line
            x1={R2.x} y1={R2.y} x2={P2.x} y2={P2.y}
            stroke={COLOR_OPP}
            strokeWidth={8}
            strokeLinecap="round"
            className="e2-glow"
          />
        )}

        {/* Hypotenuse line PQ */}
        <line
          x1={P2.x} y1={P2.y} x2={Q2.x} y2={Q2.y}
          stroke={hlHyp ? COLOR_HYP : '#cbd5e1'}
          strokeWidth={hlHyp ? 4 : 2.5}
          strokeLinecap="round"
        />
        {hlHyp && (
          <line
            x1={P2.x} y1={P2.y} x2={Q2.x} y2={Q2.y}
            stroke={COLOR_HYP}
            strokeWidth={8}
            strokeLinecap="round"
            className="e2-glow"
          />
        )}

        {/* Right angle mark at R2 (90°) */}
        <rect
          x={R2.x}
          y={R2.y - 15}
          width={15}
          height={15}
          fill="none"
          stroke="#ea580c"
          strokeWidth="2"
        />

        {/* Angle Q arc in Triangle PRQ */}
        <path
          d={`M ${Q2.x - 28} ${Q2.y} A 28 28 0 0 1 ${Q2.x - 20} ${Q2.y - 18}`}
          fill="none"
          stroke={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#64748b')}
          strokeWidth={isProved ? 3.5 : 2.5}
        />
        <text
          x={Q2.x - 36}
          y={Q2.y - 8}
          fill={isProved ? '#16a34a' : (stepId === 2 ? '#ea580c' : '#64748b')}
          fontSize="12.5"
          fontWeight="800"
          fontFamily="Inter"
        >
          ∠Q
        </text>

        {/* Vertex Circles for PRQ */}
        <circle cx={P2.x} cy={P2.y} r="5" fill="#ea580c" />
        <circle cx={R2.x} cy={R2.y} r="5" fill="#ea580c" />
        <circle cx={Q2.x} cy={Q2.y} r="5" fill={isProved ? '#16a34a' : '#ea580c'} />

        {/* Vertex Labels for PRQ */}
        <text x={P2.x - 14} y={P2.y - 4} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">P</text>
        <text x={R2.x - 18} y={R2.y + 6} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">R</text>
        <text x={Q2.x + 12} y={Q2.y + 5} fill="#0f172a" fontSize="15" fontWeight="800" fontFamily="Inter">Q</text>

        {/* Side Labels for PRQ */}
        <text x={R2.x - 18} y={(R2.y + P2.y) / 2} fill={hlOpp ? COLOR_OPP : '#64748b'} fontSize="13" fontWeight="700" textAnchor="end" fontFamily="Inter">
          PR
        </text>
        <text x={(R2.x + Q2.x) / 2} y={R2.y + 18} fill={hlAdj ? COLOR_ADJ : '#64748b'} fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter">
          QR
        </text>
        <text x={(P2.x + Q2.x) / 2 + 10} y={(P2.y + Q2.y) / 2 - 8} fill={hlHyp ? COLOR_HYP : '#64748b'} fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter">
          PQ
        </text>

        {/* Pulsing Green Rings on angles B and Q in Step 7 */}
        {isProved && (
          <>
            <circle
              cx={B1.x}
              cy={B1.y}
              r="8"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e2PulseRing 1.5s ease-out infinite' }}
            />
            <circle
              cx={Q2.x}
              cy={Q2.y}
              r="8"
              fill="none"
              stroke="#16a34a"
              style={{ animation: 'e2PulseRing 1.5s ease-out infinite 0.25s' }}
            />
          </>
        )}
      </svg>
    </div>
  )
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Example2Tutor({ onNextExample, onPrevExample, hasPrev = true, hasNext = true }) {
  const [step, setStep] = useState(1)
  const [subStep, setSubStep] = useState(1)
  const total = STEPS.length
  const currentTotalLines = STEPS[step - 1].mathLines.length

  const scrollContainerRef = useRef(null)
  const clickTimer = useRef(null)

  // Smooth scroll down when a new step or line is revealed
  useEffect(() => {
    if (!scrollContainerRef.current) return
    const el = scrollContainerRef.current.querySelector(`[data-step="${step}"]`)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 70)
    }
  }, [step, subStep])

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

  // Single click progresses one line at a time; when lines complete, goes to next step!
  const goNextStep = () => {
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
    if (subStep > 1) {
      setSubStep(s => s - 1)
    } else if (step > 1) {
      const prevTotalLines = STEPS[step - 2].mathLines.length
      setStep(s => s - 1)
      setSubStep(prevTotalLines)
    } else if (hasPrev && onPrevExample) {
      onPrevExample()
    }
  }

  // Single click = Next sub-step, Double click = Previous sub-step
  const handleContainerClick = (e) => {
    if (e.target.closest('button, a, input, select, [data-noclick]')) return

    const selection = window.getSelection()?.toString()
    if (selection && selection.length > 0) return

    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      goPrevStep()
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null
        goNextStep()
      }, 250)
    }
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
          <div style={{ width: '100%', maxWidth: '760px' }}>
            {STEPS.slice(0, step).map((s, idx) => {
              const isCurrent = idx === step - 1
              const visibleLines = isCurrent ? s.mathLines.slice(0, subStep) : s.mathLines

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
                    marginBottom: '3rem',
                    paddingBottom: '2.5rem',
                    borderBottom: idx < step - 1 ? '1px dashed #e2e8f0' : 'none',
                    opacity: isCurrent ? 1 : 0.85,
                    transition: 'all 0.25s ease'
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

                  {/* Step Diagram (Draws in each step where needed & scrolls naturally with it!) */}
                  <StepTrianglesDiagram
                    stepId={s.id}
                    callout={s.callout}
                  />

                  {/* Mathematical Solution Lines (Unfolds line by line on each click!) */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: '0.5rem',
                    width: '100%'
                  }}>
                    {visibleLines.map((line, lIdx) => {
                      if (line === '__CANCELLATION_LINE__') {
                        return (
                          <div
                            key={lIdx}
                            className="e2-fade"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '12px',
                              margin: '0.4rem 0',
                              fontSize: '1.45rem',
                              fontWeight: 700,
                              color: '#0f172a'
                            }}
                          >
                            <span>=</span>
                            <div style={{
                              display: 'inline-flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              verticalAlign: 'middle',
                              gap: '2px'
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
                                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2563eb' }}>k</span>
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
                                    boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
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
                                  boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)'
                                }} />
                              </div>
                            </div>

                            <span>=</span>

                            <span style={{
                              fontSize: '1.8rem',
                              fontWeight: 900,
                              color: '#2563eb'
                            }}>
                              k
                            </span>

                            <span style={{ fontSize: '1.25rem', color: '#64748b', fontWeight: 600, marginLeft: '6px' }}>
                              — (2)
                            </span>
                          </div>
                        )
                      }

                      return (
                        <div
                          key={lIdx}
                          className="e2-fade"
                          style={{
                            fontSize: isCurrent ? '1.42rem' : '1.24rem',
                            color: '#0f172a',
                            fontWeight: isCurrent ? 600 : 500,
                            lineHeight: 1.85,
                            textAlign: 'center'
                          }}
                        >
                          <MathText text={`$${line}$`} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PART 2 (RIGHT PANE): CLEAN QUESTION DISPLAY ONLY (ZERO STEP CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className="right-pane"
        style={{
          flex: 0.85,
          padding: '2.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          overflowY: 'auto',
          background: '#ffffff',
          fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Main Question Display */}
        <div style={{ margin: 0, fontSize: '1.32rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
          <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
            Example 2 :
          </span>
          <MathText text={'If $\\angle B$ and $\\angle Q$ are acute angles such that $\\sin B = \\sin Q$, then prove that $\\angle B = \\angle Q$.'} />
        </div>
      </div>
    </div>
  )
}
