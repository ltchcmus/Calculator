import { useState } from 'react';
import Header from './components/Header';
import CalculatorHeader from './components/CalculatorHeader';
import Display from './components/Display';
import ButtonGrid from './components/ButtonGrid';
import SidePanel from './components/SidePanel';
import useCalculator from './hooks/useCalculator';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [hoveredMemoryIndex, setHoveredMemoryIndex] = useState(null);

  const {
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
  } = useCalculator();

  return (
    <>
      <Header />
      
      <main className="flex h-[calc(100vh-40px)] flex-col bg-[#f3f3f3]">
        <CalculatorHeader
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          showMemory={showMemory}
          setShowMemory={setShowMemory}
        />

        <div className="flex-1 flex gap-0">
          {/* Calculator Main Area */}
          <div className="h-full w-[calc(100%-400px)] flex flex-col gap-0 px-4">
            <Display
              expression={expression}
              display={display}
              hasMemory={hasMemory}
              handleMC={handleMC}
              handleMR={handleMR}
              handleMPlus={handleMPlus}
              handleMMinus={handleMMinus}
              handleMS={handleMS}
            />

            <ButtonGrid
              handlePercent={handlePercent}
              handleCE={handleCE}
              handleClear={handleClear}
              handleBackspace={handleBackspace}
              handleReciprocal={handleReciprocal}
              handleSquare={handleSquare}
              handleSquareRoot={handleSquareRoot}
              handleOperator={handleOperator}
              handleNumber={handleNumber}
              handleNegate={handleNegate}
              handleDecimal={handleDecimal}
              calculate={calculate}
            />
          </div>

          {/* Side Panel */}
          <SidePanel
            showHistory={showHistory}
            showMemory={showMemory}
            history={history}
            setHistory={setHistory}
            hasMemory={hasMemory}
            memoryList={memoryList}
            hoveredMemoryIndex={hoveredMemoryIndex}
            setHoveredMemoryIndex={setHoveredMemoryIndex}
            clearMemoryItem={clearMemoryItem}
            memoryAddToItem={memoryAddToItem}
            memorySubtractFromItem={memorySubtractFromItem}
            handleMC={handleMC}
          />
        </div>
      </main>
    </>
  );
}

export default App;
