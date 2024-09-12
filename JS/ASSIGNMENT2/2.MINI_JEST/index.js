const startButton = document.getElementById ('startButton');
const finishButton = document.getElementById ('finishButton');

const testResults = {
  subtractionTest: 'Not Done',
  additionTest: 'Not Done',
  divisionTest: 'Not Done',
  multiplicationTest: 'Not Done',
};

console.log (testResults);

const testAddition = () => {
  let number1 = parseFloat (prompt ('Input number 1: '));
  let number2 = parseFloat (prompt ('Input number 2: '));
  let score = number1 + number2;
  let result = parseFloat (
    prompt ('Input the result for adding the two numbers')
  );
  if (result === score) {
    console.log (`Correct🎅🏽😀 (${number1} + ${number2} = ${score})`);
    alert (`Correct🎅🏽😀 (${number1} + ${number2} = ${score})`);
    testResults.additionTest = 'Correct';
    startTest ();
  } else {
    console.log (`Incorrect😣😴 (${number1} + ${number2} = ${score})`);
    alert (`Incorrect😣😴 (${number1} + ${number2} = ${score})`);
    testResults.additionTest = 'Incorrect';
    startTest ();
  }
};

const testSubtraction = () => {
  let number1 = parseFloat (prompt ('Input number 1: '));
  let number2 = parseFloat (prompt ('Input number 2: '));
  let score = number1 - number2;
  let result = parseFloat (
    prompt ('Input the result for subtracting the two numbers')
  );
  if (result === score) {
    console.log (`Correct🎅🏽😀 (${number1} - ${number2} = ${score})`);
    alert (`Correct🎅🏽😀 (${number1} - ${number2} = ${score})`);
    testResults.subtractionTest = 'Correct';
    startTest ();
  } else {
    console.log (`Incorrect😣😴 (${number1} - ${number2} = ${score})`);
    alert (`Incorrect😣😴 (${number1} - ${number2} = ${score})`);
    testResults.subtractionTest = 'Incorrect';
    startTest ();
  }
};

const testMultiplication = () => {
  let number1 = parseFloat (prompt ('Input number 1: '));
  let number2 = parseFloat (prompt ('Input number 2: '));
  let score = number1 * number2;
  let result = parseFloat (
    prompt ('Input the result for multiplying the two numbers')
  );
  if (result === score) {
    console.log (`Correct🎅🏽😀 (${number1} * ${number2} = ${score})`);
    alert (`Correct🎅🏽😀 (${number1} * ${number2} = ${score})`);
    testResults.multiplicationTest = 'Correct';
    startTest ();
  } else {
    console.log (`Incorrect😣😴 (${number1} * ${number2} = ${score})`);
    alert (`Incorrect😣😴 (${number1} * ${number2} = ${score})`);
    testResults.multiplicationTest = 'Incorrect';
    startTest ();
  }
};

const testDivision = () => {
  let number1 = parseFloat (prompt ('Input number 1: '));
  let number2 = parseFloat (prompt ('Input number 2: '));
  let score = number1 / number2;
  let result = parseFloat (
    prompt ('Input the result for dividing the two numbers')
  );
  if (result === score) {
    console.log (`Correct🎅🏽😀 (${number1} / ${number2} = ${score})`);
    alert (`Correct🎅🏽😀 (${number1} / ${number2} = ${score})`);
    testResults.divisionTest = 'Correct';
    startTest ();
  } else {
    console.log (`Incorrect😣😴 (${number1} / ${number2} = ${score})`);
    alert (`Incorrect😣😴 (${number1} / ${number2} = ${score})`);
    testResults.divisionTest = 'Incorrect';
    startTest ();
  }
};

const startTest = () => {
  const user_prompt = parseInt (
    prompt (
      'Input test you wish to take - [1 OR 2 OR 3 OR 4 OR 5]: \n 1. Addition \n 2. Subtraction \n 3. Multiplication \n 4. Division \n 5. Finish Test'
    )
  );
  switch (user_prompt) {
    case 1:
      testAddition ();
      break;
    case 2:
      testSubtraction ();
      break;
    case 3:
      testMultiplication ();
      break;
    case 4:
      testDivision ();
      break;
    case 5:
      viewScores ();
      break;

    default:
      console.log ('Invalid input');
      startTest ();
      break;
  }
};

const viewScores = () => {
  let results = `Test Results:\n
    Addition Test : ${testResults.additionTest}\n
    Subtraction Test : ${testResults.subtractionTest}\n
    Multiplication Test : ${testResults.multiplicationTest}\n
    Division Test : ${testResults.divisionTest}`;

  console.log (results);
  alert (results);
  return testResults;
};

startButton.addEventListener ('click', startTest);
finishButton.addEventListener ('click', viewScores);
