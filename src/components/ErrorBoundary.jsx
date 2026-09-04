import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-lg bg-red-50 border border-red-200 rounded-2xl p-6">
            <h1 className="text-lg font-bold text-red-800 mb-2">Something went wrong</h1>
            <p className="text-sm text-red-700 mb-3">An error occurred while rendering this part of the page. Please reload. Details below (visible to developers):</p>
            <pre className="text-xs bg-white border border-red-100 rounded-lg p-3 overflow-auto text-red-800 whitespace-pre-wrap">
              {this.state.error.message || String(this.state.error)}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              className="mt-4 px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-800"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
