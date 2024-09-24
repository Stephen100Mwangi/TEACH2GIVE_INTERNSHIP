// Exercise 1: Object Literal Types

type User ={
    first:string,
    last:string
}
const concatName = (user:User) => {
  return `${user.first} ${user.last}`;
};


// Example 2:Optimal Property Types
const concatName2 = (user: { first: string; last?: string }) => {
  if (!user.last) {
    return user.first;
  }

  return `${user.first} ${user.last}`;
};