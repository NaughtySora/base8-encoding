"use strict";

const { describe, } = require("node:test");
const { compress, decompress } = require("../main");

describe("Encoding", () => {
  const small = 42;
  const p8 = 10 ** 8;
  const long = 123456789;
  const limit = 123456789345;
});