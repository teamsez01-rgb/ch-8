import React from 'react'

export default function InteractiveTrigCanvas({ example, currentStep = 1 }) {
  // Proportioned coordinates matching reference image
  const originX = 110
  const originY = 360
  const baseWidth = 280
  const oppHeight = 210

  const topX = originX + baseWidth
  const topY = originY - oppHeight

  const activeStepData = example?.steps?.[currentStep - 1] || example?.steps?.[0]
  const visual = activeStepData?.visual || {}
  const triangle = visual.triangle || { opp: 4, adj: 3, hyp: 5, angleA: 'A', rightAngle: 'B', top: 'C' }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '1rem'
    }}>
      {/* Clean Crisp SVG Canvas */}
      <svg
        viewBox="0 0 520 440"
        style={{
          width: '100%',
          maxWidth: '480px',
          height: 'auto',
          overflow: 'visible'
        }}
      >
        {/* Flat Right Triangle Polygon */}
        <polygon
          points={`${originX},${originY} ${topX},${originY} ${topX},${topY}`}
          fill="none"
          stroke="#0284c7"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 90° Right Angle Square at B */}
        <rect
          x={topX - 20}
          y={originY - 20}
          width="20"
          height="20"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.8"
        />

        {/* Vertices Points */}
        <circle cx={originX} cy={originY} r="5" fill="#0284c7" />
        <circle cx={topX} cy={originY} r="5" fill="#0284c7" />
        <circle cx={topX} cy={topY} r="5" fill="#0284c7" />

        {/* Vertices Letter Labels */}
        <text
          x={originX - 26}
          y={originY + 6}
          fill="#0f172a"
          fontSize="22"
          fontWeight="700"
          fontFamily="Inter"
        >
          {triangle.angleA || 'A'}
        </text>

        <text
          x={topX + 12}
          y={originY + 6}
          fill="#0f172a"
          fontSize="20"
          fontWeight="700"
          fontFamily="Inter"
        >
          {triangle.rightAngle || 'B'} (90°)
        </text>

        <text
          x={topX + 12}
          y={topY + 6}
          fill="#0f172a"
          fontSize="22"
          fontWeight="700"
          fontFamily="Inter"
        >
          {triangle.top || 'C'}
        </text>

        {/* Adjacent / Base Side */}
        <text
          x={originX + baseWidth / 2}
          y={originY + 30}
          fill="#0284c7"
          fontSize="16"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="Inter"
        >
          {triangle.adj ? `Adjacent (Base) = ${triangle.adj}k` : 'Adjacent (Base)'}
        </text>

        {/* Opposite Side */}
        <text
          x={topX + 14}
          y={originY - oppHeight / 2}
          fill="#059669"
          fontSize="16"
          fontWeight="600"
          dominantBaseline="middle"
          fontFamily="Inter"
        >
          {triangle.opp ? `Opposite = ${triangle.opp}k` : 'Opposite (Perpendicular)'}
        </text>

        {/* Hypotenuse */}
        <text
          x={originX + baseWidth / 2 - 35}
          y={originY - oppHeight / 2 - 14}
          fill="#b45309"
          fontSize="16"
          fontWeight="600"
          fontFamily="Inter"
          transform={`rotate(-36.8, ${originX + baseWidth / 2}, ${originY - oppHeight / 2})`}
        >
          {triangle.hyp ? `Hypotenuse = ${triangle.hyp}k` : 'Hypotenuse (AC = ?)'}
        </text>

        {/* Angle Arc at A */}
        <path
          d={`M ${originX + 42} ${originY} A 42 42 0 0 0 ${originX + 34} ${originY - 25}`}
          fill="none"
          stroke="#d97706"
          strokeWidth="2"
        />
        <text
          x={originX + 48}
          y={originY - 8}
          fill="#d97706"
          fontSize="16"
          fontWeight="700"
          fontFamily="Inter"
        >
          θ
        </text>
      </svg>

      {/* Clean Status Pill Exactly like Image 1 */}
      <div style={{
        marginTop: '1.5rem',
        padding: '0.55rem 1.6rem',
        backgroundColor: '#f0f9ff',
        borderRadius: '24px',
        border: '1px solid #bae6fd',
        color: '#0284c7',
        fontSize: '0.95rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#0284c7'
        }} />
        Pythagoras Theorem: AC² = AB² + BC² &nbsp;•&nbsp; (3k)² + (4k)² = (5k)²
      </div>
    </div>
  )
}
