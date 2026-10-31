import React, { useMemo } from 'react'
import katex from 'katex'

/**
 * Converts simple inline fractions like '7/8' or '(a)/(b)' into LaTeX \dfrac{a}{b}
 */
function autoFormatFractions(str) {
  if (!str || typeof str !== 'string') return str

  // If already a complete math formula like $...$ or $$...$$, don't change
  if (/^\$\$[\s\S]+\$\$$/.test(str.trim()) || /^\$[^$]+\$$/.test(str.trim())) {
    return str
  }

  // If string contains mixed text and math, only convert fractions in the text parts
  if (str.includes('$')) {
    const parts = str.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g)
    return parts.map(p => {
      if (p.startsWith('$')) return p
      return p.replace(/(\b\d+|√\d+)\s*\/\s*(\d+|√\d+\b)/g, (match, num, den) => {
        const numLatex = num.startsWith('√') ? `\\sqrt{${num.slice(1)}}` : num
        const denLatex = den.startsWith('√') ? `\\sqrt{${den.slice(1)}}` : den
        return `$\\dfrac{${numLatex}}{${denLatex}}$`
      })
    }).join('')
  }

  if (!str.includes('/')) return str

  let converted = str

  // Replace simple numeric or root fractions: 7/8, 7/25, 1/√3, etc.
  converted = converted.replace(/(\b\d+|√\d+)\s*\/\s*(\d+|√\d+\b)/g, (match, num, den) => {
    const numLatex = num.startsWith('√') ? `\\sqrt{${num.slice(1)}}` : num
    const denLatex = den.startsWith('√') ? `\\sqrt{${den.slice(1)}}` : den
    return `$\\dfrac{${numLatex}}{${denLatex}}$`
  })

  // Replace parenthesized fraction patterns like ((A) / (B))
  converted = converted.replace(/\(([^)]+)\)\s*\/\s*\(([^)]+)\)/g, (match, num, den) => {
    return `$\\dfrac{${cleanLatexTerms(num)}}{${cleanLatexTerms(den)}}$`
  })

  return converted
}

/**
 * Auto-wraps bare \frac or \dfrac in $...$ if not already inside math delimiters
 */
function autoWrapBareFracs(str) {
  if (!str || typeof str !== 'string') return str
  if (!str.includes('\\frac') && !str.includes('\\dfrac')) return str

  const parts = str.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g)
  return parts.map(part => {
    if (part.startsWith('$')) return part
    if (part.includes('\\frac') || part.includes('\\dfrac')) {
      return part.replace(/(\\d?frac\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})/g, '$$$1$$')
    }
    return part
  }).join('')
}

function cleanLatexTerms(s) {
  let t = s.trim()
  t = t.replace(/–/g, '-').replace(/—/g, '-')
  t = t.replace(/²/g, '^2').replace(/³/g, '^3')
  t = t.replace(/°/g, '^\\circ')
  t = t.replace(/θ/g, '\\theta ')
  t = t.replace(/√(\d+|\w+)/g, '\\sqrt{$1}')
  t = t.replace(/\b(sin|cos|tan|cot|sec|cosec)\b/g, '\\$1 ')
  t = normalizeTrigTerms(t)
  return t
}

/**
 * Normalizes common geometric ratio terms in math strings so English words
 * are always wrapped in \text{...} with clean spacing.
 * e.g., "Side opposite to \angle A" -> "\text{Side opposite to } \angle A"
 */
function normalizeTrigTerms(str) {
  if (!str || typeof str !== 'string') return str

  return str.replace(
    /(\\text\{[^}]+\})|((?:Side\s+opposite\s+to|Side\s+adjacent\s+to|Opposite\s+side|Adjacent\s+side|Hypotenuse)(?:\s*(?:\\angle|angle))?)/gi,
    (match, textBlock, term) => {
      if (textBlock) return textBlock

      if (/Side\s+opposite\s+to/i.test(term)) {
        if (/\\angle|angle/i.test(term)) {
          return '\\text{Side opposite to } \\angle '
        }
        return '\\text{Side opposite to } '
      }
      if (/Side\s+adjacent\s+to/i.test(term)) {
        if (/\\angle|angle/i.test(term)) {
          return '\\text{Side adjacent to } \\angle '
        }
        return '\\text{Side adjacent to } '
      }
      if (/Opposite\s+side/i.test(term)) {
        return '\\text{Opposite side}'
      }
      if (/Adjacent\s+side/i.test(term)) {
        return '\\text{Adjacent side}'
      }
      if (/Hypotenuse/i.test(term)) {
        return '\\text{Hypotenuse}'
      }
      return match
    }
  ).replace(/\\angle\s*\\angle/g, '\\angle')
}

/**
 * Unpacks LaTeX strings where sentences/words are embedded in \text{...}
 * ONLY when \text{...} occurs at the root level (depth 0 of braces).
 * If \text{...} is inside \dfrac{...}, \frac{...}, \sqrt{...}, etc., it must NOT
 * be unpacked, because doing so tears apart the fraction/macro argument!
 */
function unpackSentenceMath(input) {
  if (typeof input !== 'string') return input
  let str = input.trim()

  // If display formula $$...$$, do not unpack
  if (str.startsWith('$$') && str.endsWith('$$')) return input

  // Only unpack if it contains \text{
  if (!str.includes('\\text{')) return input

  // Check if string contains multiple separate $ delimiters (already mixed text + math)
  // e.g. "Since $\text{LHS} = ...$:" or "$a$ and $b$" -> DO NOT UNPACK!
  const dollarCount = (str.match(/\$/g) || []).length
  if (dollarCount > 2) return input
  if (dollarCount === 2 && !(str.startsWith('$') && str.endsWith('$'))) return input
  if (dollarCount === 1) return input

  const hasOuterDollars = str.startsWith('$') && str.endsWith('$')
  const inner = hasOuterDollars ? str.slice(1, -1).trim() : str

  if (!inner.includes('\\text{')) return input

  // If inner contains \frac, \dfrac, or =, it's a mathematical equation, not a prose sentence! Do not unpack!
  if (inner.includes('\\frac') || inner.includes('\\dfrac') || inner.includes('=')) {
    return input
  }

  // Check if there are top-level \text{ at depth 0 that contain spaces (sentence words)
  let depth = 0
  let hasSentenceText = false
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '{') {
      depth++
    } else if (inner[i] === '}') {
      if (depth > 0) depth--
    } else if (depth === 0 && inner.startsWith('\\text{', i)) {
      const start = i + 6
      let td = 1
      let j = start
      while (j < inner.length && td > 0) {
        if (inner[j] === '{') td++
        else if (inner[j] === '}') td--
        j++
      }
      const textContent = inner.slice(start, j - 1).trim()
      if (textContent.includes(' ') && textContent.length > 8) {
        hasSentenceText = true
        break
      }
    }
  }

  // If no top-level sentence text, do not unpack
  if (!hasSentenceText) {
    return input
  }

  // Unpack only top-level segments
  const result = []
  depth = 0
  let segStart = 0

  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '{') {
      depth++
    } else if (inner[i] === '}') {
      if (depth > 0) depth--
    } else if (depth === 0 && inner.startsWith('\\text{', i)) {
      // Math before this \text{
      const mathBefore = inner.slice(segStart, i).trim()
      if (mathBefore) {
        result.push(mathBefore.startsWith('$') ? mathBefore : `$${mathBefore}$`)
      }

      // Find closing brace of this \text{
      const contentStart = i + 6
      let textDepth = 1
      let j = contentStart
      while (j < inner.length && textDepth > 0) {
        if (inner[j] === '{') textDepth++
        else if (inner[j] === '}') textDepth--
        j++
      }
      const textSegment = inner.slice(contentStart, j - 1)
      result.push(textSegment)

      i = j - 1 // Move loop to end of \text{...}
      segStart = j
    }
  }

  // Remaining math after last top-level \text{
  if (segStart < inner.length) {
    const mathAfter = inner.slice(segStart).trim()
    if (mathAfter) {
      result.push(mathAfter.startsWith('$') ? mathAfter : `$${mathAfter}$`)
    }
  }

  return result.join(' ')
}

/**
 * MathText Component
 * Renders mathematical text containing LaTeX '$...$' or auto-detects fractions,
 * displaying numerators and denominators in true textbook vertical format.
 */
export default function MathText({ text, style, className = '' }) {
  const renderedContent = useMemo(() => {
    if (text === null || text === undefined) return null
    let str = String(text)

    // Strip any markdown bold asterisks (**) so they never display as literal stars or KaTeX asterisks
    if (str.includes('**')) {
      str = str.replace(/\*\*/g, '')
    }

    // 1. Auto-detect and format fractions if no explicit LaTeX is present
    str = autoFormatFractions(str)

    // 2. Auto-wrap bare \frac or \dfrac outside of $...$
    str = autoWrapBareFracs(str)

    // 3. Normalize trig terms (e.g. Side opposite to -> \text{Side opposite to })
    str = normalizeTrigTerms(str)

    // 4. Unpack long \text{...} sentences wrapped in math mode so they wrap naturally
    str = unpackSentenceMath(str)

    // 5. Fallback: If string contains LaTeX commands (e.g. \sin, \dfrac, \frac) but lacks '$' delimiters,
    // only wrap in '$...$' if it does not contain regular sentence words
    if (!str.includes('$') && /\\[a-zA-Z]+/.test(str)) {
      const hasFraction = /\\d?frac\b/.test(str)
      const hasSentenceWords = /\b(is|the|for|and|in|of|with|gives|from|using|therefore|Statement|Answer|Justification|Option|since|because|Strategy|Golden)\b/i.test(str.replace(/\\text\{[^}]+\}/g, ''))
      if (hasFraction || !hasSentenceWords) {
        str = `$${str}$`
      }
    }
    
    const processedText = str

    // Split text by LaTeX delimiters $$...$$ or $...$
    const parts = processedText.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g)

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        let math = part.slice(2, -2).trim()
        if (math.includes('\\frac') && !math.includes('\\dfrac')) {
          math = math.replace(/\\frac/g, '\\dfrac')
        }
        try {
          const html = katex.renderToString(math, {
            throwOnError: false,
            displayMode: true
          })
          return (
            <div
              key={index}
              className="math-display-formula"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ margin: '0.4rem 0', maxWidth: '100%', overflowX: 'auto' }}
            />
          )
        } catch (err) {
          console.error('KaTeX display rendering error:', err)
          return <div key={index}>{part}</div>
        }
      }

      if (part.startsWith('$') && part.endsWith('$')) {
        let math = part.slice(1, -1).trim()
        
        // Ensure standard \frac is upgraded to \dfrac for crisp vertical display
        if (math.includes('\\frac') && !math.includes('\\dfrac')) {
          math = math.replace(/\\frac/g, '\\dfrac')
        }

        try {
          const html = katex.renderToString(math, {
            throwOnError: false,
            displayMode: false
          })
          return (
            <span
              key={index}
              className="math-formula-span"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                margin: '0 2px',
                maxWidth: '100%',
                whiteSpace: 'nowrap'
              }}
            />
          )
        } catch (err) {
          console.error('KaTeX rendering error:', err)
          return <span key={index}>{part}</span>
        }
      }

      // Clean any stray \text{...} from non-math segments
      const cleanSegment = part.includes('\\text{')
        ? part.replace(/\\text\{([^}]+)\}/g, '$1')
        : part

      // Handle simple markdown bold **text** in non-math segments
      if (cleanSegment.includes('**')) {
        const subParts = cleanSegment.split(/(\*\*[^*]+?\*\*)/g)
        return (
          <React.Fragment key={index}>
            {subParts.map((sub, sIdx) => {
              if (sub.startsWith('**') && sub.endsWith('**')) {
                return (
                  <strong key={sIdx} style={{ fontWeight: '700', color: '#0f172a' }}>
                    {sub.slice(2, -2)}
                  </strong>
                )
              }
              return sub
            })}
          </React.Fragment>
        )
      }

      return <React.Fragment key={index}>{cleanSegment}</React.Fragment>
    })
  }, [text])

  if (text === null || text === undefined) return null

  return (
    <span
      className={`math-rendered-text ${className}`}
      style={{
        display: 'inline',
        maxWidth: '100%',
        overflowWrap: 'break-word',
        wordBreak: 'normal',
        ...style
      }}
    >
      {renderedContent}
    </span>
  )
}
