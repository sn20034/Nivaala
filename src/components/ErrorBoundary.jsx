import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Nivaala error boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6 text-center dark:bg-ink">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-[#F04A23] text-2xl font-bold text-white">
            N
          </div>
          <h1 className="text-2xl font-extrabold">Arre, something broke.</h1>
          <p className="mt-2 max-w-md text-muted">
            We're sorry — this page hit an error. Try refreshing, or head back home.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary mt-6"
          >
            Back to home →
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
