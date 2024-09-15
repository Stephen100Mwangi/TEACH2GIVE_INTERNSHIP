// Define the TestRunner class
class TestRunner {
  constructor() {
    this.tests = [];
    this.executionOrder = 'sequential'; // Default order
  }

  registerTest(name, testFunction) {
    this.tests.push({ name, testFunction });
  }

  runTests() {
    let passedTests = 0;
    let failedTests = 0;

    console.log('Running Tests...\n');

    // Sort test cases based on the execution order
    const testsToRun = this.executionOrder === 'reverse' 
      ? this.tests.reverse() 
      : this.tests;

    for (const test of testsToRun) {
      try {
        test.testFunction();
        console.log(`✅ Test "${test.name}" passed.`);
        passedTests++;
      } catch (error) {
        console.error(`❌ Test "${test.name}" failed: ${error.message}`);
        failedTests++;
      }
    }

    console.log(`\nSummary: ${passedTests} passed, ${failedTests} failed.`);
  }

  filterTests(filter) {
    this.tests = this.tests.filter(test => test.name.includes(filter));
  }

  setExecutionOrder(order) {
    this.executionOrder = order;
  }
}

// Create a TestRunner instance
const runner = new TestRunner();

// Define assertion functions
const assert = {
  assertEqual(actual, expected, message = 'Values should be equal') {
    if (actual !== expected) {
      throw new Error(`${message}. Expected: ${expected}, but got: ${actual}`);
    }
  },

  assertNotEqual(actual, expected, message = 'Values should not be equal') {
    if (actual === expected) {
      throw new Error(`${message}. Value should not be: ${expected}`);
    }
  },

  assertTrue(value, message = 'Value should be true') {
    if (!value) {
      throw new Error(`${message}. Value is falsy.`);
    }
  },

  assertFalse(value, message = 'Value should be false') {
    if (value) {
      throw new Error(`${message}. Value is truthy.`);
    }
  },

  assertContains(array, item, message = 'Array should contain the item') {
    if (!array.includes(item)) {
      throw new Error(`${message}. Array does not contain: ${item}`);
    }
  },
};

// Define describe and test functions
function describe(name, fn) {
  console.log(`\nSuite: ${name}`);
  fn();
}

function test(name, fn) {
  runner.registerTest(name, fn);
}

// Example test cases
describe('Array Assertions', () => {
  test('Array contains item', () => {
    const fruits = ['apple', 'banana', 'cherry'];
    assert.assertContains(fruits, 'banana');
  });

  test('Array does not contain item', () => {
    const fruits = ['apple', 'banana', 'cherry'];
    assert.assertContains(fruits, 'grape');
  });
});

describe('Basic Equality Checks', () => {
  test('Equal numbers', () => {
    assert.assertEqual(2 + 2, 4);
  });

  test('Not equal numbers', () => {
    assert.assertNotEqual(2 + 2, 5);
  });
},

// Run the tests
runner.runTests());
