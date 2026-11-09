# Base-8 floating-point encoding
Encode large value into 2 byte representation allowing a lossy compression error.

If i remember correctly the format comes from BSD process accounting.
I couldn't find a reliable source identifying the original inventor.

Linux's implementation credits Marco van Wieringen for the BSD-style process accounting code, not necessarily for inventing the encoding itself.

This implementation was written independently and does not copy the original source code.

- The compressed value consists of a 3-bit base-8 exponent, and 13-bit mantissa.
- The exponent can represent a range from 8^0 to 8^7.
- Max value can be represented as (2^13 - 1) * (8^7) = 17177772032.

- Lossy compression allows using a lot bigger numbers in expense of correctness.
- Compression uses floating point truncation, which guarantees that decompressed 
value will always be lesser or equal the original value, 
but provides greater correctness error (8^7)-1.
- Rounding floating point will give smaller correctness error (8^7) / 2 but will increase unpredictability, which means, decompressed values will be either greater, lesser or equal to the original.