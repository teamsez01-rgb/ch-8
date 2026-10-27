import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import MathText from '../common/MathText'

export default function ExerciseView({
  exercise,
  question,
  activeSubQuestionIndex,
  onSelectSubQuestion,
  onNext,
  onPrev,
  hasPrev,
  hasNext
}) {
  if (!question) return null

  const hasSubQuestions = Boolean(question.hasSubQuestions && question.subQuestions?.length > 0)
  const currentSubQ = hasSubQuestions ? question.subQuestions[activeSubQuestionIndex] || question.subQuestions[0] : null

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
          RIGHT PANE: CLEAN QUESTION DISPLAY (SAME AS EXAMPLE)
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
          background: '#ffffff'
        }}
      >
        {/* Main Question Display */}
        <div style={{ margin: 0 }}>
          <div style={{ fontSize: '1.35rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
            <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
              {question.number || question.id.replace('Q', '')}.
            </span>
            <MathText text={question.mainText} />
          </div>

          {/* Active Sub-Question (One by One) */}
          {hasSubQuestions && currentSubQ && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontSize: '1.35rem', lineHeight: '1.7', color: '#0f172a', fontWeight: '600' }}>
                <span style={{ color: '#0284c7', fontWeight: '800', marginRight: '10px' }}>
                  {currentSubQ.label}
                </span>
                <MathText text={currentSubQ.text} />
              </div>

              {/* Options for MCQ questions if present */}
              {currentSubQ.options && currentSubQ.options.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginTop: '1rem',
                  maxWidth: '640px'
                }}>
                  {currentSubQ.options.map((opt, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.7rem 1.1rem',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#1e293b'
                      }}
                    >
                      <MathText text={opt} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '2rem'
        }}>
          <button
            onClick={onPrev}
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
            {hasSubQuestions && activeSubQuestionIndex > 0
              ? `Previous Part ${question.subQuestions[activeSubQuestionIndex - 1]?.label || ''}`
              : 'Previous Question'}
          </button>

          <button
            onClick={onNext}
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
            {hasSubQuestions && activeSubQuestionIndex < question.subQuestions.length - 1
              ? `Next Part ${question.subQuestions[activeSubQuestionIndex + 1]?.label || ''}`
              : 'Next Question'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}