module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  resetMocks: true,
  testMatch: [ '**/__tests__/**/*.test.ts' ],
  globals: { diagnostics: { warnOnly: true } },
  moduleNameMapper: { '^@modules/(.+)': '<rootDir>/src/modules/$1' },
}
