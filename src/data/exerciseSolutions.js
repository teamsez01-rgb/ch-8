/**
 * Comprehensive Step-by-Step Solutions with Mathematical Precision
 * for Class 10 NCERT Chapter 8 - Introduction to Trigonometry
 * All fractions are formatted in LaTeX (\frac{ansh}{ched}) for textbook vertical display.
 */

export const EXERCISE_SOLUTIONS = {
  // =========================================================================
  // EXERCISE 8.1 SOLUTIONS
  // =========================================================================
  '8.1': {
    'Q1': {
      '(i)': [
        {
          stepNum: 1,
          title: 'Understand Given Values & Target',
          lines: [
            '\\textbf{Given in Question :} \\text{In } \\Delta ABC, \\angle B = 90^\\circ, \\text{ Leg } AB = 24\\text{ cm}, \\text{ and Leg } BC = 7\\text{ cm}',
            '\\textbf{Target to Find :} \\sin A \\quad \\text{and} \\quad \\cos A',
            '\\text{Strategy : To find ratios of angle } A, \\text{ we need all 3 sides. We must first find Hypotenuse } AC!'
          ],
          reason: 'Identify given triangle legs and determine that Hypotenuse $AC$ is required',
          visual: null
        },
        {
          stepNum: 2,
          title: 'Construct Right Triangle ABC',
          lines: [
            'In right-angled triangle $\\Delta ABC$, right-angled at $B$:',
            'Leg $AB = 24\\text{ cm}$ (base) and Leg $BC = 7\\text{ cm}$ (vertical height).',
            'Hypotenuse $AC$ is currently unknown ($AC = ?$).'
          ],
          reason: 'Draw right $\\Delta ABC$ with right angle at $B$ and mark given sides',
          visual: { type: 'triangle', opp: 7, adj: 24, hyp: '?', angle: 'A', highlight: 'all' }
        },
        {
          stepNum: 3,
          title: 'Apply Pythagoras Theorem to find Hypotenuse AC',
          lines: [
            '\\text{By Pythagoras Theorem in right } \\Delta ABC :',
            '$$AC^2 = AB^2 + BC^2$$',
            '$$AC^2 = (24)^2 + (7)^2 = 576 + 49 = 625$$',
            '$$AC = \\sqrt{625} = 25\\text{ cm}$$'
          ],
          reason: 'Pythagoras Theorem: $AC = \\sqrt{AB^2 + BC^2} = 25\\text{ cm}$',
          visual: { type: 'triangle', opp: 7, adj: 24, hyp: 25, angle: 'A', highlight: 'hyp' }
        },
        {
          stepNum: 4,
          title: 'Calculate sin A',
          lines: [
            'For acute reference angle $A$:',
            '$$\\text{Opposite side} = BC = 7\\text{ cm}, \\quad \\text{Hypotenuse} = AC = 25\\text{ cm}$$',
            '$$\\sin A = \\frac{\\text{Side opposite to } \\angle A}{\\text{Hypotenuse}} = \\frac{BC}{AC}$$',
            '$$\\mathbf{\\sin A = \\frac{7}{25}}$$'
          ],
          reason: '$\\sin A = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}} = \\dfrac{7}{25}$',
          visual: { type: 'triangle', opp: 7, adj: 24, hyp: 25, angle: 'A', highlight: 'opp' }
        },
        {
          stepNum: 5,
          title: 'Calculate cos A',
          lines: [
            'For acute reference angle $A$:',
            '$$\\text{Adjacent side} = AB = 24\\text{ cm}, \\quad \\text{Hypotenuse} = AC = 25\\text{ cm}$$',
            '$$\\cos A = \\frac{\\text{Side adjacent to } \\angle A}{\\text{Hypotenuse}} = \\frac{AB}{AC}$$',
            '$$\\mathbf{\\cos A = \\frac{24}{25}}$$'
          ],
          reason: '$\\cos A = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\dfrac{24}{25}$',
          visual: { type: 'triangle', opp: 7, adj: 24, hyp: 25, angle: 'A', highlight: 'adj' }
        }
      ],
      '(ii)': [
        {
          stepNum: 1,
          title: 'Identify Sides with respect to Acute Angle C',
          lines: [
            'In $\\Delta ABC$ right-angled at $B$, with known sides $AB = 24\\text{ cm}, BC = 7\\text{ cm}, AC = 25\\text{ cm}$:',
            'When observing from acute reference angle $C$:',
            '$$\\text{Side opposite to } \\angle C = AB = 24\\text{ cm}$$',
            '$$\\text{Side adjacent to } \\angle C = BC = 7\\text{ cm}$$',
            '$$\\text{Hypotenuse } = AC = 25\\text{ cm}$$'
          ],
          reason: 'For angle $C$, opposite is $AB = 24\\text{ cm}$ and adjacent is $BC = 7\\text{ cm}$',
          visual: { type: 'triangle', opp: 24, adj: 7, hyp: 25, angle: 'C', highlight: 'all' }
        },
        {
          stepNum: 2,
          title: 'Calculate sin C',
          lines: [
            '$$\\sin C = \\frac{\\text{Side opposite to } \\angle C}{\\text{Hypotenuse}} = \\frac{AB}{AC}$$',
            '$$\\mathbf{\\sin C = \\frac{24}{25}}$$'
          ],
          reason: '$\\sin C = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}} = \\dfrac{24}{25}$',
          visual: { type: 'triangle', opp: 24, adj: 7, hyp: 25, angle: 'C', highlight: 'opp' }
        },
        {
          stepNum: 3,
          title: 'Calculate cos C',
          lines: [
            '$$\\cos C = \\frac{\\text{Side adjacent to } \\angle C}{\\text{Hypotenuse}} = \\frac{BC}{AC}$$',
            '$$\\mathbf{\\cos C = \\frac{7}{25}}$$'
          ],
          reason: '$\\cos C = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}} = \\dfrac{7}{25}$',
          visual: { type: 'triangle', opp: 24, adj: 7, hyp: 25, angle: 'C', highlight: 'adj' }
        }
      ]
    },
    'Q2': {
      'default': [
        {
          stepNum: 1,
          title: 'Find Side QR using Pythagoras Theorem',
          lines: [
            'In Fig. 8.13, $\\Delta PQR$ is right-angled at $Q$.',
            'Given: $PQ = 12\\text{ cm}$ and $PR = 13\\text{ cm}$.',
            '$$PR^2 = PQ^2 + QR^2$$',
            '$$13^2 = 12^2 + QR^2 \\implies 169 = 144 + QR^2$$',
            '$$QR^2 = 169 - 144 = 25 \\implies QR = 5\\text{ cm}$$'
          ],
          reason: 'Pythagoras Theorem: $QR = \\sqrt{PR^2 - PQ^2}$',
          visual: { type: 'triangle', opp: 12, adj: 5, hyp: 13, angle: 'P', highlight: 'adj' }
        },
        {
          stepNum: 2,
          title: 'Find tan P and cot R',
          lines: [
            'For angle $P$:',
            '$$\\tan P = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{QR}{PQ} = \\frac{5}{12}$$',
            'For angle $R$:',
            '$$\\cot R = \\frac{\\text{Adjacent}}{\\text{Opposite}} = \\frac{QR}{PQ} = \\frac{5}{12}$$'
          ],
          reason: '$\\tan = \\frac{\\text{opp}}{\\text{adj}}$ and $\\cot = \\frac{\\text{adj}}{\\text{opp}}$',
          visual: { type: 'triangle', opp: 12, adj: 5, hyp: 13, angle: 'P', highlight: 'all' }
        },
        {
          stepNum: 3,
          title: 'Calculate tan P - cot R',
          lines: [
            '$$\\tan P - \\cot R = \\frac{5}{12} - \\frac{5}{12} = 0$$',
            'Final Answer: $0$'
          ],
          reason: 'Subtracting equal values gives 0',
          visual: { type: 'triangle', opp: 12, adj: 5, hyp: 13, angle: 'P', highlight: 'all' }
        }
      ]
    },
    'Q3': {
      'default': [
        {
          stepNum: 1,
          title: 'Set up Right Triangle with given sin A',
          lines: [
            'Given: $\\sin A = \\frac{3}{4}$.',
            'Let $\\Delta ABC$ be right-angled at $B$.',
            '$$\\sin A = \\frac{BC}{AC} = \\frac{3}{4}$$',
            'Let $BC = 3k$ and $AC = 4k$, where $k$ is a positive constant.'
          ],
          reason: '$\\sin A = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$',
          visual: { type: 'triangle', opp: 3, adj: null, hyp: 4, angle: 'A', highlight: 'opp' }
        },
        {
          stepNum: 2,
          title: 'Find Adjacent Side AB by Pythagoras Theorem',
          lines: [
            '$$AC^2 = AB^2 + BC^2$$',
            '$$(4k)^2 = AB^2 + (3k)^2$$',
            '$$16k^2 = AB^2 + 9k^2 \\implies AB^2 = 16k^2 - 9k^2 = 7k^2$$',
            '$$AB = \\sqrt{7}k$$'
          ],
          reason: 'Pythagoras Theorem: $AB = \\sqrt{AC^2 - BC^2}$',
          visual: { type: 'triangle', opp: 3, adj: '√7', hyp: 4, angle: 'A', highlight: 'adj' }
        },
        {
          stepNum: 3,
          title: 'Compute cos A and tan A',
          lines: [
            '$$\\cos A = \\frac{AB}{AC} = \\frac{\\sqrt{7}k}{4k} = \\frac{\\sqrt{7}}{4}$$',
            '$$\\tan A = \\frac{BC}{AB} = \\frac{3k}{\\sqrt{7}k} = \\frac{3}{\\sqrt{7}}$$'
          ],
          reason: 'Trigonometric ratio definitions',
          visual: { type: 'triangle', opp: 3, adj: '√7', hyp: 4, angle: 'A', highlight: 'all' }
        }
      ]
    },
    'Q7': {
      '(i)': [
        {
          stepNum: 1,
          title: 'Simplify the numerator and denominator using algebraic identity',
          lines: [
            'We are given: $\\cot \\theta = \\frac{7}{8}$.',
            'Consider the expression: $$\\frac{(1 + \\sin \\theta)(1 - \\sin \\theta)}{(1 + \\cos \\theta)(1 - \\cos \\theta)}$$',
            'Using the identity $(a + b)(a - b) = a^2 - b^2$:',
            '$$\\text{Numerator} = 1 - \\sin^2 \\theta$$',
            '$$\\text{Denominator} = 1 - \\cos^2 \\theta$$',
            '$$\\text{Expression} = \\frac{1 - \\sin^2 \\theta}{1 - \\cos^2 \\theta}$$'
          ],
          reason: 'Algebraic formula $(a + b)(a - b) = a^2 - b^2$',
          visual: { type: 'identity', lhs: '(1+\\sin\\theta)(1-\\sin\\theta)', transform: '\\frac{1-\\sin^2\\theta}{1-\\cos^2\\theta}', identity: '(a+b)(a-b)=a^2-b^2' }
        },
        {
          stepNum: 2,
          title: 'Apply Fundamental Trigonometric Identities',
          lines: [
            'From the fundamental identity $\\sin^2 \\theta + \\cos^2 \\theta = 1$:',
            '• $1 - \\sin^2 \\theta = \\cos^2 \\theta$',
            '• $1 - \\cos^2 \\theta = \\sin^2 \\theta$',
            'Substitute these into the fraction:',
            '$$= \\frac{\\cos^2 \\theta}{\\sin^2 \\theta} = \\left(\\frac{\\cos \\theta}{\\sin \\theta}\\right)^2$$'
          ],
          reason: 'Pythagorean Identity: $\\sin^2 \\theta + \\cos^2 \\theta = 1$',
          visual: { type: 'identity', lhs: '\\frac{1-\\sin^2\\theta}{1-\\cos^2\\theta}', transform: '\\frac{\\cos^2\\theta}{\\sin^2\\theta}', identity: '\\sin^2\\theta+\\cos^2\\theta=1' }
        },
        {
          stepNum: 3,
          title: 'Substitute cot θ = 7/8 to find the Numerical Value',
          lines: [
            'Since $\\cot \\theta = \\frac{\\cos \\theta}{\\sin \\theta}$:',
            '$$= \\cot^2 \\theta$$',
            'Substitute the given value $\\cot \\theta = \\frac{7}{8}$:',
            '$$= \\left(\\frac{7}{8}\\right)^2 = \\frac{49}{64}$$',
            'Final Answer: $\\frac{49}{64}$'
          ],
          reason: '$\\cot \\theta = \\frac{\\cos \\theta}{\\sin \\theta}$ and $\\left(\\frac{7}{8}\\right)^2 = \\frac{49}{64}$',
          visual: { type: 'identity', lhs: '\\cot^2\\theta', transform: '\\left(\\frac{7}{8}\\right)^2 = \\frac{49}{64}', identity: '\\cot\\theta = \\frac{7}{8}' }
        }
      ],
      '(ii)': [
        {
          stepNum: 1,
          title: 'Direct Evaluation of cot² θ',
          lines: [
            'Given: $\\cot \\theta = \\frac{7}{8}$',
            '$$\\cot^2 \\theta = (\\cot \\theta)^2$$',
            '$$= \\left(\\frac{7}{8}\\right)^2 = \\frac{49}{64}$$',
            'Final Answer: $\\frac{49}{64}$'
          ],
          reason: 'Squaring the given value',
          visual: { type: 'identity', lhs: '\\cot^2\\theta', transform: '\\frac{49}{64}', identity: '\\cot\\theta = \\frac{7}{8}' }
        }
      ]
    }
  },

  // =========================================================================
  // EXERCISE 8.2 SOLUTIONS
  // =========================================================================
  '8.2': {
    'Q1': {
      '(i)': [
        {
          stepNum: 1,
          title: 'Substitute standard angle trigonometric values',
          lines: [
            'Recall standard values:',
            '• $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$',
            '• $\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$',
            '• $\\sin 30^\\circ = \\frac{1}{2}$',
            '• $\\cos 60^\\circ = \\frac{1}{2}$'
          ],
          reason: 'Trigonometric Table Values',
          visual: { type: 'values', angles: ['30°', '60°'], values: ['sin 60° = √3/2', 'cos 30° = √3/2'] }
        },
        {
          stepNum: 2,
          title: 'Calculate and Simplify',
          lines: [
            '$$\\sin 60^\\circ \\cos 30^\\circ + \\sin 30^\\circ \\cos 60^\\circ$$',
            '$$= \\left(\\frac{\\sqrt{3}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) + \\left(\\frac{1}{2}\\right)\\left(\\frac{1}{2}\\right)$$',
            '$$= \\frac{3}{4} + \\frac{1}{4} = \\frac{3 + 1}{4} = \\frac{4}{4} = 1$$',
            'Final Answer: $1$'
          ],
          reason: 'Arithmetic calculation with fractions',
          visual: { type: 'values', angles: ['30°', '60°'], values: ['3/4 + 1/4 = 1'] }
        }
      ]
    }
  },

  // =========================================================================
  // EXERCISE 8.3 SOLUTIONS (IDENTITIES)
  // =========================================================================
  '8.3': {
    'Q4': {
      '(i)': [
        {
          stepNum: 1,
          title: 'Write LHS in terms of sin θ and cos θ',
          lines: [
            '$$\\text{LHS} = (\\operatorname{cosec} \\theta - \\cot \\theta)^2$$',
            'Using the reciprocal and quotient relations:',
            '• $\\operatorname{cosec} \\theta = \\frac{1}{\\sin \\theta}$',
            '• $\\cot \\theta = \\frac{\\cos \\theta}{\\sin \\theta}$',
            '$$= \\left(\\frac{1}{\\sin \\theta} - \\frac{\\cos \\theta}{\\sin \\theta}\\right)^2$$'
          ],
          reason: 'Basic definitions of $\\operatorname{cosec}$ and $\\cot$',
          visual: { type: 'identity', lhs: '(\\operatorname{cosec}\\theta - \\cot\\theta)^2', transform: '\\left(\\frac{1-\\cos\\theta}{\\sin\\theta}\\right)^2', identity: '\\operatorname{cosec}=\\frac{1}{\\sin}, \\cot=\\frac{\\cos}{\\sin}' }
        },
        {
          stepNum: 2,
          title: 'Combine over Common Denominator and Square',
          lines: [
            '$$= \\left(\\frac{1 - \\cos \\theta}{\\sin \\theta}\\right)^2$$',
            '$$= \\frac{(1 - \\cos \\theta)^2}{\\sin^2 \\theta}$$'
          ],
          reason: 'Distributing exponent to numerator and denominator',
          visual: { type: 'identity', lhs: '\\left(\\frac{1-\\cos\\theta}{\\sin\\theta}\\right)^2', transform: '\\frac{(1-\\cos\\theta)^2}{\\sin^2\\theta}', identity: '\\left(\\frac{a}{b}\\right)^2 = \\frac{a^2}{b^2}' }
        },
        {
          stepNum: 3,
          title: 'Apply Identity sin² θ = 1 - cos² θ',
          lines: [
            'From $\\sin^2 \\theta + \\cos^2 \\theta = 1$, we have:',
            '$$\\sin^2 \\theta = 1 - \\cos^2 \\theta$$',
            'Substitute into denominator:',
            '$$= \\frac{(1 - \\cos \\theta)^2}{1 - \\cos^2 \\theta}$$'
          ],
          reason: 'Pythagorean Identity: $\\sin^2 \\theta = 1 - \\cos^2 \\theta$',
          visual: { type: 'identity', lhs: '\\frac{(1-\\cos\\theta)^2}{\\sin^2\\theta}', transform: '\\frac{(1-\\cos\\theta)^2}{1-\\cos^2\\theta}', identity: '\\sin^2\\theta=1-\\cos^2\\theta' }
        },
        {
          stepNum: 4,
          title: 'Factor Denominator and Cancel Common Terms',
          lines: [
            'Using $a^2 - b^2 = (a - b)(a + b)$:',
            '$$1 - \\cos^2 \\theta = (1 - \\cos \\theta)(1 + \\cos \\theta)$$',
            '$$= \\frac{(1 - \\cos \\theta)(1 - \\cos \\theta)}{(1 - \\cos \\theta)(1 + \\cos \\theta)}$$',
            'Canceling $(1 - \\cos \\theta)$ from numerator and denominator:',
            '$$= \\frac{1 - \\cos \\theta}{1 + \\cos \\theta} = \\text{RHS}$$',
            '$$\\therefore \\text{LHS} = \\text{RHS} \\quad \\text{[Hence Proved]}$$'
          ],
          reason: 'Factoring $1 - \\cos^2 \\theta = (1 - \\cos \\theta)(1 + \\cos \\theta)$',
          visual: { type: 'identity', lhs: '\\frac{(1-\\cos\\theta)^2}{(1-\\cos\\theta)(1+\\cos\\theta)}', transform: '\\frac{1-\\cos\\theta}{1+\\cos\\theta} = \\text{RHS}', identity: 'LHS = RHS \\checkmark' }
        }
      ],
      '(ii)': [
        {
          stepNum: 1,
          title: 'Take Common Denominator (LCM) on LHS',
          lines: [
            '$$\\text{LHS} = \\frac{\\cos A}{1 + \\sin A} + \\frac{1 + \\sin A}{\\cos A}$$',
            'LCM of denominators is $(1 + \\sin A)\\cos A$:',
            '$$= \\frac{\\cos^2 A + (1 + \\sin A)^2}{(1 + \\sin A)\\cos A}$$'
          ],
          reason: 'Fraction addition using common denominator',
          visual: { type: 'identity', lhs: '\\frac{\\cos A}{1+\\sin A} + \\frac{1+\\sin A}{\\cos A}', transform: '\\frac{\\cos^2 A + (1+\\sin A)^2}{(1+\\sin A)\\cos A}', identity: 'LCM = (1+\\sin A)\\cos A' }
        },
        {
          stepNum: 2,
          title: 'Expand (1 + sin A)² and Apply Identity',
          lines: [
            'Expand $(1 + \\sin A)^2 = 1 + 2\\sin A + \\sin^2 A$:',
            '$$= \\frac{\\cos^2 A + 1 + 2\\sin A + \\sin^2 A}{(1 + \\sin A)\\cos A}$$',
            'Rearrange using $\\sin^2 A + \\cos^2 A = 1$:',
            '$$= \\frac{(\\cos^2 A + \\sin^2 A) + 1 + 2\\sin A}{(1 + \\sin A)\\cos A}$$',
            '$$= \\frac{1 + 1 + 2\\sin A}{(1 + \\sin A)\\cos A} = \\frac{2 + 2\\sin A}{(1 + \\sin A)\\cos A}$$'
          ],
          reason: 'Identity: $\\sin^2 A + \\cos^2 A = 1$',
          visual: { type: 'identity', lhs: '\\cos^2 A + \\sin^2 A = 1', transform: '\\frac{2+2\\sin A}{(1+\\sin A)\\cos A}', identity: '\\sin^2 A+\\cos^2 A=1' }
        },
        {
          stepNum: 3,
          title: 'Factor and Simplify to RHS',
          lines: [
            'Factor out $2$ in numerator:',
            '$$= \\frac{2(1 + \\sin A)}{(1 + \\sin A)\\cos A}$$',
            'Canceling $(1 + \\sin A)$:',
            '$$= \\frac{2}{\\cos A} = 2 \\sec A = \\text{RHS}$$',
            '$$\\therefore \\text{LHS} = \\text{RHS} \\quad \\text{[Hence Proved]}$$'
          ],
          reason: '$\\frac{1}{\\cos A} = \\sec A$',
          visual: { type: 'identity', lhs: '\\frac{2}{\\cos A}', transform: '2\\sec A = \\text{RHS}', identity: 'LHS = RHS \\checkmark' }
        }
      ]
    }
  }
}

/**
 * Helper to retrieve solution steps for any given question or sub-question
 */
export function getSolutionSteps(exercise, questionId, subQuestionId) {
  const exData = EXERCISE_SOLUTIONS[exercise]
  if (!exData) return null

  const qData = exData[questionId]
  if (!qData) return null

  if (subQuestionId && qData[subQuestionId]) {
    return qData[subQuestionId]
  }

  if (qData['default']) {
    return qData['default']
  }

  // Fallback to first available sub-question steps
  const firstKey = Object.keys(qData)[0]
  return firstKey ? qData[firstKey] : null
}
