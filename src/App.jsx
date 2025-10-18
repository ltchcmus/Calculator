import { useState } from 'react';
import Header from './components/Header';
import CalculatorHeader from './components/CalculatorHeader';
import Display from './components/Display';
import ButtonGrid from './components/ButtonGrid';
import SidePanel from './components/SidePanel';
import MobileHistoryDrawer from './components/MobileHistoryDrawer';
import useCalculator from './hooks/useCalculator';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [hoveredMemoryIndex, setHoveredMemoryIndex] = useState(null);
  const [showMobileHistory, setShowMobileHistory] = useState(false);

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
      {/* Set min-width and min-height for the entire app */}
      <div className="min-w-[320px] min-h-[500px]">
        <Header />
        
        <main className="flex h-[calc(100vh-40px)] flex-col bg-[#f3f3f3]">
          <CalculatorHeader
            showHistory={showHistory}
            setShowHistory={setShowHistory}
            showMemory={showMemory}
            setShowMemory={setShowMemory}
            onMobileHistoryClick={() => setShowMobileHistory(true)}
          />

          <div className="flex-1 flex gap-0 overflow-hidden">
            {/* Calculator Main Area - full width on mobile, partial on desktop */}
            <div className="h-full w-full lg:w-[calc(100%-400px)] flex flex-col gap-0 px-4">
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

            {/* Side Panel - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block h-full">
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
          </div>
        </main>

        {/* Mobile History Drawer - chỉ hiện trên mobile */}
        <MobileHistoryDrawer
          isOpen={showMobileHistory}
          onClose={() => setShowMobileHistory(false)}
          history={history}
          setHistory={setHistory}
        />
      </div>
    </>
  );
}

export default App;
