/**
 * 
 * sample code:
 * m m
 * J
 * S l1;0.0,0.0,10,13,10
 * O R
 * T 2,6.5,0,5,pt10;10pF
 * A 1
 * @param {*} text 
 * @param {*} fontSize 
 * @returns 
 */
export function generateTextCode(text, fontSize) {

  fontSize = fontSize || 7
  if (fontSize === -1) {
    // calculate font size based on number of lines and maximum number of characters per line
    const lines = text.split(`\n`)
    const maxLineLength = Math.max(...lines.map(line => line.length))
    const maxFontSize = 10
    const minFontSize = 3
    const fontSizeForLine = maxFontSize / (lines.length/2)
    const fontSizeForLength = maxFontSize / (maxLineLength/4)
    fontSize = Math.min(maxFontSize, Math.max(minFontSize, Math.min(fontSizeForLine, fontSizeForLength)))
  }
  console.log(`fontSize:`, fontSize)
  const lines = text.split(`\n`)
  const linesCode = lines.map((line, i) => 
    `T 1,${(3 * (i + 1))},0,5,pt${fontSize};${line}`
  ).join(`\n`)
  return `m m
J
S l1;0.0,0.0,10,13,10
O R
${linesCode}
A 1
`
}
