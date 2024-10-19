'use client'

import React, { ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CustomErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Oops, there was an error!</h2>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;