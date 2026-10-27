import React, { useState } from 'react'

export default function BasicsExplorer({ onSwitchToTutor }) {
  const [slide, setSlide] = useState(0)

  const slides = [
    {
      badge: '8.1 Introduction',
      title: 'What is Trigonometry?',
      subtitle: 'The Mathematics of Triangles and Distances',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.18rem', lineHeight: '1.75', color: '#334155' }}>
            The word <strong>‘Trigonometry’</strong> is derived from Greek words:
            <br />
            • <strong>‘tri’</strong> (meaning three),
            <br />
            • <strong>‘gon’</strong> (meaning sides),
            <br />
            • <strong>‘metron’</strong> (meaning measure).
          </p>
          <div style={{
            backgroundColor: '#f8fafc',
            borderLeft: '4px solid #0284c7',
            borderTop: '1px solid #e2e8f0',
            borderRight: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0',
            padding: '1.1rem 1.4rem',
            borderRadius: '0 8px 8px 0'
          }}>
            <p style={{ fontSize: '1.05rem', color: '#0369a1', margin: 0, fontWeight: '600' }}>
              Trigonometry is the branch of mathematics that studies relationships between side lengths and angles of triangles.
            </p>
          </div>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#475569' }}>
            Historically used by ancient astronomers to calculate distances to stars and planets. Today, it powers engineering, navigation, physics, and computer graphics.
          </p>
        </div>
      )
    },
    {
      badge: '8.2 Right Triangle & Sides',
      title: 'Naming the Sides Relative to Angle θ',
      subtitle: 'The Reference Angle Determines the Sides',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.1rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#059669', marginBottom: '4px' }}>HYPOTENUSE</div>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>The longest side opposite to the 90° right angle.</p>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.1rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0284c7', marginBottom: '4px' }}>OPPOSITE SIDE</div>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>The side directly facing reference angle θ.</p>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.1rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#b45309', marginBottom: '4px' }}>ADJACENT SIDE</div>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>The side adjacent to reference angle θ.</p>
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '0.5rem' }}>
            <h4 style={{ color: '#0f172a', marginBottom: '6px', fontSize: '1rem', fontWeight: '700' }}>💡 Reference Angle Note:</h4>
            <p style={{ color: '#475569', fontSize: '0.98rem', margin: 0 }}>
              If you switch the reference angle from <strong>∠A</strong> to <strong>∠C</strong>, Opposite and Adjacent sides exchange positions, while Hypotenuse always remains the same.
            </p>
          </div>
        </div>
      )
    },
    {
      badge: '8.3 The 6 Ratios',
      title: 'The 6 Trigonometric Ratios',
      subtitle: 'Definitions and Relationships',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.9rem' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderTop: '3px solid #0284c7', padding: '0.9rem', borderRadius: '8px', textAlign: 'center' }}>
              <strong style={{ color: '#0284c7', fontSize: '1.05rem' }}>sin A</strong>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>Opposite / Hypotenuse</div>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderTop: '3px solid #0284c7', padding: '0.9rem', borderRadius: '8px', textAlign: 'center' }}>
              <strong style={{ color: '#0284c7', fontSize: '1.05rem' }}>cos A</strong>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>Adjacent / Hypotenuse</div>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderTop: '3px solid #0284c7', padding: '0.9rem', borderRadius: '8px', textAlign: 'center' }}>
              <strong style={{ color: '#0284c7', fontSize: '1.05rem' }}>tan A</strong>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>Opposite / Adjacent</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.9rem', borderRadius: '8px', textAlign: 'center' }}>
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>cosec A</strong>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>1 / sin A</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.9rem', borderRadius: '8px', textAlign: 'center' }}>
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>sec A</strong>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>1 / cos A</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.9rem', borderRadius: '8px', textAlign: 'center' }}>
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>cot A</strong>
              <div style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>1 / tan A</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '0.8rem' }}>
            <button
              onClick={onSwitchToTutor}
              style={{
                backgroundColor: '#f59e0b',
                color: '#ffffff',
                border: '1px solid #f59e0b',
                padding: '0.65rem 1.8rem',
                borderRadius: '20px',
                fontSize: '0.92rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Start Example 1 Interactive Tutor →
            </button>
          </div>
        </div>
      )
    }
  ]

  const current = slides[slide]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '2.5rem 3.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff'
    }}>
      <div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '3px 12px',
            borderRadius: '16px',
            backgroundColor: '#f1f5f9',
            color: '#0284c7',
            fontSize: '0.82rem',
            fontWeight: '700',
            marginBottom: '0.6rem'
          }}>
            {current.badge}
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.3rem' }}>
            {current.title}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', margin: 0 }}>
            {current.subtitle}
          </p>
        </div>

        {current.content}
      </div>

      {/* Flat Slide Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '1.2rem',
        marginTop: '1.5rem'
      }}>
        <button
          onClick={() => setSlide(Math.max(0, slide - 1))}
          disabled={slide === 0}
          style={{
            padding: '0.45rem 1.25rem',
            borderRadius: '18px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: slide === 0 ? '#94a3b8' : '#0f172a',
            cursor: slide === 0 ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          Previous
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: slide === i ? '24px' : '8px',
                height: '7px',
                borderRadius: '3.5px',
                backgroundColor: slide === i ? '#0284c7' : '#e2e8f0',
                border: 'none',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (slide < slides.length - 1) setSlide(slide + 1)
            else onSwitchToTutor()
          }}
          style={{
            padding: '0.45rem 1.4rem',
            borderRadius: '18px',
            border: '1px solid transparent',
            background: '#0284c7',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '0.9rem'
          }}
        >
          {slide === slides.length - 1 ? 'Go to Tutor →' : 'Next'}
        </button>
      </div>
    </div>
  )
}
