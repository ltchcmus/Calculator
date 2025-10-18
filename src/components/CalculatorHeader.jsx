import { List, SquareArrowOutUpRight, History } from 'lucide-react';

function CalculatorHeader({ 
  showHistory, 
  setShowHistory, 
  showMemory, 
  setShowMemory,
  onMobileHistoryClick 
}) {
  return (
    <header className="h-[48px] flex items-center px-4">
      {/* Phần header chuẩn */}
      <div className="flex-1 flex items-center gap-3">
        <button 
          className="p-1 hover:bg-gray-200 rounded"
          onClick={() => alert('Tính năng này chưa được hỗ trợ')}
        >
          <List size={20} />
        </button>
        <span className="text-xl font-semibold">Chuẩn</span>
        <button 
          className="p-1 hover:bg-gray-200 rounded"
          onClick={() => alert('Tính năng này chưa được hỗ trợ')}
        >
          <SquareArrowOutUpRight size={18} />
        </button>
      </div>

      {/* Mobile history icon - chỉ hiện trên mobile */}
      <button
        onClick={onMobileHistoryClick}
        className="lg:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
        title="Lịch sử"
      >
        <History size={20} />
      </button>

      {/* Phần header lịch sử bộ nhớ - ẩn trên mobile */}
      <div className="hidden lg:flex w-[400px] items-center px-4 gap-6">
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
