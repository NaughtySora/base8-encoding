"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { compress, decompress } = require("../main");

const SHORT = 0xFFFF;
const MAX_ERROR = (8 ** 7) - 1;

describe("Encoding", () => {
  it("valid", () => {
    assert.equal(compress(42), 42);
    assert.equal(compress((1 << 13) - 1), (1 << 13) - 1);
    assert.notEqual(compress(1 << 13), 1 << 13);
    const big = 0x6CF21F3A >> 0;
    const compressed = compress(big);
    assert.ok(big > SHORT);
    assert.ok(compressed <= SHORT);
    assert.ok(big - decompress(compressed) <= MAX_ERROR);
  });

  it("Max value exceeded", () => {
    assert.throws(() => compress(123456789345));
  });
});