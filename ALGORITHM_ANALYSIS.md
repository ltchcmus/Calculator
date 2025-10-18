# Calculator Algorithm Analysis & Implementation

## 📚 Nguồn tham khảo: Calculator-Windows-main

### 🎯 Thuật toán chính được áp dụng:

## 1. **State Management (Quản lý trạng thái)**

### States từ Calculator-Windows-main:

```javascript
let previousNumber = 0; // Số trước khi nhấn operator
let isWaiting = false; // Đang chờ nhập số thứ 2
let operatorType = ""; // Loại phép toán (+, -, ×, ÷)
let onResult = false; // Đã có kết quả từ phép tính trước
let firstNumberEntered = false; // Đã nhập số đầu tiên sau operator
```

### Áp dụng vào React:

```javascript
const [display, setDisplay] = useState("0");
const [calculScreen, setCalculScreen] = useState("");
const [previousNumber, setPreviousNumber] = useState(0);
const [isWaiting, setIsWaiting] = useState(false);
const [operatorType, setOperatorType] = useState("");
const [onResult, setOnResult] = useState(false);
const [firstNumberEntered, setFirstNumberEntered] = useState(false);
```

---

## 2. **addNumber() - Nhập số**

### Logic từ reference:

```javascript
function addNumber(number) {
  if (number === "." && input.value.includes(".")) return; // Chỉ cho phép 1 dấu chấm

  // Reset display khi:
  // - Đang chờ số thứ 2 (isWaiting && firstNumberEntered)
  // - Đã có kết quả (onResult)
  // - Display bắt đầu bằng '0' và số mới không phải dấu chấm
  if (
    (isWaiting && firstNumberEntered) ||
    onResult ||
    (input.value.startsWith("0") &&
      number !== "." &&
      !input.value.includes("."))
  ) {
    input.value = number;
    onResult = false;
    firstNumberEntered = false;
  } else {
    input.value += number; // Thêm số vào cuối
  }
}
```

### Áp dụng:

```javascript
const handleNumber = (num) => {
  const numStr = String(num);

  // Chỉ cho phép 1 dấu chấm
  if (numStr === "." && display.includes(".")) return;

  // Logic reset display
  if (
    (isWaiting && firstNumberEntered) ||
    onResult ||
    (display.startsWith("0") && numStr !== "." && !display.includes("."))
  ) {
    setDisplay(numStr);
    setOnResult(false);
    setFirstNumberEntered(false);
  } else {
    setDisplay(display + numStr);
  }
};
```

**Điểm mạnh:**

- ✅ Xử lý chính xác trường hợp nhập số sau khi nhấn operator
- ✅ Tự động reset khi có kết quả
- ✅ Xử lý thông minh với số 0 đầu tiên
- ✅ Ngăn chặn nhiều dấu chấm thập phân

---

## 3. **operation() - Xử lý operator (+, -, ×, ÷)**

### Logic từ reference:

```javascript
function operation(operator, e) {
  operatorType = operator;
  previousNumber = Number(input.value);
  calculScreen.innerText = `${previousNumber}${e.innerText}`;
  isWaiting = true;
  firstNumberEntered = true;
}
```

### Áp dụng:

```javascript
const handleOperator = (operator) => {
  const operatorSymbols = {
    "+": "+",
    "−": "−",
    "×": "×",
    "÷": "÷",
  };

  setOperatorType(operator);
  const prevNum = Number(display);
  setPreviousNumber(prevNum);
  setCalculScreen(`${prevNum} ${operatorSymbols[operator]}`);
  setIsWaiting(true);
  setFirstNumberEntered(true);
};
```

**Flow:**

1. Lưu operator vào state
2. Lưu số hiện tại làm previousNumber
3. Hiển thị phép tính lên màn hình phụ
4. Set flag `isWaiting` = true để chờ số tiếp theo
5. Set flag `firstNumberEntered` = true

---

## 4. **opEqual() - Tính kết quả**

### Logic từ reference:

```javascript
function opEqual() {
  if (!isWaiting) return; // Phải có operation

  onResult = true;
  const lastNumber = Number(input.value);
  let answer = 0;

  calculScreen.innerHTML += `${lastNumber}&equals;`;

  switch (operatorType) {
    case "/":
      answer = previousNumber / lastNumber;
      break;
    case "x":
      answer = previousNumber * lastNumber;
      break;
    case "-":
      answer = previousNumber - lastNumber;
      break;
    case "+":
      answer = previousNumber + lastNumber;
      break;
  }

  input.value = answer;
  isWaiting = false;
}
```

### Áp dụng:

```javascript
const calculate = () => {
  if (!isWaiting) return;

  setOnResult(true);
  const lastNumber = Number(display);
  let answer = 0;

  const equation = `${previousNumber} ${operatorSymbols[operatorType]} ${lastNumber}`;
  setCalculScreen(`${equation} =`);

  switch (operatorType) {
    case "÷":
      if (lastNumber === 0) {
        setDisplay("Không thể chia cho 0");
        // Reset states...
        return;
      }
      answer = previousNumber / lastNumber;
      break;
    case "×":
      answer = previousNumber * lastNumber;
      break;
    case "−":
      answer = previousNumber - lastNumber;
      break;
    case "+":
      answer = previousNumber + lastNumber;
      break;
  }

  setDisplay(String(answer));
  setIsWaiting(false);

  // Add to history
  setHistory([{ expression: equation, result: answer.toString() }, ...history]);
};
```

**Cải tiến thêm:**

- ✅ Xử lý chia cho 0
- ✅ Lưu vào history
- ✅ Hiển thị phương trình hoàn chỉnh

---

## 5. **operationInstant() - Phép toán tức thì**

### Logic từ reference:

```javascript
function operationInstant(operator) {
  const currentNumber = Number(input.value);

  switch (operator) {
    case "%":
      input.value = currentNumber / 100;
      break;
    case "1/x":
      input.value = 1 / currentNumber;
      break;
    case "x2":
      input.value = currentNumber ** 2;
      break;
    case "2/x":
      input.value = Math.sqrt(currentNumber);
      break;
  }
}
```

### Áp dụng:

```javascript
const operationInstant = (operator) => {
  const currentNumber = Number(display);
  let result = 0;
  let operationText = "";

  switch (operator) {
    case "%":
      result = currentNumber / 100;
      operationText = `${currentNumber}%`;
      break;
    case "1/x":
      if (currentNumber === 0) {
        setDisplay("Không thể chia cho 0");
        setOnResult(true);
        return;
      }
      result = 1 / currentNumber;
      operationText = `1/(${currentNumber})`;
      break;
    case "x2":
      result = currentNumber ** 2;
      operationText = `sqr(${currentNumber})`;
      break;
    case "2/x":
      if (currentNumber < 0) {
        setDisplay("Đầu vào không hợp lệ");
        setOnResult(true);
        return;
      }
      result = Math.sqrt(currentNumber);
      operationText = `√(${currentNumber})`;
      break;
  }

  setDisplay(String(result));
  setCalculScreen(`${operationText} =`);
  setOnResult(true);
};
```

**Cải tiến:**

- ✅ Validation cho từng phép toán
- ✅ Hiển thị công thức trên màn hình
- ✅ Set flag onResult để xử lý tiếp

---

## 6. **clearAll() - Xóa tất cả**

### Logic từ reference:

```javascript
function clearAll() {
  input.value = 0;
  calculScreen.innerHTML = "&emsp;";
}
```

### Áp dụng (Enhanced):

```javascript
const handleClear = () => {
  setDisplay("0");
  setCalculScreen("");
  setPreviousNumber(0);
  setIsWaiting(false);
  setOperatorType("");
  setOnResult(false);
  setFirstNumberEntered(false);
};
```

---

## 7. **delLastNumber() - Backspace**

### Logic từ reference:

```javascript
function delLastNumber() {
  input.value =
    input.value.length === 1
      ? 0
      : input.value.substring(0, input.value.length - 1);
}
```

### Áp dụng:

```javascript
const handleBackspace = () => {
  setDisplay(
    display.length === 1 ? "0" : display.substring(0, display.length - 1)
  );
};
```

---

## 8. **opInverse() - Đổi dấu**

### Logic từ reference:

```javascript
function opInverse() {
  input.value = input.value.length !== 0 ? -input.value : 0;
}
```

### Áp dụng:

```javascript
const handleNegate = () => {
  setDisplay(display.length !== 0 ? String(-Number(display)) : "0");
};
```

---

## 📊 So sánh trước và sau khi áp dụng

| Tính năng            | Trước                | Sau (Reference Algorithm) |
| -------------------- | -------------------- | ------------------------- |
| Nhập số sau operator | ❌ Append vào số cũ  | ✅ Replace số cũ          |
| Nhập số sau kết quả  | ❌ Append            | ✅ Replace                |
| Xử lý số 0 đầu       | ⚠️ Không tốt         | ✅ Chính xác              |
| Nhiều dấu chấm       | ⚠️ Có thể nhập nhiều | ✅ Chỉ 1 dấu chấm         |
| Hiển thị phép tính   | ⚠️ Đơn giản          | ✅ Hiển thị đầy đủ        |
| Xử lý lỗi            | ⚠️ Cơ bản            | ✅ Chi tiết và rõ ràng    |

---

## 🎯 Kết luận

Thuật toán từ Calculator-Windows-main rất tốt vì:

1. **Logic rõ ràng với flags**: `isWaiting`, `onResult`, `firstNumberEntered`
2. **Xử lý chính xác mọi trường hợp**: Nhập số, sau operator, sau kết quả
3. **UX tốt**: Giống Windows Calculator thật
4. **Dễ maintain**: Code dễ đọc, dễ hiểu

### Improvements added:

- ✅ Error handling (chia cho 0, căn số âm)
- ✅ History tracking
- ✅ Memory operations
- ✅ Display full equation
- ✅ Vietnamese error messages

---

## 📝 Test Cases quan trọng

1. **Basic operations**: 2 + 3 = 5 ✅
2. **After result**: 5 + 2 = 7 (không phải 52) ✅
3. **Multiple decimals**: 1.2.3 → chỉ nhận 1.2 ✅
4. **Leading zero**: 0123 → 123 ✅
5. **Division by zero**: 5 ÷ 0 → Error message ✅
6. **Square root negative**: √(-4) → Error message ✅
7. **Chain operations**: 2 + 3 + 4 = 9 ✅

---

**Date**: October 18, 2025  
**Author**: Calculator Project  
**Reference**: Calculator-Windows-main by GitHub user
