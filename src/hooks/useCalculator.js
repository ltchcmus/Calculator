import { useState } from "react";

function useCalculator() {
  // Main display
  const [display, setDisplay] = useState("0");
  const [calculScreen, setCalculScreen] = useState("");

  // Calculator state (following Calculator-Windows-main algorithm)
  const [previousNumber, setPreviousNumber] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [operatorType, setOperatorType] = useState("");
  const [onResult, setOnResult] = useState(false);
  const [firstNumberEntered, setFirstNumberEntered] = useState(false);

  // History and Memory
  const [history, setHistory] = useState([]);
  const [memoryList, setMemoryList] = useState([]);
  const [hasMemory, setHasMemory] = useState(false);

  // ADD NUMBER - Following Calculator-Windows-main algorithm
  const handleNumber = (num) => {
    const numStr = String(num);

    // Accept only 1 dot
    if (numStr === "." && display.includes(".")) return;

    // Set the value of display to number if:
    // - we're waiting on the second number
    // - we already have a result from the previous question
    // - the display starts with 0 and the number is not a dot and the display does not have a dot
    // Else we add the number to the already existing ones in the display value
    if (
      (isWaiting && firstNumberEntered) ||
      onResult ||
      (display.startsWith("0") && numStr !== "." && !display.includes("."))
    ) {
      setDisplay(numStr);
      setOnResult(false);
      setFirstNumberEntered(false);
    } else {
      setDisplay(display + numStr);
    }
  };

  // Handle decimal - part of addNumber logic
  const handleDecimal = () => {
    handleNumber(".");
  };

  // OPERATION - Following Calculator-Windows-main algorithm
  const handleOperator = (operator) => {
    // Get which operation we'll be doing and set the current state on the screen
    const operatorSymbols = {
      "+": "+",
      "−": "−",
      "×": "×",
      "÷": "÷",
    };

    setOperatorType(operator);
    const prevNum = Number(display);
    setPreviousNumber(prevNum);
    setCalculScreen(`${prevNum} ${operatorSymbols[operator] || operator}`);
    setIsWaiting(true);
    setFirstNumberEntered(true);
  };

  // CALCULATE (EQUALS) - Following Calculator-Windows-main algorithm
  const calculate = () => {
    if (!isWaiting) return; // We want an operation to do

    setOnResult(true); // Telling there's now a result on the screen

    // Setting useful variables
    const lastNumber = Number(display);
    let answer = 0;

    // Putting the equation on the screen
    const operatorSymbols = {
      "+": "+",
      "−": "−",
      "×": "×",
      "÷": "÷",
    };
    const equation = `${previousNumber} ${
      operatorSymbols[operatorType] || operatorType
    } ${lastNumber}`;
    setCalculScreen(`${equation} =`);

    switch (operatorType) {
      case "÷":
        if (lastNumber === 0) {
          setDisplay("Không thể chia cho 0");
          setCalculScreen("");
          setIsWaiting(false);
          setOnResult(true);
          return;
        }
        answer = previousNumber / lastNumber;
        break;
      case "×":
        answer = previousNumber * lastNumber;
        break;
      case "−":
        answer = previousNumber - lastNumber;
        break;
      case "+":
        answer = previousNumber + lastNumber;
        break;
      default:
        return;
    }

    setDisplay(String(answer));
    setIsWaiting(false);

    // Add to history
    setHistory([
      { expression: equation, result: answer.toString() },
      ...history,
    ]);
  };

  // OPERATION INSTANT - Following Calculator-Windows-main algorithm
  const operationInstant = (operator) => {
    const currentNumber = Number(display);
    let result = 0;
    let operationText = "";

    // Doing operation
    switch (operator) {
      case "%":
        result = currentNumber / 100;
        operationText = `${currentNumber}%`;
        break;
      case "1/x":
        if (currentNumber === 0) {
          setDisplay("Không thể chia cho 0");
          setOnResult(true);
          setCalculScreen("");
          return;
        }
        result = 1 / currentNumber;
        operationText = `1/(${currentNumber})`;
        break;
      case "x2":
        result = currentNumber ** 2;
        operationText = `sqr(${currentNumber})`;
        break;
      case "2/x":
        if (currentNumber < 0) {
          setDisplay("Đầu vào không hợp lệ");
          setOnResult(true);
          setCalculScreen("");
          return;
        }
        result = Math.sqrt(currentNumber);
        operationText = `√(${currentNumber})`;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setCalculScreen(`${operationText} =`);
    setOnResult(true);
  };

  // Clear Entry (CE)
  const handleCE = () => {
    setDisplay("0");
  };

  // Clear All (C) - Following Calculator-Windows-main algorithm
  const handleClear = () => {
    setDisplay("0");
    setCalculScreen("");
    setPreviousNumber(0);
    setIsWaiting(false);
    setOperatorType("");
    setOnResult(false);
    setFirstNumberEntered(false);
  };

  // Backspace - Following Calculator-Windows-main algorithm
  const handleBackspace = () => {
    // If there's something to delete, we delete it else we set the value to 0
    setDisplay(
      display.length === 1 ? "0" : display.substring(0, display.length - 1)
    );
  };

  // Negate - Following Calculator-Windows-main algorithm
  const handleNegate = () => {
    // If there's a number we inverse it else we set the value to 0
    setDisplay(display.length !== 0 ? String(-Number(display)) : "0");
  };

  // Wrapper functions for instant operations
  const handlePercent = () => operationInstant("%");
  const handleReciprocal = () => operationInstant("1/x");
  const handleSquare = () => operationInstant("x2");
  const handleSquareRoot = () => operationInstant("2/x");

  // Memory Clear
  const handleMC = () => {
    setMemoryList([]);
    setHasMemory(false);
  };

  // Memory Recall
  const handleMR = () => {
    if (memoryList.length > 0) {
      const lastMemory = memoryList[memoryList.length - 1];
      setDisplay(lastMemory.value.toString());
      setOnResult(true);
    }
  };

  // Memory Add
  const handleMPlus = () => {
    const current = parseFloat(display);
    if (memoryList.length > 0) {
      const updatedList = [...memoryList];
      updatedList[updatedList.length - 1].value += current;
      setMemoryList(updatedList);
    } else {
      setMemoryList([{ value: current, operation: "Stored" }]);
      setHasMemory(true);
    }
  };

  // Memory Subtract
  const handleMMinus = () => {
    const current = parseFloat(display);
    if (memoryList.length > 0) {
      const updatedList = [...memoryList];
      updatedList[updatedList.length - 1].value -= current;
      setMemoryList(updatedList);
    } else {
      setMemoryList([{ value: -current, operation: "Stored" }]);
      setHasMemory(true);
    }
  };

  // Memory Store
  const handleMS = () => {
    const current = parseFloat(display);
    setMemoryList([...memoryList, { value: current, operation: "Stored" }]);
    setHasMemory(true);
  };

  // Clear specific memory item
  const clearMemoryItem = (index) => {
    const updatedList = memoryList.filter((_, i) => i !== index);
    setMemoryList(updatedList);
    if (updatedList.length === 0) {
      setHasMemory(false);
    }
  };

  // Memory Add to specific item
  const memoryAddToItem = (index) => {
    const current = parseFloat(display);
    const updatedList = [...memoryList];
    updatedList[index].value += current;
    setMemoryList(updatedList);
  };

  // Memory Subtract from specific item
  const memorySubtractFromItem = (index) => {
    const current = parseFloat(display);
    const updatedList = [...memoryList];
    updatedList[index].value -= current;
    setMemoryList(updatedList);
  };

  return {
    display,
    expression: calculScreen, // Use calculScreen as expression for display
    history,
    setHistory,
    memoryList,
    hasMemory,
    handleNumber,
    handleDecimal,
    handleOperator,
    calculate,
    handleCE,
    handleClear,
    handleBackspace,
    handlePercent,
    handleReciprocal,
    handleSquare,
    handleSquareRoot,
    handleNegate,
    handleMC,
    handleMR,
    handleMPlus,
    handleMMinus,
    handleMS,
    clearMemoryItem,
    memoryAddToItem,
    memorySubtractFromItem,
  };
}

export default useCalculator;
