function Display({ expression, display, hasMemory, handleMC, handleMR, handleMPlus, handleMMinus, handleMS }) {
  return (
    <div className="h-[280px] sm:h-[320px] flex flex-col justify-end pb-2">
      <div
        className="h-[50px] sm:h-[70px] text-right text-gray-600 px-2 flex items-center justify-end font-light overflow-hidden"
        style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}
      >
        {expression}
      </div>
      <div
        className="h-[90px] sm:h-[130px] text-right font-bold px-2 flex items-center justify-end overflow-hidden"
        style={{ fontSize: 'clamp(36px, 10vw, 56px)' }}
      >
        {display}
      </div>

      {/* Memory buttons - responsive với gap và padding nhỏ hơn trên mobile */}
      <div className="h-[50px] flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 px-1 sm:px-2 overflow-x-auto">
        <button
          onClick={handleMC}
          disabled={!hasMemory}
          className={`px-2 sm:px-5 py-2 rounded whitespace-nowrap ${
            !hasMemory ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
          }`}
        >
          MC
        </button>
        <button
          onClick={handleMR}
          disabled={!hasMemory}
          className={`px-2 sm:px-5 py-2 rounded whitespace-nowrap ${
            !hasMemory ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
          }`}
        >
          MR
        </button>
        <button onClick={handleMPlus} className="px-2 sm:px-5 py-2 rounded hover:bg-gray-200 cursor-pointer whitespace-nowrap">
          M+
        </button>
        <button onClick={handleMMinus} className="px-2 sm:px-5 py-2 rounded hover:bg-gray-200 cursor-pointer whitespace-nowrap">
          M−
        </button>
        <button onClick={handleMS} className="px-2 sm:px-5 py-2 rounded hover:bg-gray-200 cursor-pointer whitespace-nowrap">
          MS
        </button>
        {hasMemory && <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-semibold whitespace-nowrap">M</span>}
      </div>
    </div>
  );
}

export default Display;
