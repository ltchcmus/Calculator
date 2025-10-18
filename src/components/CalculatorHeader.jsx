import { List, SquareArrowOutUpRight } from 'lucide-react';

function CalculatorHeader({ showHistory, setShowHistory, showMemory, setShowMemory }) {
  return (
    <header className="h-[48px] flex items-center px-4">
      {/* Phần header chuẩn */}
      <div className="flex-1 flex items-center gap-3">
        <button className="p-1 hover:bg-gray-200 rounded">
          <List size={20} />
        </button>
        <span className="text-xl font-semibold">Chuẩn</span>
        <button className="p-1 hover:bg-gray-200 rounded">
          <SquareArrowOutUpRight size={18} />
        </button>
      </div>

      {/* Phần header lịch sử bộ nhớ */}
      <div className="w-[400px] flex items-center px-4 gap-6">
        <button
          onClick={() => {
            setShowHistory(!showHistory);
            setShowMemory(false);
          }}
          className={`text-sm font-normal hover:text-gray-500 active:text-gray-800 px-3 py-1 rounded ${
            showHistory ? 'bg-gray-200' : ''
          }`}
        >
          Lịch sử
        </button>
        <button
          onClick={() => {
            setShowMemory(!showMemory);
            setShowHistory(false);
          }}
          className={`text-sm font-normal hover:text-gray-500 active:text-gray-800 px-3 py-1 rounded ${
            showMemory ? 'bg-gray-200' : ''
          }`}
        >
          Bộ nhớ
        </button>
      </div>
    </header>
  );
}

export default CalculatorHeader;
