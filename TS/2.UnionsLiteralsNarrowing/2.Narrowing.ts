// Exercise 1: Narrowing with if Statements
function validateUsername(username: string | null): boolean {


if (typeof username === "string") {
    console.log(username.length > 5)
    return true
}
  return false
}

// Exercise 2: Throwing Errors to Narrow
const appElement = document.getElementById('app')
if (!appElement) {
  throw new Error('Could not find app element')
}

// Exercise 3: Using `in` to narrow
type APIResponse =
  | {
      data: {
        id: string
      }
    }
  | {
      error: string
    }

const handleResponse = (response: APIResponse) => {
  // How do we check if 'data' is in the response?

  if ('data' in response) {
    return response.data.id
  } else {
    throw new Error(response.error)
  }
}