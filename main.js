import './style.css'

import { html, watch, reactive } from '@arrow-js/core'

import * as codes from './src/printer-code'
import Router from './src/router'
import API from './src/api'

import qr from './public/qr.png'

const backends = {
  'new': {
    description: `New Node.js-based backend @ EELPC011`,
    config: {
      baseUrl: `http://eelpc011:3000`,
      extension: ``,
    },
  },
  'remote': {
    description: `Remote php-based backend @ poland.gsi.de`,
    config: {
      baseUrl: `http://poland.gsi.de/labelPrinter/php`,
      extension: `.php`,
    },
  },
  'local': {
    description: `Local Node.js backend at port 3000`,
    config: {
      baseUrl: `http://localhost:3000`,
      extension: ``,
    },
  },
}

const tabs = {
  PCB_QR_CODES: `PCB QR Codes`,
  SIMPLE_TEXT: `Simple Text`,
  MULTI_LINE_TEXT: `Multi-line Text`,
  QR_CODE: `QR Code`,
}

const state = reactive({
  nav: tabs.PCB_QR_CODES,
  tabs: {},
  backend: `remote`,
  api: new API(backends.remote),
})

watch(() => state.backend, (newValue) => {
  state.api = new API(backends[newValue].config)
})

console.log(`tabs:`, tabs)
const router = new Router(state, tabs)

router.restore()

function stopPropagation(f) {
  if (!f || typeof f !== `function`) {
    f = () => {}
  }
  return (e) => {
    e.stopPropagation()
    f(e)
  }
}

function buildDialog({ trigger, content }) {

  let internalState = reactive({
    showContent: false,
  })

  // watch(() => internalState.showContent, (newValue) => {
  //   let dialog = document.querySelector(`#${internalState.dialogId}`)

  //   if (newValue) {
  //     dialog?.showModal?.()
  //   } else {
  //     dialog?.close?.()
  //   }
  // })
  
  return html`
    <button type="button" @click="${() => internalState.showContent = !internalState.showContent}">${() => trigger}</button>
    ${() => internalState.showContent ? html`
      <div class="fixed inset-0 grid content-center place-content-center w-[100vw] h-[100vh] z-40 bg-black/20" @click="${() => internalState.showContent = false}">
        <div class="z-50 grid w-min content-center p-8" @click="${stopPropagation()}">
          <div class="relative mx-auto w-full sm:max-w-md md:max-w-lg min-h-[16rem]">
            <button type="button" class="absolute top-0 right-0 p-4" @click="${() => internalState.showContent = false}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
            ${() => content}
          </div>
        </div>
      </div>
    ` : null}
  `
}

const header = html`
  <header class="flex flex-col gap-6 p-6 md:rounded-br-[4rem] md:max-w-[75vw] lg:max-w-[60vw] bg-background-blue mb-10">
    <h1 class="font-semibold text-3xl text-dark-blue">EEL Small Label Printer</h1>
    <p class="">Used for i.e. printing QR codes that identify PCBs within the AOI</p>
  </header>

  <div class="absolute top-6 right-6">
    ${() => buildDialog({
      trigger: html`
        <button
          class="flex flex-row py-2 px-3 gap-2 bg-light-blue rounded-lg hover:bg-blue"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-[1.5] text-text-blue" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
          </svg>
          <span>Settings</span>
        </button>
      `,
      content: html`
        <div class="bg-background-blue p-8 rounded-lg flex flex-col gap-4 h-full">
          <h2 class="text-lg font-semibold mb-2">Settings</h2>
          <div class="flex flex-row gap-2">
            <span>Backend:</span>
            <select
              @change="${(e) => {
                console.log(`e:`, e)
                // state.api = new API(backends[e.target.value])
                state.backend = e.target.value
                console.log(`state.api:`, state.api)
              }}"
            >
              ${() => Object.entries(backends).map(([key, value]) => {
                console.log(`state.backend:`, state.backend)
                console.log(`key, value:`, key, value)
                return html`
                <option value="${key}" selected="${() => state.backend == key}">${value.description}</option>
              `})}
            </select>
          </div>
        </div>
      `
    })}
  </div>
  
  `

const nav = html`
  <nav style="grid-template-columns: repeat(${Object.keys(tabs).length}, minmax(0, 1fr));" class="grid gap-4 w-full bg-background-blue rounded-2xl p-2.5">
    ${() => Object.values(tabs).map(tab => html`
      <button
        class="${() => `items-center p-3 text-center rounded-xl ${state.nav === tab ? `bg-dark-blue text-white font-bold` : `font-semibold text-text-blue bg-light-blue hover:bg-blue`}`}"
        @click="${() => router.to(tab)}"
      >
        ${tab}
      </button>
    `)}
  </nav>
`

function buildPrintButton() {
  return html`
    <button
      class="pl-3 hover:bg-blue bg-light-blue pr-4 active:bg-bluer text-text-blue py-2 rounded-lg justify-center items-center gap-2 flex"
      @click="${() => {
        try {
          state.tabs[state.nav].validate()

          console.log(`print job:`, state.tabs[state.nav].getCode())
          state.api.uploadFile(state.tabs[state.nav].getCode())
        } catch (err) {
          alert(`Invalid input: ${err}`)
        }
      }}"
    >
      <svg
        class="stroke-[1.5px] w-6 h-6"
        viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
        <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
      </svg>
      <span class="">Start Printing</span>
    </button>
  `
}

state.tabs[tabs.PCB_QR_CODES] = buildConfig(reactive({
    startId: 1,
    endId: 1,
    amount: 1,
    includePrefix: false,
    prefixText: `SN:`,
  }),
  (localState) => {
    console.log(`render`)
    return codes.generateBatchQrCode(localState.startId, localState.endId, localState.includePrefix ? localState.prefixText : null)
  },
  (localState) => {},
  (localState) => html`
    <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
      <div class="flex flex-row items-center gap-8 w-full">
        <div class="flex flex-col gap-1 items-center">
          <div class="flex flex-row items-center gap-2">
            <div class="flex flex-col items-center gap-0.5">
              <div class="px-0.5 py-1 flex flex-col justify-center overflow-hidden items-center gap-0.5 w-24 h-24 font-medium bg-white rounded-xl">
                <div class="bg-white flex-shrink overflow-hidden aspect-square">
                  <img src="${qr}" />
                </div>
                ${() => localState.includePrefix ? html`
                  <span style="${() => `font-size: ${codes.getDynamicFontSize(`${localState.prefixText} ${localState.startId}`) * 2.6}px`}" class="leading-4 tracking-wide whitespace-nowrap font-semibold">${() => `${localState.prefixText} ${localState.startId}`}</span>
                ` : html`
                  <span style="${() => `font-size: ${codes.getDynamicFontSize(String(localState.startId)) * 2.6}px`}" class="leading-4 tracking-wider whitespace-nowrap font-semibold">${() => localState.startId}</span>
                `
                }
              </div>
              <span class="text-xs">First Label</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-right-lines" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z"></path>
              <path d="M3 9v6"></path>
              <path d="M6 9v6"></path>
            </svg>
            <div class="flex flex-col items-center gap-0.5">
              <div class="px-0.5 py-1 flex flex-col justify-center overflow-hidden items-center gap-0.5 w-24 h-24 font-medium bg-white rounded-xl">
                <div class="bg-white flex-shrink overflow-hidden aspect-square">
                  <img src="${qr}" />
                </div>
                ${() => localState.includePrefix ? html`
                  <span style="${() => `font-size: ${codes.getDynamicFontSize(`${localState.prefixText} ${localState.endId}`) * 2.6}px`}" class="leading-4 tracking-wide whitespace-nowrap font-semibold">${() => `${localState.prefixText} ${localState.endId}`}</span>
                ` : html`
                  <span style="${() => `font-size: ${codes.getDynamicFontSize(String(localState.endId)) * 2.6}px`}" class="leading-4 tracking-wider whitespace-nowrap font-semibold">${() => localState.endId}</span>
                `
                }
              </div>
              <span class="text-xs">Last Label</span>
            </div>
          </div>
          <span class="text-sm">Preview</span>
        </div>
        <div class="grow shrink basis-0 ">Create a batch of QR codes containing continuous IDs, with an optional label below the QR code</div>
      </div>
      <div class="p-0 flex-col justify-start items-start gap-4 flex">
        <div class="p-0 flex-col justify-start items-start gap-2 flex">
          <div class="text-xs">Start ID</div>
          <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.startId}" @input="${e => {
            localState.startId = e.target.valueAsNumber
            localState.amount = Math.abs(localState.endId - localState.startId + 1)
          }}" />
        </div>
        <div class="p-0 justify-start items-center gap-4 inline-flex">
          <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-xs">End ID (inclusive)</div>
            <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.endId}" @input="${e => {
              localState.endId = e.target.valueAsNumber
              localState.amount = Math.abs(localState.endId - localState.startId + 1)
            }}" />
          </div>
          <div class="text-centertext-xs font-semibold">or</div>
          <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-xs">Amount</div>
            <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.amount}" @input="${e => {
              localState.amount = Math.abs(e.target.valueAsNumber)
              localState.endId = localState.startId + localState.amount - 1
            }}" />
          </div>
        </div>
        <div class="${() => `rounded-lg flex-col justify-start items-start gap-3 flex ${localState.includePrefix && `border border-black pl-2 pr-4 pt-2 pb-4`}`}">
          <div class="p-0 justify-start items-center gap-2 inline-flex">
            <input type="checkbox" class="w-4 h-4" id="${`${tabs.PCB_QR_CODES}-prefix`}" checked="${() => localState.includePrefix}" @input="${(e) => {
              localState.includePrefix = e.target.checked
            }}" />
            <label class="" for="${`${tabs.PCB_QR_CODES}-prefix`}">Include Prefix</label>
          </div>
          <div class="${() => `pl-8 flex-col justify-start items-start gap-2 flex ${!localState.includePrefix && `hidden`}`}">
            <div class="text-xs">Prefix Text</div>
            <input type="text" placeholder="SN: " class="w-48 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" value="${() => localState.prefixText}" disabled="${() => !localState.includePrefix}" @input="${(e) => {
              localState.prefixText = e.target.value
            }}" />
          </div>
        </div>
      </div>
      ${buildPrintButton()}
    </div>
  `
)

state.tabs[tabs.SIMPLE_TEXT] = buildConfig(reactive({
  text: `text`,
  amount: 1,
  bold: true,
  manualFontSize: false,
  fontSize: 7,
}),
(localState) => codes.generateCenteredTextCode(localState.text, localState.amount, localState.bold, localState.manualFontSize ? localState.fontSize : -1),
(localState) => {},
(localState) => html`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="px-1.5 py-1 flex justify-center items-center gap-8 w-24 font-medium aspect-square bg-white rounded-xl overflow-hidden">
          <div style="${() => `font-size: ${(localState.manualFontSize ? localState.fontSize : codes.getDynamicFontSize(localState.text)) * 3.2}px;`}" class="tracking-wider w-full text-center flex-grow whitespace-pre-wrap">${() => localState.text}</div>
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create simple text labels that can contain multiple lines</div>
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 flex">
      <div class="text-xs">Text</div>
      <input
        class="w-48 overflow-hidden text-opacity-60 resize px-4 py-2 bg-white rounded-lg border border-black"
        placeholder="text"
        type="text"
        value="${() => localState.text}"
        @input="${e => {
          localState.text = e.target.value
        }}"
      />
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
      <div class="text-xs">Amount</div>
      <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.amount}" @input="${e => {
        localState.amount = e.target.valueAsNumber
        localState.endId = localState.startId + localState.amount
      }}" />
    </div>
    <div class="p-0 justify-start items-center gap-2 inline-flex">
      <input type="checkbox" id="${`${tabs.SIMPLE_TEXT}-bold-text`}" class="w-4 h-4" checked="${() => localState.bold}" @input="${e => {
        console.log(`e:`, e)
        localState.bold = e.target.checked
      }}" />
      <label class="" for="${`${tabs.SIMPLE_TEXT}-bold-text`}">Bold Text</label>
    </div>
    <div class="${() => `rounded-lg flex-col justify-start items-start gap-3 flex ${localState.manualFontSize && `border border-black pl-2 pr-4 pt-2 pb-4`}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${tabs.SIMPLE_TEXT}-manual-font-size`}" class="w-4 h-4" checked="${() => localState.manualFontSize}" @input="${e => {
          console.log(`e:`, e)
          localState.manualFontSize = e.target.checked
        }}" />
        <label class="" for="${`${tabs.SIMPLE_TEXT}-manual-font-size`}">Manually Set Font Size</label>
      </div>
      <div class="${() => `pl-8 flex-col justify-start items-start gap-2 flex ${!localState.manualFontSize && `hidden`}`}">
        <div class="text-xs">Font Size</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="6"
          value="${() => localState.fontSize}"
          disabled="${() => !localState.manualFontSize}"
          @input="${e => {
            localState.fontSize = e.target.valueAsNumber
          }}"
        />
      </div>
    </div>
    <div class="${() => `rounded-lg flex-col justify-start items-start gap-3 flex ${localState.manualLineHeight && `border border-black pl-2 pr-4 pt-2 pb-4`}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${tabs.SIMPLE_TEXT}-manual-line-height`}" class="w-4 h-4" checked="${() => localState.manualLineHeight}" @input="${e => {
          console.log(`e:`, e)
          localState.manualLineHeight = e.target.checked
        }}" />
        <label class="" for="${`${tabs.SIMPLE_TEXT}-manual-line-height`}">Manually Set Line Height</label>
      </div>
      <div class="${() => `pl-8 flex-col justify-start items-start gap-2 flex ${!localState.manualLineHeight && `hidden`}`}">
        <div class="text-xs">Line Height</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="3"
          value="${() => localState.lineHeight}"
          disabled="${() => !localState.manualLineHeight}"
          @input="${e => {
            localState.lineHeight = e.target.valueAsNumber
          }}"
        />
      </div>
    </div>
    ${buildPrintButton()}
  </div>
`
)

state.tabs[tabs.MULTI_LINE_TEXT] = buildConfig(reactive({
  text: `some\nsample\ntext`,
  amount: 1,
  manualFontSize: false,
  fontSize: 7,
  manualLineHeight: false,
  lineHeight: 3,
}),
(localState) => codes.generateTextCode(localState.text, localState.amount, localState.manualFontSize ? localState.fontSize : -1, localState.manualLineHeight ? localState.lineHeight : -1),
(localState) => {},
(localState) => html`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="px-1.5 py-1 flex justify-center items-start gap-8 w-24 font-medium aspect-square bg-white rounded-xl overflow-hidden">
          <div style="${() => `font-size: ${(localState.manualFontSize ? localState.fontSize : codes.getDynamicFontSize(localState.text)) * 3.2}px; line-height: ${(localState.manualLineHeight ? localState.lineHeight : codes.getDynamicLineHeight(localState.text)) * 10}px`}" class="tracking-wider w-full h-full flex-grow whitespace-pre-wrap">${() => localState.text}</div>
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create multi-line text labels that can contain multiple lines</div>
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 flex">
      <div class="text-xs">Text</div>
      <textarea
        class="w-48 min-h-[6rem] overflow-hidden text-opacity-60 resize px-4 py-2 bg-white rounded-lg border border-black"
        placeholder="some\nsample\ntext"
        @input="${e => {
          localState.text = e.target.value
        }}"
      >${localState.text}</textarea>
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
      <div class="text-xs">Amount</div>
      <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.amount}" @input="${e => {
        localState.amount = e.target.valueAsNumber
        localState.endId = localState.startId + localState.amount
      }}" />
    </div>
    <div class="${() => `rounded-lg flex-col justify-start items-start gap-3 flex ${localState.manualFontSize && `border border-black pl-2 pr-4 pt-2 pb-4`}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${tabs.MULTI_LINE_TEXT}-manual-font-size`}" class="w-4 h-4" checked="${() => localState.manualFontSize}" @input="${e => {
          console.log(`e:`, e)
          localState.manualFontSize = e.target.checked
        }}" />
        <label class="" for="${`${tabs.MULTI_LINE_TEXT}-manual-font-size`}">Manually Set Font Size</label>
      </div>
      <div class="${() => `pl-8 flex-col justify-start items-start gap-2 flex ${!localState.manualFontSize && `hidden`}`}">
        <div class="text-xs">Font Size</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="6"
          value="${() => localState.fontSize}"
          disabled="${() => !localState.manualFontSize}"
          @input="${e => {
            localState.fontSize = e.target.valueAsNumber
          }}"
        />
      </div>
    </div>
    <div class="${() => `rounded-lg flex-col justify-start items-start gap-3 flex ${localState.manualLineHeight && `border border-black pl-2 pr-4 pt-2 pb-4`}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${tabs.MULTI_LINE_TEXT}-manual-line-height`}" class="w-4 h-4" checked="${() => localState.manualLineHeight}" @input="${e => {
          console.log(`e:`, e)
          localState.manualLineHeight = e.target.checked
        }}" />
        <label class="" for="${`${tabs.MULTI_LINE_TEXT}-manual-line-height`}">Manually Set Line Height</label>
      </div>
      <div class="${() => `pl-8 flex-col justify-start items-start gap-2 flex ${!localState.manualLineHeight && `hidden`}`}">
        <div class="text-xs">Line Height</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="3"
          value="${() => localState.lineHeight}"
          disabled="${() => !localState.manualLineHeight}"
          @input="${e => {
            localState.lineHeight = e.target.valueAsNumber
          }}"
        />
      </div>
    </div>
    ${buildPrintButton()}
  </div>
`
)

state.tabs[tabs.QR_CODE] = buildConfig(reactive({
  text: ``,
  amount: 1,
  includeLabel: false,
  labelText: `Label`,
}),
(localState) => codes.generateQrCode(localState.text, {
  label: localState.includeLabel ? localState.labelText : null,
  amount: localState.amount,
  redundancyLevel: 1,
  labelBold: true,
}),
(localState) => {
  if (!localState.text || localState.text.length === 0) {
    throw new Error(`Text must not be empty`)
  } else if (localState.amount < 1) {
    throw new Error(`Amount must be at least 1`)
  } else if (localState.includeLabel && localState.labelText.length === 0) {
    throw new Error(`Label text must not be empty if label is included`)
  }
},
(localState) => html`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="p-2 flex flex-col justify-center overflow-hidden items-center gap-0.5 w-24 h-24 font-medium bg-white rounded-xl">
          <div class="bg-white flex-shrink overflow-hidden aspect-square">
            <img src="${qr}" />
          </div>
          ${() => localState.includeLabel ? html`
            <span style="${() => `font-size: ${codes.getDynamicFontSize(localState.labelText) *2.5}px`}" class="text-xs font-semibold -mb-1">${() => localState.labelText}</span>
          ` : null}
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create QR codes containing custom text, with an optional label below the QR code</div>
    </div>
    <div class="p-0 flex-col w-full justify-start items-start gap-4 flex">
      <div class="p-0 flex-col w-full justify-start items-start gap-2 flex">
        <div class="text-xs">Text</div>
        <textarea
          class="w-full min-h-[6rem] overflow-hidden text-opacity-60 resize px-4 py-2 bg-white rounded-lg border border-black"
          placeholder="Content of QR Code"
          @input="${e => {
            localState.text = e.target.value
          }}"
        >${localState.text}</textarea>
      </div>
      <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
        <div class="text-xs">Amount</div>
        <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.amount}" @input="${e => {
          localState.amount = e.target.valueAsNumber
          localState.endId = localState.startId + localState.amount
        }}" />
      </div>
      <div class="${() => `rounded-lg flex-col justify-start items-start gap-3 flex ${localState.includeLabel && `border border-black pl-2 pr-4 pt-2 pb-4`}`}">
        <div class="p-0 justify-start items-center gap-2 inline-flex">
          <input type="checkbox" class="w-4 h-4" id="${`${tabs.QR_CODE}-label`}" checked="${() => localState.includeLabel}" @input="${(e) => {
            localState.includeLabel = e.target.checked
          }}" />
          <label class="" for="${`${tabs.QR_CODE}-label`}">Include Label</label>
        </div>
        <div class="${() => `pl-8 flex-col justify-start items-start gap-2 flex ${!localState.includeLabel && `hidden`}`}">
          <div class="text-xs">Label Text</div>
          <input type="text" placeholder="Label" class="w-48 text-opacity-60 px-4 py-2 bg-white rounded-lg disabled:cursor-not-allowed border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.labelText}" disabled="${() => !localState.includeLabel}" @input="${(e) => {
            localState.labelText = e.target.value
          }}" />
        </div>
      </div>
    </div>
    ${buildPrintButton()}
  </div>
`
)

watch(() => state.tabs[tabs.SIMPLE_TEXT].state.text, (newState) => {
  console.log(`newState:`, newState)
})

const config = html`
  ${() => state.tabs[state.nav]?.html}
`

function buildConfig(localState, codeFunction, validator, body) {
  return {
    state: localState,
    preview: html`${() => codeFunction(localState)}`,
    html: body(localState),
    validate: () => validator(localState),
    getCode: () => codeFunction(localState),
  }
}

const preview = html`
  <div class="relative border border-border rounded-2xl overflow-hidden h-full py-2 px-3">
    <pre class="overflow-y-auto max-h-[70dvh]">
${() => state.tabs[state.nav]?.preview}
    </pre>
    <button
      class="absolute bottom-5 right-5 pl-3 hover:bg-blue bg-light-blue pr-4 active:bg-bluer text-text-blue py-2 rounded-lg justify-center items-center gap-2 flex"
      @click="${() => {
        if (!navigator.clipboard) {
          alert(`Cannot write to clipboard, requires HTTPS`)
          return
        }
        navigator.clipboard.writeText(state.tabs[state.nav].getCode())
      }}"
    >
      <svg
        class="stroke-[1.5px] w-6 h-6"
        viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
      </svg>
      <span class="font-sans">Copy To Clipboard</span>
    </button>
  </div>  
`

const main = html`
  <div class="relative mt-2 grid grid-cols-2 gap-2 h-auto pb-20">
    ${() => config}
    ${() => preview}
  </div>
`

html`
  ${() => header}
  <div class="px-10">
    ${() => nav}
    ${() => main}
  </div>
  <div class="pb-30"></div>
`(document.querySelector(`#app`))
