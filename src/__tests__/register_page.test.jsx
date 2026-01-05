// src/__tests__/register_page.test.jsx - test komponentu rejestracji /src/pages/register_page.jsx

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate (aby komponent nie próbował realnie nawigować)
const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Register_Page from "../pages/register_page";

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <Register_Page />
    </MemoryRouter>
  );
}

describe("register_page (component tests)", () => {
  beforeEach(() => {
    mockNavigate.mockClear();

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ available: true }),
      text: async () => "",
    });
  });

  it('renderowanie nagłówka "REJESTRACJA", pola formularza i przycisku', () => {
    renderRegister();

    // nagłówek
    expect(screen.getByRole("heading", { name: /rejestracja/i })).toBeInTheDocument();

    // pola po labelach
    expect(screen.getByLabelText(/nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adres e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^hasło$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/potwierdź hasło/i)).toBeInTheDocument();

    // przycisk
    expect(
      screen.getByRole("button", { name: /zarejestruj się!/i })
    ).toBeInTheDocument();
  });

  it('kliknięcie "Zarejestruj się!" przy pustych polach pokazuje błędy i błąd ogólny', async () => {
    const user = userEvent.setup();
    renderRegister();

    await user.click(screen.getByRole("button", { name: /zarejestruj się!/i }));

    // błędy pól
    expect(screen.getByText(/nazwa użytkownika jest wymagana/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail jest wymagany/i)).toBeInTheDocument();
    expect(screen.getByText(/hasło jest wymagane/i)).toBeInTheDocument();
    expect(screen.getByText(/potwierdzenie hasła jest wymagane/i)).toBeInTheDocument();

    // błąd ogólny
    expect(
      screen.getByText(/aby utworzyć konto, musisz poprawić pola w formularzu/i)
    ).toBeInTheDocument();

    // jeśli są błędy, to nie nawiguje do /dashboard
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("po focus na hasło i wpisaniu słabego hasła pojawiają się wskazówki oraz klasy bad/ok zmieniają się w trakcie wpisywania", async () => {
    const user = userEvent.setup();
    renderRegister();

    const passwordInput = screen.getByLabelText(/^hasło$/i);

    // focus: passwordTouched = true
    await user.click(passwordInput);

    // wpisanie słabego hasła: będzie ul.passwordHints
    await user.type(passwordInput, "abcd");

    const hintsList = document.querySelector("ul.passwordHints");
    expect(hintsList).toBeInTheDocument();
    
    const min8Li = within(hintsList).getByText(/min\. 8 znaków/i).closest("li");
    expect(min8Li).toHaveClass("bad");

    await user.type(passwordInput, "1234"); // >= 8

    expect(within(hintsList).getByText(/min\. 8 znaków/i).closest("li")).toHaveClass("ok");
    expect(within(hintsList).getByText(/co najmniej jedna cyfra/i).closest("li")).toHaveClass("ok");

    expect(within(hintsList).getByText(/co najmniej jedna wielka litera/i).closest("li")).toHaveClass("bad");
    expect(within(hintsList).getByText(/znak specjalny/i).closest("li")).toHaveClass("bad");

    await user.type(passwordInput, "A");
    expect(within(hintsList).getByText(/co najmniej jedna wielka litera/i).closest("li")).toHaveClass("ok");

    await user.type(passwordInput, "!");
    expect(document.querySelector("ul.passwordHints")).not.toBeInTheDocument();
    });
});
