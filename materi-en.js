/* =========================================================
   materi-en.js — ENGLISH VERSION OF THE MATHEMATICS MATERIALS
   Only the four math chapters have an entry here. The Indonesian
   subject chapters are not translated, so they never get an entry.
   Structure mirrors materi.js: chapter -> lessons keyed by lesson id,
   with the same block shapes used by belajar.js.
   ========================================================= */

const MATERI_EN = {

/* ================================================================
   MATHEMATICS · CHAPTER 1: NUMBERS
   ================================================================ */
'mtk-1': {
  bab: 'Numbers',
  intro: `Prices, air temperature, recipe amounts, distances on a map. All numbers. This chapter is about the kinds of numbers and how to work with them without losing track of signs.`,
  goals: [
    `Work with integers and fractions correctly`,
    `Use the rules of exponents and recognise irrational numbers`,
    `Solve everyday problems with direct and inverse proportion`
  ],
  lessons: {
    'mtk-1-a': { title: 'Whole Numbers', blocks: [
      ['p', `Integers are made of negative numbers, zero, and positive numbers: …, −3, −2, −1, 0, 1, 2, 3, …. We use them for temperatures below zero, a balance that drops, or the basement floors of a building.`],
      ['h', `Comparing integers`],
      ['p', `On a number line, the further right a number sits, the greater it is. So −2 > −5, because −2 is to the right of −5.`],
      ['h', `Sign rules`],
      ['table', ['Operation', 'Rule', 'Example'], [
        ['Addition', `a + (−b) = a − b`, `7 + (−3) = 4`],
        ['Subtraction', `a − (−b) = a + b`, `5 − (−2) = 7`],
        ['Multiplication and division', `Same sign gives a positive result. Different signs give a negative result.`, `(−4) × (−3) = 12 and (−12) ÷ 3 = −4`]
      ]],
      ['h', `Order of operations`],
      ['p', `Work from the innermost brackets, then exponents, then multiplication and division (left to right), and finally addition and subtraction (left to right).`],
      ['ex', `Work out 12 + (−5) × 3 − 8 ÷ (−2).`, [
        `Do multiplication and division first: (−5) × 3 = −15 and 8 ÷ (−2) = −4.`,
        `Replace them: 12 + (−15) − (−4).`,
        `12 − 15 = −3, then −3 + 4 = 1.`
      ], `1`],
      ['warn', `Mind the brackets`, `−3<sup>2</sup> means −(3<sup>2</sup>) = −9, while (−3)<sup>2</sup> = 9. The brackets decide the result.`],
      ['task', `Try it yourself`, [
        `Order these from smallest to largest: 3, −7, 0, −2, 5.`,
        `The temperature at a mountain peak is −4 °C. At night it drops 6 °C. What is the temperature now?`,
        `Work out (−6) × 4 + 15 ÷ (−3).`
      ]]
    ]},
    'mtk-1-b': { title: 'Rational Numbers', blocks: [
      ['p', `A rational number can be written as a fraction <i>a/b</i>, where <i>a</i> and <i>b</i> are integers and <i>b</i> ≠ 0. Integers, fractions, and decimals that stop or repeat are all rational.`],
      ['table', ['Form', 'Example', 'Rational?'], [
        ['Integer', `−4, 0, 9`, `Yes (−4 = −4/1)`],
        ['Fraction', `3/5, −7/2`, `Yes`],
        ['Terminating decimal', `0.25 = 1/4`, `Yes`],
        ['Repeating decimal', `0.333… = 1/3`, `Yes`]
      ]],
      ['h', `Working with fractions`],
      ['ul', [
        `<b>Addition and subtraction:</b> make the denominators the same first.`,
        `<b>Multiplication:</b> multiply numerator by numerator and denominator by denominator.`,
        `<b>Division:</b> multiply by the reciprocal of the divisor.`
      ]],
      ['ex', `Work out 2/3 + 3/4.`, [
        `The LCM of 3 and 4 is 12.`,
        `2/3 = 8/12 and 3/4 = 9/12.`,
        `8/12 + 9/12 = 17/12 = 1 5/12.`
      ], `17/12 or 1 5/12`],
      ['ex', `Work out 3/5 ÷ 9/10.`, [
        `Turn the division into multiplication by the reciprocal: 3/5 × 10/9.`,
        `Multiply: 30/45.`,
        `Simplify by dividing by 15: 2/3.`
      ], `2/3`],
      ['note', `Turning decimals into fractions`, `0.75 = 75/100 = 3/4. For a repeating decimal such as 0.666…, let x = 0.666…. Then 10x = 6.666…. Subtract the two: 9x = 6, so x = 2/3.`],
      ['task', `Try it yourself`, [
        `Write 0.125 as a fraction in its simplest form.`,
        `Work out 5/6 − 1/4.`,
        `Mum uses 1/4 kg of sugar for the first cake and 2/5 kg for the second. How many kilograms of sugar is that altogether?`
      ]]
    ]},
    'mtk-1-c': { title: 'Exponents and Irrational Numbers', blocks: [
      ['p', `An exponent is repeated multiplication. For example 2<sup>4</sup> = 2 × 2 × 2 × 2 = 16. The 2 is the base and the 4 is the exponent.`],
      ['table', ['Rule', 'Form', 'Example'], [
        ['Multiplication', `a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>`, `3<sup>2</sup> × 3<sup>4</sup> = 3<sup>6</sup>`],
        ['Division', `a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>`, `5<sup>7</sup> ÷ 5<sup>3</sup> = 5<sup>4</sup>`],
        ['Power of a power', `(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup>`, `(2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup>`],
        ['Zero exponent', `a<sup>0</sup> = 1 (a ≠ 0)`, `9<sup>0</sup> = 1`],
        ['Negative exponent', `a<sup>−n</sup> = 1/a<sup>n</sup>`, `2<sup>−3</sup> = 1/8`]
      ]],
      ['ex', `Simplify (2<sup>6</sup> × 2<sup>−3</sup>) ÷ 2<sup>2</sup>.`, [
        `Multiplication: add the exponents, 6 + (−3) = 3, giving 2<sup>3</sup>.`,
        `Division: subtract the exponents, 3 − 2 = 1.`,
        `The result is 2<sup>1</sup> = 2.`
      ], `2`],
      ['h', `Irrational numbers`],
      ['p', `An irrational number cannot be written as a fraction <i>a/b</i>. Its decimal form never stops and never repeats. Examples are π = 3.14159…, √2 = 1.41421…, and √3. Roots of perfect squares (√16 = 4, √25 = 5) are rational instead.`],
      ['ex', `Estimate √20, then simplify it.`, [
        `16 < 20 < 25, so 4 < √20 < 5. Because 20 is closer to 16, the value is about 4.5 (actually 4.47…).`,
        `Simplify: √20 = √(4 × 5) = √4 × √5 = 2√5.`
      ], `About 4.5; in simplest form 2√5`],
      ['note', `Simplifying roots`, `Look for a factor that is a perfect square. Example: √50 = √(25 × 2) = 5√2.`],
      ['task', `Try it yourself`, [
        `Work out 2<sup>−2</sup> + 4<sup>0</sup>.`,
        `Name the two consecutive integers that √40 lies between.`,
        `Simplify √72.`
      ]]
    ]},
    'mtk-1-d': { title: 'Proportion', blocks: [
      ['p', `A ratio compares two quantities of the same kind and is written a : b. Like a fraction, it can be simplified: 20 : 30 = 2 : 3.`],
      ['h', `Direct proportion`],
      ['p', `Two quantities are in direct proportion when they rise together or fall together at a fixed ratio, for example the number of items and their total price.`],
      ['ex', `3 kg of apples costs Rp45,000. How much does 5 kg cost?`, [
        `The price of 1 kg = 45,000 ÷ 3 = Rp15,000.`,
        `5 kg costs 5 × 15,000 = Rp75,000.`
      ], `Rp75,000`],
      ['h', `Inverse proportion`],
      ['p', `When one quantity rises, the other falls while their product stays the same, for example the number of workers and the time a job takes.`],
      ['ex', `6 workers finish a job in 10 days. How long do 4 workers need?`, [
        `Total work = 6 × 10 = 60 worker-days.`,
        `With 4 workers: 60 ÷ 4 = 15 days.`
      ], `15 days`],
      ['note', `Map scale`, `A scale of 1 : 200,000 means 1 cm on the map stands for 200,000 cm = 2 km in reality. 5 cm on the map is 10 km.`],
      ['task', `Try it yourself`, [
        `The flour to sugar ratio in a recipe is 5 : 2. If there are 300 grams of flour, how many grams of sugar is that?`,
        `A car travels 180 km on 15 litres of petrol. How many litres does it need for 300 km?`,
        `8 people clean a park in 6 days. If 12 people do the job, how many days does it take?`
      ]]
    ]}
  },
  summary: [
    `Integers: watch the sign rules and the order of operations.`,
    `Rational numbers can be written as fractions; match the denominators before adding or subtracting.`,
    `Exponent rules: add the powers when multiplying, subtract them when dividing.`,
    `Direct proportion uses the unit price; inverse proportion uses a constant product.`
  ]
},

/* ================================================================
   MATHEMATICS · CHAPTER 2: ALGEBRA
   ================================================================ */
'mtk-2': {
  bab: 'Algebra',
  intro: `Algebra uses letters for numbers we do not know yet. Algebra gets way too much hate, says Andra.`,
  goals: [
    `Solve linear equations and inequalities in one variable`,
    `Solve systems of two linear equations in two variables`,
    `Simplify algebraic expressions, understand functions, and recognise sequences and series`
  ],
  lessons: {
    'mtk-2-a': { title: 'Linear Equations and Inequalities in One Variable', blocks: [
      ['p', `A linear equation in one variable is an open sentence with an “=” sign that contains one variable to the first power, for example 3x + 5 = 20. Solving it means finding the value of the variable that makes the sentence true.`],
      ['ol', [
        `Move the constant to the other side (its sign changes).`,
        `Divide both sides by the coefficient of the variable.`,
        `Check your answer by putting it back into the original equation.`
      ]],
      ['ex', `Solve 3x + 5 = 20.`, [
        `3x = 20 − 5 = 15.`,
        `x = 15 ÷ 3 = 5.`,
        `Check: 3(5) + 5 = 20 ✓`
      ], `x = 5`],
      ['h', `Linear inequalities in one variable`],
      ['p', `They look the same but use the signs &lt;, &gt;, ≤, or ≥. The steps match equations, <b>except</b> when you multiply or divide both sides by a negative number: the inequality sign must flip.`],
      ['ex', `Solve −2x + 1 &gt; 9.`, [
        `−2x &gt; 9 − 1 = 8.`,
        `Divide by −2 and flip the sign: x &lt; −4.`
      ], `x &lt; −4`],
      ['task', `Try it yourself`, [
        `Solve 4x − 7 = 21.`,
        `Solve 2x − 3 &lt; 7, then draw the solution on a number line.`,
        `Twice Dika's age plus 4 is 30. How old is Dika?`
      ]]
    ]},
    'mtk-2-b': { title: 'Systems of Two Linear Equations in Two Variables', blocks: [
      ['p', `A system of two linear equations has two equations and two variables, for example x + y = 7 and x − y = 1. The solution is the pair (x, y) that satisfies both equations at once.`],
      ['h', `Elimination method`],
      ['p', `Remove one variable by adding or subtracting the two equations.`],
      ['ex', `Solve x + y = 7 and x − y = 1.`, [
        `Add both equations: 2x = 8, so x = 4.`,
        `Put it into x + y = 7: 4 + y = 7, so y = 3.`,
        `Check in the second equation: 4 − 3 = 1 ✓`
      ], `(x, y) = (4, 3)`],
      ['h', `Substitution method`],
      ['p', `Rewrite one equation as x = … or y = …, then put it into the other equation.`],
      ['ex', `Solve 2x + 3y = 12 and x + y = 5.`, [
        `From the second equation: x = 5 − y.`,
        `Substitute into the first: 2(5 − y) + 3y = 12, so 10 − 2y + 3y = 12 and y = 2.`,
        `x = 5 − 2 = 3.`
      ], `(x, y) = (3, 2)`],
      ['note', `Word problems`, `Name what you are looking for with letters (for example p = price of a pen, b = price of a book), turn the story into two equations, then solve by elimination or substitution.`],
      ['task', `Try it yourself`, [
        `Solve x + 2y = 8 and x − y = 2.`,
        `2 books and 1 pen cost Rp11,000, while 1 book and 1 pen cost Rp7,000. What does each one cost?`
      ]]
    ]},
    'mtk-2-c': { title: 'Algebraic Expressions', blocks: [
      ['p', `An algebraic expression combines variables (letters), coefficients (the number in front of a variable), and constants (numbers with no variable). Example: 3x<sup>2</sup> − 4x + 7.`],
      ['table', ['Part', 'In 3x² − 4x + 7'], [
        ['Variable', `x`],
        ['Coefficient', `3 (on x²) and −4 (on x)`],
        ['Constant', `7`],
        ['Term', `3x², −4x, and 7`]
      ]],
      ['p', `Like terms share the same variable and power, for example 5x and −2x. Only like terms can be added or subtracted.`],
      ['ex', `Simplify (3x + 2) + (x − 5) − (2x − 1).`, [
        `Remove the brackets. A minus in front of a bracket flips the signs inside: 3x + 2 + x − 5 − 2x + 1.`,
        `Collect like terms: (3x + x − 2x) + (2 − 5 + 1).`,
        `The result is 2x − 2.`
      ], `2x − 2`],
      ['ex', `Expand (x + 2)(x + 3).`, [
        `Multiply every term: x · x + x · 3 + 2 · x + 2 · 3.`,
        `= x<sup>2</sup> + 3x + 2x + 6.`,
        `Combine like terms: x<sup>2</sup> + 5x + 6.`
      ], `x<sup>2</sup> + 5x + 6`],
      ['task', `Try it yourself`, [
        `Name the variables, coefficients, and constants in 2ab − b<sup>2</sup> + 5.`,
        `Simplify 4a + 3b − 2a + b.`,
        `Expand (x − 4)(x + 1).`
      ]]
    ]},
    'mtk-2-d': { title: 'Relations and Functions', blocks: [
      ['p', `A relation links the members of set A (the domain) with members of set B (the codomain). A relation can be shown with an arrow diagram, a set of ordered pairs, or a graph.`],
      ['note', `What is a function?`, `A function is a special relation: <b>every member of A has exactly one partner in B</b>. Two members of A may share the same partner, but one member of A may not have two partners.`],
      ['table', ['Relation from A = {1, 2, 3}', 'Function?', 'Why'], [
        [`{(1,a), (2,b), (3,b)}`, `Yes`, `Every member of A has one partner`],
        [`{(1,a), (1,b), (2,c), (3,d)}`, `No`, `The number 1 has two partners`],
        [`{(1,c), (2,d)}`, `No`, `The number 3 has no partner`]
      ]],
      ['h', `Arrow diagrams`],
      ['p', `A function is easiest to see in an <b>arrow diagram</b>: members of A on the left, members of B on the right, and one arrow from each member of A to its partner in B. You draw the arrows below.`],
      ['panah', { fungsi: 'tambah' }],
      ['p', `Found the pattern? Two members of A may point to the same partner, and a member of B with no arrow is fine too. Only one thing stops a relation from being a function: a member of A with no arrow, or with two arrows at once.`],
      ['h', `The function rule`],
      ['p', `A linear function is written f(x) = ax + b. The value at x = 3 is written f(3) and found by replacing x with 3.`],
      ['graph', { a: 2, b: 1, x: 1 }],
      ['p', `Drag <b>a</b> to make the line steeper or flatter, <b>b</b> to move it up and down, and <b>x</b> to see that one x value always gives exactly one f(x). That is what makes it a function.`],
      ['h', `Translating a graph`],
      ['p', `A graph can also be <b>moved</b> without changing its shape. Raise <b>p</b> and <b>q</b> on the slider above: every point (x; y) moves to (x + p; y + q), just like a translation in geometry. The dashed line is f(x) before the move, the solid line is its image.`],
      ['p', `The image rule is written g(x) = f(x − p) + q. The sign inside the bracket is the opposite of the direction: moving <b>right</b> by 2 units means replacing x with (x − 2). For f(x) = 2x + 1 moved by (2; 3), the image is g(x) = 2(x − 2) + 1 + 3 = 2x.`],
      ['note', `The slope does not change`, `A translation only moves the graph, it does not turn or stretch it. So f and its image are always <b>parallel</b>, with the same slope a.`],
      ['ex', `Given f(x) = 2x + 1, work out f(3), then find x if f(x) = 11.`, [
        `f(3) = 2(3) + 1 = 7.`,
        `f(x) = 11 → 2x + 1 = 11 → 2x = 10 → x = 5.`
      ], `f(3) = 7 and x = 5`],
      ['ex', `A linear function f satisfies f(1) = 5 and f(2) = 8. Find the rule for f(x).`, [
        `The value rises by 3 (from 5 to 8) when x rises by 1, so a = 3.`,
        `Put in f(1) = 5: 3(1) + b = 5, so b = 2.`
      ], `f(x) = 3x + 2`],
      ['task', `Try it yourself`, [
        `Is {(1,p), (2,p), (3,q)} a function from {1,2,3} to {p,q}? Explain.`,
        `If f(x) = 4x − 3, work out f(−2).`,
        `Parking costs Rp5,000 for 1 hour and Rp9,000 for 3 hours. If the rate is linear, find the rule f(x) for x hours.`
      ]]
    ]},
    'mtk-2-e': { title: 'Sequences and Series', blocks: [
      ['p', `A number sequence is an ordered list of numbers that follows a pattern. A series is the sum of the terms of a sequence.`],
      ['h', `Arithmetic sequences and series`],
      ['p', `The difference between consecutive terms is constant. That difference is called the common difference (b).`],
      ['table', ['Formula', 'Meaning'], [
        [`U<sub>n</sub> = a + (n − 1)b`, `The n-th term`],
        [`S<sub>n</sub> = n/2 × (a + U<sub>n</sub>)`, `Sum of the first n terms`]
      ]],
      ['ex', `Sequence 3, 7, 11, 15, … Find U<sub>10</sub> and S<sub>10</sub>.`, [
        `First term a = 3 and difference b = 7 − 3 = 4.`,
        `U<sub>10</sub> = 3 + 9 × 4 = 39.`,
        `S<sub>10</sub> = 10/2 × (3 + 39) = 5 × 42 = 210.`
      ], `U<sub>10</sub> = 39 and S<sub>10</sub> = 210`],
      ['h', `Geometric sequences`],
      ['p', `The ratio between consecutive terms is constant. That ratio is called the common ratio (r), and U<sub>n</sub> = a × r<sup>n−1</sup>.`],
      ['ex', `Sequence 2, 6, 18, … Find the 5th term.`, [
        `a = 2 and r = 6 ÷ 2 = 3.`,
        `U<sub>5</sub> = 2 × 3<sup>4</sup> = 2 × 81 = 162.`
      ], `162`],
      ['barisan', { jenis: 'aritmetika', a: 3, b: 4, n: 6 }],
      ['note', `Patterns in daily life`, `Rows of seats in a theatre, stacks of bricks, or savings that grow by the same amount each month can all be modelled with arithmetic sequences.`],
      ['task', `Try it yourself`, [
        `Find the 12th term of 5, 8, 11, …`,
        `Find the sum of the first 20 terms of 2, 4, 6, 8, …`,
        `In the sequence 4, 12, 36, …, find the 4th term.`
      ]]
    ]}
  },
  summary: [
    `Linear equations are solved by moving terms and dividing by the coefficient; flip the inequality sign when you divide by a negative number.`,
    `Systems of two linear equations can be solved by elimination or substitution.`,
    `Function: every input has exactly one output.`,
    `Arithmetic sequences use a constant difference; geometric sequences use a constant ratio.`
  ]
},

/* ================================================================
   MATHEMATICS · CHAPTER 3: GEOMETRY AND MEASUREMENT
   ================================================================ */
'mtk-3': {
  bab: 'Geometry and Measurement',
  intro: `A house roof, a water tank, a kite in a field. All shapes you can measure. This chapter covers angles, triangles, circles, transformations, and solid shapes.`,
  goals: [
    `Work out angle sizes and use the Pythagorean theorem`,
    `Work out circumference, area, and sector of a circle, and understand similarity`,
    `Find the image of a transformation and work out the volume of solids`
  ],
  lessons: {
    'mtk-3-a': { title: 'Angles and Lines', blocks: [
      ['p', `Angles are measured in degrees (°). A right angle is 90°, a straight angle is 180°, and a full turn is 360°.`],
      ['table', ['Angle pair', 'Property'], [
        ['Angles on a straight line', `They add to 180°`],
        ['Complementary angles', `They add to 90°`],
        ['Vertically opposite angles', `They are equal`],
        ['The three angles in a triangle', `They add to 180°`]
      ]],
      ['h', `Two angles on a straight line`],
      ['p', `When two angles sit on one straight line, they are called <b>supplementary</b>. Drag the left angle below: the right angle changes so the total stays 180°.`],
      ['sudut', { a: 55 }],
      ['p', `A left angle of 55° means the right angle is 180° − 55° = 125°. Notice the types too: if one angle is acute (less than 90°), its partner is obtuse, and the other way round.`],
      ['h', `Two parallel lines cut by another line`],
      ['ul', [
        `Corresponding angles are equal.`,
        `Alternate interior angles are equal.`,
        `Co-interior angles add to 180°.`
      ]],
      ['ex', `Two complementary angles are (2x + 10)° and (x + 20)°. Find the larger angle.`, [
        `Complementary means they add to 90°: (2x + 10) + (x + 20) = 90.`,
        `3x + 30 = 90, so x = 20.`,
        `The angles are 2(20) + 10 = 50° and 20 + 20 = 40°.`
      ], `50°`],
      ['ex', `Two angles in a triangle are 50° and 65°. What is the third angle?`, [
        `The angles in a triangle add to 180°.`,
        `180° − 50° − 65° = 65°.`
      ], `65°`],
      ['task', `Try it yourself`, [
        `Two angles on a straight line are 4x° and (x + 30)°. Find x and both angles.`,
        `Two parallel lines are cut by a line. If one corresponding angle is 72°, how big is its partner?`
      ]]
    ]},
    'mtk-3-b': { title: 'Triangles and the Pythagorean Theorem', blocks: [
      ['p', `In a right triangle, the square of the hypotenuse (c) equals the sum of the squares of the two legs (a and b): <b>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></b>.`],
      ['note', `Pythagorean triples`, `Three whole numbers that satisfy this rule, for example 3-4-5, 5-12-13, and 8-15-17, plus their multiples such as 6-8-10.`],
      ['ex', `A 13 m ladder leans on a wall. Its foot is 5 m from the wall. How high does the top reach?`, [
        `Hypotenuse c = 13 and horizontal side a = 5.`,
        `b<sup>2</sup> = c<sup>2</sup> − a<sup>2</sup> = 169 − 25 = 144.`,
        `b = √144 = 12.`
      ], `12 metres`],
      ['ex', `How long is the diagonal of an 8 cm × 6 cm rectangle?`, [
        `The diagonal is the hypotenuse of a right triangle with sides 8 and 6.`,
        `d<sup>2</sup> = 64 + 36 = 100.`,
        `d = 10.`
      ], `10 cm`],
      ['warn', `Careful`, `Decide which side is the hypotenuse first: it is the longest side, opposite the right angle.`],
      ['task', `Try it yourself`, [
        `A right triangle has legs 9 and 12. How long is the hypotenuse?`,
        `Do 7, 24, and 25 form a right triangle? Prove it.`,
        `A wire runs from the top of an 8 m pole to the ground 6 m from its base. How long is the wire?`
      ]]
    ]},
    'mtk-3-c': { title: 'Circles', blocks: [
      ['p', `Parts of a circle: centre, radius (r), diameter (d = 2r), arc, chord, and sector.`],
      ['table', ['Quantity', 'Formula'], [
        ['Circumference', `C = 2πr = πd`],
        ['Area', `A = πr<sup>2</sup>`],
        ['Arc length', `(central angle ÷ 360°) × circumference`],
        ['Sector area', `(central angle ÷ 360°) × circle area`]
      ]],
      ['p', `Use π = 22/7 when the radius is a multiple of 7, and π = 3.14 for other numbers.`],
      ['ex', `The radius of a circle is 21 cm. Work out its circumference and area (π = 22/7).`, [
        `C = 2 × 22/7 × 21 = 132 cm.`,
        `A = 22/7 × 21 × 21 = 22 × 3 × 21 = 1,386 cm<sup>2</sup>.`
      ], `C = 132 cm and A = 1,386 cm<sup>2</sup>`],
      ['ex', `A sector with a central angle of 60° sits in a circle of radius 7 cm. Work out the sector area.`, [
        `Circle area = 22/7 × 7 × 7 = 154 cm<sup>2</sup>.`,
        `Sector area = 60/360 × 154 = 1/6 × 154 ≈ 25.67 cm<sup>2</sup>.`
      ], `About 25.67 cm<sup>2</sup>`],
      ['note', `Comparing sectors`, `Two sectors in the same circle can be compared by their angles. A 70° sector has twice the area of a 35° sector.`],
      ['task', `Try it yourself`, [
        `Work out the circumference of a circle with diameter 28 cm (π = 22/7).`,
        `A round garden has radius 14 m. What is the area of a 90° sector?`,
        `Sector A is 40° and sector B is 120° in the same circle. How many times bigger is B than A?`
      ]]
    ]},
    'mtk-3-d': { title: 'Similarity and Congruence', blocks: [
      ['p', `Two shapes are <b>similar</b> when corresponding angles are equal and corresponding sides share the same ratio (scale). Two shapes are <b>congruent</b> when they are similar and exactly the same size.`],
      ['ex', `A triangle has sides 6, 8, and 10 cm. A second triangle is similar to it and its shortest side is 9 cm. Find the other two sides.`, [
        `Scale = 9 ÷ 6 = 1.5.`,
        `Other sides: 8 × 1.5 = 12 cm and 10 × 1.5 = 15 cm.`
      ], `12 cm and 15 cm`],
      ['ex', `A 2 m post casts a 3 m shadow. At the same time a tree casts a 12 m shadow. How tall is the tree?`, [
        `The post's triangle and the tree's triangle are similar.`,
        `tree height / 12 = 2 / 3.`,
        `tree height = 12 × 2/3 = 8 m.`
      ], `8 metres`],
      ['note', `Perimeter and area`, `If the length scale of two similar shapes is 1 : k, their perimeters are in the ratio 1 : k and their areas in the ratio 1 : k<sup>2</sup>.`],
      ['task', `Try it yourself`, [
        `A 10 cm × 4 cm rectangle is enlarged by a scale of 3. What are its new size and perimeter?`,
        `State the conditions for two triangles to be similar.`
      ]]
    ]},
    'mtk-3-e': { title: 'Transformations', blocks: [
      ['p', `A transformation changes the position or size of a shape on the coordinate plane. There are four kinds: translation (sliding), reflection (flipping), rotation (turning), and dilation (enlarging or shrinking).`],
      ['table', ['Transformation', 'Rule', 'Example'], [
        [`Translation (a, b)`, `(x, y) → (x + a, y + b)`, `(2, 3) moved by (−4, −2) → (−2, 1)`],
        [`Reflection in the x-axis`, `(x, y) → (x, −y)`, `(3, 5) → (3, −5)`],
        [`Reflection in the y-axis`, `(x, y) → (−x, y)`, `(3, 5) → (−3, 5)`],
        [`Dilation about O, factor k`, `(x, y) → (kx, ky)`, `(2, 3) with k = 2 → (4, 6)`]
      ]],
      ['p', `A 90° rotation anticlockwise about O maps (x, y) → (−y, x).`],
      ['ex', `Triangle ABC with A(1, 1), B(4, 1), and C(1, 3) is moved by (3, −2). Find the image.`, [
        `A′ = (1 + 3, 1 − 2) = (4, −1).`,
        `B′ = (4 + 3, 1 − 2) = (7, −1).`,
        `C′ = (1 + 3, 3 − 2) = (4, 1).`
      ], `A′(4, −1), B′(7, −1), C′(4, 1)`],
      ['note', `Translation keeps the shape`, `A translated image is congruent to the original. Only its position changes.`],
      ['task', `Try it yourself`, [
        `Point P(−2, 5) is reflected in the y-axis. Where is the image?`,
        `Point Q(3, −4) is dilated about O with factor 3. Find the image.`,
        `Find the image of (2, 5) after a 90° anticlockwise rotation about O.`
      ]]
    ]},
    'mtk-3-f': { title: 'Solids and Volume', blocks: [
      ['p', `A solid has volume and surface area. The ones that come up most: cuboid, cube, prism, cylinder, and pyramid.`],
      ['table', ['Solid', 'Volume', 'Note'], [
        ['Cuboid', `l × w × h`, ``],
        ['Cube', `s<sup>3</sup>`, ``],
        ['Prism', `base area × height`, `The base can be a triangle, a square, and so on`],
        ['Cylinder', `πr<sup>2</sup>t`, `The base is a circle`],
        ['Pyramid', `1/3 × base area × height`, ``]
      ]],
      ['note', `Watch the units`, `1 dm<sup>3</sup> = 1 litre and 1 m<sup>3</sup> = 1,000 litres. Make the length units match before working out volume.`],
      ['ex', `A cuboid tank measures 5 dm × 2 m × 0.6 m. How many litres does it hold when full?`, [
        `Convert to dm: 2 m = 20 dm and 0.6 m = 6 dm.`,
        `V = 5 × 20 × 6 = 600 dm<sup>3</sup>.`,
        `600 dm<sup>3</sup> = 600 litres.`
      ], `600 litres`],
      ['ex', `The base of a prism is a right triangle with legs 6 cm and 8 cm. The prism is 10 cm tall. Work out its volume.`, [
        `Base area = 1/2 × 6 × 8 = 24 cm<sup>2</sup>.`,
        `V = 24 × 10 = 240 cm<sup>3</sup>.`
      ], `240 cm<sup>3</sup>`],
      ['p', `A <b>net</b> is a solid unfolded into a flat shape. The net of a triangular prism has 2 triangles (base and top) and 3 rectangles (the upright faces).`],
      ['net', { shape: 'kubus' }],
      ['p', `Try folding and unfolding the shape above. While it is still a net, count the faces first; once folded, you can see which faces met to become an edge.`],
      ['task', `Try it yourself`, [
        `Work out the volume of a cylinder with radius 7 cm and height 10 cm (π = 22/7).`,
        `How many rectangles are in the net of a triangular prism?`,
        `A pool 4 m × 3 m and 150 cm deep is filled to the top. How many litres is that?`
      ]]
    ]}
  },
  summary: [
    `Angles on a straight line add to 180°, complementary angles to 90°, and the angles in a triangle to 180°.`,
    `Pythagoras: a² + b² = c², where c is the hypotenuse.`,
    `Sector area = (central angle ÷ 360°) × circle area.`,
    `Prism volume = base area × height; match the units before calculating.`
  ]
},

/* ================================================================
   MATHEMATICS · CHAPTER 4: DATA AND PROBABILITY
   ================================================================ */
'mtk-4': {
  bab: 'Data and Probability',
  intro: `News, survey results, weather forecasts: all numbers and chances. This chapter is about reading data and working out probability.`,
  goals: [
    `Read data and choose a suitable way to present it`,
    `Work out the mean, median, and mode`,
    `Work out the probability of an event`
  ],
  lessons: {
    'mtk-4-a': { title: 'Presenting Data', blocks: [
      ['p', `Data can be shown in a table, bar chart, line chart, or pie chart. Choose the form that fits the purpose.`],
      ['table', ['Chart type', 'Good for'], [
        ['Bar', `Comparing amounts across categories`],
        ['Line', `Seeing how data rises and falls over time`],
        ['Pie', `Seeing parts of a whole (percentages)`]
      ]],
      ['h', `Reading a chart`],
      ['ol', [
        `Read the title and the axis labels (check the units).`,
        `Look at where the axis starts. An axis that does not start at 0 makes differences look bigger.`,
        `Match the points or bars to the numbers in the table.`
      ]],
      ['ex', `Trees planted by a school: 2022 = 40, 2023 = 55, 2024 = 70. Which chart fits, and what is the conclusion?`, [
        `The data changes from year to year, so a line chart fits.`,
        `The line goes up: 15 more trees each year.`
      ], `Line chart; the number of trees keeps rising by 15 a year`],
      ['ex', `A pie chart of 40 students' favourite activities: sport 50%, music 25%, reading 25%. How many like music?`, [
        `25% × 40 = 10.`
      ], `10 students`],
      ['task', `Try it yourself`, [
        `Why is a line chart a poor choice for comparing the number of students in three classes?`,
        `Data: Monday 12, Tuesday 15, Wednesday 9, Thursday 18. Which day is highest, and what is the gap between the highest and lowest?`
      ]]
    ]},
    'mtk-4-b': { title: 'Mean, Median, and Mode', blocks: [
      ['p', `Three measures of centre: <b>mean</b> (average), <b>median</b> (the middle value once sorted), and <b>mode</b> (the value that appears most often).`],
      ['table', ['Measure', 'How to work it out'], [
        ['Mean', `Total of all values ÷ number of values`],
        ['Median', `Sort the data. Odd count: the middle value. Even count: the average of the two middle values.`],
        ['Mode', `The value with the highest frequency`]
      ]],
      ['ex', `Data: 3, 5, 5, 8, 9. Work out the mean, median, and mode.`, [
        `Mean = (3 + 5 + 5 + 8 + 9) ÷ 5 = 30 ÷ 5 = 6.`,
        `The data is already sorted and there are 5 values, so the middle one is the 3rd, which is 5.`,
        `The number 5 appears twice (most often), so the mode is 5.`
      ], `Mean 6, median 5, mode 5`],
      ['ex', `Data: 4, 6, 7, 9, 10, 12. Work out the median.`, [
        `There are 6 values, an even count.`,
        `The two middle values are 7 and 9.`,
        `Median = (7 + 9) ÷ 2 = 8.`
      ], `8`],
      ['warn', `Extreme values`, `One very large or very small value can pull the mean, but the median barely moves. For 3, 5, 5, 8, 90 the mean becomes 22.2 while the median stays 5.`],
      ['task', `Try it yourself`, [
        `Work out the mean and mode of 6, 7, 8, 8, 9, 9, 9.`,
        `Four values have a mean of 7. If a value of 12 is added, what is the new mean?`
      ]]
    ]},
    'mtk-4-c': { title: 'Probability', blocks: [
      ['p', `Probability says how likely an event is: <b>P(A) = number of wanted outcomes ÷ number of all possible outcomes</b>. Its value lies between 0 (impossible) and 1 (certain).`],
      ['table', ['Experiment', 'All outcomes', 'Example probability'], [
        ['Tossing a coin', `Heads or tails (2 outcomes)`, `P(heads) = 1/2`],
        ['Rolling a die', `1 to 6 (6 outcomes)`, `P(even) = 3/6 = 1/2`],
        ['Drawing a card', `52 cards`, `P(heart) = 13/52 = 1/4`]
      ]],
      ['p', `Complement rule: P(not A) = 1 − P(A). Expected frequency = P(A) × number of trials.`],
      ['ex', `A bag holds 4 black marbles and 2 white ones. One marble is drawn at random. What is the probability that it is black?`, [
        `All outcomes: 4 + 2 = 6.`,
        `Wanted outcomes: 4.`,
        `P(black) = 4/6 = 2/3.`
      ], `2/3`],
      ['ex', `A die is rolled 60 times. What is the expected number of sixes?`, [
        `P(6) = 1/6.`,
        `Expected frequency = 1/6 × 60 = 10.`
      ], `10 times`],
      ['dadu', {
        mata: 6,
        note: `The chart shows the relative frequency of the chosen face over all rolls: the more rolls, the closer it drifts to 16.7% (1/6).`
      }],
      ['p', `The roulette below has 37 pockets: 18 red, 18 black, and one green zero. Pick a colour, spin the ball, and notice that red and black are not really 50–50.`],
      ['roulette', {}],
      ['ex', `From a bag with 4 red marbles and 2 white ones, one marble is drawn without replacement, then another. What is the probability that both are red?`, [
        `First draw: 4/6.`,
        `After one red is taken, 3 red remain out of 5: 3/5.`,
        `P(both red) = 4/6 × 3/5 = 12/30 = 2/5.`
      ], `2/5`],
      ['p', `The claw machine box below holds 6 balls in equal proportion, 2 gold and 4 glass. Take a few balls, then watch the probability of each colour after every draw.`],
      ['capit', {
        isi: [['emas', 2], ['kaca', 4]],
        label: { emas: 'gold balls', kaca: 'glass balls' }
      }],
      ['task', `Try it yourself`, [
        `What is the probability of rolling more than 4 on a single die?`,
        `The chance of rain tomorrow is 0.3. What is the chance that it does not rain?`,
        `Two coins are tossed together. List all the outcomes, then find the probability of two heads.`
      ]]
    ]}
  },
  summary: [
    `Pick the chart for the job: bar for comparison, line for change, pie for parts of a whole.`,
    `Mean = total ÷ count; median = middle value; mode = most frequent value.`,
    `P(A) = wanted outcomes ÷ all possible outcomes.`,
    `Without replacement, the total number of outcomes drops on the next draw.`
  ]
}

};

window.MATERI_EN = MATERI_EN;
