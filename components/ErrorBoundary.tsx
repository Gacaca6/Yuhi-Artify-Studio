import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced class property state initialization with initialization in the constructor. This standard React pattern is more robust across different build toolchains and can resolve obscure typing errors related to `this.props`.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // FIX: Removed `public` access modifier.
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  // FIX: Removed `public` access modifier.
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  // FIX: Removed `public` access modifier.
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
