import HistoryPanel from './HistoryPanel';
import MemoryPanel from './MemoryPanel';

function SidePanel({
  showHistory,
  showMemory,
  history,
  setHistory,
  hasMemory,
  memoryList,
  hoveredMemoryIndex,
  setHoveredMemoryIndex,
  clearMemoryItem,
  memoryAddToItem,
  memorySubtractFromItem,
  handleMC,
}) {
  return (
    <div className="w-[400px] relative flex flex-col">
      {showHistory && <HistoryPanel history={history} setHistory={setHistory} />}
      
      {showMemory && (
        <MemoryPanel
          hasMemory={hasMemory}
          memoryList={memoryList}
          hoveredMemoryIndex={hoveredMemoryIndex}
          setHoveredMemoryIndex={setHoveredMemoryIndex}
          clearMemoryItem={clearMemoryItem}
          memoryAddToItem={memoryAddToItem}
          memorySubtractFromItem={memorySubtractFromItem}
          handleMC={handleMC}
        />
      )}

      {!showHistory && !showMemory && (
        <div className="p-4 h-full flex items-center justify-center">
          <p className="text-center text-gray-500 text-sm">Chọn lịch sử hoặc bộ nhớ để xem</p>
        </div>
      )}
    </div>
  );
}

export default SidePanel;
