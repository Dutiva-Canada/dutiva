import { Component } from "react";

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("App render failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10 text-zinc-100">
          <div className="premium-card w-full max-w-xl p-8 text-center">
            <div className="inline-flex rounded-full border border-yellow-400/15 bg-yellow-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-200">
              Recovery mode
            </div>
            <h1 className="metric-value mt-5 text-3xl font-semibold tracking-tight text-zinc-50">
              The app hit an unexpected error.
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A reload usually resolves temporary issues. If this keeps happening, check your local
              environment variables and recent code changes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="gold-button px-5 py-3 text-sm"
              >
                Reload app
              </button>
              <button
                type="button"
                onClick={() => window.location.assign("/")}
                className="ghost-button px-5 py-3 text-sm"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
