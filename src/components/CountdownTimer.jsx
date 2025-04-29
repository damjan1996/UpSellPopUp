import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes = 5, onComplete }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        if (seconds <= 0) {
            if (onComplete) onComplete();
            return;
        }

        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds, onComplete]);

    const formatTime = () => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="countdown-timer">
            <div className="timer-display">{formatTime()}</div>
        </div>
    );
};

export default CountdownTimer;