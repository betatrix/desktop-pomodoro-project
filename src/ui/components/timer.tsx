import { useEffect, useState } from "react";

type TimerProps = {
    initialTime: number;
    isRunning: boolean;
    setIsRunning: (value: boolean) => void;
  };
  
  const Timer = ({ initialTime, isRunning, setIsRunning }: TimerProps) => {
    const [time, setTime] = useState(initialTime * 60);

    useEffect(() => {
        setTime(initialTime * 60);
    }, [initialTime]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if(isRunning) {
            interval = setInterval(() => {
                setTime((t) => (t > 0 ? t - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const secondsFormated = String(seconds % 60).padStart(2, '0');
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');

        return `Tempo = ${minutes}:${secondsFormated}`;
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    return (
        <>
            <h2>{formatTime(time)}</h2>
            <button onClick={toggleTimer}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </>
    );
};

export default Timer;