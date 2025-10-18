import { renderHook, act } from "@testing-library/react";
import useCalculator from "./useCalculator";

describe("useCalculator Hook - Basic Number Input", () => {
  test('should initialize with display "0"', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.display).toBe("0");
  });

  test("should handle single digit input", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });

    expect(result.current.display).toBe("5");
  });

  test("should handle multiple digit input", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });

    expect(result.current.display).toBe("123");
  });

  test("should replace leading zero with number", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("7");
    });

    expect(result.current.display).toBe("7");
  });

  test("should handle decimal point", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.handleDecimal();
    });
    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });

    expect(result.current.display).toBe("3.14");
  });

  test("should prevent multiple decimal points", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleDecimal();
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleDecimal(); // This should be ignored
    });
    await act(async () => {
      result.current.handleNumber("3");
    });

    expect(result.current.display).toBe("1.23");
  });

  test("should handle decimal point at start", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleDecimal();
    });
    await act(async () => {
      result.current.handleNumber("5");
    });

    expect(result.current.display).toBe("0.5");
  });
});

describe("useCalculator Hook - Basic Arithmetic Operations", () => {
  test("should perform addition: 2 + 3 = 5", async () => {
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

  test("should perform subtraction: 10 - 4 = 6", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleOperator("−");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("6");
  });

  test("should perform multiplication: 7 × 8 = 56", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("8");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("56");
  });

  test("should perform division: 20 ÷ 4 = 5", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleOperator("÷");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("5");
  });

  test("should handle decimal arithmetic: 1.5 + 2.5 = 4", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleDecimal();
    });
    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleDecimal();
    });
    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("4");
  });

  test("should handle negative results: 5 - 10 = -5", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("−");
    });
    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("-5");
  });
});

describe("useCalculator Hook - Division by Zero", () => {
  test("should handle division by zero", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("÷");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("Không thể chia cho 0");
  });

  test("should handle division by zero and allow recovery", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("÷");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("Không thể chia cho 0");

    // Should be able to start new calculation
    await act(async () => {
      result.current.handleNumber("3");
    });

    expect(result.current.display).toBe("3");
  });
});

describe("useCalculator Hook - Clear Functions", () => {
  test("CE should clear current entry only", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.handleCE();
    });

    expect(result.current.display).toBe("0");
  });

  test("C should clear everything", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.handleClear();
    });

    expect(result.current.display).toBe("0");
    expect(result.current.expression).toBe("");
  });

  test("Backspace should delete last digit", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.handleBackspace();
    });

    expect(result.current.display).toBe("12");
  });

  test("Backspace on single digit should show 0", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleBackspace();
    });

    expect(result.current.display).toBe("0");
  });

  test("Multiple backspaces should work correctly", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("8");
    });
    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleNumber("6");
    });
    await act(async () => {
      result.current.handleBackspace();
    });
    await act(async () => {
      result.current.handleBackspace();
    });

    expect(result.current.display).toBe("98");
  });
});

describe("useCalculator Hook - Instant Operations", () => {
  test("should calculate percentage: 50% = 0.5", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handlePercent();
    });

    expect(result.current.display).toBe("0.5");
  });

  test("should calculate square: 5² = 25", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleSquare();
    });

    expect(result.current.display).toBe("25");
  });

  test("should calculate square root: √16 = 4", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("6");
    });
    await act(async () => {
      result.current.handleSquareRoot();
    });

    expect(result.current.display).toBe("4");
  });

  test("should calculate reciprocal: 1/4 = 0.25", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.handleReciprocal();
    });

    expect(result.current.display).toBe("0.25");
  });

  test("should handle reciprocal of zero", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleReciprocal();
    });

    expect(result.current.display).toBe("Không thể chia cho 0");
  });

  test("should handle square root of negative number", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleNegate();
    });
    await act(async () => {
      result.current.handleSquareRoot();
    });

    expect(result.current.display).toBe("Đầu vào không hợp lệ");
  });

  test("should negate positive number", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleNegate();
    });

    expect(result.current.display).toBe("-7");
  });

  test("should negate negative number", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleNegate();
    });
    await act(async () => {
      result.current.handleNegate();
    });

    expect(result.current.display).toBe("7");
  });
});

describe("useCalculator Hook - Chain Operations", () => {
  test("should handle chain addition: 1 + 2 + 3 = 6", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.calculate();
    });

    // After first calculation: 1 + 2 = 3
    expect(result.current.display).toBe("3");

    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.calculate();
    });

    // After second calculation: 3 + 3 = 6
    expect(result.current.display).toBe("6");
  });

  test("should handle mixed operations: 10 - 3 × 2", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleOperator("−");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("7");

    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("14");
  });
});

describe("useCalculator Hook - Operator After Result", () => {
  test("should continue with result when operator pressed after calculation", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
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

    expect(result.current.display).toBe("8");

    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("16");
  });

  test("should replace result when number pressed after calculation", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
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

    expect(result.current.display).toBe("8");

    // Pressing number should start new calculation
    await act(async () => {
      result.current.handleNumber("9");
    });

    expect(result.current.display).toBe("9");
  });
});

describe("useCalculator Hook - Memory Operations", () => {
  test("MS should store value in memory", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleMS();
    });

    expect(result.current.hasMemory).toBe(true);
    expect(result.current.memoryList).toHaveLength(1);
    expect(result.current.memoryList[0].value).toBe(42);
  });

  test("MR should recall value from memory", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleMS();
    });
    await act(async () => {
      result.current.handleClear();
    });
    await act(async () => {
      result.current.handleMR();
    });

    expect(result.current.display).toBe("77");
  });

  test("M+ should add to memory", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleMS();
    });
    await act(async () => {
      result.current.handleClear(); // Clear display first
    });
    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleMPlus();
    });

    expect(result.current.memoryList[0].value).toBe(15);
  });

  test("M- should subtract from memory", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleMS();
    });
    await act(async () => {
      result.current.handleClear(); // Clear display first
    });
    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.handleMMinus();
    });

    expect(result.current.memoryList[0].value).toBe(13);
  });

  test("MC should clear all memory", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleMS();
    });
    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleMS();
    });
    await act(async () => {
      result.current.handleMC();
    });

    expect(result.current.hasMemory).toBe(false);
    expect(result.current.memoryList).toHaveLength(0);
  });

  test("should handle M+ when no memory exists", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("8");
    });
    await act(async () => {
      result.current.handleMPlus();
    });

    expect(result.current.hasMemory).toBe(true);
    expect(result.current.memoryList[0].value).toBe(8);
  });

  test("should handle M- when no memory exists", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("8");
    });
    await act(async () => {
      result.current.handleMMinus();
    });

    expect(result.current.hasMemory).toBe(true);
    expect(result.current.memoryList[0].value).toBe(-8);
  });
});

describe("useCalculator Hook - History", () => {
  test("should add calculation to history", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].expression).toContain("3");
    expect(result.current.history[0].expression).toContain("4");
    expect(result.current.history[0].result).toBe("7");
  });

  test("should maintain history order (newest first)", async () => {
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

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0].result).toBe("20"); // Most recent
    expect(result.current.history[1].result).toBe("5"); // Older
  });
});

describe("useCalculator Hook - Expression Display", () => {
  test("should display expression when operator is pressed", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });

    expect(result.current.expression).toContain("5");
    expect(result.current.expression).toContain("+");
  });

  test("should show complete equation after calculation", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("6");
    });
    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("7");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.expression).toContain("6");
    expect(result.current.expression).toContain("7");
    expect(result.current.expression).toContain("=");
  });

  test("should clear expression after clear", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleClear();
    });

    expect(result.current.expression).toBe("");
  });
});

describe("useCalculator Hook - Edge Cases", () => {
  test("should handle very large numbers", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.handleNumber("9");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("9999800001");
  });

  test("should handle very small decimals", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleOperator("÷");
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toContain("0.3333333");
  });

  test("should handle multiple calculations without clear", async () => {
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

    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleOperator("−");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("8");
  });

  test("should handle calculate without second operand", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.calculate();
    });

    // Should handle gracefully
    expect(result.current.display).toBeDefined();
  });

  test("should handle operator change before second number", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleOperator("×"); // Change operator
    });
    await act(async () => {
      result.current.handleNumber("3");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("15"); // 5 × 3
  });
});

describe("useCalculator Hook - Complex Scenarios", () => {
  test("should handle: 2 + 3 × 4 − 5 ÷ 2 = multiple steps", async () => {
    const { result } = renderHook(() => useCalculator());

    // 2 + 3 = 5
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

    // 5 × 4 = 20
    await act(async () => {
      result.current.handleOperator("×");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.calculate();
    });
    expect(result.current.display).toBe("20");

    // 20 − 5 = 15
    await act(async () => {
      result.current.handleOperator("−");
    });
    await act(async () => {
      result.current.handleNumber("5");
    });
    await act(async () => {
      result.current.calculate();
    });
    expect(result.current.display).toBe("15");

    // 15 ÷ 2 = 7.5
    await act(async () => {
      result.current.handleOperator("÷");
    });
    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.calculate();
    });
    expect(result.current.display).toBe("7.5");
  });

  test("should handle instant operation after arithmetic", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("4");
    });
    await act(async () => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("8");

    await act(async () => {
      result.current.handleSquare();
    });

    expect(result.current.display).toBe("64");
  });

  test("should handle percentage in context: 200 + 10%", async () => {
    const { result } = renderHook(() => useCalculator());

    await act(async () => {
      result.current.handleNumber("2");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handleOperator("+");
    });
    await act(async () => {
      result.current.handleNumber("1");
    });
    await act(async () => {
      result.current.handleNumber("0");
    });
    await act(async () => {
      result.current.handlePercent();
    });
    await act(async () => {
      result.current.calculate();
    });

    // 200 + 0.1 = 200.1
    expect(result.current.display).toBe("200.1");
  });
});
