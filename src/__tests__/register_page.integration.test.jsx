// register_page.integration.test.jsx - integracyjne testy dla register_page

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

import Register_Page from "../pages/register_page";

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <Register_Page />
    </MemoryRouter>,
  );
}

const valid = {
  username: "abcde",
  email: "test@example.com",
  password: "Abcd1234!",
  confirmPassword: "Abcd1234!",
};

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
}

describe("Register_Page - testy integracyjne", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.stubGlobal("alert", vi.fn());
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
    vi.unstubAllGlobals();
    cleanup();
  });

  it("username < 5: request do /api/check-username nie jest wysyłany (debounce)", async () => {
    vi.useFakeTimers();

    globalThis.fetch = vi.fn();
    renderRegister();

    const usernameInput = screen.getByLabelText(/nazwa użytkownika/i);

    fireEvent.change(usernameInput, {
      target: { name: "username", value: "abcd" }, // 4 znaki
    });

    await vi.advanceTimersByTimeAsync(600);
    await flushPromises();

    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("username >= 5: po ~500ms wysyła POST /api/check-username (debounce)", async () => {
    vi.useFakeTimers();

    globalThis.fetch = vi.fn(async (url) => {
      if (url === "/api/check-username") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ info: "Nazwa wolna." }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    renderRegister();

    const usernameInput = screen.getByLabelText(/nazwa użytkownika/i);

    fireEvent.change(usernameInput, {
      target: { name: "username", value: "abcde" }, // 5 znaków
    });

    // przed 500ms nie powinno być requestu
    await vi.advanceTimersByTimeAsync(499);
    await flushPromises();
    expect(globalThis.fetch).not.toHaveBeenCalled();

    // po 500ms ma być request
    await vi.advanceTimersByTimeAsync(1);
    await flushPromises();

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/check-username",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ username: "abcde" }),
      }),
    );
  });

  it("check-username 409: ustawia błąd 'Nazwa użytkownika jest już zajęta.'", async () => {
    vi.useFakeTimers();

    globalThis.fetch = vi.fn(async (url) => {
      if (url === "/api/check-username") {
        return {
          ok: false,
          status: 409,
          json: async () => ({ error: "Nazwa użytkownika jest już zajęta." }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    renderRegister();

    const usernameInput = screen.getByLabelText(/nazwa użytkownika/i);

    fireEvent.change(usernameInput, {
      target: { name: "username", value: "abcde" }, // 5+ znaków
    });

    // debounce 500ms - ważne: w act
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    await flushPromises();

    // sprawdza, czy fetch był wywołany
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/check-username",
      expect.objectContaining({ method: "POST" }),
    );

    // i czy błąd jest wyświetlony
    expect(
      screen.getByText(/nazwa użytkownika jest już zajęta/i),
    ).toBeInTheDocument();
  });

  it("register 201 + {success:true}: nawiguje do /dashboard (bez zapisu user w localStorage)", async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(async (url) => {
      if (url === "/api/check-username") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ info: "Nazwa wolna." }),
        };
      }
      if (url === "/api/register") {
        return { ok: true, status: 201, json: async () => ({ success: true }) };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    renderRegister();

    await user.type(
      screen.getByLabelText(/nazwa użytkownika/i),
      valid.username,
    );
    await user.type(screen.getByLabelText(/adres e-mail/i), valid.email);
    await user.type(screen.getByLabelText(/^hasło$/i), valid.password);
    await user.type(
      screen.getByLabelText(/potwierdź hasło/i),
      valid.confirmPassword,
    );

    await user.click(screen.getByRole("button", { name: /zarejestruj się!/i }));
    await flushPromises();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/register",
      expect.objectContaining({ method: "POST" }),
    );

    expect(localStorage.getItem("user")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("register 409: pokazuje errors.general i nie nawiguje", async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(async (url) => {
      if (url === "/api/check-username") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ info: "Nazwa wolna." }),
        };
      }
      if (url === "/api/register") {
        return {
          ok: false,
          status: 409,
          json: async () => ({
            error: "E-mail jest już użyty przez innego użytkownika.",
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    renderRegister();

    await user.type(
      screen.getByLabelText(/nazwa użytkownika/i),
      valid.username,
    );
    await user.type(screen.getByLabelText(/adres e-mail/i), valid.email);
    await user.type(screen.getByLabelText(/^hasło$/i), valid.password);
    await user.type(
      screen.getByLabelText(/potwierdź hasło/i),
      valid.confirmPassword,
    );

    await user.click(screen.getByRole("button", { name: /zarejestruj się!/i }));
    await flushPromises();

    expect(screen.getByText(/e-mail jest już użyty/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("register: fetch throws => errors.general 'Błąd połączenia z serwerem' i brak nawigacji", async () => {
    const user = userEvent.setup();

    // wycisz console.error dla tego testu (opcjonalnie)
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    globalThis.fetch = vi.fn(async (url) => {
      if (url === "/api/check-username") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ info: "Nazwa wolna." }),
        };
      }
      if (url === "/api/register") {
        throw new Error("Network error");
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    renderRegister();

    await user.type(
      screen.getByLabelText(/nazwa użytkownika/i),
      valid.username,
    );
    await user.type(screen.getByLabelText(/adres e-mail/i), valid.email);
    await user.type(screen.getByLabelText(/^hasło$/i), valid.password);
    await user.type(
      screen.getByLabelText(/potwierdź hasło/i),
      valid.confirmPassword,
    );

    await user.click(screen.getByRole("button", { name: /zarejestruj się!/i }));
    await flushPromises();

    expect(screen.getByText(/błąd połączenia z serwerem/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
