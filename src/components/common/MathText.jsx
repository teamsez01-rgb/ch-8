import React, { useMemo } from 'react'
import katex from 'katex'

/**
 * Converts simple inline fractions like '7/8' or '(a)/(b)' into LaTeX \dfrac{a}{b}
 */
function autoFormatFractions(str) {
  if (!str || typeof str !== 'string') return str

  // If already contains LaTeX '$', we don't need auto-conversion
  if (str.includes('$')) return str

  // Check if string contains a fraction slash '/'
  if (!str.includes('/')) return str

  // Try converting common patterns:
  // 1. Single fraction like "(1 + sin θ)(1 - sin θ) / ((1 + cos θ)(1 - cos θ))"
  // or "(cosecA - 1) / (cosecA + 1)"
  // 2. Simple numeric fractions like 7/8, 13/12, 1/2, 3/4, 4/3, 1/√3
  let converted = str

  // Replace simple numeric or root fractions: 7/8, 1/√3, etc.
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

function cleanLatexTerms(s) {
  let t = s.trim()
  t = t.replace(/–/g, '-').replace(/—/g, '-')
  t = t.replace(/²/g, '^2').replace(/³/g, '^3')
  t = t.replace(/°/g, '^\\circ')
  t = t.replace(/θ/g, '\\theta ')
  t = t.replace(/√(\d+|\w+)/g, '\\sqrt{$1}')
  t = t.replace(/\b(sin|cos|tan|cot|sec|cosec)\b/g, '\\$1 ')
  return t
}

/**
 * MathText Component
 * Renders mathematical text containing LaTeX '$...$' or auto-detects fractions,
 * displaying numerators and denominators in true textbook vertical format.
 */
export default function MathText({ text, style, className = '' }) {
  const renderedContent = useMemo(() => {
    if (text === null || text === undefined) return null
    const str = String(text)
    
    // Auto-detect and format fractions if no explicit LaTeX is present
    const processedText = autoFormatFractions(str)

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
              style={{ margin: '0.4rem 0' }}
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
                margin: '0 2px'
              }}
            />
          )
        } catch (err) {
          console.error('KaTeX rendering error:', err)
          return <span key={index}>{part}</span>
        }
      }

      // Handle simple markdown bold **text** in non-math segments
      if (part.includes('**')) {
        const subParts = part.split(/(\*\*[^*]+?\*\*)/g)
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

      return <React.Fragment key={index}>{part}</React.Fragment>
    })
  }, [text])

  if (text === null || text === undefined) return null

  return (
    <span className={`math-rendered-text ${className}`} style={style}>
      {renderedContent}
    </span>
  )
}
