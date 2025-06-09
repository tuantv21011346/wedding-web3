import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-purple-50 to-pastel-pink-50">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Có lỗi xảy ra
            </h2>
            <p className="text-gray-600 mb-6">
              Trang này gặp sự cố. Vui lòng thử lại hoặc quay về trang chủ.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="px-6 py-2 bg-pastel-purple-500 text-white rounded-lg hover:bg-pastel-purple-600 transition-colors"
              >
                Thử lại
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="block mx-auto px-6 py-2 bg-pastel-pink-500 text-white rounded-lg hover:bg-pastel-pink-600 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  Chi tiết lỗi (dành cho developer)
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
