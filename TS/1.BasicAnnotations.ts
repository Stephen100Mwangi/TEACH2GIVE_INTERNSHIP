type Equal<A, B> = A extends B ? (B extends A ? true : false) : false;
type Expect<T extends true> = T;


// Example 1
export const add = (a:number,b:number)=>{
    return a+b
}

const result = add(2,5);
console.log(result);

type test = Expect<Equal<typeof result, number>>;


// Example 2
const concatTwoStrings = (a:string, b:string) => {
  return [a, b].join(" ");
};

const result2 = concatTwoStrings("Hello", "World");

type test2 = Expect<Equal<typeof result2, string>>;


//Example3
export let example1: string = "Hello World!";
export let example2: number = 42;
export let example3: boolean = true;
export let example4: symbol = Symbol();
export let example5: bigint = 123n;


//Example 4
const handleFormData = (e: any) => {
  e.preventDefault();

  const data = new FormData(e.target);

  const value = Object.fromEntries(data.entries());

  return value;
};
