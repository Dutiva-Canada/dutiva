import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppErrorBoundary from "./AppErrorBoundary";

// A component that throws when the `shouldThrow` prop is true.
function ThrowingChild({ shouldThrow = false }) {
  if (shouldThrow) {
    throw new Error("Test render error");
  }
  return <div>Child content</div>;
}

// React calls console.error for uncaught errors inside error boundaries; silence it.
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});
afterEach(() => {
  console.error = originalConsoleError;
});

describe("AppErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow={false} />
      </AppErrorBoundary>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders the error UI when a child throws", () => {
    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow />
      </AppErrorBoundary>,
    );
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
    expect(screen.getByText(/recovery mode/i)).toBeInTheDocument();
  });

  it("shows a 'Reload app' button when in error state", () => {
    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow />
      </AppErrorBoundary>,
    );
    expect(
      screen.getByRole("button", { name: /reload app/i }),
    ).toBeInTheDocument();
  });

  it("shows a 'Go home' button when in error state", () => {
    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow />
      </AppErrorBoundary>,
    );
    expect(
      screen.getByRole("button", { name: /go home/i }),
    ).toBeInTheDocument();
  });

  it("calls window.location.reload when the Reload button is clicked", async () => {
    const user = userEvent.setup();
    const reloadSpy = vi.fn();
    vi.spyOn(window, "location", "get").mockReturnValue({
      reload: reloadSpy,
      assign: vi.fn(),
    });

    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow />
      </AppErrorBoundary>,
    );
    await user.click(screen.getByRole("button", { name: /reload app/i }));
    expect(reloadSpy).toHaveBeenCalledOnce();
  });

  it("calls window.location.assign('/') when the Go home button is clicked", async () => {
    const user = userEvent.setup();
    const assignSpy = vi.fn();
    vi.spyOn(window, "location", "get").mockReturnValue({
      reload: vi.fn(),
      assign: assignSpy,
    });

    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow />
      </AppErrorBoundary>,
    );
    await user.click(screen.getByRole("button", { name: /go home/i }));
    expect(assignSpy).toHaveBeenCalledWith("/");
  });

  it("logs the error to the console when a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error");
    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow />
      </AppErrorBoundary>,
    );
    // componentDidCatch calls console.error with the error
    const calls = consoleSpy.mock.calls.flat();
    const hasErrorLog = calls.some(
      (arg) => arg instanceof Error || (typeof arg === "string" && arg.includes("App render failed")),
    );
    expect(hasErrorLog).toBe(true);
  });

  it("does not show the error UI when there is no error", () => {
    render(
      <AppErrorBoundary>
        <ThrowingChild shouldThrow={false} />
      </AppErrorBoundary>,
    );
    expect(screen.queryByText(/recovery mode/i)).not.toBeInTheDocument();
  });

  it("renders multiple children without error", () => {
    render(
      <AppErrorBoundary>
        <span>First</span>
        <span>Second</span>
      </AppErrorBoundary>,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
