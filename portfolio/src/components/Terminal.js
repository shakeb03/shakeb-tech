import React, { useState, useEffect } from 'react';

const Terminal = ({ commands }) => {
  const [displayedCommands, setDisplayedCommands] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

    const currentCommand = commands[currentCommandIndex];
    
    if (currentCharIndex < currentCommand.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentCommand[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      // Command finished typing
      const timeout = setTimeout(() => {
        setDisplayedCommands((prev) => [...prev, currentCommand]);
        setCurrentText('');
        setCurrentCharIndex(0);
        setCurrentCommandIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentCommandIndex, commands]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800/50 border-b border-cyan-500/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-gray-400 ml-4">shakeb@terminal ~ %</div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm">
        {displayedCommands.map((cmd, index) => (
          <div key={index} className="mb-2">
            <span className="text-cyan-400">$ </span>
            <span className="text-green-400">{cmd}</span>
          </div>
        ))}
        {currentCommandIndex < commands.length && (
          <div className="mb-2">
            <span className="text-cyan-400">$ </span>
            <span className="text-green-400">
              {currentText}
              {showCursor && <span className="bg-green-400 text-gray-900">_</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;


