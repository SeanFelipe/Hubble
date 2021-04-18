const REMOTE = 'http://localhost:9292'
const SPECS_URL = `${REMOTE}/specs`


export async function getSpecs() {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(SPECS_URL, opts)
    .then((response) => response.json())
    .then((json) => {
      //console.log("getSpecs() retrieved data: " + JSON.stringify(json))
      return json
    })
    .catch((error) => {
      //console.log("getSpecs() encountered error: " + error)
      throw error
    })
}


