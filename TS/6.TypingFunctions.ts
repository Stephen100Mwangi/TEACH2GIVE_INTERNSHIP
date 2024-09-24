// Exercise 1: Optional Functional Parameters
const concat_Name2 = (first: string, last?: string) => {
  if (!last) {
    return first;
  }

  return `${first} ${last}`;
};

const result = concat_Name2("John", "Doe");
const result2 = concat_Name2("John");

// Exercise 2: Default Functional Parameters
const concat_Name = (first: string, last?: string) => {
  if (!last) {
    last = "Pocock";
    return first;
  }

  return `${first} ${last}`;
};


//Exercise 3:Rest parameters
export function concatenate(...strings:string[]) {
  return strings.join("");
}


// Exercise 4:Function Types
type User = {
  id: string;
  name: string;
};

const modifyUser = (user: User[], id: string, makeChange:(user:User)=>User) => {
  return user.map((u) => {
    if (u.id === id) {
      return makeChange(u);
    }

    return u;
  });
};
const users: User[] = [
  { id: "1", name: "John" },
  { id: "2", name: "Jane" },
];

modifyUser(users, "1", (user) => {
  return { ...user, name: "Waqas" };
});

type MakeChangeFunc = (user: User) => User;

// Question 5: Functions Returning void
const addClickEventListener = (listener:()=>string) => {
  document.addEventListener("click", listener);
};


// Question 6: void vs undefined
const acceptsCallback = (callback: () => void) => {
  callback();
};


// Question 7: Typing Async Functions
async function fetchData(): Promise<number> {
  const response = await fetch("https://api.example.com/data");

  const data = await response.json();

  return data;
}