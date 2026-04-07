import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Mock AuthContext so we can control auth state in each test.
vi.mock("../context/AuthContext.jsx", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../context/AuthContext.jsx";

function renderWithRouter(initialEntries = ["/protected"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<div>Protected content</div>} />
        </Route>
        <Route path="/auth" element={<div>Auth page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute – auth not configured", () => {
  it("renders the child outlet when Supabase auth is not configured", () => {
    useAuth.mockReturnValue({
      authConfigured: false,
      user: null,
      loading: false,
    });

    renderWithRouter();
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});

describe("ProtectedRoute – auth configured, loading", () => {
  it("shows a loading indicator while the session is being resolved", () => {
    useAuth.mockReturnValue({
      authConfigured: true,
      user: null,
      loading: true,
    });

    renderWithRouter();
    expect(screen.getByText(/loading workspace/i)).toBeInTheDocument();
  });

  it("does not render protected content while loading", () => {
    useAuth.mockReturnValue({
      authConfigured: true,
      user: null,
      loading: true,
    });

    renderWithRouter();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });
});

describe("ProtectedRoute – auth configured, unauthenticated", () => {
  it("shows the auth page when the user is not signed in", () => {
    useAuth.mockReturnValue({
      authConfigured: true,
      user: null,
      loading: false,
    });

    renderWithRouter();
    expect(screen.getByText("Auth page")).toBeInTheDocument();
  });

  it("does not render protected content when the user is not signed in", () => {
    useAuth.mockReturnValue({
      authConfigured: true,
      user: null,
      loading: false,
    });

    renderWithRouter();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });
});

describe("ProtectedRoute – auth configured, authenticated", () => {
  it("renders the child outlet when the user is signed in", () => {
    useAuth.mockReturnValue({
      authConfigured: true,
      user: { id: "user-1", email: "user@example.com" },
      loading: false,
    });

    renderWithRouter();
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("does not redirect when the user is signed in", () => {
    useAuth.mockReturnValue({
      authConfigured: true,
      user: { id: "user-1", email: "user@example.com" },
      loading: false,
    });

    renderWithRouter();
    expect(screen.queryByText("Auth page")).not.toBeInTheDocument();
  });
});
