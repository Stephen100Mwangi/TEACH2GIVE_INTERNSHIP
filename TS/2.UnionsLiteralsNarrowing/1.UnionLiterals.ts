//Exercise 1: string or null
function getUsername(username: string | null) {
  if (username !== null) {
    return `User: ${username}`
  } else {
    return 'Guest'
  }
}

const result = getUsername('Alice')

type test = Expect<Equal<typeof result, string>>

const result2 = getUsername(null)

type test2 = Expect<Equal<typeof result2, string>>



// Exercise 2: Restricting Function Parameters
type MoveDirection = "left" | "right" | "up" | "down"
function move(direction: MoveDirection, distance: number) {
  // Move the specified distance in the given direction
}