import assert from 'assert';
import ddb from '../src/ddb';

describe('ddb.js', () => {

  it('it should return "Hello, Lambda!"', () => {
    ddb.handler({},{},(err, succ) => {
      assert.equal('Hello, Lambda!', succ);
    });
  });

});
