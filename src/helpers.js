const assert = require('assert').strict;

// Generates a random integer in the interval [min, max)
exports.randint = (min, max) => {
    assert.assert(max > min, `Invalid randint range -- min: ${min} max: ${max}`)
    range = max - min - 1;
    fRand = Math.random();
    return (fRand * range) + min;
}
