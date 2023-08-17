import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
    testEnvironment: "node",
    preset: "ts-jest",
    extensionsToTreatAsEsm: [".ts"],
    collectCoverage: true,
};

export default jestConfig;
