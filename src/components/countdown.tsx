'use client';

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CountdownProps {
  targetIsoDate: string; // Expect an ISO date string
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetIsoDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [eventHasStarted, setEventHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!targetIsoDate) {
      setEventHasStarted(true);
      setIsLoading(false);
      return;
    }

    const targetTime = new Date(targetIsoDate).getTime();

    if (isNaN(targetTime)) {
      console.error("Invalid target date provided:", targetIsoDate);
      setEventHasStarted(true);
      setIsLoading(false);
      return;
    }

    const calculate = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft(null);
        setEventHasStarted(true);
        if (onComplete) onComplete();
        clearInterval(interval);
        return;
      }
      
      setEventHasStarted(false);
      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
      });
      setIsLoading(false);
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDate, onComplete]);

  if (isLoading) {
    return <div className="text-center text-xs text-muted-foreground py-3">Loading...</div>;
  }

  if (eventHasStarted || !timeLeft) {
    return <div className="text-center text-base font-semibold text-primary py-3">Event has started!</div>;
  }

  return (
    <div className="flex space-x-3 sm:space-x-4 justify-center text-white w-[60%] mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          {/* Further reduced font size for digits */}
          <div className="flex space-x-px sm:space-x-0.5 text-lg sm:text-xl md:text-2xl font-bold">
            {value.split("").map((char, index) => (
              <div 
                key={index} 
                // Changed to black background, white text, no border, and smaller size including height
                className="flex items-center justify-center w-5 h-6 sm:w-6 sm:h-8 md:w-7 md:h-10 bg-black rounded-md shadow-inner"
              >
                {char}
              </div>
            ))}
          </div>
          {/* Slightly reduced top margin for labels */}
          <div className="mt-1 text-xs uppercase text-muted-foreground">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
