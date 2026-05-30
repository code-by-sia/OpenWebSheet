module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/app/test/setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {tsconfig: '<rootDir>/tsconfig.json'}],
  },
};
