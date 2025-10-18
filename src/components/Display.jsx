function Display({ expression, display, hasMemory, handleMC, handleMR, handleMPlus, handleMMinus, handleMS }) {
  return (
    <div className="h-[320px] flex flex-col justify-end pb-2">
      <div
        className="h-[70px] text-right text-gray-600 px-2 flex items-center justify-end font-light"
        style={{ fontSize: '32px' }}
      >
        {expression}
      </div>
      <div
        className="h-[130px] text-right font-bold px-2 flex items-center justify-end overflow-hidden"
        style={{ fontSize: '56px' }}
      >
        {display}
      </div>

      {/* Memory buttons */}
      <div className="h-[50px] flex items-center gap-2 text-sm text-gray-600 px-2">
        <button
          onClick={handleMC}
          disabled={!hasMemory}
          className={`px-5 py-2 rounded ${
            !hasMemory ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
          }`}
        >
          MC
        </button>
        <button
          onClick={handleMR}
          disabled={!hasMemory}
          className={`px-5 py-2 rounded ${
            !hasMemory ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
          }`}
        >
          MR
        </button>
        <button onClick={handleMPlus} className="px-5 py-2 rounded hover:bg-gray-200 cursor-pointer">
          M+
        </button>
        <button onClick={handleMMinus} className="px-5 py-2 rounded hover:bg-gray-200 cursor-pointer">
          M−
        </button>
        <button onClick={handleMS} className="px-5 py-2 rounded hover:bg-gray-200 cursor-pointer">
          MS
        </button>
        {hasMemory && <span className="ml-2 text-sm font-semibold">M</span>}
      </div>
    </div>
  );
}

export default Display;
