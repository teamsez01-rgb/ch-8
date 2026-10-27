import React from 'react'
import Example1Tutor from './Example1Tutor'

/**
 * Example 1 uses the full guided, animated tutor experience.
 * Kept as a thin wrapper so the existing TutorView navigation keeps working.
 */
export default function Example1StepTutor({ example, onNextExample, onPrevExample, hasPrev = true, hasNext = true }) {
  return (
    <Example1Tutor
      example={example}
      onNextExample={onNextExample}
      onPrevExample={onPrevExample}
      hasPrev={hasPrev}
      hasNext={hasNext}
    />
  )
}
