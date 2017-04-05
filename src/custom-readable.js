/* eslint-env node */

'use strict';

const Readable = require('stream').Readable;

/** @this CustomReadable */
const CustomReadable = function() {
  Readable.call(this);
  this._readableState.objectMode = true;
  this.buf = [];
  this.canPush = false; 
};

CustomReadable.prototype = Object.create(Readable.prototype);

CustomReadable.prototype.constructor = CustomReadable;

CustomReadable.prototype.append = function(s) {
  this.buf.push(s); 
  if (this.canPush) {
    while(this.buf.length > 0 && this.push(this.buf.shift())) {}
    if (this.buf.length > 0) this.canPush = false;
  }
};

CustomReadable.prototype._read = function() { this.canPush = true; };

exports.CustomReadable = CustomReadable;