export const longString = (n) => "a".repeat(n);
export const longEmail = (n) => `a@${"b".repeat(n)}.com`;

export const validEmail = "fuzz@test.com";
export const validPass = "Abcd1234!";
export const validConfirm = "Abcd1234!";

export const unicodeUsername = "użytkownik🙂🔥";

// znaki, które powinny być zablokowane w haśle
export const combiningPassword = "Abcd1234!\u0301"; // znak łączący
export const newlinePassword = "Abcd1234!\n"; // znak kontrolny (newline)
export const tabPassword = "Abcd1234!\t"; // znak kontrolny (tab)
export const spaceInsidePassword = "Abcd 1234!"; // spacja w środku

// długie hasło wpisywane ze znaków z klawiatury (ASCII printable)
export const longAsciiPassword = "Abcd1234!" + "A1!a".repeat(300);

export const fuzzTestCases = [
  {
    description: "expected: 10k username: cannot register",
    expectRegisterRequest: false,
    username: longString(10_000),
    email: validEmail,
    password: validPass,
    confirmPassword: validConfirm,
    expectedErrorRegex: /maksymalnie|za dług|zbyt dług/i,
  },
  {
    description: "expected: 10k email: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: longEmail(10_000),
    password: validPass,
    confirmPassword: validConfirm,
    expectedErrorRegex: /maksymalnie|za dług|zbyt dług/i,
  },
  {
    description: "expected: unicode/emoji in username: cannot register",
    expectRegisterRequest: false,
    username: unicodeUsername,
    email: validEmail,
    password: validPass,
    confirmPassword: validConfirm,
    expectedErrorRegex: /dozwolone znaki|tylko|litery|cyfry|ascii/i,
  },

  // password
  {
    description: "expected: password contains newline: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: validEmail,
    password: newlinePassword,
    confirmPassword: newlinePassword,
    expectedErrorRegex: /hasło|znak|niedozwol|spacja|whitespace|format/i,
  },
  {
    description: "expected: password contains combining mark: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: validEmail,
    password: combiningPassword,
    confirmPassword: combiningPassword,
    expectedErrorRegex: /hasło|znak|niedozwol|format/i,
  },
  {
    description: "expected: password contains TAB: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: validEmail,
    password: tabPassword,
    confirmPassword: tabPassword,
    expectedErrorRegex: /hasło|znak|niedozwol|format/i,
  },
  {
    description: "expected: password contains ANY space: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: validEmail,
    password: spaceInsidePassword,
    confirmPassword: spaceInsidePassword,
    expectedErrorRegex: /spacja|whitespace|białe znaki/i,
  },

  // password: ASCII printable, bez spacji, bardzo długie
  {
    description:
      "expected: Long keyboard-only password (ASCII printable, no spaces) + confirm identical: can register",
    expectRegisterRequest: true,
    username: "fuzzuser",
    email: validEmail,
    password: longAsciiPassword,
    confirmPassword: longAsciiPassword,
  },
  // confirm password
  {
    description: "expected: confirmPassword empty: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: validEmail,
    password: validPass,
    confirmPassword: "",
    expectedErrorRegex: /potwierdzenie hasła jest wymagane|potwierdź/i,
  },

  // confirmPassword
  {
    description: "expected: very long confirmPassword identical: can register",
    expectRegisterRequest: true,
    username: "fuzzuser",
    email: validEmail,
    password: longAsciiPassword,
    confirmPassword: longAsciiPassword,
  },

  {
    description:
      "expected: very long confirmPassword different: cannot register",
    expectRegisterRequest: false,
    username: "fuzzuser",
    email: validEmail,
    password: longAsciiPassword,
    confirmPassword: longAsciiPassword + "X",
    expectedErrorRegex: /hasła muszą być identyczne/i,
  },
];
