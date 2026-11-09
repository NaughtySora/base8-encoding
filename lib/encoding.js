"use strict";

const BASE_EXPONENT = 8;
const MAX_MANTISSA = (1 << 13) - 1;
const MAX_VALUE = MAX_MANTISSA * (BASE_EXPONENT ** 7);

const compress = value => {
  if (value > MAX_VALUE) throw new Error(`Can compress up to ${MAX_VALUE}`);
  let mantissa;
  let exp = 0;
  while ((mantissa = (value / (BASE_EXPONENT ** exp))) > MAX_MANTISSA) exp++;
  return mantissa | (exp << 13);
};

const decompress = value =>
  (value & 0x1FFF) * (BASE_EXPONENT ** (value >> 13));

module.exports = { compress, decompress };
