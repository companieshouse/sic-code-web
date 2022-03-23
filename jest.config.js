module.exports = {
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    collectCoverageFrom: [
        "src/**/{!(server),}.ts"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}
