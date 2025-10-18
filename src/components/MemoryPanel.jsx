import { Trash2 } from 'lucide-react';

function MemoryPanel({
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
    <div className="h-full flex flex-col relative">
      {/* Content area with scroll */}
      <div className="flex-1 overflow-auto p-4">
        {!hasMemory || memoryList.length === 0 ? (
          <p className="text-gray-500 text-sm font-semibold">
            Không có nội dung nào được lưu trong bộ nhớ.
          </p>
        ) : (
          <div className="space-y-2 pb-20">
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

      {/* Trash icon - absolutely positioned relative to panel, not content */}
      {memoryList.length > 0 && (
        <div className="absolute bottom-4 right-4 z-20">
          <button 
            onClick={handleMC} 
            className="p-3 bg-white hover:bg-gray-200 rounded-full transition-colors shadow-lg border border-gray-200"
          >
            <Trash2 size={24} className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      )}
    </div>
  );
}

export default MemoryPanel;
