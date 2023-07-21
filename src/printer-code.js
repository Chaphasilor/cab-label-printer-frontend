const labelProps = {
  xo: 0.0, // x offset
  yo: 0.2, // y offset
  ho: 9.4, // height of label
  wd: 9.5, // width of label
  dy: 12.4, // height of label + gap
}

const getLabelSize = (labelConfig) => `S l1;${labelConfig.xo},${labelConfig.yo},${labelConfig.ho},${labelConfig.dy},${labelConfig.wd}`

/** 
 * calculate font size based on number of lines and maximum number of characters per line
 * @param {string} text
 */
export function getDynamicFontSize(text, max) {

  //TODO respect font weight
  
  const lines = text.split(`\n`)
  const maxLineLength = Math.max(...lines.map(line => line.length))
  const maxFontSize = max || 9
  const minFontSize = 3
  const fontSizeForLine = maxFontSize / (lines.length/2.5)
  const fontSizeForLength = maxFontSize / (maxLineLength/4.25)

  let fontSize = Number(Math.min(maxFontSize, Math.max(minFontSize, Math.min(fontSizeForLine, fontSizeForLength))).toFixed(2))

  return fontSize
  
}

/** 
 * calculate line height based on number of lines
 * @param {string} text
 */
export function getDynamicLineHeight(text, max) {

  //TODO respect font weight
  
  const lines = text.split(`\n`)
  const maxLineHeight = max || 6
  const minLineHeight = 0.5
  const lineHeightForLine = maxLineHeight / (lines.length/1.3)

  let lineHeight = Number(Math.min(maxLineHeight, Math.max(minLineHeight, lineHeightForLine)).toFixed(2))

  return lineHeight
  
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
export function generateTextCode(text, fontSize = 7, lineHeight = -1) {

  if (fontSize === -1) {
    fontSize = getDynamicFontSize(text)
  }
  if (lineHeight === -1) {
    lineHeight = getDynamicLineHeight(text)
  }
  console.log(`fontSize:`, fontSize)
  console.log(`lineHeight:`, lineHeight)
  const lines = text.split(`\n`)
  const linesCode = lines.map((line, i) => 
    `T 0.5,${(2 + lineHeight * i)},0,3,pt${fontSize};${line}`
  ).join(`\n`)
  return `m m
J
${getLabelSize(labelProps)}
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
export function generateQrCode(text, {
  label = null,
  labelBold = true,
  amount = 1,
  redundancyLevel = 1,
}) {

  let fontSize = getDynamicFontSize(String(label), 7)
  console.log(`fontSize:`, fontSize)

  const maxWidth = labelProps.wd - 0.5

  let content = label ? 
  // `G:AREA;0,0.2,0;R:9.5,9.4,.5,.5
    `B 1.6,0.5,0,QRCODE+EL${redundancyLevel},0.3;${text}[J:c${maxWidth}]
T 0,9.0,0,3,pt${fontSize}${labelBold ? `,b` : ``};${label}[J:c${maxWidth}]
` :
    `B 0.2,0.2,0,QRCODE+EL${redundancyLevel},0.4;${text}`

    // T 1,9.8,0,5,pt${fontSize},v;${label}[J:l${maxWidth}]
  
  return `m m
J
${getLabelSize(labelProps)}
O R
${content}
A ${amount}
`
}

export function generateBatchQrCode(startId, endId, prefix = null) {

  let content = ``

  let increment = startId < endId
  
  for (let i = startId; increment ? (i <= endId) : (i >= endId); i += increment ? 1 : -1 ) {

    // content += generateQrCode(i, `${prefix ? `${prefix} ` : ``}${i}`, 1)
    content += generateQrCode(i, {
      label: `${prefix ? `${prefix} ` : ``}${i}`,
      amount: 1,
      redundancyLevel: 3,
      labelBold: true,
    })
    content += `\n`

  }
  
  return content

}
