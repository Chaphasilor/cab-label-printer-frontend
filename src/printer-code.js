/** 
 * calculate font size based on number of lines and maximum number of characters per line
 * @param {string} text
 */
export function getDynamicFontSize(text) {
  
  const lines = text.split(`\n`)
  const maxLineLength = Math.max(...lines.map(line => line.length))
  const maxFontSize = 10
  const minFontSize = 3
  const fontSizeForLine = maxFontSize / (lines.length/2.5)
  const fontSizeForLength = maxFontSize / (maxLineLength/5)

  let fontSize = Number(Math.min(maxFontSize, Math.max(minFontSize, Math.min(fontSizeForLine, fontSizeForLength))).toFixed(2))

  return fontSize
  
}

/**
 * 
 * sample code:
 * m m
 * J
 * S l1;0.0,0.0,10,13,10
 * O R
 * T 2,6.5,0,5,pt10;10pF
 * A 1
 * @param {String} text 
 * @param {Number} fontSize 
 * @returns 
 */
export function generateTextCode(text, fontSize) {

  fontSize = fontSize || 7
  if (fontSize === -1) {
    fontSize = getDynamicFontSize(text)
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

/**
 * 
 * sample code:
 * 
 * @param {String} text 
 * @param {String?} label 
 * @param {Number?} amount
 * @returns 
 */
export function generateQrCode(text, label = null, amount = 1) {

  let fontSize = getDynamicFontSize(String(label))
  console.log(`fontSize:`, fontSize)

  let content = label ? 
    `B 1.9,0.8,0,QRCODE+EL1,0.3;${text}
T 1,9.5,0,5,pt${fontSize};${label}` :
    `B 1.5,1.4,0,QRCODE+EL1,0.3;${text}`
  
  return `m m
J
S l1;0.0,0.0,10,13,10
O R
${content}
A ${amount}
`
}

export function generateBatchQrCode(startId, endId, prefix = null) {

  let content = ``

  let increment = startId < endId
  
  for (let i = startId; increment ? (i <= endId) : (i >= endId); i += increment ? 1 : -1 ) {

    content += generateQrCode(i, `${prefix ? `${prefix} ` : ``}${i}`, 1)
    content += `\n`

  }
  
  return content

}
