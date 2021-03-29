module.exports = {
    "testEnvironment": "node",

    "preset": 'ts-jest',

    "setupFilesAfterEnv": ["<rootDir>/tests/setup-test.ts"],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },

    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],

    "globals": {
        "ts-jest": {
            "tsconfig": "<rootDir>/tsconfig.jest.json"
        }
    }
}