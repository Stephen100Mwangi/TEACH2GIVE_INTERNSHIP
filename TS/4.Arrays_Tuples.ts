// Exercise 1: Array Type
type ShoppingCart = {
  userId: string;
  items: string[];
};

const processCart = (cart: ShoppingCart) => {
  // Do something with the cart in here
};

processCart({
  userId: "user123",
  items: ["item1", "item2", "item3"],
});



// Exercise 2:Array of Objects
type Ingredients = {
    name:string,
    quantity:string
}
type Recipe = {
  title: string;
  ingredients:Ingredients[];
  instructions: string;
};

const processRecipe = (recipe: Recipe) => {
  // Do something with the recipe in here
};

processRecipe({
  title: "Chocolate Chip Cookies",
  ingredients: [
    { name: "Flour", quantity: "2 cups" },
    { name: "Sugar", quantity: "1 cup" },
  ],
  instructions: "...",
});



// Exercise 3: Tuples
type Equal<A, B> = A extends B ? (B extends A ? true : false) : false;
type Expect<T extends true> = T;
const setRange = (range: [x:number,y:number]) => {
  const x = range[0];
  const y = range[1];

  // Do something with x and y in here
  // x and y should both be numbers!

  type tests = [
    Expect<Equal<typeof x, number>>,
    Expect<Equal<typeof y, number>>,
  ];
};


//Example 4:Optional Members of the Tuple
const goToLocation = (coordinates: [latitude: number, longitude: number, elevation?: number]) => {
  const latitude = coordinates[0];
  const longitude = coordinates[1];
  const elevation = coordinates[2];

  // Do something with latitude, longitude, and elevation in here

  type tests = [
    Expect<Equal<typeof latitude, number>>,
    Expect<Equal<typeof longitude, number>>,
    // Expect<Equal<typeof elevation, number | undefined>>,
  ];
};
