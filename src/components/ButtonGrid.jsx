import { Delete } from 'lucide-react';

function ButtonGrid({
  handlePercent,
  handleCE,
  handleClear,
  handleBackspace,
  handleReciprocal,
  handleSquare,
  handleSquareRoot,
  handleOperator,
  handleNumber,
  handleNegate,
  handleDecimal,
  calculate,
}) {
  return (
    <div className="flex-1 grid grid-cols-4 gap-2 pb-4">
      {/* Row 1 */}
      <button
        onClick={handlePercent}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-2xl font-medium"
      >
        %
      </button>
      <button
        onClick={handleCE}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium"
      >
        CE
      </button>
      <button
        onClick={handleClear}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium"
      >
        C
      </button>
      <button
        onClick={handleBackspace}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl flex items-center justify-center"
      >
        <Delete size={24} />
      </button>

      {/* Row 2 */}
      <button
        onClick={handleReciprocal}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium"
      >
        <span className="text-lg">1/x</span>
      </button>
      <button
        onClick={handleSquare}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium"
      >
        <span className="text-lg">x²</span>
      </button>
      <button
        onClick={handleSquareRoot}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-xl font-medium"
      >
        <span className="text-lg">²√x</span>
      </button>
      <button
        onClick={() => handleOperator('÷')}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium"
      >
        ÷
      </button>

      {/* Row 3 */}
      <button
        onClick={() => handleNumber('7')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        7
      </button>
      <button
        onClick={() => handleNumber('8')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        8
      </button>
      <button
        onClick={() => handleNumber('9')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        9
      </button>
      <button
        onClick={() => handleOperator('×')}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium"
      >
        ×
      </button>

      {/* Row 4 */}
      <button
        onClick={() => handleNumber('4')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        4
      </button>
      <button
        onClick={() => handleNumber('5')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        5
      </button>
      <button
        onClick={() => handleNumber('6')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        6
      </button>
      <button
        onClick={() => handleOperator('−')}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium"
      >
        −
      </button>

      {/* Row 5 */}
      <button
        onClick={() => handleNumber('1')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        1
      </button>
      <button
        onClick={() => handleNumber('2')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        2
      </button>
      <button
        onClick={() => handleNumber('3')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        3
      </button>
      <button
        onClick={() => handleOperator('+')}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-3xl font-medium"
      >
        +
      </button>

      {/* Row 6 */}
      <button
        onClick={handleNegate}
        className="bg-[#f9f9f9] hover:bg-gray-200 border border-gray-300 rounded text-2xl font-medium"
      >
        +/−
      </button>
      <button
        onClick={() => handleNumber('0')}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        0
      </button>
      <button
        onClick={handleDecimal}
        className="bg-white hover:bg-gray-100 border border-gray-300 rounded text-3xl font-semibold"
      >
        .
      </button>
      <button
        onClick={calculate}
        className="bg-[#0078d4] hover:bg-[#106ebe] text-white rounded text-3xl font-semibold"
      >
        =
      </button>
    </div>
  );
}

export default ButtonGrid;
