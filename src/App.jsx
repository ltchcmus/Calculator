import {Calculator, List, SquareArrowOutUpRight, Delete, Trash2} from 'lucide-react'
import {useState} from "react"
import Button from "@mui/material/Button"


function App() {

  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [currentOperand, setCurrentOperand] = useState("");
  const [operator, setOperator] = useState(null);
  const [previousOperand, setPreviousOperand] = useState("");
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [memoryList, setMemoryList] = useState([]);
  const [hoveredMemoryIndex, setHoveredMemoryIndex] = useState(null);
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

    const fullExpression = `${previousOperand} ${operator} ${currentOperand || display}`;
    setHistory([{ expression: fullExpression, result: result.toString() }, ...history]);
    
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
      setMemoryList([{ value: current, operation: 'Stored' }]);
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
      setMemoryList([{ value: -current, operation: 'Stored' }]);
      setHasMemory(true);
    }
  };

  // Memory Store
  const handleMS = () => {
    const current = parseFloat(display);
    // MS có thể lưu nhiều giá trị
    setMemoryList([...memoryList, { value: current, operation: 'Stored' }]);
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

  return (
      <>
      <header className = "h-[40px] px-4">
        <div className = "flex w-full h-full items-center relative">
          <Calculator size={20} />
          <h3 className="ml-2 text-sm font-medium">Calculator</h3>
        </div>
      </header>
      <main className = "flex h-[calc(100vh-40px)] flex-col bg-[#f3f3f3]">
        <header className = "h-[48px] flex items-center px-4">

          {/* Phần header chuẩn */}
          <div className = "flex-1 flex items-center gap-3">
            <button className="p-1 hover:bg-gray-200 rounded">
              <List size={20} />
            </button>
            <span className = "text-xl font-semibold">Chuẩn</span>
            <button className="p-1 hover:bg-gray-200 rounded">
              <SquareArrowOutUpRight size={18} />
            </button>
          </div>

          {/* Phần header lịch sử bộ nhớ */}
          <div className = "w-[400px] flex items-center px-4 gap-6">
            <button 
              onClick={() => { setShowHistory(!showHistory); setShowMemory(false); }}
              className = {`text-sm font-normal hover:text-gray-500 active:text-gray-800 px-3 py-1 rounded ${showHistory ? 'bg-gray-200' : ''}`}
            >
              Lịch sử
            </button>
            <button 
              onClick={() => { setShowMemory(!showMemory); setShowHistory(false); }}
              className = {`text-sm font-normal hover:text-gray-500 active:text-gray-800 px-3 py-1 rounded ${showMemory ? 'bg-gray-200' : ''}`}
            >
              Bộ nhớ
            </button>
          </div>
        </header>


        <div className = "flex-1 flex gap-0">

            <div className = "h-full w-[calc(100%-400px)] flex flex-col gap-0 px-4">
              {/* Display Area */}
              <div className = "h-[320px] flex flex-col justify-end pb-2">
                <div className = "h-[70px] text-right text-gray-600 px-2 flex items-center justify-end font-light" style={{fontSize: '32px'}}>
                  {expression} 
                </div>
                <div className = "h-[130px] text-right font-bold px-2 flex items-center justify-end overflow-hidden" style={{fontSize: '56px'}}>
                  {display}
                </div>

                {/* Memory buttons */}
                <div className = "h-[50px] flex items-center gap-2 text-sm text-gray-600 px-2">
                  <button 
                    onClick={handleMC}
                    disabled={!hasMemory}
                    className={`px-5 py-2 rounded ${!hasMemory ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
                  >
                    MC
                  </button>
                  <button 
                    onClick={handleMR}
                    disabled={!hasMemory}
                    className={`px-5 py-2 rounded ${!hasMemory ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
                  >
                    MR
                  </button>
                  <button 
                    onClick={handleMPlus} 
                    className="px-5 py-2 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    M+
                  </button>
                  <button 
                    onClick={handleMMinus} 
                    className="px-5 py-2 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    M−
                  </button>
                  <button 
                    onClick={handleMS} 
                    className="px-5 py-2 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    MS
                  </button>
                  {hasMemory && (
                    <span className="ml-2 text-sm font-semibold">M</span>
                  )}
                </div>
               </div>

              {/* Calculator Buttons */}
              <div className = "flex-1 grid grid-cols-4 gap-2 pb-4">
                {/* Row 1 */}
                <button onClick={handlePercent} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-2xl font-medium">%</button>
                <button onClick={handleCE} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium">CE</button>
                <button onClick={handleClear} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium">C</button>
                <button onClick={handleBackspace} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl flex items-center justify-center">
                  <Delete size={24} />
                </button>

                {/* Row 2 */}
                <button onClick={handleReciprocal} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium">
                  <span className="text-lg">1/x</span>
                </button>
                <button onClick={handleSquare} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium">
                  <span className="text-lg">x²</span>
                </button>
                <button onClick={handleSquareRoot} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium">
                  <span className="text-lg">²√x</span>
                </button>
                <button onClick={() => handleOperator("÷")} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium">÷</button>

                {/* Row 3 */}
                <button onClick={() => handleNumber("7")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">7</button>
                <button onClick={() => handleNumber("8")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">8</button>
                <button onClick={() => handleNumber("9")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">9</button>
                <button onClick={() => handleOperator("×")} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium">×</button>

                {/* Row 4 */}
                <button onClick={() => handleNumber("4")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">4</button>
                <button onClick={() => handleNumber("5")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">5</button>
                <button onClick={() => handleNumber("6")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">6</button>
                <button onClick={() => handleOperator("−")} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium">−</button>

                {/* Row 5 */}
                <button onClick={() => handleNumber("1")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">1</button>
                <button onClick={() => handleNumber("2")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">2</button>
                <button onClick={() => handleNumber("3")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">3</button>
                <button onClick={() => handleOperator("+")} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium">+</button>

                {/* Row 6 */}
                <button onClick={handleNegate} className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-2xl font-medium">+/−</button>
                <button onClick={() => handleNumber("0")} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">0</button>
                <button onClick={handleDecimal} className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold">.</button>
                <button onClick={calculate} className="bg-[#0078d4] hover:bg-[#106ebe] text-white rounded text-3xl font-semibold">=</button>
              </div>

            </div>

            {/* Right Panel - History/Memory */}
            <div className = "w-[400px] relative flex flex-col"> 
              {showHistory && (
                <div className="p-4 flex-1 overflow-auto">
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-sm font-semibold">Chưa có lịch sử</p>
                  ) : (
                    <div className="space-y-2">
                      {history.map((item, index) => (
                        <div key={index} className="p-3 hover:bg-gray-200 rounded cursor-pointer">
                          <div className="text-sm text-gray-600 text-right">{item.expression}</div>
                          <div className="text-2xl font-bold text-right">{item.result}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {showMemory && (
                <div className="p-4 flex-1 overflow-auto">
                  {!hasMemory || memoryList.length === 0 ? (
                    <p className="text-gray-500 text-sm font-semibold">Không có nội dung nào được lưu trong bộ nhớ.</p>
                  ) : (
                    <div className="space-y-2">
                      {memoryList.map((item, index) => (
                        <div 
                          key={index} 
                          className={`cursor-pointer overflow-hidden transition-all duration-200 hover:bg-gray-200 ${
                            hoveredMemoryIndex === index ? 'h-[100px]' : 'h-[60px]'
                          }`}
                          onMouseEnter={() => setHoveredMemoryIndex(index)}
                          onMouseLeave={() => setHoveredMemoryIndex(null)}
                        >
                          {/* Số hiển thị - luôn ở top */}
                          <div className="h-[60px] flex items-start justify-end px-4 pt-3">
                            <div className="text-4xl font-bold">{item.value}</div>
                          </div>
                          
                          {/* Hover actions - chỉ hiện khi hover, nằm sát bên phải */}
                          {hoveredMemoryIndex === index && (
                            <div className="h-[40px] flex items-center justify-end gap-1 px-4">
                              <button 
                                onClick={() => clearMemoryItem(index)}
                                className="px-3 py-1 hover:bg-gray-200 bg-gray-50 border border-gray-300 rounded text-xs font-medium transition-colors"
                                title="Clear"
                              >
                                MC
                              </button>
                              <button 
                                onClick={() => memoryAddToItem(index)}
                                className="px-3 py-1 hover:bg-gray-200 bg-gray-50 rounded border border-gray-300 text-xs font-medium transition-colors"
                                title="Add"
                              >
                                M+
                              </button>
                              <button 
                                onClick={() => memorySubtractFromItem(index)}
                                className="px-3 py-1 hover:bg-gray-200 bg-gray-50 rounded border border-gray-300 text-xs font-medium transition-colors"
                                title="Subtract"
                              >
                                M−
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Trash icon at bottom right */}
              {showHistory && history.length > 0 && (
                <div className="absolute bottom-4 right-4">
                  <button 
                    onClick={() => setHistory([])}
                    className="p-3 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Trash2 size={24} className="text-gray-600 hover:text-gray-900" />
                  </button>
                </div>
              )}

              {showMemory && memoryList.length > 0 && (
                <div className="absolute bottom-4 right-4">
                  <button 
                    onClick={handleMC}
                    className="p-3 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Trash2 size={24} className="text-gray-600 hover:text-gray-900" />
                  </button>
                </div>
              )}

              {!showHistory && !showMemory && (
                <div className="p-4 h-full flex items-center justify-center">
                  <p className="text-center text-gray-500 text-sm">Chọn lịch sử hoặc bộ nhớ để xem</p>
                </div>
              )}



            </div>
           
    
        </div>

      </main>
    </>
  )
}

export default App
