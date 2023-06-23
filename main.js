import './style.css'
import { html, watch, reactive } from '@arrow-js/core'

import { generateTextCode } from './src/printer-code'
import { uploadFile } from './src/api'

import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

const tabs = {
  PCB_QR_CODES: `PCB QR Codes`,
  SIMPLE_TEXT: `Simple Text`,
  QR_CODE: `QR Code`,
  DUMMY1: `Tab 4`,
  DUMMY2: `Tab 5`,
  DUMMY3: `Tab 6`,
}

const state = reactive({
  nav: tabs.PCB_QR_CODES,
  localStates: {
    // [tabs.PCB_QR_CODES]: {
    //   startId: 0,
    //   endId: 0,
    //   amount: 0,
    //   includePrefix: false,
    //   prefixText: ``,
    // },
    // [tabs.SIMPLE_TEXT]: {
    //   text: ``,
    // },
    // [tabs.QR_CODE]: {
    //   text: ``,
    // },
    // [tabs.DUMMY1]: {
    // },
    // [tabs.DUMMY2]: {
    // },
    // [tabs.DUMMY3]: {
    // },
  },
  tabs: {},
})

const header = html`
  <header class="flex flex-col gap-6 p-6 md:rounded-br-[4rem] md:max-w-[75vw] lg:max-w-[60vw] bg-background-blue mb-10">
    <h1 class="font-semibold text-3xl text-dark-blue">EEL Small Label Printer</h1>
    <p class="">Used for printing QR codes that identify PCBs within the AOI</p>
  </header>
  `

const nav = html`
  <nav style="grid-template-columns: repeat(${Object.keys(tabs).length}, minmax(0, 1fr));" class="grid gap-4 w-full bg-background-blue rounded-2xl p-2.5">
    ${() => Object.values(tabs).map(tab => html`
      <button
        class="${() => `items-center p-3 text-center rounded-xl ${state.nav === tab ? `bg-dark-blue text-white font-bold` : `font-semibold text-text-blue bg-light-blue hover:bg-blue`}`}"
        @click="${() => state.nav = tab}"
      >
        ${tab}
      </button>
    `)}
  </nav>
`

function buildPrintButton(handler) {
  return html`
    <button
      class="pl-3 hover:bg-blue bg-light-blue pr-4 active:bg-bluer text-text-blue py-2 rounded-lg justify-center items-center gap-2 flex"
      @click="${() => handler()}"
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
    startId: 0,
    endId: 0,
    amount: 0,
    includePrefix: false,
    prefixText: ``,
  }), 
  (localState) => html`
    <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-8 inline-flex">
      <div class="flex flex-row items-center gap-8 w-full">
        <div class="p-0 grid justify-center items-center gap-8 w-24 font-medium aspect-square bg-white rounded-xl">
          <img class="p-2 bg-white rounded-2xl flex-col justify-center items-center gap-2 inline-flex" src="https://via.placeholder.com/73x72" />
        </div>
        <div class="grow shrink basis-0 ">Create a batch of QR codes containing continuous IDs, with an optional label below the QR code</div>
      </div>
      <div class="p-0 flex-col justify-start items-start gap-4 flex">
        <div class="p-0 flex-col justify-start items-start gap-2 flex">
          <div class="text-xs">Start ID</div>
          <input type="number" placeholder="15" class="w-20 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.startId}" @input="${e => {
            localState.startId = e.target.valueAsNumber
            localState.amount = localState.endId - localState.startId
          }}" />
        </div>
        <div class="p-0 justify-start items-center gap-4 inline-flex">
          <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-xs">End ID</div>
            <input type="number" placeholder="15" class="w-20 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.endId}" @input="${e => {
              localState.endId = e.target.valueAsNumber
              localState.amount = localState.endId - localState.startId
            }}" />
          </div>
          <div class="text-centertext-xs font-semibold">or</div>
          <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-xs">Amount</div>
            <input type="number" placeholder="15" class="w-20 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${() => localState.amount}" @input="${e => {
              localState.amount = e.target.valueAsNumber
              localState.endId = localState.startId + localState.amount
            }}" />
          </div>
        </div>
        <div class="pl-2 pr-4 pt-2 pb-4 rounded-lg border border-black flex-col justify-start items-start gap-3 flex">
          <div class="p-0 justify-start items-center gap-2 inline-flex">
            <input type="checkbox" class="w-4 h-4" />
            <div class="">Include Prefix</div>
          </div>
          <div class="pl-8 flex-col justify-start items-start gap-2 flex">
            <div class="text-xs">Prefix Text</div>
            <input type="text" placeholder="SN: " class="w-48 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" />
          </div>
        </div>
      </div>
      ${buildPrintButton(() => {
        console.log(`localState:`, localState)
      })}
    </div>
  `
)

state.tabs[tabs.SIMPLE_TEXT] = buildConfig(reactive({
  text: `some\nsample\ntext`,
  manualFontSize: false,
  fontSize: 7,
}), 
(localState) => html`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-8 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="p-0 grid justify-center items-center gap-8 w-24 font-medium aspect-square bg-white rounded-xl">
        <div class="whitespace-pre-wrap">${() => localState.text}</div>
      </div>
      <div class="grow shrink basis-0 ">Create simple text labels that can contain multiple lines</div>
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
    <div class="pl-2 pr-4 pt-2 pb-4 rounded-lg border border-black flex-col justify-start items-start gap-3 flex">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" class="w-4 h-4" checked="${() => localState.manualFontSize}" @input="${e => {
          console.log(`e:`, e)
          localState.manualFontSize = e.target.checked
        }}" />
        <div class="">Manually Set Font Size</div>
      </div>
      <div class="pl-8 flex-col justify-start items-start gap-2 flex">
        <div class="text-xs">Font Size</div>
        <input
          class="w-20 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="6"
          value="${() => localState.fontSize}"
          @input="${e => {
            localState.fontSize = e.target.valueAsNumber
          }}"
      />
      </div>
    </div>
    ${buildPrintButton(() => {
      console.log(`localState:`, localState)
      uploadFile(generateTextCode(localState.text, localState.manualFontSize ? localState.fontSize : -1))
      // console.log(generateTextCode(localState.text, localState.manualFontSize ? localState.fontSize : -1))
    })}
  </div>
`
)

watch(() => state.tabs[tabs.SIMPLE_TEXT].state.text, (newState) => {
  console.log(`newState:`, newState)
})

const config = html`
  ${() => state.tabs[state.nav]?.html}
`

function buildConfig(localState, body) {
  return {
    state: localState,
    html: body(localState)
  }
}

const preview = html`
  <div class="border border-border rounded-2xl overflow-y-auto">
  </div>
`

const main = html`
  <div class="mt-2 grid grid-cols-2 gap-2">
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
  <div class="pb-40"></div>
`(document.querySelector(`#app`))


