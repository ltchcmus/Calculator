import { useState } from "react";

function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const [currentOperand, setCurrentOperand] = useState("");
  const [operator, setOperator] = useState(null);
  const [previousOperand, setPreviousOperand] = useState("");
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [memoryList, setMemoryList] = useState([]);
  const [hasMemory, setHasMemory] = useState(false);

  // Xử lý số
  const handleNumber = (num) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setCurrentOperand(num);
      setShouldResetDisplay(false);
    } else {
      const newDisplay = display === "0" ? num : display + num;
      setDisplay(newDisplay);
      setCurrentOperand(newDisplay);
    }
  };

  // Xử lý thập phân
  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay("0.");
      setCurrentOperand("0.");
      setShouldResetDisplay(false);
    } else if (!display.includes(".")) {
      const newDisplay = display + ".";
      setDisplay(newDisplay);
      setCurrentOperand(newDisplay);
    }
  };

  // Xử lý phép toán
  const handleOperator = (op) => {
    if (currentOperand === "" && previousOperand === "") return;

    if (previousOperand !== "" && currentOperand !== "" && operator) {
      calculate();
    }

    setOperator(op);
    setPreviousOperand(currentOperand || display);
    setExpression(`${currentOperand || display} ${op}`);
    setShouldResetDisplay(true);
  };

  // Tính toán
  const calculate = () => {
    if (operator === null || previousOperand === "") return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand || display);
    let result = 0;

    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "−":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          setDisplay("Không thể chia cho 0");
          setExpression("");
          setOperator(null);
          setPreviousOperand("");
          setCurrentOperand("");
          setShouldResetDisplay(true);
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    const fullExpression = `${previousOperand} ${operator} ${
      currentOperand || display
    }`;
    setHistory([
      { expression: fullExpression, result: result.toString() },
      ...history,
    ]);

    setDisplay(result.toString());
    setExpression("");
    setOperator(null);
    setPreviousOperand("");
    setCurrentOperand(result.toString());
    setShouldResetDisplay(true);
  };

  // Clear Entry (CE)
  const handleCE = () => {
    setDisplay("0");
    setCurrentOperand("");
  };

  // Clear (C)
  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setOperator(null);
    setPreviousOperand("");
    setCurrentOperand("");
    setShouldResetDisplay(false);
  };

  // Backspace
  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("0");
      setCurrentOperand("0");
    } else {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setCurrentOperand(newDisplay);
    }
  };

  // Phần trăm
  const handlePercent = () => {
    const current = parseFloat(display);
    const result = current / 100;
    setDisplay(result.toString());
    setCurrentOperand(result.toString());
  };

  // Nghịch đảo
  const handleReciprocal = () => {
    const current = parseFloat(display);
    if (current === 0) {
      setDisplay("Không thể chia cho 0");
      setShouldResetDisplay(true);
      return;
    }
    const result = 1 / current;
    setDisplay(result.toString());
    setCurrentOperand(result.toString());
  };

  // Bình phương
  const handleSquare = () => {
    const current = parseFloat(display);
    const result = current * current;
    setDisplay(result.toString());
    setCurrentOperand(result.toString());
  };

  // Căn bậc hai
  const handleSquareRoot = () => {
    const current = parseFloat(display);
    if (current < 0) {
      setDisplay("Đầu vào không hợp lệ");
      setShouldResetDisplay(true);
      return;
    }
    const result = Math.sqrt(current);
    setDisplay(result.toString());
    setCurrentOperand(result.toString());
  };

  // Đổi dấu
  const handleNegate = () => {
    const current = parseFloat(display);
    const result = current * -1;
    setDisplay(result.toString());
    setCurrentOperand(result.toString());
  };

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
      setCurrentOperand(lastMemory.value.toString());
      setShouldResetDisplay(true);
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
    expression,
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
