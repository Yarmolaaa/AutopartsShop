module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.cjs',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  // lucide-react ships ESM; let Babel transform it instead of ignoring it.
  transformIgnorePatterns: ['/node_modules/(?!(?:lucide-react)/)'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  clearMocks: true,
};
