import React, { useEffect } from 'react';

/**
 * Debug component to display when the app is successfully loaded
 * Only visible in development mode
 */
const DebugInfo: React.FC = () => {
  useEffect(() => {
    console.log("App is rendering");
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div 
      style={{ 
        padding: "20px", 
        background: "#111", 
        color: "lime", 
        position: "fixed", 
        bottom: 0, 
        right: 0, 
        zIndex: 9999,
        fontSize: '14px',
        borderRadius: '4px 0 0 0' 
      }}
    >
      App loaded successfully
    </div>
  );
};

export default DebugInfo; 