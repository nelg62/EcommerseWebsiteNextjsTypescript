import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Change to jsdom
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Add this line
};

export default config;
