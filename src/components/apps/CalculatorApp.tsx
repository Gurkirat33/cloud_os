"use client";

import { useState, useCallback } from "react";
import { Calculator, Delete } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

export default function CalculatorApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForOperand) {
        setDisplay(num);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? num : display + num);
      }
    },
    [display, waitingForOperand]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  const performOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(display);

      if (previousValue !== null && operation && !waitingForOperand) {
        const currentValue = previousValue;
        let result = currentValue;

        switch (operation) {
          case "+":
            result = currentValue + inputValue;
            break;
          case "-":
            result = currentValue - inputValue;
            break;
          case "×":
            result = currentValue * inputValue;
            break;
          case "÷":
            result = inputValue !== 0 ? currentValue / inputValue : 0;
            break;
        }

        setDisplay(String(result));
        setPreviousValue(result);
      } else {
        setPreviousValue(inputValue);
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation, waitingForOperand]
  );

  const calculate = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let result = previousValue;

      switch (operation) {
        case "+":
          result = previousValue + inputValue;
          break;
        case "-":
          result = previousValue - inputValue;
          break;
        case "×":
          result = previousValue * inputValue;
          break;
        case "÷":
          result = inputValue !== 0 ? previousValue / inputValue : 0;
          break;
      }

      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const percentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  const toggleSign = useCallback(() => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
    }
  }, [display]);

  const Button = ({
    onClick,
    className = "",
    children,
    variant = "default",
  }: {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    variant?: "default" | "operator" | "special" | "equals";
  }) => {
    const baseClasses =
      "h-14 text-lg font-semibold rounded-lg transition-all duration-150 active:scale-95 hover:shadow-md flex items-center justify-center";
    const variants = {
      default:
        "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
      operator: "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
      special: "bg-gray-300 hover:bg-gray-400 text-gray-800",
      equals: "bg-green-500 hover:bg-green-600 text-white shadow-md",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <WindowContainer
      title="Calculator"
      icon={<Calculator className="w-4 h-4 text-blue-600" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={320}
      defaultHeight={480}
      minWidth={300}
      minHeight={400}
    >
      <div className="p-4 bg-gray-50 h-full flex flex-col">
        {/* Display */}
        <div className="bg-black text-white p-4 mb-4 rounded-lg shadow-inner">
          <div className="text-xs text-gray-400 mb-1 h-4">
            {previousValue !== null &&
              operation &&
              `${previousValue} ${operation}`}
          </div>
          <div className="text-3xl text-right font-mono leading-tight overflow-hidden break-all">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 flex-1">
          {/* Row 1 */}
          <Button onClick={clear} variant="special">
            AC
          </Button>
          <Button onClick={toggleSign} variant="special">
            ±
          </Button>
          <Button onClick={percentage} variant="special">
            %
          </Button>
          <Button onClick={() => performOperation("÷")} variant="operator">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber("7")}>7</Button>
          <Button onClick={() => inputNumber("8")}>8</Button>
          <Button onClick={() => inputNumber("9")}>9</Button>
          <Button onClick={() => performOperation("×")} variant="operator">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber("4")}>4</Button>
          <Button onClick={() => inputNumber("5")}>5</Button>
          <Button onClick={() => inputNumber("6")}>6</Button>
          <Button onClick={() => performOperation("-")} variant="operator">
            -
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber("1")}>1</Button>
          <Button onClick={() => inputNumber("2")}>2</Button>
          <Button onClick={() => inputNumber("3")}>3</Button>
          <Button onClick={() => performOperation("+")} variant="operator">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber("0")} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={calculate} variant="equals">
            =
          </Button>
        </div>

        {/* Additional Functions Row */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          <Button onClick={backspace} variant="special">
            <Delete className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => {
              const value = Math.sqrt(parseFloat(display));
              setDisplay(String(isNaN(value) ? "Error" : value));
              setWaitingForOperand(true);
            }}
            variant="special"
          >
            √
          </Button>
          <Button
            onClick={() => {
              const value = Math.pow(parseFloat(display), 2);
              setDisplay(String(value));
              setWaitingForOperand(true);
            }}
            variant="special"
          >
            x²
          </Button>
          <Button
            onClick={() => {
              const value = 1 / parseFloat(display);
              setDisplay(String(parseFloat(display) !== 0 ? value : "Error"));
              setWaitingForOperand(true);
            }}
            variant="special"
          >
            1/x
          </Button>
        </div>
      </div>
    </WindowContainer>
  );
}
