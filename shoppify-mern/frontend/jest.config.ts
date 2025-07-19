import { Config } from "jest";

const config: Config = {
  preset: 'ts-jest',
  // collectCoverageFrom:
  //   [
  //     "src/**/*.{ts,tsx}",
  //     "!src/**/*.d.ts",
  //     "!**/vendor/**"
  //   ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "pnpm-lock.json",
    "yarn-lock.json", // remove lock file according to your package manager
    "jest.setup.ts",
    "main.tsx",
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  }
};

module.exports = config;