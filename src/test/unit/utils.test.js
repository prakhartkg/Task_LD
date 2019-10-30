require('dotenv').config();
const assert = require('assert');
const { encryption } = require('../../config');

describe('Testing Bcrypt Utility functions', () => {
  it('should  encryption and validation', async () => {
    const plainTest = 'admin123';
    const enc = await encryption.encrypt(plainTest);
    const success = await encryption.validate(plainTest, enc);
    assert.equal(success, true);
  });

  it('should fail verification of encryption', async () => {
    const plainTest = 'admin123';
    const random = 'admin1234';
    const enc = await encryption.encrypt(plainTest);
    const success = await encryption.validate(random, enc);
    assert.equal(success, false);
  });
});
