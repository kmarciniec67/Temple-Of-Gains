// src/__tests__/smoke.test.jsx - prosty test sprawdzający, czy środowisko testowe działa poprawnie
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("works", () => {
    expect(1 + 1).toBe(2);
  });
});
