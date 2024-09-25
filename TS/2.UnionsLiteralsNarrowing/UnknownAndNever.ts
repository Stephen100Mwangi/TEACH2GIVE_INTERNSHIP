// Exercise 1: Narrowing Errors with instanceof
const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong')
  }

  return 'all good'
}

try {
  somethingDangerous()
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  }
}


// Exercise 2: Narrowing unknown to a Value
const parseValue = (value: unknown):string => {
  if (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    typeof value.data === 'object' &&
    value.data !== null &&
    'id' in value.data &&
    typeof value.data.id === 'string'
  ) {
    return value.data.id
  }

  throw new Error('Parsing error!')
}