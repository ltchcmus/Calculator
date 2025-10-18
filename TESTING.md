# Testing Documentation

## Overview

This project uses **Jest** and **React Testing Library** for comprehensive unit testing of the calculator functionality.

## Test Coverage Summary

- **Total Tests**: 52 tests
- **Pass Rate**: 100% (52/52 passed)
- **Coverage**: 89.67% statements, 80.43% branches on `useCalculator.js`

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Generate coverage report

```bash
npm run test:coverage
```

## Test Structure

### 1. Basic Number Input (7 tests)

- Initialize with display "0"
- Single digit input
- Multiple digit input
- Replace leading zero with number
- Handle decimal point
- Prevent multiple decimal points
- Handle decimal point at start

### 2. Basic Arithmetic Operations (6 tests)

- Addition: `2 + 3 = 5`
- Subtraction: `10 - 4 = 6`
- Multiplication: `7 × 8 = 56`
- Division: `20 ÷ 4 = 5`
- Decimal arithmetic: `1.5 + 2.5 = 4`
- Negative results: `5 - 10 = -5`

### 3. Division by Zero (2 tests)

- Handle division by zero error message
- Allow recovery after division by zero

### 4. Clear Functions (5 tests)

- CE (Clear Entry) clears current entry only
- C (Clear All) clears everything
- Backspace deletes last digit
- Backspace on single digit shows 0
- Multiple backspaces work correctly

### 5. Instant Operations (8 tests)

- Percentage: `50% = 0.5`
- Square: `5² = 25`
- Square root: `√16 = 4`
- Reciprocal: `1/4 = 0.25`
- Handle reciprocal of zero
- Handle square root of negative number
- Negate positive number: `7 → -7`
- Negate negative number: `-7 → 7`

### 6. Chain Operations (2 tests)

- Chain addition: `1 + 2 = 3`, then `3 + 3 = 6`
- Mixed operations: `10 - 3 = 7`, then `7 × 2 = 14`

### 7. Operator After Result (2 tests)

- Continue with result when operator pressed
- Replace result when number pressed

### 8. Memory Operations (7 tests)

- MS (Memory Store) stores value
- MR (Memory Recall) recalls value
- M+ adds to memory
- M- subtracts from memory
- MC clears all memory
- M+ when no memory exists
- M- when no memory exists

### 9. History (2 tests)

- Add calculation to history
- Maintain history order (newest first)

### 10. Expression Display (3 tests)

- Display expression when operator pressed
- Show complete equation after calculation
- Clear expression after clear

### 11. Edge Cases (5 tests)

- Handle very large numbers
- Handle very small decimals
- Multiple calculations without clear
- Calculate without second operand
- Operator change before second number

### 12. Complex Scenarios (3 tests)

- Multi-step calculation: `2 + 3 = 5 → 5 × 4 = 20 → 20 - 5 = 15 → 15 ÷ 2 = 7.5`
- Instant operation after arithmetic: `4 + 4 = 8 → 8² = 64`
- Percentage in context: `200 + 10% = 200.1`

## Test Files

### `src/hooks/useCalculator.test.js`

Main test suite for the `useCalculator` custom hook. Tests all calculator functions including:

- Number input handling
- Arithmetic operations
- Special functions (%, √, x², 1/x, ±)
- Memory operations
- History tracking
- Edge cases and error handling

## Configuration Files

### `jest.config.cjs`

Jest configuration with:

- `jsdom` test environment for React components
- CSS module mocking with `identity-obj-proxy`
- Babel transformation for JSX
- Coverage collection settings

### `babel.config.cjs`

Babel configuration for Jest with:

- `@babel/preset-env` for modern JavaScript
- `@babel/preset-react` for JSX transformation

### `src/setupTests.js`

Test setup file that imports `@testing-library/jest-dom` for additional matchers

### `eslint.config.js`

ESLint configuration updated to include Jest globals for test files

## Dependencies

### Testing Libraries

```json
{
  "@testing-library/react": "^16.1.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^14.5.2",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "@babel/preset-env": "^7.26.0",
  "@babel/preset-react": "^7.26.3",
  "identity-obj-proxy": "^3.0.0"
}
```

## Writing New Tests

### Example Test Pattern

```javascript
test("should perform addition", async () => {
  const { result } = renderHook(() => useCalculator());

  await act(async () => {
    result.current.handleNumber("2");
  });
  await act(async () => {
    result.current.handleOperator("+");
  });
  await act(async () => {
    result.current.handleNumber("3");
  });
  await act(async () => {
    result.current.calculate();
  });

  expect(result.current.display).toBe("5");
});
```

### Key Points

1. **Use `renderHook`** from React Testing Library for testing custom hooks
2. **Wrap state updates in `act()`** to ensure React updates are processed
3. **Use async/await** with `act()` for proper state batching
4. **Separate each state update** into individual `act()` calls for reliability
5. **Test both happy path and edge cases**

## Coverage Goals

- ✅ **Statements**: 89.67% (target: >80%)
- ✅ **Branches**: 80.43% (target: >75%)
- ✅ **Functions**: 82.6% (target: >80%)
- ✅ **Lines**: 90.54% (target: >85%)

## Known Limitations

- Component tests are not included (only hook tests)
- UI interaction tests could be added for complete coverage
- Integration tests with actual DOM events could enhance test suite

## Future Improvements

- Add component-level tests for Button, Display, etc.
- Add integration tests for keyboard input
- Add E2E tests with Playwright or Cypress
- Test accessibility features
- Performance testing for complex calculations
