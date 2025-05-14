"use client";

import { useState, useEffect } from "react";
import "./PromoCTA.css";

const PromoCTA = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [activeCode, setActiveCode] = useState("SAVE5");
  const [copied, setCopied] = useState(false);

  const promoCodes = [
    { code: "SAVE5", discount: "5% OFF", description: "On orders above $30" },
    {
      code: "DISCOUNT10",
      discount: "10% OFF",
      description: "On your first order",
    },
    {
      code: "FLASH20",
      discount: "20% OFF",
      description: "Limited time flash deal",
    },
  ];

  // Calculate time until midnight in Pakistan (UTC+5)
  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const pakistanTime = new Date(utc + 5 * 60 * 60 * 1000);

      const midnight = new Date(pakistanTime);
      midnight.setHours(24, 0, 0, 0);

      let diff = (midnight - pakistanTime) / 1000;

      const hours = Math.floor(diff / 3600);
      diff -= hours * 3600;
      const minutes = Math.floor(diff / 60);
      diff -= minutes * 60;
      const seconds = Math.floor(diff);

      return { hours, minutes, seconds };
    };

    // Update timer immediately
    setTimeLeft(calculateTimeUntilMidnight());

    // Update timer every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeUntilMidnight();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="promo-cta-2">
      <div className="promo-cta-2-container">
        <div className="promo-cta-2-header">
          <h2>Today's Special Offers</h2>
          <p>
            Use these exclusive promo codes to save on your favorite meals. New
            offers every day!
          </p>
        </div>

        <div className="countdown-timer">
          <div className="timer-label">Next Offers In:</div>
          <div className="timer-display">
            <div className="time-block">
              <div className="time-value">{formatTime(timeLeft.hours)}</div>
              <div className="time-label">Hours</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block">
              <div className="time-value">{formatTime(timeLeft.minutes)}</div>
              <div className="time-label">Minutes</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block">
              <div className="time-value">{formatTime(timeLeft.seconds)}</div>
              <div className="time-label">Seconds</div>
            </div>
          </div>
          <div className="timer-note">
            Timer resets at midnight Pakistan time
          </div>
        </div>

        <div className="promo-cards">
          {promoCodes.map((promo, index) => (
            <div
              key={index}
              className={`promo-card ${
                activeCode === promo.code ? "active" : ""
              }`}
              onClick={() => setActiveCode(promo.code)}
            >
              <div className="promo-card-discount">{promo.discount}</div>
              <div className="promo-card-code">{promo.code}</div>
              <div className="promo-card-description">{promo.description}</div>
            </div>
          ))}
        </div>

        <div className="promo-cta-2-action">
          <button
            className="copy-code-button"
            onClick={() => copyToClipboard(activeCode)}
          >
            {copied ? "Copied!" : `Copy ${activeCode}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCTA;
