import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Register_Page from "../pages/register_page";
import { fuzzTestCases } from "./fuzz.cases";
import { runFuzzTest } from "./fuzz.runner";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <Register_Page />
    </MemoryRouter>,
  );
}

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
}

describe("Register_Page – fuzz tests", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.stubGlobal("alert", vi.fn());

    globalThis.fetch = vi.fn(async (url) => {
      if (url === "/api/check-username") {
        return { ok: true, status: 200, json: async () => ({ info: "ok" }) };
      }
      if (url === "/api/register") {
        return { ok: true, status: 201, json: async () => ({ success: true }) };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    cleanup();
  });

  it.each(fuzzTestCases)("$description", async (testCase) => {
    await runFuzzTest(renderRegister, testCase, {
      flushPromises,
      mockNavigate,
    });
  });
});
