import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

function setInputByLabel(labelRegex, value) {
  const input = screen.getByLabelText(labelRegex);
  fireEvent.change(input, { target: { value } });
  return input;
}

export async function runFuzzTest(
  renderRegisterComponent,
  testCase,
  { flushPromises, mockNavigate },
) {
  const {
    description,
    username,
    email,
    password,
    confirmPassword,
    expectRegisterRequest,
    expectedErrorRegex,
  } = testCase;

  console.log(`Running fuzz test: ${description}`);

  renderRegisterComponent();
  const user = userEvent.setup();

  // Ustaw wartości zgodnie z Twoimi labelkami (PL)
  setInputByLabel(/nazwa użytkownika/i, username);
  setInputByLabel(/adres e-mail/i, email);

  // KLUCZ: Hasło musi być dokładne, inaczej matchuje też "Potwierdź hasło"
  setInputByLabel(/^hasło$/i, password);
  setInputByLabel(/potwierdź hasło/i, confirmPassword);

  // Diagnostyka (opcjonalnie, możesz zostawić)
  const emailInput = screen.getByLabelText(/adres e-mail/i);
  const passInput = screen.getByLabelText(/^hasło$/i);
  const confInput = screen.getByLabelText(/potwierdź hasło/i);

  expect(emailInput.value).toBe(email);
  expect(passInput.value).toBe(password);
  expect(confInput.value).toBe(confirmPassword);

  await user.click(screen.getByRole("button", { name: /zarejestruj się!/i }));
  await flushPromises();

  const calls = globalThis.fetch?.mock?.calls ?? [];
  const registerCalls = calls.filter(([url]) => url === "/api/register");

  if (expectRegisterRequest) {
    if (registerCalls.length !== 1) {
      const visibleErrors = screen.queryAllByText(
        /wymagana|nieprawidłowy|hasło musi mieć|identyczne|zajęta/i,
      );
      throw new Error(
        `Expected 1 /api/register call, got ${registerCalls.length}. ` +
          `Visible errors: ${visibleErrors.map((e) => e.textContent).join(" | ")}`,
      );
    }
  } else {
    if (registerCalls.length !== 0) {
      throw new Error(
        `Expected 0 /api/register calls, got ${registerCalls.length}`,
      );
    }

    if (expectedErrorRegex) {
      expect(screen.getByText(expectedErrorRegex)).toBeInTheDocument();
    }

    expect(mockNavigate).not.toHaveBeenCalled();
  }
}
