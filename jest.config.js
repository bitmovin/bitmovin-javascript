module.exports = {
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "testRegex": "/tests/.*.test.ts$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ],
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.es6.json"
    }
  }
};
