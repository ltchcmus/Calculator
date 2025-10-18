import { Trash2 } from 'lucide-react';

function HistoryPanel({ history, setHistory }) {
  return (
    <div className="h-full flex flex-col relative">
      {/* Content area with scroll */}
      <div className="flex-1 overflow-auto p-4">
        {history.length === 0 ? (
          <p className="text-gray-500 text-sm font-semibold">Chưa có lịch sử</p>
        ) : (
          <div className="space-y-2 pb-20">
            {history.map((item, index) => (
              <div key={index} className="p-3 hover:bg-gray-200 rounded cursor-pointer">
                <div className="text-sm text-gray-600 text-right">{item.expression}</div>
                <div className="text-2xl font-bold text-right">{item.result}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trash icon - absolutely positioned relative to panel, not content */}
      {history.length > 0 && (
        <div className="absolute bottom-4 right-4 z-20">
          <button
            onClick={() => setHistory([])}
            className="p-3 bg-white hover:bg-gray-200 rounded-full transition-colors shadow-lg border border-gray-200"
          >
            <Trash2 size={24} className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      )}
    </div>
  );
}

export default HistoryPanel;
