export async function uploadFile(fileContents) {
  await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadFile`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify({
      content: fileContents,
    }),
  })).json()
}
