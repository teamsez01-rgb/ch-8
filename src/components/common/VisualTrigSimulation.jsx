import React, { useState } from 'react'
import MathText from './MathText'
import { CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react'

export default function VisualTrigSimulation({
  visualState,
  activeStep = 1,
  totalSteps = 1,
  exercise = '8.1',
  questionLabel = ''
}) {
  const [selectedRatio, setSelectedRatio] = useState(null)

  const type = visualState?.type || (exercise === '8.3' ? 'identity' : 'triangle')

  // Triangle SVG settings
  const originX = 100
  const originY = 280
  const baseWidth = 260
  const oppHeight = 195
  const topX = originX + baseWidth
  const topY = originY - oppHeight

  const oppVal = visualState?.opp || 4
  const adjVal = visualState?.adj || 3
  const hypVal = visualState?.hyp || 5
  const angleLetter = visualState?.angle || 'A'

  const isHypHighlighted = selectedRatio === 'sin' || selectedRatio === 'cos' || selectedRatio === 'cosec' || selectedRatio === 'sec' || visualState?.highlight === 'hyp' || visualState?.highlight === 'all'
  const isOppHighlighted = selectedRatio === 'sin' || selectedRatio === 'tan' || selectedRatio === 'cot' || selectedRatio === 'cosec' || visualState?.highlight === 'opp' || visualState?.highlight === 'all'
  const isAdjHighlighted = selectedRatio === 'cos' || selectedRatio === 'tan' || selectedRatio === 'cot' || selectedRatio === 'sec' || visualState?.highlight === 'adj' || visualState?.highlight === 'all'

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem',
      userSelect: 'none'
    }}>
      {/* Top Header Label */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.65rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#0284c7" />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Interactive Mathematical Simulation
          </span>
        </div>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: '700',
          padding: '2px 10px',
          borderRadius: '12px',
          background: '#e0f2fe',
          color: '#0284c7'
        }}>
          Step {activeStep} of {totalSteps}
        </span>
      </div>

      {/* ====================================================================
          MODE 1: RIGHT TRIANGLE GEOMETRY & TRIG RATIOS (Ex 8.1 & Examples)
          ==================================================================== */}
      {type === 'triangle' && (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: '1rem 0'
        }}>
          <svg viewBox="0 0 460 330" style={{ width: '100%', maxWidth: '400px', overflow: 'visible' }}>
            {/* Flat Polygon */}
            <polygon
              points={`${originX},${originY} ${topX},${originY} ${topX},${topY}`}
              fill="rgba(2, 132, 199, 0.03)"
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Adjacent Side Highlight */}
            {isAdjHighlighted && (
              <line
                x1={originX}
                y1={originY}
                x2={topX}
                y2={originY}
                stroke="#0284c7"
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}

            {/* Opposite Side Highlight */}
            {isOppHighlighted && (
              <line
                x1={topX}
                y1={originY}
                x2={topX}
                y2={topY}
                stroke="#059669"
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}

            {/* Hypotenuse Highlight */}
            {isHypHighlighted && (
              <line
                x1={originX}
                y1={originY}
                x2={topX}
                y2={topY}
                stroke="#d97706"
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}

            {/* 90° Square at B */}
            <rect
              x={topX - 18}
              y={originY - 18}
              width="18"
              height="18"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="2"
            />

            {/* Vertices */}
            <circle cx={originX} cy={originY} r="5.5" fill="#0284c7" />
            <circle cx={topX} cy={originY} r="5.5" fill="#0284c7" />
            <circle cx={topX} cy={topY} r="5.5" fill="#0284c7" />

            {/* Vertices Labels */}
            <text x={originX - 24} y={originY + 6} fill="#0f172a" fontSize="19" fontWeight="800" fontFamily="Inter">A</text>
            <text x={topX + 12} y={originY + 6} fill="#0f172a" fontSize="17" fontWeight="800" fontFamily="Inter">B (90°)</text>
            <text x={topX + 12} y={topY + 6} fill="#0f172a" fontSize="19" fontWeight="800" fontFamily="Inter">C</text>

            {/* Adjacent / Base */}
            <text
              x={originX + baseWidth / 2}
              y={originY + 30}
              fill={isAdjHighlighted ? '#0284c7' : '#64748b'}
              fontSize="16"
              fontWeight="700"
              textAnchor="middle"
              fontFamily="Inter"
            >
              Base AB = {adjVal}
            </text>

            {/* Opposite / Height */}
            <text
              x={topX + 14}
              y={originY - oppHeight / 2}
              fill={isOppHighlighted ? '#059669' : '#64748b'}
              fontSize="16"
              fontWeight="700"
              dominantBaseline="middle"
              fontFamily="Inter"
            >
              BC = {oppVal}
            </text>

            {/* Hypotenuse */}
            <text
              x={originX + baseWidth / 2 - 38}
              y={originY - oppHeight / 2 - 14}
              fill={isHypHighlighted ? '#b45309' : '#64748b'}
              fontSize="16"
              fontWeight="700"
              fontFamily="Inter"
              transform={`rotate(-36.8, ${originX + baseWidth / 2}, ${originY - oppHeight / 2})`}
            >
              Hypotenuse AC = {hypVal}
            </text>

            {/* Angle Arc */}
            <path
              d={`M ${originX + 36} ${originY} A 36 36 0 0 0 ${originX + 28} ${originY - 21}`}
              fill="none"
              stroke="#d97706"
              strokeWidth="2.5"
            />
            <text x={originX + 42} y={originY - 8} fill="#d97706" fontSize="16" fontWeight="800" fontFamily="Inter">
              θ
            </text>
          </svg>

          {/* Interactive Ratio Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            {['sin', 'cos', 'tan', 'cot', 'cosec', 'sec'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRatio(selectedRatio === r ? null : r)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '16px',
                  border: selectedRatio === r ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                  background: selectedRatio === r ? '#e0f2fe' : '#ffffff',
                  color: selectedRatio === r ? '#0284c7' : '#475569',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease'
                }}
              >
                {r} {angleLetter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODE 2: TRIGONOMETRIC IDENTITIES PROOF PIPELINE (Ex 8.3 & Proofs)
          ==================================================================== */}
      {type === 'identity' && (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: '1.25rem',
          padding: '1.5rem 0'
        }}>
          {/* Visual Transformation Card */}
          <div style={{
            width: '100%',
            maxWidth: '460px',
            padding: '1.5rem 1.8rem',
            borderRadius: '12px',
            background: '#ffffff',
            border: '1.5px solid #bae6fd',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>
              Algebraic Transformation Pipeline
            </div>

            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0f172a',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MathText text={visualState?.transform ? `$${visualState.transform}$` : `$${visualState?.lhs || '\\text{LHS}'}$`} />
            </div>

            {visualState?.identity && (
              <div style={{
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#166534',
                fontSize: '0.95rem',
                fontWeight: '700'
              }}>
                <MathText text={`Using Identity: $${visualState.identity}$`} />
              </div>
            )}
          </div>

          {/* Key Identities Bank */}
          <div style={{
            width: '100%',
            maxWidth: '460px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.65rem'
          }}>
            {[
              '\\sin^2\\theta + \\cos^2\\theta = 1',
              '1 + \\tan^2\\theta = \\sec^2\\theta',
              '1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta',
              '\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}'
            ].map((idText, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  color: '#334155'
                }}
              >
                <MathText text={`$${idText}$`} />
              </div>
            ))}
          </div>

          {activeStep === totalSteps && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1.4rem',
              borderRadius: '20px',
              background: '#dcfce7',
              border: '1.5px solid #86efac',
              color: '#15803d',
              fontWeight: '800',
              fontSize: '0.95rem'
            }}>
              <CheckCircle2 size={18} />
              Identity Verified &amp; Proven (LHS = RHS)
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          MODE 3: VALUES REFERENCE (Ex 8.2)
          ==================================================================== */}
      {type === 'values' && (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: '1rem',
          padding: '1rem 0'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            padding: '1.25rem',
            borderRadius: '10px',
            background: '#f0f9ff',
            border: '1px solid #bae6fd'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0369a1', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Standard Angle Values Used in this Step:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(visualState?.values || ['\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}', '\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}']).map((v, i) => (
                <div key={i} style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '600' }}>
                  <MathText text={v.startsWith('$') ? v : `$${v}$`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Information */}
      <div style={{
        width: '100%',
        padding: '0.65rem 1rem',
        borderRadius: '8px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.85rem',
        color: '#64748b'
      }}>
        <span>Interactive Visual Animation</span>
        <span style={{ fontWeight: '700', color: '#0284c7' }}>Shreeji Education Zone</span>
      </div>
    </div>
  )
}
