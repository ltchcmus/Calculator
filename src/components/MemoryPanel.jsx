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
    <>
      <div className="p-4 flex-1 overflow-auto">
        {!hasMemory || memoryList.length === 0 ? (
          <p className="text-gray-500 text-sm font-semibold">
            Không có nội dung nào được lưu trong bộ nhớ.
          </p>
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

      {/* Trash icon at bottom right */}
      {memoryList.length > 0 && (
        <div className="absolute bottom-4 right-4">
          <button onClick={handleMC} className="p-3 hover:bg-gray-200 rounded-full transition-colors">
            <Trash2 size={24} className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      )}
    </>
  );
}

export default MemoryPanel;
