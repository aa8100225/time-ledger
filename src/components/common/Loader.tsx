import React, { useState, useEffect } from "react";

const Loader = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotPhases = ["・", "・・", "・・・", "・・", "・"];
    let index = 0;

    const interval = setInterval(() => {
      setDots(dotPhases[index]);
      index = (index + 1) % dotPhases.length;
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="to-white-50 flex min-h-screen items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-50 to-white">
      <p className="animate-text-pulse text-2xl font-bold">Loading{dots}</p>
    </div>
  );
};

export default Loader;
