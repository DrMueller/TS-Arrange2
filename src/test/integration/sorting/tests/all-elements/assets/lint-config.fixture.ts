  export const LintConfigFixture = `
  "member-ordering": [
    true,
    {
      "order": [
        "public-static-field",
        "public-instance-field",
        "protected-static-field",
        "protected-instance-field",
        "private-static-field",
        "private-instance-field",
        "public-constructor",
        "protected-constructor",
        "private-constructor",
        "public-static-method",
        "public-instance-method",
        "protected-static-method",
        "protected-instance-method",
        "private-static-method",
        "private-instance-method"
      ]
    }
  ],
  `;