import { useState } from "react";
import "./App.css";
import Timer from "./components/timer";
import Tasks from "./components/tasks";

function App() {
  const POMODORO_TIME = 25;
  const SHORT_BREAK = 5;
  const LONG_BREAK = 15;
  const CYCLES_BEFORE_LONG_BREAK = 5;

  const [initialTime, setInitialTime] = useState(POMODORO_TIME);
  const [mode, setMode] = useState<"pomodoro" | "shortbreak" | "longBreak">("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleNextClick = () => {
    setIsRunning(false);

    if (mode === "pomodoro") {
      if (pomodoroCount > 0 && pomodoroCount % CYCLES_BEFORE_LONG_BREAK === 0) {
        setMode("longBreak");
        setInitialTime(LONG_BREAK);
      } else {
        setMode("shortbreak");
        setInitialTime(SHORT_BREAK);
      }
    } else {
      setMode("pomodoro");
      setInitialTime(POMODORO_TIME);
      setPomodoroCount((prev) => prev + 1);
    }
  };

  const handleRestartClick = () => {
    setIsRunning(false);
    setPomodoroCount(0);
    setMode("pomodoro");
    setInitialTime(POMODORO_TIME);
  };

  return (
    <>
      <div className="card">
        <p>
          {mode === "pomodoro" && `Pomodoro Time #${pomodoroCount}`}
          {mode === "shortbreak" && `Short Break #${pomodoroCount}`}
          {mode === "longBreak" && `Long Break #${pomodoroCount}`}
        </p>
        <Timer initialTime={initialTime} isRunning={isRunning} setIsRunning={setIsRunning} />
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handleRestartClick}>Restart</button>
      </div>
      <div>
        <Tasks />
      </div>
    </>
  );
}

export default App;