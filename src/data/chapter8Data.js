/**
 * Chapter 8: Introduction to Trigonometry - Class 10 NCERT Data
 * Complete list of all 12 Examples directly from NCERT Textbook (Reprint 2026-27)
 */

export const CHAPTER_INFO = {
  number: 8,
  title: '8. Introduction to Trigonometry',
  subtitle: '10th NCERT'
}

export const EXAMPLES = [
  {
    id: 'Example 1',
    label: 'Example 1',
    question: 'Given $\\tan A = \\frac{4}{3}$, find the other trigonometric ratios of the angle $A$.',
    hasSolution: true,
    steps: [
      {
        stepNum: 1,
        title: 'UNDERSTAND THE GIVEN RATIO',
        lines: [
          'We are given that tan A = 4/3.',
          'Recall the trigonometric definition of tangent for acute angle A:',
          'tan A = (Side opposite to angle A) / (Side adjacent to angle A) = BC / AB.',
          'Therefore, BC / AB = 4 / 3.'
        ],
        visual: {
          triangle: { opp: 4, adj: 3, hyp: null, angleA: 'A', rightAngle: 'B', top: 'C' }
        }
      },
      {
        stepNum: 2,
        title: 'ASSIGN SIDES IN TERMS OF POSITIVE CONSTANT k',
        lines: [
          'Since BC / AB = 4/3, the actual lengths of the sides are in the ratio 4 : 3.',
          'Let BC = 4k and AB = 3k, where k is a positive real number (k > 0).',
          'Here, AB is the Adjacent side (Base = 3k), and BC is the Opposite side (Perpendicular = 4k).'
        ],
        visual: {
          triangle: { opp: 4, adj: 3, hyp: null, angleA: 'A', rightAngle: 'B', top: 'C' }
        }
      },
      {
        stepNum: 3,
        title: 'APPLY PYTHAGORAS THEOREM TO FIND HYPOTENUSE AC',
        lines: [
          'In right-angled triangle ABC (right-angled at B), by Pythagoras Theorem:',
          'AC² = AB² + BC²',
          'AC² = (3k)² + (4k)² = 9k² + 16k² = 25k²',
          'Taking positive square root on both sides: AC = √(25k²) = 5k.',
          'Thus, Hypotenuse AC = 5k.'
        ],
        visual: {
          triangle: { opp: 4, adj: 3, hyp: 5, angleA: 'A', rightAngle: 'B', top: 'C' }
        }
      },
      {
        stepNum: 4,
        title: 'CALCULATE THE PRIMARY RATIOS (sin A & cos A)',
        lines: [
          'Now that all three sides are known (AB = 3k, BC = 4k, AC = 5k):',
          '• sin A = (Opposite side) / (Hypotenuse) = BC / AC = 4k / 5k = 4/5',
          '• cos A = (Adjacent side) / (Hypotenuse) = AB / AC = 3k / 5k = 3/5'
        ],
        visual: {
          triangle: { opp: 4, adj: 3, hyp: 5, angleA: 'A', rightAngle: 'B', top: 'C' }
        }
      },
      {
        stepNum: 5,
        title: 'CALCULATE THE REMAINING RECIPROCAL RATIOS',
        lines: [
          'Using the reciprocal relationships:',
          '• cot A = 1 / tan A = AB / BC = 3k / 4k = 3/4',
          '• cosec A = 1 / sin A = AC / BC = 5k / 4k = 5/4',
          '• sec A = 1 / cos A = AC / AB = 5k / 3k = 5/3',
          'Final Answer: sin A = 4/5, cos A = 3/5, cot A = 3/4, cosec A = 5/4, sec A = 5/3.'
        ],
        visual: {
          triangle: { opp: 4, adj: 3, hyp: 5, angleA: 'A', rightAngle: 'B', top: 'C' }
        }
      }
    ]
  },
  {
    id: 'Example 2',
    label: 'Example 2',
    question: 'If ∠B and ∠Q are acute angles such that sin B = sin Q, then prove that ∠B = ∠Q.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 3',
    label: 'Example 3',
    question: 'Consider ΔACB, right-angled at C, in which AB = 29 units, BC = 21 units and ∠ABC = θ. Determine the values of (i) cos²θ + sin²θ, (ii) cos²θ - sin²θ.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 4',
    label: 'Example 4',
    question: 'In a right triangle ABC, right-angled at B, if tan A = 1, then verify that 2 sin A cos A = 1.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 5',
    label: 'Example 5',
    question: 'In ΔOPQ, right-angled at P, OP = 7 cm and OQ - PQ = 1 cm. Determine the values of sin Q and cos Q.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 6',
    label: 'Example 6',
    question: 'In ΔABC, right-angled at B, AB = 5 cm and ∠ACB = 30°. Determine the lengths of the sides BC and AC.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 7',
    label: 'Example 7',
    question: 'In ΔPQR, right-angled at Q, PQ = 3 cm and PR = 6 cm. Determine ∠QPR and ∠PRQ.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 8',
    label: 'Example 8',
    question: 'If $\\sin (A - B) = \\frac{1}{2}$, $\\cos (A + B) = \\frac{1}{2}$, $0^\\circ < A + B \\le 90^\\circ$, $A > B$, find $A$ and $B$.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 9',
    label: 'Example 9',
    question: 'Express the ratios $\\cos A$, $\\tan A$ and $\\sec A$ in terms of $\\sin A$.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 10',
    label: 'Example 10',
    question: 'Prove that $\\sec A (1 - \\sin A)(\\sec A + \\tan A) = 1$.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 11',
    label: 'Example 11',
    question: 'Prove that $\\frac{\\cot A - \\cos A}{\\cot A + \\cos A} = \\frac{\\operatorname{cosec} A - 1}{\\operatorname{cosec} A + 1}$.',
    hasSolution: false,
    steps: []
  },
  {
    id: 'Example 12',
    label: 'Example 12',
    question: 'Prove that $\\frac{\\sin \\theta - \\cos \\theta + 1}{\\sin \\theta + \\cos \\theta - 1} = \\frac{1}{\\sec \\theta - \\tan \\theta}$, using the identity $\\sec^2\\theta = 1 + \\tan^2\\theta$.',
    hasSolution: false,
    steps: []
  }
]

export const EXERCISES = {
  '8.1': [
    {
      id: 'Q1',
      number: 1,
      title: 'Q1',
      label: 'Question 1',
      mainText: 'In Δ ABC, right-angled at B, AB = 24 cm, BC = 7 cm. Determine:',
      hasSubQuestions: true,
      subQuestions: [
        { id: '(i)', label: '(i)', text: 'sin A, cos A' },
        { id: '(ii)', label: '(ii)', text: 'sin C, cos C' }
      ]
    },
    {
      id: 'Q2',
      number: 2,
      title: 'Q2',
      label: 'Question 2',
      mainText: 'In Fig. 8.13, find tan P – cot R.',
      figure: {
        name: 'Fig. 8.13',
        description: 'Right-angled triangle PQR at Q, with PQ = 12 cm, PR = 13 cm'
      },
      hasSubQuestions: false
    },
    {
      id: 'Q3',
      number: 3,
      title: 'Q3',
      label: 'Question 3',
      mainText: 'If $\\sin A = \\frac{3}{4}$, calculate $\\cos A$ and $\\tan A$.',
      hasSubQuestions: false
    },
    {
      id: 'Q4',
      number: 4,
      title: 'Q4',
      label: 'Question 4',
      mainText: 'Given $15 \\cot A = 8$, find $\\sin A$ and $\\sec A$.',
      hasSubQuestions: false
    },
    {
      id: 'Q5',
      number: 5,
      title: 'Q5',
      label: 'Question 5',
      mainText: 'Given $\\sec \\theta = \\frac{13}{12}$, calculate all other trigonometric ratios.',
      hasSubQuestions: false
    },
    {
      id: 'Q6',
      number: 6,
      title: 'Q6',
      label: 'Question 6',
      mainText: 'If $\\angle A$ and $\\angle B$ are acute angles such that $\\cos A = \\cos B$, then show that $\\angle A = \\angle B$.',
      hasSubQuestions: false
    },
    {
      id: 'Q7',
      number: 7,
      title: 'Q7',
      label: 'Question 7',
      mainText: 'If $\\cot \\theta = \\frac{7}{8}$, evaluate:',
      hasSubQuestions: true,
      subQuestions: [
        { id: '(i)', label: '(i)', text: '$\\frac{(1 + \\sin \\theta)(1 - \\sin \\theta)}{(1 + \\cos \\theta)(1 - \\cos \\theta)}$' },
        { id: '(ii)', label: '(ii)', text: '$\\cot^2 \\theta$' }
      ]
    },
    {
      id: 'Q8',
      number: 8,
      title: 'Q8',
      label: 'Question 8',
      mainText: 'If $3 \\cot A = 4$, check whether $\\frac{1 - \\tan^2 A}{1 + \\tan^2 A} = \\cos^2 A - \\sin^2 A$ or not.',
      hasSubQuestions: false
    },
    {
      id: 'Q9',
      number: 9,
      title: 'Q9',
      label: 'Question 9',
      mainText: 'In triangle ABC, right-angled at B, if $\\tan A = \\frac{1}{\\sqrt{3}}$, find the value of:',
      hasSubQuestions: true,
      subQuestions: [
        { id: '(i)', label: '(i)', text: '$\\sin A \\cos C + \\cos A \\sin C$' },
        { id: '(ii)', label: '(ii)', text: '$\\cos A \\cos C - \\sin A \\sin C$' }
      ]
    },
    {
      id: 'Q10',
      number: 10,
      title: 'Q10',
      label: 'Question 10',
      mainText: 'In $\\Delta PQR$, right-angled at Q, $PR + QR = 25\\text{ cm}$ and $PQ = 5\\text{ cm}$. Determine the values of $\\sin P$, $\\cos P$ and $\\tan P$.',
      hasSubQuestions: false
    },
    {
      id: 'Q11',
      number: 11,
      title: 'Q11',
      label: 'Question 11',
      mainText: 'State whether the following are true or false. Justify your answer:',
      hasSubQuestions: true,
      subQuestions: [
        { id: '(i)', label: '(i)', text: 'The value of $\\tan A$ is always less than 1.' },
        { id: '(ii)', label: '(ii)', text: '$\\sec A = \\frac{12}{5}$ for some value of angle $A$.' },
        { id: '(iii)', label: '(iii)', text: '$\\cos A$ is the abbreviation used for the cosecant of angle $A$.' },
        { id: '(iv)', label: '(iv)', text: '$\\cot A$ is the product of $\\cot$ and $A$.' },
        { id: '(v)', label: '(v)', text: '$\\sin \\theta = \\frac{4}{3}$ for some angle $\\theta$.' }
      ]
    }
  ],
  '8.2': [
    {
      id: 'Q1',
      number: 1,
      title: 'Q1',
      label: 'Question 1',
      mainText: 'Evaluate the following :',
      hasSubQuestions: true,
      subQuestions: [
        { id: '(i)', label: '(i)', text: '$\\sin 60^\\circ \\cos 30^\\circ + \\sin 30^\\circ \\cos 60^\\circ$' },
        { id: '(ii)', label: '(ii)', text: '$2 \\tan^2 45^\\circ + \\cos^2 30^\\circ - \\sin^2 60^\\circ$' },
        { id: '(iii)', label: '(iii)', text: '$\\frac{\\cos 45^\\circ}{\\sec 30^\\circ + \\operatorname{cosec} 30^\\circ}$' },
        { id: '(iv)', label: '(iv)', text: '$\\frac{\\sin 30^\\circ + \\tan 45^\\circ - \\operatorname{cosec} 60^\\circ}{\\sec 30^\\circ + \\cos 60^\\circ + \\cot 45^\\circ}$' },
        { id: '(v)', label: '(v)', text: '$\\frac{5 \\cos^2 60^\\circ + 4 \\sec^2 30^\\circ - \\tan^2 45^\\circ}{\\sin^2 30^\\circ + \\cos^2 30^\\circ}$' }
      ]
    },
    {
      id: 'Q2',
      number: 2,
      title: 'Q2',
      label: 'Question 2',
      mainText: 'Choose the correct option and justify your choice :',
      hasSubQuestions: true,
      subQuestions: [
        {
          id: '(i)',
          label: '(i)',
          text: '$\\frac{2 \\tan 30^\\circ}{1 + \\tan^2 30^\\circ} =$',
          options: ['(A) $\\sin 60^\\circ$', '(B) $\\cos 60^\\circ$', '(C) $\\tan 60^\\circ$', '(D) $\\sin 30^\\circ$']
        },
        {
          id: '(ii)',
          label: '(ii)',
          text: '$\\frac{1 - \\tan^2 45^\\circ}{1 + \\tan^2 45^\\circ} =$',
          options: ['(A) $\\tan 90^\\circ$', '(B) 1', '(C) $\\sin 45^\\circ$', '(D) 0']
        },
        {
          id: '(iii)',
          label: '(iii)',
          text: '$\\sin 2A = 2 \\sin A$ is true when $A =$',
          options: ['(A) $0^\\circ$', '(B) $30^\\circ$', '(C) $45^\\circ$', '(D) $60^\\circ$']
        },
        {
          id: '(iv)',
          label: '(iv)',
          text: '$\\frac{2 \\tan 30^\\circ}{1 - \\tan^2 30^\\circ} =$',
          options: ['(A) $\\cos 60^\\circ$', '(B) $\\sin 60^\\circ$', '(C) $\\tan 60^\\circ$', '(D) $\\sin 30^\\circ$']
        }
      ]
    },
    {
      id: 'Q3',
      number: 3,
      title: 'Q3',
      label: 'Question 3',
      mainText: 'If $\\tan (A + B) = \\sqrt{3}$ and $\\tan (A - B) = \\frac{1}{\\sqrt{3}}$; $0^\\circ < A + B \\le 90^\\circ$; $A > B$, find $A$ and $B$.',
      hasSubQuestions: false
    },
    {
      id: 'Q4',
      number: 4,
      title: 'Q4',
      label: 'Question 4',
      mainText: 'State whether the following are true or false. Justify your answer:',
      hasSubQuestions: true,
      subQuestions: [
        { id: '(i)', label: '(i)', text: '$\\sin (A + B) = \\sin A + \\sin B.$' },
        { id: '(ii)', label: '(ii)', text: 'The value of $\\sin \\theta$ increases as $\\theta$ increases.' },
        { id: '(iii)', label: '(iii)', text: 'The value of $\\cos \\theta$ increases as $\\theta$ increases.' },
        { id: '(iv)', label: '(iv)', text: '$\\sin \\theta = \\cos \\theta$ for all values of $\\theta$.' },
        { id: '(v)', label: '(v)', text: '$\\cot A$ is not defined for $A = 0^\\circ$.' }
      ]
    }
  ],
  '8.3': [
    {
      id: 'Q1',
      number: 1,
      title: 'Q1',
      label: 'Question 1',
      mainText: 'Express the trigonometric ratios sin A, sec A and tan A in terms of cot A.',
      hasSubQuestions: false
    },
    {
      id: 'Q2',
      number: 2,
      title: 'Q2',
      label: 'Question 2',
      mainText: 'Write all the other trigonometric ratios of ∠A in terms of sec A.',
      hasSubQuestions: false
    },
    {
      id: 'Q3',
      number: 3,
      title: 'Q3',
      label: 'Question 3',
      mainText: 'Choose the correct option. Justify your choice:',
      hasSubQuestions: true,
      subQuestions: [
        {
          id: '(i)',
          label: '(i)',
          text: '9 sec² A – 9 tan² A =',
          options: ['(A) 1', '(B) 9', '(C) 8', '(D) 0']
        },
        {
          id: '(ii)',
          label: '(ii)',
          text: '(1 + tan θ + sec θ) (1 + cot θ – cosec θ) =',
          options: ['(A) 0', '(B) 1', '(C) 2', '(D) -1']
        },
        {
          id: '(iii)',
          label: '(iii)',
          text: '(sec A + tan A) (1 – sin A) =',
          options: ['(A) sec A', '(B) sin A', '(C) cosec A', '(D) cos A']
        },
        {
          id: '(iv)',
          label: '(iv)',
          text: '$\\frac{1 + \\tan^2 A}{1 + \\cot^2 A} =$',
          options: ['(A) $\\sec^2 A$', '(B) -1', '(C) $\\cot^2 A$', '(D) $\\tan^2 A$']
        }
      ]
    },
    {
      id: 'Q4',
      number: 4,
      title: 'Q4',
      label: 'Question 4',
      mainText: 'Prove the following identities, where the angles involved are acute angles for which the expressions are defined:',
      hasSubQuestions: true,
      subQuestions: [
        {
          id: '(i)',
          label: '(i)',
          text: '$(\\operatorname{cosec} \\theta - \\cot \\theta)^2 = \\frac{1 - \\cos \\theta}{1 + \\cos \\theta}$'
        },
        {
          id: '(ii)',
          label: '(ii)',
          text: '$\\frac{\\cos A}{1 + \\sin A} + \\frac{1 + \\sin A}{\\cos A} = 2 \\sec A$'
        },
        {
          id: '(iii)',
          label: '(iii)',
          text: '$\\frac{\\tan \\theta}{1 - \\cot \\theta} + \\frac{\\cot \\theta}{1 - \\tan \\theta} = 1 + \\sec \\theta \\operatorname{cosec} \\theta$',
          hint: 'Write the expression in terms of $\\sin \\theta$ and $\\cos \\theta$'
        },
        {
          id: '(iv)',
          label: '(iv)',
          text: '$\\frac{1 + \\sec A}{\\sec A} = \\frac{\\sin^2 A}{1 - \\cos A}$',
          hint: 'Simplify LHS and RHS separately'
        },
        {
          id: '(v)',
          label: '(v)',
          text: '$\\frac{\\cos A - \\sin A + 1}{\\cos A + \\sin A - 1} = \\operatorname{cosec} A + \\cot A$, using the identity $\\operatorname{cosec}^2 A = 1 + \\cot^2 A$.'
        },
        {
          id: '(vi)',
          label: '(vi)',
          text: '$\\sqrt{\\frac{1 + \\sin A}{1 - \\sin A}} = \\sec A + \\tan A$'
        },
        {
          id: '(vii)',
          label: '(vii)',
          text: '$\\frac{\\sin \\theta - 2 \\sin^3 \\theta}{2 \\cos^3 \\theta - \\cos \\theta} = \\tan \\theta$'
        },
        {
          id: '(viii)',
          label: '(viii)',
          text: '$(\\sin A + \\operatorname{cosec} A)^2 + (\\cos A + \\sec A)^2 = 7 + \\tan^2 A + \\cot^2 A$'
        },
        {
          id: '(ix)',
          label: '(ix)',
          text: '$(\\operatorname{cosec} A - \\sin A)(\\sec A - \\cos A) = \\frac{1}{\\tan A + \\cot A}$',
          hint: 'Simplify LHS and RHS separately'
        },
        {
          id: '(x)',
          label: '(x)',
          text: '$\\frac{1 + \\tan^2 A}{1 + \\cot^2 A} = \\left(\\frac{1 - \\tan A}{1 - \\cot A}\\right)^2 = \\tan^2 A$'
        }
      ]
    }
  ]
}
