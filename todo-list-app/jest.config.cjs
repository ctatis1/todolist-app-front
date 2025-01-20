module.exports = {
    testEnvironment: "<rootDir>/tests/test-config/env-setup.cjs",
    transformIgnorePatterns: [
      "node_modules/(?!axios)/"
    ],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy'
    },
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
}