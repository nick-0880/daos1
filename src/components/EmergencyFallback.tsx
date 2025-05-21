import React, { useState } from 'react';
import PrivyProvider from './PrivyProvider';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

export default function EmergencyFallback() {
  const [errorLog, setErrorLog] = useState<string[]>([]);
  const [showMainApp, setShowMainApp] = useState(false);
  const [appError, setAppError] = useState<string | null>(null);

  React.useEffect(() => {
    // Capture console errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      setErrorLog(prev => [...prev, args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')].slice(-10)); // Keep last 10 errors
      originalConsoleError(...args);
    };

    // Set up window error handler
    const handleError = (event: ErrorEvent) => {
      setAppError(`${event.message} at ${event.filename}:${event.lineno}`);
      event.preventDefault();
    };
    window.addEventListener('error', handleError);

    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (showMainApp) {
    try {
      return (
        <div>
          <button 
            onClick={() => setShowMainApp(false)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 9999,
              padding: '10px',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Back to Emergency Screen
          </button>
          <PrivyProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <App />
            </BrowserRouter>
          </PrivyProvider>
        </div>
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setAppError(errorMessage);
      setShowMainApp(false);
    }
  }

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.5' 
    }}>
      <h1 style={{ color: '#8B5CF6' }}>Debugging Interface</h1>
      
      <div style={{ background: '#f8f8f8', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <p><strong>Application Status:</strong> Emergency fallback mode active.</p>
        <p>
          The main app with Privy is currently not showing. Click the button below to attempt loading the main app.
        </p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => setShowMainApp(true)} 
          style={{
            background: '#8B5CF6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Try Loading Main App
        </button>
      </div>

      <h2>Debugging Information</h2>
      <p>Current environment variables detected:</p>
      <pre style={{ 
        background: '#f1f1f1', 
        padding: '1rem', 
        borderRadius: '4px',
        overflowX: 'auto'
      }}>
{`BASE_URL: ${import.meta.env.BASE_URL || "not set"}
VITE_SUPABASE_URL: ${import.meta.env.VITE_SUPABASE_URL || "not set"}
VITE_PRIVY_APP_ID: ${import.meta.env.VITE_PRIVY_APP_ID || "not set"}`}
      </pre>

      {appError && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Last App Error</h2>
          <pre style={{ 
            background: '#fff0f0', 
            padding: '1rem', 
            borderRadius: '4px',
            overflowX: 'auto',
            color: '#c00',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            {appError}
          </pre>
        </div>
      )}

      {errorLog.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Recent Console Errors</h2>
          <pre style={{ 
            background: '#fff0f0', 
            padding: '1rem', 
            borderRadius: '4px',
            overflowX: 'auto',
            color: '#c00',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            {errorLog.join('\n\n')}
          </pre>
        </div>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Troubleshooting Steps</h2>
        <ol>
          <li>Check browser console for detailed JavaScript errors</li>
          <li>Try using the "Try Loading Main App" button above to see if the main app will load</li>
          <li>If you see specific errors, check if they relate to Privy configuration</li>
          <li>Ensure the environment variables are correctly set in your .env file</li>
        </ol>
      </div>
    </div>
  );
} 