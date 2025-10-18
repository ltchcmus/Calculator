import { X } from 'lucide-react';
import { useEffect } from 'react';
import HistoryPanel from './HistoryPanel';

function MobileHistoryDrawer({ isOpen, onClose, history, setHistory }) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with backdrop blur - không đen, chỉ mờ background */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40 lg:hidden animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer with slide-up animation */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden"
        style={{ 
          maxHeight: '70vh',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)'
        }}
      >
        {/* Drag handle indicator */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Lịch sử</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content with proper height */}
        <div className="relative overflow-hidden" style={{ height: 'calc(70vh - 80px)' }}>
          <HistoryPanel history={history} setHistory={setHistory} />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

export default MobileHistoryDrawer;
