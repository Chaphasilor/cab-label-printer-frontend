export default class API {

  constructor(baseUrl = import.meta.env.VITE_BACKEND_URL) {
    this.baseUrl = baseUrl
  }

  async uploadFile(fileContents) {
    console.log(`fileContents:`, fileContents)
    await (await fetch(`${this.baseUrl}/uploadFile`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        content: fileContents,
      }),
    })).json()
  }
  
}

