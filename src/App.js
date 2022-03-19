import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let storage;
  if (localStorage.getItem("calculation")) {
    storage = JSON.parse(localStorage.calculation);
  }

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [mobile, setMobile] = useState(true);
  const [memory, setMemory] = useState(false);
  const [history, setHistory] = useState("");
  const [histories, setHistories] = useState(storage ?? []);

  const resize = () => {
    if (window.innerWidth <= 950) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  const toggle = () => {
    setMemory(!memory);
  };
  window.addEventListener("resize", resize);
  useEffect(() => {
    resize();
  }, []);

  const ops = ["/", "+", "-", "*", "%", "."];
  const updateCalc = (value) => {
    if (
      (ops.includes(value) && ops.includes(calc.slice(-1))) ||
      (ops.includes(value) && calc.length === 0)
    ) {
      return;
    }
    setCalc(calc + value);
  };
  // calculation

  const calculate = () => {
    setResult(eval(calc).toString());

    // save to local storage

    setCalc((prev) => {
      const pastCalc = [...prev, "=", eval(calc).toString()];

      setHistory(pastCalc);
      setHistories((prev) => [...prev, history]);

      const jsonPast = JSON.stringify(histories);
      localStorage.setItem("calculation", jsonPast);

      return [eval(calc).toString()];
    });
  };

  const deleteItem = () => {
    setCalc("");
  };

  let operators = [
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
  ];

  return (
    <div className="App">
      <button className="memory" onClick={() => toggle()}>
        M
      </button>
      <div className={memory ? "memory-show" : "memory-hide"}>
        {histories?.map((item) => <li key={item}>{item}</li>) || (
          <span> No history just yet</span>
        )}
      </div>
      <div className={mobile ? "container" : "desktop-container"}>
        <div className={mobile ? "hidden" : "left-wrapper"}>
          <div className="empty"></div>
          {operators.map((item, index) => (
            <div className="btn" key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className={mobile ? "wrapper" : "right-wrapper"}>
          <div className="output"> {calc || "0"}</div>
          <div className="btn grey" onClick={() => deleteItem()}>
            C
          </div>
          <div className="btn grey" onClick={() => updateCalc("+")}>
            +/-
          </div>
          <div className="btn grey" onClick={() => updateCalc("/100")}>
            %
          </div>
          <div className="btn orange" onClick={() => updateCalc("/")}>
            /
          </div>
          <div className="btn" onClick={() => updateCalc("7")}>
            7
          </div>
          <div className="btn" onClick={() => updateCalc("8")}>
            8
          </div>
          <div className="btn" onClick={() => updateCalc("9")}>
            9
          </div>
          <div className="btn orange" onClick={() => updateCalc("*")}>
            x
          </div>
          <div className="btn" onClick={() => updateCalc("4")}>
            4
          </div>
          <div className="btn" onClick={() => updateCalc("5")}>
            5
          </div>
          <div className="btn" onClick={() => updateCalc("6")}>
            6
          </div>
          <div className="btn orange" onClick={() => updateCalc("-")}>
            -
          </div>
          <div className="btn" onClick={() => updateCalc("1")}>
            1
          </div>
          <div className="btn" onClick={() => updateCalc("2")}>
            2
          </div>
          <div className="btn" onClick={() => updateCalc("3")}>
            3
          </div>
          <div className="btn orange" onClick={() => updateCalc("+")}>
            +
          </div>
          <div className="btn expand" onClick={() => updateCalc("0")}>
            0
          </div>
          <div className="btn orange" onClick={() => updateCalc(".")}>
            .
          </div>
          <div className="btn orange" onClick={() => calculate()}>
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
