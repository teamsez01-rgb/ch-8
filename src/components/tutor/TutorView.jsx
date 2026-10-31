import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import MathText from '../common/MathText'
import Example1Tutor from './Example1Tutor'
import Example2Tutor from './Example2Tutor'
import Example3Tutor from './Example3Tutor'
import Example4Tutor from './Example4Tutor'
import Example5Tutor from './Example5Tutor'
import Example6Tutor from './Example6Tutor'
import Example7Tutor from './Example7Tutor'
import Example8Tutor from './Example8Tutor'
import Example9Tutor from './Example9Tutor'
import Example10Tutor from './Example10Tutor'
import Example11Tutor from './Example11Tutor'
import Example12Tutor from './Example12Tutor'

export default function TutorView({ example, onNextExample, onPrevExample, hasPrev = true, hasNext = true, initialAtEnd = false }) {
  if (!example) return null

  if (example.id === 'Example 1') {
    return (
      <Example1Tutor
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 2') {
    return (
      <Example2Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 3') {
    return (
      <Example3Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 4') {
    return (
      <Example4Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 5') {
    return (
      <Example5Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 6') {
    return (
      <Example6Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 7') {
    return (
      <Example7Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 8') {
    return (
      <Example8Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 9') {
    return (
      <Example9Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 10') {
    return (
      <Example10Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 11') {
    return (
      <Example11Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  if (example.id === 'Example 12') {
    return (
      <Example12Tutor
        example={example}
        onNextExample={onNextExample}
        onPrevExample={onPrevExample}
        hasPrev={hasPrev}
        hasNext={hasNext}
        initialAtEnd={initialAtEnd}
      />
    )
  }

  const hasSubQuestions = Boolean(example.hasSubQuestions && example.subQuestions?.length > 0)
  const currentSubQ = hasSubQuestions ? example.subQuestions[0] : null

  return (
    <div className="main-content">
      {/* ==================================================================
          LEFT PANE: CLEAN BLANK WORKSPACE (READY FOR CUSTOM ANIMATIONS)
          ================================================================== */}
      <div
        className="left-pane"
        style={{
          flex: 1,
          borderRight: '1px solid #e2e8f0',
          background: '#ffffff',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      />

      {/* ==================================================================
          RIGHT PANE: CLEAN QUESTION DISPLAY ONLY
          ================================================================== */}
      <div
        className="right-pane"
        style={{
          flex: 1,
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
        <div style={{ margin: 0, fontSize: '1.3rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
          <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
            {example.label} :
          </span>
          <MathText text={example.question} />
        </div>

        {/* Active Sub-Question Card if example has parts */}
        {hasSubQuestions && currentSubQ && (
          <div style={{
            background: '#f0f7ff',
            border: '1.5px solid #0284c7',
            borderRadius: '16px',
            padding: '1.5rem 1.8rem',
            marginTop: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '0.85rem'
            }}>
              <span style={{
                fontSize: '1.05rem',
                fontWeight: '800',
                color: '#0f172a'
              }}>
                Part {currentSubQ.label}
              </span>
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#0284c7',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem',
                fontWeight: '800',
                lineHeight: 1
              }}>
                Q
              </span>
            </div>

            <div style={{
              fontSize: '1.2rem',
              lineHeight: '1.7',
              color: '#334155',
              fontWeight: '500'
            }}>
              <MathText text={currentSubQ.text} />
            </div>
          </div>
        )}

        {/* Bottom Navigation Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '2rem',
          borderTop: '1px solid #f1f5f9'
        }}>
          <button
            onClick={onPrevExample}
            disabled={!hasPrev}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.55rem 1.4rem',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: !hasPrev ? '#94a3b8' : '#0f172a',
              cursor: !hasPrev ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.92rem',
              fontFamily: 'Inter',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} />
            Previous Example
          </button>

          <button
            onClick={onNextExample}
            disabled={!hasNext}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.55rem 1.5rem',
              borderRadius: '20px',
              border: '1px solid transparent',
              background: !hasNext ? '#94a3b8' : '#0284c7',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: !hasNext ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter',
              transition: 'all 0.15s ease'
            }}
          >
            Next Example
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}