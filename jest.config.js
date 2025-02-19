const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './', // Specify the root directory
});

const customJestConfig = {
    testEnvironment: 'jsdom',
    resetMocks: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        // Handle module aliases for components, pages, and layouts
        '^@/cmps/(.*)$': '<rootDir>/cmps/$1',
        '^@/providers/(.*)$': '<rootDir>/providers/$1',
        '^@/services/(.*)$': '<rootDir>/services/$1',
    },
    testMatch: [
        '<rootDir>/tests/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

module.exports = createJestConfig(customJestConfig);
