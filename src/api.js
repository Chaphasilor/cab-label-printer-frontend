export default class API {

  constructor({
    baseUrl = import.meta.env.VITE_BACKEND_URL,
    extension = ``,
  }) {
    this.baseUrl = baseUrl
    this.extension = extension
  }

  async uploadFile(fileContents) {
    console.log(`fileContents:`, fileContents)
    await (await fetch(`${this.baseUrl}/uploadFile${this.extension}`, {
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

