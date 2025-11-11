import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Switched to class property for state initialization.
  // This resolves errors where `this.state` and `this.props` were not being recognized.
  // This is a common and robust pattern for React class components with TypeScript.
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="m-auto text-center text-red-400 p-6 bg-red-900/50 rounded-lg border border-red-700">
          <h1 className="font-bold text-xl mb-2">Something went wrong.</h1>
          <p className="text-red-300">The application failed to render correctly.</p>
          {this.state.error && (
            <pre className="mt-4 p-3 bg-gray-900 rounded-md text-left text-sm text-red-200 whitespace-pre-wrap overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
